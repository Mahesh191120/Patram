import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React, { useState, useEffect, useStyles } from "react";
import { Slides } from "@mui/material";
//import { Component, Fragment } from "react-boostrap";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
//import { Link, NavLink } from 'react-router-dom';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  SxProps,
  TextField,
  Modal,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Navbar.css";
import Profile from "./Profile.jsx";
import CreateAWB from "./CreateAWB.jsx";
import Print from "./Print";
import TrackShipment from "./TrackShipment";
import { Link } from "@mui/material";
import Search from "./Search";
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { format } from "date-fns";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const Navbar = () => {
  const [date1, setdate] = useState();
//   const[dat,setDate]=useState();
const [rs,setrs] = useState([]); 
const [startDate, setStartDate] = useState();
  const [value, setValue] = useState();
  const [apiData, setApiData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [slides, setSlides] = useState([
    { freight: "Jan", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Feb", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Mar", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Apr", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "May", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Jun", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Jul", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Aug", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Sep", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Oct", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Nov", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
    { freight: "Dec", forwarders: 2022, renewed: 4, forcasted: 4, active: 66 },
  ]);
 
console.log(date1);
 // console.log(typeOf(date))

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios.post('http://localhost:5000/subscription', {startDate})
            .then((response) => {
                setApiData(response.data);
                console.log(response.data);
            }).catch((err) => {
                console.log(err)
            });
    }, [startDate])
// const handleSubmit = async (e) => {
// e.preventDefault();
//         try {
//         const response = await axios.post('http://localhost:5000/subscription', { startDate }); 
        
//      //   setGreeting(response.data);
//       setApiData(response.data);
//         console.log(startDate)
//         console.log(response)
//          } catch (error) {
//          console.error('Error:', error);
//          }
//         }
        
        
// useEffect(() => {
//         handleSubmit();
//          }, [startDate]);


    const showDetail = (Customer_Id) =>
    {
       
      fetch(`http://localhost:5000/invoicedetails/${Customer_Id}`)
      .then(resposne=> resposne.json())
      .then(res=>setrs(res))
      }

      const emailremainder = (Customer_Id) =>
      {
         
        fetch(`http://localhost:5000/gmailremainder/${Customer_Id}`)
        .then(resposne=> resposne.json())
        }
    
    // console.log(response);
    console.log(rs);

    const onSubmit = (e) => {
        e.preventDefault();
        let checkArray = [];
        for (var key in this.state) {
          if (this.state[key] === true) {
            checkArray.push(key);
          }
        }
        let checkData = {
          checkbox: checkArray.toString()
        };
        axios.post('http://localhost:5000/subscription', checkData)
          .then((res) => {
            console.log(res.data)
          }).catch((error) => {
            console.log(error)
          });
      }

    const userData = [
         { name: "New / Renewed" },
         { name: "Expiry" },
         { name: "Active" }
        ];  

    const [users, setUsers] = useState([]);
        
       useEffect(() => {
         setUsers(userData);
       }, []);
        
        console.log(userData);
        console.log(users)
        
     const handleChange = (e) => {
     const { name, checked } = e.target;
     if (name === "allSelect") {
     let tempUser = users.map((user) => {
     return { ...user, isChecked: checked };
     });
     setUsers(tempUser);
     } else {
     let tempUser = users.map((user) =>
     user.name === name ? { ...user, isChecked: checked } : user
 );
     setUsers(tempUser);
 }
     };
    

  return (
    <>

        <img style={{ height: "40px", paddingTop: "-80px", }} className="logo" src="https://www.aircargoweek.com/wp-content/uploads/2015/06/IATA_Logo.svg_.png"/>
            <AppBar elevation={20} position="static" style={{ height: "53px", width: "100%", backgroundColor: "#1e90ff", fontWeight: "14px",  boxShadow: "initial"  }}>
                <Toolbar>
                    <Grid item xs={6} className="navbar" style={{ justifyContent:"flex-start"}}>
            
                        <Box p={2} sx={{ alignItems: "center", paddingTop: "10px", display: "flex", justifyContent:"flex-start"}}>
                        <a href="createAWB" component={CreateAWB} style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem", fontFamily: "sans-serif" }}>
                            CreateAWB
                        </a>
                        </Box>

                        <Box p={2} sx={{ alignItems: "center", paddingTop: "10px", display: "flex", justifyContent:"flex-start" }}>
                        <Link href="print" style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem", fontFamily: "sans-serif" }}>
                            Print
                        </Link>
                        </Box>

                        <Box p={2} sx={{ alignItems: "center", paddingTop: "10px", display: "flex" }}>
                        <a href="trackshipment" component={TrackShipment} style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem", fontFamily: "sans-serif" }}>
                            Track Shipment
                        </a>
                        </Box>

                        <Box p={2} sx={{ alignItems: "center", paddingTop: "10px", display: "flex" }}>
                        <a href="search" component={Search} style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem", fontFamily: "sans-serif" }}>
                            Search
                        </a>
                        </Box>
                    </Grid>

                    <Grid item xs={1} />

                <Grid style={{ display: "flex" }}>
                <Grid item xs={5}>
                    <Box sx={{ display: "flex", spacing: "50px", justifyContent:"flex-end" }}>
                        <Box style={{ display: "flex", textAlign: "center", color: "#fff"}} value={value} onChange={(e, val) => setValue(val)}>
                            <Box className="company_name" p={2} sx={{ alignItems: "center", paddingTop: "16px", display: "flex", fontFamily: "sans-serif", fontSize: "1.1rem" }}>
                                MPHASIS
                            </Box>
                            <Box p={2} sx={{ alignItems: "center", paddingTop: "10px", display: "flex", color: "#fff" }}>
                                <a href="/profile">
                                <PersonIcon style={{ color: "#fff" }} />
                                </a>
                            </Box>

                            <Box p={2} sx={{ alignItems: "center", paddingTop: "10px", display: "flex", color: "#fff" }}>
                                <a href="/setting">
                                <SettingsIcon style={{ color: "fff" }}/>
                                </a>
                            </Box>

                            <Box p={2} sx={{ alignItems: "center", paddingTop: "10px", display: "flex", color: "#fff" }}>
                                <a href="/home">
                                <HomeIcon className="home" style={{ color: "fff" }} />
                                </a>
                            </Box>

                            <Box p={2} sx={{ alignItems: "center", paddingTop: "10px", display: "flex", color: "#fff" }}>
                                <a href="/help">
                                <HelpIcon className="help" style={{ color: "fff" }} />
                                </a>
                            </Box>

                            <Box p={2} sx={{ alignItems: "center", paddingTop: "10px", display: "flex", color: "#fff" }}>
                                <a href="/logout">
                                <LogoutIcon className="logout" style={{ color: "fff" }} />
                                </a>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                </Grid>
            </Toolbar>
        </AppBar>

        <Paper elevation={23} style={{ height: "79vh", maxWidth: "96%", marginTop: "-46px", marginLeft: "27px", borderRadius: "initial"}}>
            <h4 style={{ paddingLeft: "39px", textAlign: "left", fontSize: "20px", paddingTop: "25px", marginTop: "47px", fontFamily: "sans-serif"}}>
            Manage Subscription
            </h4>

    {/* <div className="date" style={{ display:"flex", justifyContent: "flex-end", marginTop: "-60px", marginRight:"40px" }}> 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
                <DatePicker
                selected={date1}
                views={['year', 'month']}
                onChange={(date) => setdate(date)}
                dateFormat="yyyy-MM"
                showYearMonthPicker
                />
            <label>
              DT:
            <input type="text" value={date1}
               onChange={(e) => setdate(e.target.value)} /> 
            </label>
          </DemoContainer>
        </LocalizationProvider>
    </div> */}
<div className="date" style={{ display:"flex", justifyContent: "flex-end", marginTop: "-40px", marginRight:"40px" }}>
{/* <form onSubmit={handleSubmit}> */}

 <input type="month" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
 {/* <button type="submit">Search</button> */}
{/* </form> */}
</div> 


            <div id="main-slider-container">
                <div style={{ marginLeft: "20px", color: "#fff", fontFamily: "sans-serif" }}>
                    {/* <h5 style={{ marginTop: "45px" }}><CheckBox>Show All</CheckBox></h5> */}
                    {/* <h5 style={{ marginTop: "-29px" }}></h5> */}
                    {/* <h5 style={{ marginTop: "-10px" }}>Renewed/New</h5>
                    <h5 style={{ marginTop: "-15px" }}>Expiry</h5>
                    <h5 style={{ marginTop: "-20px" }}>Active</h5> */}
                    {/* <FormGroup style={{ fontSize: "10px" }}>
                        <FormControlLabel style={{paddingTop:"40px", height:"20px" }}  control={<Checkbox/>} label="Show All" />
                        <FormControlLabel style={{height:"20px", paddingTop:"10px" }} control={<Checkbox/>} label="New / Renewed" />
                        <FormControlLabel style={{height:"20px",paddingTop:"8px"}} control={<Checkbox/>} label="Expiry" />
                        <FormControlLabel style={{ paddingBottom:"16px" }}control={<Checkbox/>} label="Active" />
                    </FormGroup> */}

                <div className="container my-4" style={{ width: "150px" }}>
                    <form className="form w-100">
                        <div className="form-check">
                            <input
                 type="checkbox"
             className="form-check-input"
                     name="allSelect"
                     // checked={
                     //   users.filter((user) => user?.isChecked !== true).length < 1
                 // }
                     checked={!users.some((user) => user?.isChecked !== true)}
                     onChange={handleChange}
                     />
                            <label className="form-check-label ms-2">Show All</label>
                        </div>
                 {users.map((user, index) => (
                            <div className="form-check" key={index}>
                                <input
                         type="checkbox"
                         className="form-check-input"
                         name={user.name}
                         checked={user?.isChecked || false}
                         onChange={handleChange}
                         />
                            <label className="form-check-label ms-2">{user.name}</label>
                            </div>
                  ))}
                    </form>
                </div>
                    

                </div>

                <div id="slider" style={{ marginLeft: "-15px", fontFamily: "sans-serif", fontColor: "white" }}>
                    {slides.map((slide) => {
                        return (
                            <div className="slider-card" key={slide.index_id}>
                            <p className="slider-card-freight" style={{ marginTop: "3px", textAlign: "center" }}>{slide.freight}</p>
                            <p className="slider-card-forwarders" style={{ marginTop: "-12px", textAlign: "center", fontSize: "12px" }}>{slide.forwarders}</p>
                            <p className="slider-card-renewed" style={{ marginTop: "-4px", textAlign: "center" }}>{slide.renewed}</p>
                            <p className="slider-card-forcasted" style={{ marginTop: "-9px", textAlign: "center" }}>{slide.forcasted}</p>
                            <p className="slider-card-active" style={{ marginTop: "-10px", textAlign: "center" }}>{slide.active}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <h4 style={{margin:0, paddingTop:"15px", fontFamily:"sans-serif", fontWeight:"bold", paddingLeft:"40px"}}>Search Results for :{""}</h4>
            {/* <select name="selectedFruit" style={{margin:0, fontFamily:"sans-serif", fontWeight:"bold",paddingRight:"23px"}}>
                <option value="apple">Active</option>
                <option value="banana">InActive</option>
                <option value="orange">Showall</option>
            </select> */}
           
            <h5 style={{marginTop:"-35px", marginBottom:"-10px", justifyContent:"center"}}>
                <Box style={{paddingRight:"23px"}}>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={apiData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </h5>
        
            <Box sx={{ display: 'flex', flexDirection: 'row', border: 0.5, borderColor: "text.secondary"}} />

            <Paper sx={{ width: '95%', marginLeft:"39px", borderRadius: "3px" }}>
                <TableContainer style={{height:"44vh"}}>
                <Paper sx={{width:"97.7%", paddingLeft:"12px"}}>
                    <Table className={'classes.table'} stickyHeader size="small" aria-label="a dense table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" style={{ paddingRight: "0px", fontSize:"0.8rem",width:"90px",fontWeight:"bold", backgroundColor:"ButtonShadow"}}>Date Of Registration</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", paddingLeft:"10px", backgroundColor:"ButtonShadow"}}>Company Name</TableCell>
                                <TableCell align="center" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", paddingLeft:"2px", backgroundColor:"ButtonShadow"}}>Email ID</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>Date of Approval</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", paddingLeft:"2px", backgroundColor:"ButtonShadow"}}>Prev<br/> Renew Date</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", paddingLeft:"2px", backgroundColor:"ButtonShadow"}}>Next <br/>Renew Date</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", paddingLeft:"2px", backgroundColor:"ButtonShadow"}}>Expired</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>Payment/<br/>Renew Status</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>Payment Date</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>Payment Mode</TableCell>
                                <TableCell align="left" style={{ fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>AWB <br/>Submitted Date</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>AWB Count</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow"}}>Email Remainder</TableCell>
                                <TableCell align="left" style={{fontSize:"0.8rem",fontWeight:"bold", paddingRight:"0px", backgroundColor:"ButtonShadow", width:"60px"}}>Action</TableCell>
            
                            </TableRow>
                    
                        </TableHead>  
                                                    
                        <TableBody>
                            {apiData
                            .map((data,index) => (
                                    <TableRow key={index} sx={{padding:0}}>
                                    <td align="left" >{data.Date_Of_Registration}</td>
                                    <td align="left" >{data.Company_Name}</td>
                                    <td align="left" >{data.Register_Email}</td>
                                    <td align="left" >{data.Approved_Date}</td>
                                    <td align="left" >{data.Prev_Renew_Date}</td>
                                    <td align="left" >{data.Next_Renewal}</td>
                                    <td align="left" >{data.Expired}</td>
                                    <td align="left" >{data.Renew_status}</td>
                                    <td align="left" >{data.Payment_Date}</td>
                                    <td align="left" >{data.Payment_Type}</td>
                                    <td align="left" >{data.AWB_Submitted_Date}</td>
                                    <td align="left" >{data.AWB_count}</td>
                                    <td align="left" >{data.Email_Remainder}</td>
                                    <td align="left" ><span><Button style={{ paddingRight:"30px", size:"small"}}><DescriptionIcon onClick={(e)=>showDetail(data.Customer_Id)} data-bs-toggle="modal" data-bs-target="#myModal"/></Button></span></td>
                                    
                                    <td align="left" ><span><Button style={{ paddingRight:"30px", size:"small"}}><EmailIcon onClick={(e)=>emailremainder(data.Customer_Id)} style={{color:"black", size:"small"}}/> </Button></span></td>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                    </Paper>
                </TableContainer>             
    </Paper>
    </Paper>
         
       
    <div class="modal" id="myModal">
               <div class="modal-dialog" style={{width:"700px"}}>
                  <div class="modal-content">
                     <div class="menu">
                       <h5 class="modal-title" id="exampleModalLabel">Invoice Details</h5>
                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{marginLeft:"450px"}}></button>
                     </div>
                     <div class="modal-body">
                    <h3>INVOICE </h3>
                       <p>Invoice Amount : {rs.Invoice_Amount}</p>
                       <p>Invoice currency: {rs.Invoice_Currency}</p>                       
                       <p>Invoice date : {rs.Invoice_Date}</p>
                       <p>Invoice number: {rs.Invoice_Number}</p>
                          
                    
                     </div>             
                     <div class="modal-footer">
                       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     </div>  
                  </div>
               </div>
            </div>

        <div className="footer">
            <p style={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: "14px" }}>
            © 2021 Mphasis
            </p>
        </div>
    </>
  );
};

export default Navbar;