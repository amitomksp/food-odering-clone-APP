import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Signup1() {
  let navigate = useNavigate();
    const [credentials, setcredentials] = useState({
        name:"",
        email:"",
        password:"",
        location:""
      })
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
                location:credentials.location
            })
        })
        const json = await response.json();
        // console.log(json)
        // console.log(json.success)
        // console.log("Hello");

        if(json.success){
          navigate('/loginuser');
         }
        
    }

    const handleInputChange =(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
    <>  
    <div className="container">
    <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label" >Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={handleInputChange} />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleInputChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" className="form-control" name='password' id="exampleInputPassword1" value={credentials.password} onChange={handleInputChange} />
  </div>

  <div className="mb-3">
    <label htmlFor="address" className="form-label">location</label>
    <input type="text" className="form-control" id="exampleInputPassword1" name='location'  value={credentials.location} onChange={handleInputChange}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/loginuser" className='m-3 btn btn-danger'>Already a user</Link>
</form>
</div>
    </>
  )
}

export default Signup1