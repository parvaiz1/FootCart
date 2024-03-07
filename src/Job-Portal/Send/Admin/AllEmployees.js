import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllEmployees.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


function AllEmployeesForadmin() {
  let navigate = useNavigate()
  
  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])
 

  const [AllEmployees, setAllEmployees] = useState([])
  // const [isApproved, setisApproved] = useState(true)
  // const [DisApproved, setisApproved] = useState(true)

  async function getEmployees() {
    await axios.get("http://localhost:8080/EmpProfile/getAllEmployees")
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setAllEmployees(sortedate)
      })
  }

  useEffect(() => {
    getEmployees()
  }, [])

   function Approve(Empid , status){
    const isApproved=status
    Swal.fire({
      title: "Are You sure to Approve this Account?",
      icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`http://localhost:8080/EmpProfile/setApproval/${Empid}`,{isApproved})
        .then((res)=>{
    getEmployees()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }


  function DisApprove(Empid , status){
    const isApproved=status

    Swal.fire({
      title: "Are You sure to DisApprove this Account?",
      icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`http://localhost:8080/EmpProfile/setApproval/${Empid}`,{isApproved})
        .then((res)=>{
    getEmployees()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }


  async function DeleteJob(id) {
    Swal.fire({
      title: 'Are you sure to Delete this Account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/EmpProfile/deleteEmployee/${id}`)
          .then((res) => {
            console.log(res)
            getEmployees()

          }).catch((err) => {
            console.log("server error occured", err)

            alert("server error occured")
          })
      }
    })

  }

  return (
    <>
      

      <h1>All Employees for admin</h1>
      <h3>There are total {AllEmployees.length} Employees</h3>

      <div className={styles.Uiwarpper}>
        <ul className={styles.ul}>
          <li className={`${styles.li} ${styles.Name}`}><b>Emp. Name</b></li>
          <li className={`${styles.li} ${styles.phoneNumber}`}><b>Emp. Phone Number</b></li>

          <li className={`${styles.li} ${styles.CompanyName}`}><b>Company Name</b></li>
          <li className={`${styles.li} ${styles.CompanyAddress}`}><b>Company Address</b></li>
          <li className={`${styles.li} ${styles.Date}`}><b>Date</b></li>
          <li className={`${styles.li} ${styles.CompanyWebsite}`}><b>Company Website </b></li>
          <li className={`${styles.li} ${styles.Approval}`} ><b>Approval</b></li>
          <li className={`${styles.li} ${styles.DeleteAction}`} ><b>Delete</b></li>
        </ul>
        {
          AllEmployees.length > 0 ?
            AllEmployees.map((items, i) => {
              return (
                <ul className={styles.ul}>
                  <li className={`${styles.li} ${styles.Name}`} title='Click to Check the Full Profile' onClick={() => window.open(`/BIAddmin@CheckEmpProfile/${items._id}`)}>
                    <Link style={{ color: "blue" }}>{items.name}</Link></li>
                  <li className={`${styles.li} ${styles.phoneNumber}`}>{items.phoneNumber}</li>

                  <li className={`${styles.li} ${styles.CompanyName}`}>{items.CompanyName}</li>
                  <li className={`${styles.li} ${styles.CompanyAddress}`}>{items.CompanyAddress}</li>
                  <li className={`${styles.li} ${styles.Date}`}>
                    {new Date(items.createdAt).toLocaleString(
                      "en-US",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </li>

                  <li className={`${styles.li} ${styles.CompanyWebsite}`}>{items.CompanyWebsite}</li>
                  <li className={`${styles.li} ${styles.Approval}`}>{items.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(items._id, false)}}>Approved&#10004;</button>
                    :<button className={styles.Approve} onClick={()=>{Approve(items._id, true)}}>Approve</button>}</li>

                  <li className={`${styles.li} ${styles.DeleteAction}`} >
                    <button className={styles.DeleteButton} onClick={() => { DeleteJob(items._id) }} >Delete</button></li>

                </ul>
              )
            })
            : <p style={{ color: "red", marginLeft: "45%" }}>No User Found</p>

        }


      </div>
    </>
  )
}


export default AllEmployeesForadmin