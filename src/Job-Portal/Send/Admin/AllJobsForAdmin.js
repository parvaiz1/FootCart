import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllJobsForAdmin.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


function AllJobsForAdmin() {
  let navigate = useNavigate()

  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])

    const [AllJobs, setAllJobs] = useState([])
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
      
    async function getjobs() {
      await axios.get("http://localhost:8080/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setAllJobs(sortedate)  
      })
    }
  
    useEffect(() => {
      getjobs()
    }, [])

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
      
       axios.delete(`http://localhost:8080/jobpost/deleteJob/${id}`)
      .then((res)=>{
        console.log(res)
      getjobs()
      }).catch((err)=>{
        console.log("server error occured",err)

        alert("server error occured")
      })
    }
  })

    }

  return (
    <>
    <h1>All jobs for admin</h1>
    <h3>There are total {AllJobs.length} Jobs</h3>

    <div style={{marginLeft:"7px"}} className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li className={`${styles.li} ${styles.CompanyName}`}><b>Company Name</b></li>
                <li  className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
                <li className={`${styles.li} ${styles.JobType}`}><b>JobType</b></li>

                <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Posted Date</b></li>

                <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
                <li className={`${styles.li} ${styles.Package}`}><b>Salary /Year </b></li>
                <li className={`${styles.li} ${styles.experiance}`}><b>Exp </b></li>
                <li className={`${styles.li} ${styles.Qualif}`}><b>Qualif </b></li>

                <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
                <li className={`${styles.li} ${styles.DeleteAction}`} ><b>Action</b></li>


              </ul>
              {
     AllJobs.length > 0 ?

     AllJobs.map((items, i) => {
                  return (

                    <ul className={styles.ul}>

                      <li className={`${styles.li} ${styles.CompanyName}`}>{items.companyName}</li>
                      <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle}</li>
                <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                      <li className={`${styles.li} ${styles.liDescription}`}> {items.jobDescription.slice(0,60)} 
<span style={{color:"blue"}} onClick={()=>{navigate(`/Jobdetails/${items._id}`)}}>...see more</span>

                      </li>
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
                      <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation}</li>
                      <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}</li>
                      <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}</li>
                <li className={`${styles.li} ${styles.Qualif}`}>{items.qualification} </li>

                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>
                     <li  className={`${styles.li} ${styles.DeleteAction}`} >
                      <button className={styles.DeleteButton} onClick={()=>{DeleteJob(items._id)}} >Delete</button></li>
                     
                          </ul>
                  )
                })
              : " No Jobs found"

              }


            </div>
    </>
  )
}

export default AllJobsForAdmin