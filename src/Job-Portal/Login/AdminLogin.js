import React from 'react'
import styles from "./login.module.css"
import { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'

// ImpulseAdmin@321 email
// ImpulseAdmin@123 password


function Admin() {
  const [email, setEmail ] = useState("parvaiz@gmail.com")
  const [ password , setPassword ] = useState("12345")
  const [ showPassword , setshowPassword ] = useState(false)
  // 12345
  const [ Error , setError] = useState("")
  let navigate = useNavigate()
  
  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  })
  useEffect(() => {
    // let studentAuth = localStorage.getItem("StudLog")
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {

      navigate("/postedjobs")
    }
  }, [])

  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
    if(adminLogin){
      navigate("/BIAddmin@Profile")
    }
  },[])
  
  async function Adminlogin(){
    console.log(email,password)
    await axios.post("http://localhost:8080/admin/adminLogin",{email, password})
    .then((res)=>{
      let result = res.data
      console.log(result)
      if(result.status=="success"){
        localStorage.setItem("AdMLog", JSON.stringify(result.token))
        navigate("/BIAddmin@Profile")
      }else if(result=="no user found"){
        setError("No user found")
      }else if(result=="incorrect password"){
        setError("incorrect password")
      }

      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })

  }
  async function AdminRegister(){
    await axios.post("http://localhost:8080/admin/adminRegister",{email, password})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
    <h3 id={styles.Loginpage}>Admin Login Page</h3>

    <div id={styles.inputWrapper}>
        <div  style={{marginTop:"90px", marginLeft:"39%" }}>
    
              <input className={styles.inputs} type="mail" placeholder='enter email id'
            value={email} autoComplete="on" onChange={(e) => { setEmail(e.target.value) }} />
          {/* {error && !email ? <p >field is missing</p> : ""} */}



          <input className={styles.inputs} type={showPassword?"tex":"password"} placeholder='enter password'
            value={password} onChange={(e) => { setPassword(e.target.value) }} />

          <button className={`${styles.button} ${styles.inputs}`} onClick={Adminlogin}>Login</button>
         <label> <input  type="checkbox" value={showPassword} onClick={()=>{setshowPassword((prev)=>!prev)}}/><span>show password</span></label>
          {/* <button className={`${styles.button} ${styles.inputs}`} onClick={AdminRegister}>Register</button> */}
        </div>
      </div>
    </>
  )
}

export default Admin