import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


function Header() {

//   const navLinkStyle=({isActive})=>{
// return{
//   color:isActive?"red":"",
//   textDecoration: isActive ? "underline":""
// }
//   }

  const cartData = useSelector((state) => state.allCart.cart)
  // console.log(cartData)
  return (
    <>
      <Navbar style={{ backgroundColor: "black", color: "white", height: "60px", width:"100%", position:"sticky", top:0}}>
        <Container>
          <NavLink to="/">
          <h3 className='text-light'>E-Commerce</h3>
          </NavLink>

            <NavLink to="/cart"  style={{color:"white"}}>
          <div id="ex4">
              <span className='p1 fa-stack fa-2x has-badge' data-count={cartData.length}>
                <i class="fa-solid fa-cart-shopping"></i>
              </span>
          </div>
        </NavLink>
      </Container>
    </Navbar >
    </>
  )
}

export default Header