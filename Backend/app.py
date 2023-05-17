from flask import Flask, request, jsonify,app
from flask_cors import CORS
import mysql.connector
import requests
import sys
from datetime import datetime
from dateutil import parser
import re
from flask_mail import Mail, Message
from flask_mysqldb import MySQL
from flask_cors import CORS

# pythoncom.CoInitialize()

app = Flask(__name__)

CORS(app)  # Enable CORS for all routes and origins
mydb = mysql.connector.connect(
  user ='admin',
  password= 'admin123',
  host= 'patram-subscription-db.c4qldlczzvrr.us-east-1.rds.amazonaws.com',
  database= 'patram'

)
mysql = MySQL(app)
mail=Mail(app)
app.config['MAIL_SERVER']='smtp.gmail.com'

app.config['MAIL_PORT'] = 465

app.config['MAIL_USERNAME'] = 'vmcn4567@gmail.com'

app.config['MAIL_PASSWORD'] = "texjmqfpsswftwyc"

app.config['MAIL_USE_TLS'] = False

app.config['MAIL_USE_SSL'] = True

mail = Mail(app)
@app.route('/greet', methods=['POST'])
def greet():
    # data = request.get_json()
    # name = data.get('name', 'Unknown')
    # greeting = f"Hello, {name}!"
    # return jsonify(greeting=greeting)
    mnth= request.json['Date']
        #  if mnth and request.method == 'GET':
        # sqlQuery="SELECT  Date_format(Date_of_Registration,'%M') as month,SUM(Active=1) as active,SUM(Active=0) as inactive,Date_format(Date_of_Registration,'%Y') as Year from customer_master where Date_of_Registration BETWEEN DATE_SUB(%s, INTERVAL 6 MONTH) AND date_add(%s,INTERVAL 6 MONTH) group by Date_of_Registration order by Date_of_Registration asc";
    sqlQuery="select count(id) as active from subsription_payment where DATE_FORMAT(Subscription_Start,'%Y-%m') <=%s and DATE_FORMAT(Subscription_End,'%Y-%m')>= %s group by Subscription_Start order by Subscription_Start "
    cursor = mydb.cursor(dictionary=True)           
    cursor.execute(sqlQuery,[mnth,mnth])          
    value=cursor.fetchall()                
    return jsonify(value)       

@app.route('/subscription', methods=['POST'])

def payment():
    try:
        # data = request.get_json()
        # name = data.get('name', 'Unknown')
        # greeting = f"Hello, {name}!"
        # return jsonify(greeting=greeting)
        mnth= request.json['startDate']
        # if len(mnth)>=7:
        #  print("please enter the year and month in (yyyy-mm) format")
        pattern_str = r'^\d{4}-\d{2}$'
        if re.match(pattern_str,mnth):
        # dateObject = datetime.strftime(mnth, date_format)
        
        
        #  if mnth  and request.method == 'POST':
            # if(type(mnth) != str or type(mnth) != str):
            #  print('One of the variables is not an integer')
            # sqlQuery="SELECT  Date_format(Date_of_Registration,'%M') as month,SUM(Active=1) as active,SUM(Active=0) as inactive,Date_format(Date_of_Registration,'%Y') as Year from customer_master where Date_of_Registration BETWEEN DATE_SUB(%s, INTERVAL 6 MONTH) AND date_add(%s,INTERVAL 6 MONTH) group by Date_of_Registration order by Date_of_Registration asc";
             sqlQuery='''select customer_master.Date_Of_Registration,customer_master.Register_Email,
                    customer_master.Customer_Id,customer_master.Approved_Date,customer_master.Next_Renewal,
                    subsription_payment.Subscription_Start,subsription_payment.Subscription_End,subsription_payment.Payment_Type,
                    subsription_payment.Payment_Date 
                    from customer_master left join subsription_payment 
                    on customer_master.Customer_Id=subsription_payment.Customer_Id                   
                    where DATE_FORMAT(Subscription_Start,'%Y-%m') <=%s and DATE_FORMAT(Subscription_End,'%Y-%m')>=%s'''
             cursor = mydb.cursor(dictionary=True)           
             cursor.execute(sqlQuery,[mnth,mnth])          
             value=cursor.fetchall()                
             return jsonify(value) 
        else :
            return "please enter only year and month in YYYY-MM format not in like " +  mnth
        
    except ValueError:
         return "error while passing the value"
@app.route('/gmailremainder/<id>', methods =['GET'])
def email_alert(id):
      
        sqlQuery= '''select Register_Email,Next_Renewal
                     from customer_master 
                     where Customer_Id=%s'''
        print("email")
        cursor = mydb.cursor(dictionary=True)           
        cursor.execute(sqlQuery,[id])     
        print(id)      
        data=cursor.fetchall()  
        print(data)
        
        for x in data:
            value=x
            print(value)     
        email=list(value.values()) 
        var_dict={'var1':email[0],'var2':email[1]}
        var1,var2=var_dict.values()  
        print([var1])
        print(var2) 
        # return jsonify(value)       
#         _TO=request.json["TO"]
#         _Subscriptionend=request.json['Date']
#         if _TO and _Subscriptionend and request.method == 'POST':
        if email:
            
            
            # print(abc)

            msg = Message(
                        'payment remainder',
                        sender ='vmcn4567@gmail.com',
                        recipients = [var1]
                            )
            msg.body =f'''
                    Dear Customer,Greetings, Hope you are safe!
                    Gentle Reminder!
                    Your eAWBLink subscription renewal is due.
                    Your account has expired on {var2}.
                    please click on the link below  to renew and use the eawbLink application without any interruption.
                    Link for card payment :-EAWBLink 1 Year subscription plan.
                    For bank Transfers (or) any questions, please contact us subscriptions@eawblink.org
                    Thanks & Regards,
                    subscriptions'''
                    
                            
            mail.send(msg)
            return 'Remainder sent succesfully'

        else :
           return 'unable to send the  email remiander'




@app.route('/invoicedetails/<id>', methods=['GET'])
def invoice(id):

        # id= request.json['cust']
        sqlQuery= "select * from invoice_details where Customer_Id=%s"
        cursor = mydb.cursor(dictionary=True)           
        cursor.execute(sqlQuery,[id])     
        print(id)      
        value=cursor.fetchall()  
        print(value)
                    
        return jsonify(value)   

    

    

@app.errorhandler(404)
def showMessage(error=None):
    message = {
        'status': 404, 
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone            
          

if __name__ == '__main__':
    app.run(debug=True)
