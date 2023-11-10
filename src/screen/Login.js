import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Login() {
let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email:"",
    password:""
  })

const handlesubmit=async(e)=>{
    e.preventDefault();
    console.log(JSON.stringify({email:credentials.email,  password:credentials.password}))
    const response = await fetch("http://localhost:5000/api/loginuser",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email:credentials.email,
            password:credentials.password
        })
    })
    const json = await response.json();
    console.log(json);
    console.log(json.success);
    console.log("Hello");

    if(!json.success){
        alert("invalid credentials");
    }

    if(json.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.setItem("authToken",json.authToken))
     navigate('/');
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
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleInputChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" className="form-control" name='password' id="exampleInputPassword1" value={credentials.password} onChange={handleInputChange} />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
</form>
</div>
    </>
  )
}

export default Login