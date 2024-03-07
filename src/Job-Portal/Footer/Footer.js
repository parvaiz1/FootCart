import React from 'react'
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Styles from "./footer.module.css"


function Footer() {
  const navigate = useNavigate()

  return (
    <>
    <div style={{display:"flex", marginLeft:"10%"}}>

        {/* <div> */}
    <p className={Styles.FooterItem} onClick={()=>{navigate ("/AboutUs")}}>About Us</p>
    <p className={Styles.FooterItem}>Services</p>
    {/* </div> */}

    {/* <div style={{ marginLeft:"10%"}}> */}
    <p className={Styles.FooterItem}>Contact</p>
    <p className={Styles.FooterItem}>Terms & Conditions</p>
    <p className={Styles.FooterItem}>Blogs</p>
    {/* </div> */}

    </div>
    </>
  )
}

export default Footer