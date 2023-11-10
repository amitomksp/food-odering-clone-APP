
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useCart} from './contextReducer'
import Badge from 'react-bootstrap/Badge'
// import Footer from './Footer';
import Modal from '../Modal';
import Cart from '../screen/Cart';



 export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  let data = useCart();
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("authToken")
    navigate('/loginuser')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <Link className="navbar-brand fs-1 fst-italic fw-bold text-light" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" aria-current='page' to="/">Home </Link>
            </li>
            {(localStorage.getItem('authToken')) ?
              <li className="nav-item active">
                <Link className="nav-link active fs-5" aria-current='page' to="/">My Order </Link>
              </li> : ""
            }
          </ul>

          {(!localStorage.getItem('authToken')) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/loginuser">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="./createuser">Signup</Link>
            </div>
            :
            <div>
              <div className="btn bg-white text-success mx-1" onClick={()=>{setCartView(true)}}>
                My Cart{" "}
                <Badge pill bg="Danger">{data.length}</Badge>
              </div>
              {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

              <div className="btn bg-white text-danger mx-1" onClick={handlelogout}>
                LogOut
              </div>
            </div>
          }
        </div>

      </nav>

    </>
  )
}


