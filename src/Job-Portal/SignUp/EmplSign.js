import { useState, useEffect } from "react"
import React from 'react'

import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import GoogleImage from "../img/icons8-google-48.png"
import styles from "./signup.module.css"



function EmpSignIn() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)
  const [a, setA] = useState("")
  const [topErrorMessage, setTopErrorMessage] = useState("")

  let navigate = useNavigate()


  useEffect(() => {
    // let studentAuth = localStorage.getItem("StudLog")
    let EmployeeAuth = localStorage.getItem("EmpLog")

    if (EmployeeAuth) {
      navigate("/")
    }
  }, [])

  async function signIn() {
    console.log(name, password, confirmPassword, email)
    await axios.post("http://localhost:8080/user/Register/", { name, password, confirmPassword, email })
      .then((response) => {
        console.log(response.data)
        let result = response.data

        if (result == "password and confirm password are not matching") {
          setTopErrorMessage("!password and confirm password are not matching")

        } else if (response.data.code == 11000) {
          setTopErrorMessage("!mail already exist")
        } else if (result == "fields are missing") {
          setError(true)
        } else {

        }
      }).catch((err) => {
        alert("serer issue kindly wait")
      })

  }

  function googSignIn() {
    window.open(
      `http://localhost:8080/user/auth/google/callback`,
      "_self"
    );
  }
  return (
    <>
      <h2> Employee Signin</h2>
      <span className={styles.topsideError}>{topErrorMessage} </span>
      <div id={styles.inputWrapper}>

        <div id={styles.inputsTag}>

          <input className={styles.inputs} type="mail" placeholder='enter user name'
            value={name} onChange={(e) => { setName(e.target.value) }} />
          {error && !name ? <p className={styles.fieldMissing}>field is missing</p> : ""}

          <input className={styles.inputs} type="mail" placeholder='enter mail address'
            value={email} onChange={(e) => { setEmail(e.target.value) }} />
          {error && !email ? <p className={styles.fieldMissing}>field is missing</p> : ""}

          <input className={styles.inputs} type="name" placeholder='enter password'
            value={password} onChange={(e) => { setPassword(e.target.value) }} />
          {error && !password ? <p className={styles.fieldMissing}>field is missing</p> : ""}

          <input className={styles.inputs} type="name" placeholder='confirm password'
            value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
          {error && !password ? <p className={styles.fieldMissing}>field is missing</p> : ""}

          <button className={styles.button} onClick={signIn}>Sign In</button>
        </div>
      </div>
    </>

  )
}

export default EmpSignIn