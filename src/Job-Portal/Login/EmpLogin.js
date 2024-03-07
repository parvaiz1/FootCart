import { useState, useEffect, createContext } from "react"
import React from 'react'
import styles from "./login.module.css"
import axios from "axios"
import GoogleImage from "../img/icons8-google-48.png"
import MicosoftImage from "../img/icons8-windows-10-48.png"

import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import image from "../img/user_3177440.png"
import jwt_decode from "jwt-decode"
import { TailSpin } from "react-loader-spinner"


// import style from "./styles.module.css"

function EmpLogin(props) {

  const [gmailuser, setGmailuser] = useState("")
  const [topErrorMessage, setTopErrorMessage] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  const [otp, setotp] = useState("")
  const [showotpBton, setshowotpBton] = useState(false)
  const [showotp, setshowotp] = useState(false)
  const [Loader, setLoader] = useState(false)

  const [ipAddress, setIPAddress] = useState('')

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIPAddress(data.ip))
      .catch(error => console.log(error))
  }, []);


  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {

        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        setGmailuser(res.data)
        let gtoken = response.access_token
        let userId = res.data.sub
        let email = res.data.email
        let name = res.data.name
        let isApproved = false
        // let image= res.data.picture

        // console.log("decoded name :", gemail)
        // console.log(" decoded id :", gname)

        await axios.post("http://localhost:8080/EmpProfile/Glogin", { userId, email, name, gtoken, ipAddress, isApproved })
          .then((response) => {
            let result = response.data
            let token = result.token
            let GuserId = result.id
            if (result.status == "success") {
              localStorage.setItem("EmpLog", JSON.stringify(token))
              localStorage.setItem("EmpIdG", JSON.stringify(GuserId))
              navigate("/postedjobs", { state: { gserid: GuserId } })
            }
          }).catch((err) => {
            alert("serer issue kindly wait")
          })

      } catch (err) {
        alert("some thing went wrong with google gmail", err)
      }
    }
  })



  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [a, setA] = useState("")
  const [topuperror, setTopuperror] = useState("")
  // const [empidinstate, setEmpidinstate] = useState("inital")

  let navigate = useNavigate()

  useEffect(() => {
    // let studentAuth = localStorage.getItem("StudLog")
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {
      navigate("/PostJobs")
    }
  }, [])

  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  }, [])

  useEffect(() => {
    let adminLogin = localStorage.getItem("AdMLog")
    if (adminLogin) {
      navigate("/BIAddmin@Profile")
    }
  }, [])

  // .................login from Registration.............
  async function Emplogin() {
    console.log("before sending to backend", email, password)
    await axios.post("http://localhost:8080/EmpProfile/login/", { email, password })
      .then((response) => {
        console.log(response.data)
        let result = response.data
        if (result.token) {
          navigate("/PostJobs")
          localStorage.setItem("EmpLog", JSON.stringify(result.token))
          let empId = result.id
          localStorage.setItem("emId", JSON.stringify(empId))


        } else if (result == "incorrect password") {
          setTopuperror("! incorrect passord")
        } else if (result == "no user found") {
          setTopuperror("! no user exist with this mail id")

        }
      }).catch((err) => {
        alert("server issue occured")
        console.log("server issue occured")
      })

  }

  // function login() {
  //   window.open(
  //     `http://localhost:8080/auth/google/callback`,
  //     "_self"

  //   );
  // }
  async function sendOtp() {
    await axios.post("http://localhost:8080/EmpProfile/otpSignUp", { PhoneNumber })
      .then((res) => {
        console.log(res.data)
        if (res.data == "otp sent") {
          setshowotp(true)
        }
      })
  }

  async function confirmOtp() {
    let isApproved = false
    setLoader(true)
    setTimeout( async () => {     

    await axios.post("http://localhost:8080/EmpProfile/verifyOtp", {ipAddress, otp , isApproved})
      .then((res) => {
        console.log(res.data)
        let result = res.data
        if(result=="incorrect Otp"){
        alert("incorrect OTP")}
        if (result.token) {
          navigate("/postedjobs")
          localStorage.setItem("EmpLog", JSON.stringify(result.token))
          let empId = result.id
          localStorage.setItem("emId", JSON.stringify(empId))
        }
        setLoader(false)

      }).catch((err)=>{
        alert("some thing went wrong")
      })
    }, 1000);
    setLoader(false)



  }
  return (
    <>
      <h3 className={styles.Loginpage}>Welcome to the Employee Login page of Blue Impulse </h3>
      {/* <p className={styles.topuperror}>{topuperror}</p> */}

        {/* <div style={{ marginTop: "10px", marginLeft: "37%" }}> */}
      <div className={styles.BothsignUpWrapper}>

          <input className={styles.inputs} type="mail" placeholder='enter phone Number'
            value={PhoneNumber} autoComplete="on" onChange={(e) => { setPhoneNumber(e.target.value) }}></input>
          {/* {error && !email ? <p >field is missing</p> : ""} */}


          {showotp ?
            <>
              <input className={styles.inputs} placeholder='enter OTP'
                value={otp} onChange={(e) => { setotp(e.target.value) }} />
              <button className={`${styles.button} ${styles.inputs}`} onClick={confirmOtp}>Confirm OTP</button>

              <p style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setshowotp(false); setPhoneNumber(""); setotp("") }}>Want to change the number?</p>


            </>
            :
            PhoneNumber.length==10?
            <button className={`${styles.button} ${styles.inputs}`} onClick={sendOtp}>Send OTP</button>
            : 
            PhoneNumber.length<10?

            <button className={`${styles.button} ${styles.inputs}`} onClick={()=>{alert("invalid phone number")}} disabled >Send OTP</button>
            :
            <button className={`${styles.button} ${styles.inputs}`} onClick={()=>{alert("invalid phone number")}}>Send OTP</button>

          }
           {Loader?
          <div style={{marginLeft:"10%"}}>
                        <TailSpin color=" rgb(40, 4, 99)" height={40} />
                        </div>
                        :""}

        {/* </div> */}



       <h4 className={styles.OR}>OR</h4>

    {/*  <div id={styles.inputWrapper}>
        <div style={{ marginLeft: "37%" }}>

          <input className={styles.inputs} type="mail" placeholder='enter employeer login credenials'
            value={email} autoComplete="on" onChange={(e) => { setEmail(e.target.value) }} />
          {error && !email ? <p >field is missing</p> : ""}


          <input className={styles.inputs} type="name" placeholder='enter password'
            value={password} onChange={(e) => { setPassword(e.target.value) }} />
          {error && !password ? <p >field is missing</p> : ""}


          <button className={`${styles.button} ${styles.inputs}`} onClick={Emplogin}>Login</button>
        </div>
      </div>
 */}



        <div className={styles.signUpWrapper} onClick={login} >
          <div className={styles.both}>
            <img className={styles.google} src={GoogleImage} />
            <span className={styles.signUpwrap} >Continue with Google</span>
          </div>
        </div>

        <div className={styles.signUpWrapper}  >
          <div className={styles.both}>
            <img className={styles.google} src={MicosoftImage} />
            <span className={styles.signUpwrap} >Continue with Microsoft</span>
          </div>
        </div>
      </div>


    </>

  )
}

export default EmpLogin