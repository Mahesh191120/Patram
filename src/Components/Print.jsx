// import React, { Component } from 'react'
// import axios from 'axios'
// // import { data } from 'jquery'
// class PostForm extends Component {
// constructor(props) {
//     super(props)

//     this.state = {
//         key: '',
//         myVideoUrl: ''
//     }
//     console.log(this.state)
// }

// changeHandler = e => {
//     this.setState({ [e.target.name]: e.target.value })
// }

// submitHandler = e => {
//     e.preventDefault()

//     axios
//         .get(`http://127.0.0.1:8000/hvals_hash?key=${this.state.key}`)
//         .then(response => {
//             console.log(response)
//             this.setState({ myVideoUrl: response })
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }
// render() {
//     const { key } = this.state

//     return (
//         <center><div>
//             <form onSubmit={this.submitHandler}>
//                 <div>
//                     <h2> DATE PICKER</h2><br></br>
//                     <input
//                         type="date"
//                         name="key"
//                         value={key}
//                         onChange={this.changeHandler}
//                     />

//                 </div>
//                 <br></br>
//                 <button type="submit">Submit</button>
//             </form>
//         //im assuming your child component here
//             {/* <MyVideoPlayer url={this.state.myVideoUrl} /> */}
//         </div></center>
//     )
// }}
// export default PostForm



import React, { useState, useEffect } from 'react';

 

function Print() {

    const [postId, setPostId] = useState(null);

 

    useEffect(() => {

        // POST request using fetch inside useEffect React hook

        const requestOptions = {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({ title: 'React Hooks POST Request Example' })

        };

        fetch('https://reqres.in/api/posts', requestOptions)

            .then(response => response.json())

            .then(data => setPostId(data.id));

 

    // empty dependency array means this effect will only run once (like componentDidMount in classes)

    }, []);

 

    return (

        <div className="card text-center m-3">

            <h5 className="card-header">POST Request with React Hooks</h5>

            <div className="card-body">

                Returned Id: {postId}

            </div>

        </div>

    );

}

 

export { Print };


