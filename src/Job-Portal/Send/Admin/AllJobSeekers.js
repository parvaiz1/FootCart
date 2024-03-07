import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllJobSeekers.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


function AllJobSeekersAdmin() {
  let navigate = useNavigate()

  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])

  const [jobSeekers , setjobSeekers] = useState([])


  // let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
      
  async function getAllJobSeekers() {
    await axios.get("http://localhost:8080/StudentProfile/getAllJobseekers")
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setjobSeekers(sortedate)  
      })
  }

  useEffect(() => {
    getAllJobSeekers()
  }, [])

  function Approve(Empid , status){
    const isApproved = status
    Swal.fire({
      title: "Are You sure, to Approve this Account?",
      icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`http://localhost:8080/StudentProfile/setApproval/${Empid}`,{isApproved})
        .then((res)=>{
    getAllJobSeekers()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })

  }

  function DisApprove(Empid , status){
    const isApproved = status
    Swal.fire({
      title: "Are You sure, to Approve this Account?",
      icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`http://localhost:8080/StudentProfile/setApproval/${Empid}`,{isApproved})
        .then((res)=>{
    getAllJobSeekers()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }

    async function DeleteJob(id){
      console.log(id)
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {      
       axios.delete(`http://localhost:8080/StudentProfile/deleteProfile/${id}`)
      .then((res)=>{
        console.log(res)
        getAllJobSeekers()
      }).catch((err)=>{

        alert("server error occured")
      })
    }
  })
    }

  return (
    <>
    <h1>All JobSeekers for admin</h1>
    <h3>There are total {jobSeekers.length} jobSeekers</h3>

    <div style={{marginLeft:"7px"}} className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li className={`${styles.li} ${styles.name}`}><b>Name</b></li>
                <li className={`${styles.li} ${styles.phoneNumber}`}><b>Phone Number</b></li>
                <li className={`${styles.li} ${styles.age}`}><b>Age</b></li>

                <li className={`${styles.li} ${styles.Aadhar}`}><b>Aadhar</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Registered Date</b></li>
                <li className={`${styles.li} ${styles.Qualification}`}><b>Qualif.</b></li>
                <li className={`${styles.li} ${styles.Skills}`}><b>Skills </b></li>
                <li className={`${styles.li} ${styles.Approval}`}><b>Approval </b></li>
                <li className={`${styles.li} ${styles.Action}`} ><b>Action</b></li>

              </ul>
              {
     jobSeekers.length > 0 ?

     jobSeekers.map((items, i) => {
                  return (

                    <ul className={styles.ul}>

                      <li className={`${styles.li} ${styles.name}`} onClick={()=>{window.open(`/BIAddmin@CheckStudentProfile/${items._id}`)}}><Link style={{color:"blue"}}>{items.name}</Link></li>
                <li className={`${styles.li} ${styles.phoneNumber}`}>{items.phoneNumber}</li>
                <li className={`${styles.li} ${styles.age}`}>{items.age}</li>

                      <li className={`${styles.li} ${styles.Aadhar}`}> {items.Aadhar}</li>
                      <li className={`${styles.li} ${styles.Pdate}`}>
                        {new Date(items.createdAt).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </li>
                      <li className={`${styles.li} ${styles.Qualification}`}>{items.Qualification}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.Skills}</li>
                      <li className={`${styles.li} ${styles.Approval}`}>{items.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(items._id, false)}}>Approved&#10004;</button>
                    :<button className={styles.Approve} onClick={()=>{Approve(items._id, true)}}>Approve</button>}</li>

                     <li  className={`${styles.li} ${styles.Action}`} >
                      <button className={styles.DeleteButton} onClick={()=>{DeleteJob(items._id)}} >Delete</button></li>
                     
                          </ul>
                  )
                })
            : <p style={{ color: "red", marginLeft: "45%" }}>No User Found</p>


              }


            </div>
    </>
  )
}


export default AllJobSeekersAdmin