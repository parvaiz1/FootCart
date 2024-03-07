import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink } from "react-router-dom";
import Styles from "./nav.module.css"
import logo from "../img/Blue.jpg"
import logIn from "../img/user_3177440.png"
import NavIcon from "../img/icons8-menu-50.png"
import HomeIcon from "../img/icons8-home-30.png"
import EmpNotification from "../img/icons8-notification-33.png"
import JobseekerNotification from "../img/icons8-notification-30.png"
import useScreenSize from '../SizeHook';



import loginuser from "../img/icons8-user-96.png"
import StudentUpdateProfile from '../Profile/StudentUpdateProfile';

function Nav(props) {
  const [showprofile, setShowprofile] = useState(false)
  const navigate = useNavigate()
  const screenSize = useScreenSize();


  let StudentAuth = localStorage.getItem("StudLog")
  let EmployeeAuth = localStorage.getItem("EmpLog")
  let adminLogin = localStorage.getItem("AdMLog")

  const StudlogOut = () => {
    navigate("/")
    localStorage.clear("StudLog")
  }
  const logutEmp = () => {
    navigate("/")
    localStorage.clear("EmpLog")
  }
  const AdminlogOut = () => {
    navigate("/")
    localStorage.clear("AdMLog")
  }

  let menuRef = useRef();
  let imgRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setShowprofile(false)

    }
  })

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "red" : "",
      textDecoration: isActive ? "underline" : ""
    }
  }
  function myprofile() {
    navigate("/My-Profile")
  }
  function updateprofile() {
    navigate("/Update-Profile")
  }

  function MyJobApplied() {
    navigate("/My-Applied-Jobs")
  }

  function updateEmployeeProfile() {
    navigate("/UpdateProfile")
  }

  function EmployeeProfile() {
    navigate("/MyProfile")
  }


  return (
    <>


      {
        screenSize.width > 750 ?
          //  ............................................Jobseeker Login...............................................   
          StudentAuth ?
            <>
              <div className={Styles.fullnavewrapper}>
                <div className={Styles.logoWrapper}>
                  <NavLink > <img className={Styles.logo} src={logo} /> </NavLink>
                </div>
                <div className={Styles.linkWrapper}>

                  <NavLink to="/alljobs" className={Styles.link} style={navLinkStyles}>All Jobs </NavLink>
                  <NavLink to ="/AboutUs"  className={Styles.link}>About Us</NavLink>
                  <NavLink className={Styles.link}>Services</NavLink>
                  <NavLink className={Styles.link}>Contact</NavLink>
                  <div className={`${Styles.link} ${Styles.IconeWrapper}`}>

                    <NavLink to="/" className={` ${Styles.notificationIcon}`}><img src={JobseekerNotification} /> </NavLink>
                    <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                  </div >

                </div>
              </div>
              {/* .....................drop down............ */}
              {showprofile ?
                <div className={Styles.dropdownwrapper} ref={menuRef} >
                  <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>

                  <p className={Styles.text} ref={menuRef} onClick={updateprofile}>Update profile</p>

                  <p className={Styles.text} ref={menuRef} onClick={MyJobApplied}>Jobs Applied</p>
                  <p className={Styles.text} ref={menuRef} onClick={StudlogOut}>Logout</p>

                </div>
                : ""}
            </>

            // ..........................................Emplyee login.......................................................              
            :
            (EmployeeAuth) ?
              <>
                <div className={Styles.fullnavewrapper}>
                  <div className={Styles.logoWrapper}>
                    <NavLink to="/"> <img className={Styles.logo} src={logo} /> </NavLink>
                  </div>
                  <div className={Styles.linkWrapper}>

                    <NavLink to="/postedjobs" className={Styles.link} style={navLinkStyles}> Posted jobs</NavLink>

                    <NavLink to="/PostJobs" className={Styles.link} style={navLinkStyles}>Post a Job</NavLink>


                    <NavLink className={Styles.link}>Services</NavLink>
                    <NavLink className={Styles.link}>Contact</NavLink>
                    <div className={`${Styles.link} ${Styles.IconeWrapper}`}>

                      <NavLink to="/" className={` ${Styles.notificationIcon}`}><img src={JobseekerNotification} /> </NavLink>
                      <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                    </div >

                  </div>
                </div>
                {/* .....................drop down............ */}
                {showprofile ?
                  <div className={Styles.dropdownwrapper} ref={menuRef} >
                    <p className={Styles.text} ref={menuRef} onClick={EmployeeProfile} >My profile</p>
                    {/* <p className={Styles.text} ref={menuRef} onClick={()=>{navigate("postedjobs")}} >My Posted Jobs</p> */}
                    <p className={Styles.text} ref={menuRef} onClick={updateEmployeeProfile}>Update profile</p>

                    <p className={Styles.text} ref={menuRef} onClick={logutEmp}>Logout</p>
                  </div>
                  : ""}
              </>
              // ............Admin Login......................
              :
              (adminLogin) ?
                <>
                  <div className={Styles.fullnavewrapper}>
                    <div className={Styles.logoWrapper}>
                      <NavLink > <img className={Styles.logo} src={logo} /> </NavLink>
                    </div>
                    <div className={Styles.linkWrapper}>
                      <NavLink to="/BIAddmin@Profile" className={Styles.link} style={navLinkStyles}>All </NavLink>
                      <NavLink to="/BIAddmin@AllJobs"  className={Styles.link} style={navLinkStyles}>All Jobs </NavLink>
                      <NavLink to="BIAddmin@AllEmployees" className={Styles.link} style={navLinkStyles}> Employees</NavLink>
                      <NavLink to="BIAddmin@AllJobSeekers" className={Styles.link} style={navLinkStyles}> Jobseekers</NavLink>
                      <NavLink to="BIAddmin@AdminUpdate" className={Styles.link} style={navLinkStyles}> UpdateWebsite</NavLink>
                      <div className={`${Styles.link} ${Styles.IconeWrapper}`}>

                        <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                      </div >

                    </div>
                  </div>
                  {/* .....................drop down............ */}
                  {showprofile ?
                    <div style={{ marginLeft: "-2%" }} className={Styles.dropdownwrapper} ref={menuRef} >
                      <p className={Styles.text} ref={menuRef} >My profile</p>

                      <p className={Styles.text} ref={menuRef} >Update profile</p>

                      <p className={Styles.text} ref={menuRef} onClick={AdminlogOut}>Logout</p>

                    </div>
                    : ""}
                </>

                // ............................................Home Nave....................................................      
                :
                <>
                  <div className={Styles.fullnavewrapper}>
                    <div className={Styles.logoWrapper}>
                      <NavLink to="/"> <img className={Styles.logo} src={logo} /> </NavLink>
                    </div>
                    <div className={Styles.linkWrapper}>
                      <NavLink to="/" className={Styles.Hlink}> Home</NavLink>
                      <NavLink to ="/AboutUs" className={Styles.Hlink}>About Us</NavLink>
                      <NavLink className={Styles.Hlink}>Services</NavLink>
                      <NavLink className={Styles.Hlink}>Contact</NavLink>
                      <NavLink to="/BIAdd@Logg" className={Styles.Hlink}>AdminLogin</NavLink>
                      <div className={`${Styles.Hlink} ${Styles.Loginlinkwrapper}`}>
                        {/* <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} /> */}
                        <NavLink to="/EmployeeLogin" className={`${Styles.Loginlink} ${Styles.EmpLogin}`} style={navLinkStyles}>Employee Login </NavLink>
                        <NavLink to="/JobSeekerLogin" className={`${Styles.Loginlink} ${Styles.StuLogin}`} style={navLinkStyles}>Job Seeker Login</NavLink>

                        {/* <div className={Styles.Loginlinkwrapper}> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                  {showprofile ?
                    <div style={{ marginLeft: "-2%" }} className={Styles.dropdownwrapper} ref={menuRef} >
                      <p>Employee Login </p>
                      <p>Job Seeker Login</p>


                    </div>
                    : ""}

                </>
          :    //OR  mobile Nave


          //  ............................................Jobseeker Login...............................................   
          StudentAuth ?
            <>
              <div className={Styles.fullnavewrapper}>
                <div className={Styles.logoWrapper}>
                  <NavLink > <img className={Styles.Moblogo} src={logo} /> </NavLink>
                </div>
                <div className={Styles.linkWrapper}>

                  <NavLink to="/alljobs" className={`${Styles.Moblink} ${Styles.AllJobs}`} style={navLinkStyles}>All Jobs </NavLink>

                  <div className={`${Styles.link} ${Styles.MobileIconeWrapper}`}>

                    {/* <NavLink to="/" className={` ${Styles.MobJobseekerNotificationIcon}`}><img src={JobseekerNotification} /> </NavLink> */}
                    <img className={`${Styles.Icon} ${Styles.MobJobseekerProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                  </div >

                </div>
              </div>
              {/* .....................drop down............ */}
              {showprofile ?
                <div className={Styles.MobJobseekerDropdownwrapper} ref={menuRef} >
                  <p className={Styles.text} ref={menuRef} onClick={myprofile}>My profile</p>

                  <p className={Styles.text} ref={menuRef} onClick={updateprofile}>Update profile</p>

                  <p className={Styles.text} ref={menuRef} onClick={MyJobApplied}>Jobs Applied</p>
                  <p className={Styles.text} ref={menuRef} onClick={StudlogOut}>Logout</p>

                </div>
                : ""}
            </>

            // ..........................................Emplyee login.......................................................              
            :
            (EmployeeAuth) ?
              <>
                <div className={Styles.fullnavewrapper}>
                  <div className={Styles.logoWrapper}>
                    <NavLink to="/"> <img className={Styles.Moblogo} src={logo} /> </NavLink>
                  </div>
                  <div className={Styles.linkWrapper}>

                    <NavLink to="/postedjobs" className={`${Styles.Moblink} ${Styles.PostedJobs}`} style={navLinkStyles}> Posted jobs</NavLink>

                    <NavLink to="/PostJobs" className={`${Styles.Moblink} ${Styles.PostJob}`} style={navLinkStyles}>Post a Job</NavLink>



                    <div className={`${Styles.link} ${Styles.MobileIconeWrapper}`}>

                      {/* <NavLink to="/" className={` ${Styles.JobMobileNotificationIcon}`}><img src={JobseekerNotification} /> </NavLink> */}
                      <img className={`${Styles.Icon} ${Styles.EmpMobileProfileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                    </div >

                  </div>
                </div>
                {/* .....................drop down............ */}
                {showprofile ?
                  <div className={Styles.EmpMobDropdownwrapper} ref={menuRef} >
                    <p className={Styles.text} ref={menuRef} onClick={EmployeeProfile} >My profile</p>
                    {/* <p className={Styles.text} ref={menuRef} onClick={()=>{navigate("postedjobs")}} >My Posted Jobs</p> */}
                    <p className={Styles.text} ref={menuRef} onClick={updateEmployeeProfile}>Update profile</p>

                    <p className={Styles.text} ref={menuRef} onClick={logutEmp}>Logout</p>
                  </div>
                  : ""}
              </>
              // ............Admin Login......................
              :
              (adminLogin) ?
                <>
                  <div className={Styles.fullnavewrapper}>
                    <div className={Styles.logoWrapper}>
                      <NavLink > <img className={Styles.Moblogo} src={logo} /> </NavLink>
                    </div>
                    <div className={Styles.linkWrapper}>
                      <NavLink to="/BIAddmin@Profile" className={`${Styles.link} ${Styles.All}`} style={navLinkStyles}>All </NavLink>
                      <NavLink to="/BIAddmin@AllJobs" style={navLinkStyles} className={`${Styles.AllJobs} ${Styles.link}`}>AllJobs </NavLink>
                      <NavLink to="BIAddmin@AllEmployees" className={`${Styles.link} ${Styles.AllEmploy}`} style={navLinkStyles}> Employer</NavLink>
                      <NavLink to="BIAddmin@AllJobSeekers" className={`${Styles.link} ${Styles.AllJobseeker}`} style={navLinkStyles}> Jobseekers</NavLink>
                      <div className={`${Styles.link} ${Styles.IconeWrapper} ${Styles.AdminUser}`}>

                        <img className={`${Styles.Icon} ${Styles.profileIcon}`} src={loginuser} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />

                      </div >

                    </div>
                  </div>
                  {/* .....................drop down............ */}
                  {showprofile ?
                    <div style={{ marginLeft: "-2%" }} className={Styles.Admindropdownwrapper} ref={menuRef} >
                      <p className={Styles.text} ref={menuRef} >My profile</p>

                      <p className={Styles.text} ref={menuRef} >Update profile</p>

                      <p className={Styles.text} ref={menuRef} onClick={AdminlogOut}>Logout</p>

                    </div>
                    : ""}
                </>

                // ............................................Home Nave....................................................      
                :


                <>
                
                  <div className={Styles.fullnavewrapper}>
                                      
                    <div className={Styles.logoWrapper}>

                      <NavLink to="/" > <img className={Styles.Moblogo} src={logo} /> </NavLink>
                      
                    </div>

                    <div className={Styles.linkWrapper}>

                      <NavLink to="/" className={`${Styles.Hlink} ${Styles.HomeIcon}`}>  <img src={HomeIcon} /></NavLink>

                      {/* <img className={Styles.loginLogo} src ={logIn} /> */}
                      <img className={`${Styles.NavIcon} `} src={NavIcon} />
                      <img className={`${Styles.loginLogo} `} src={logIn} ref={imgRef} onClick={() => setShowprofile((prev) => !prev)} />
                      {showprofile ?
                        <div className={Styles.MobHomeDropdownwrapper} ref={menuRef} >
                          <p onClick={() => { navigate("/EmployeeLogin") }}>Employee Login </p>
                          <p onClick={() => { navigate("/JobSeekerLogin") }}>Job Seeker Login</p>
                        </div>
                        : ""}
                         {/* <div className={`${Styles.MovileNavOptions} `} >
                         
                         <p>Home</p>
                         <p>About Us</p>
                         <p>Services</p>                          
                         <p>Contact</p>                          
                       </div> */}
                        
                    </div>

                  </div>

                </>

      }



    </>
  )
}
export default Nav;