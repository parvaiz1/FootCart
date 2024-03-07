import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllJobsForAdmin.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook'


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
const screenSize = useScreenSize();

      
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
{screenSize.width>850?
    <div style={{marginLeft:"7px"}} className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li className={`${styles.li} ${styles.heading} ${styles.CompanyName}`}><b>Company Name</b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.Jtitle}`}><b>Job Title</b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.JobType}`}><b>JobType</b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.liDescription}`}><b>Job description</b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.Pdate}`}><b>Posted Date</b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.Location}`}><b>Location</b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.Package}`}><b>Salary /Year </b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.experiance}`}><b>Exp </b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.Qualif}`}><b>Qualif </b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.Skills}`}><b>Skills Required</b></li>
                <li className={`${styles.li} ${styles.heading} ${styles.DeleteAction}`} ><b>Action</b></li>


              </ul>
              {
     AllJobs.length > 0 ?

     AllJobs.map((items, i) => {
                  return (

                    <ul className={styles.ul}>
                       <li className={`${styles.li} ${styles.CompanyName}`}>{items.Logo ?
                        < img style={{ width: "30%", height: "40px" }} src={items.Logo} />
                        : ""}<br></br>{items.companyName}</li>
                      {/* <li className={`${styles.li} ${styles.CompanyName}`}>{items.companyName}</li> */}
                      <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle}</li>
                <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                      <li className={`${styles.li} ${styles.liDescription}`}> 
                      {/* {items.jobDescription.slice(0,60)} 
<span style={{color:"blue"}} onClick={()=>{navigate(`/Jobdetails/${items._id}`)}}>...see more</span> */}
{
                         items.jobDescription.map((descrip, di)=>{
                        return(
                          <>
                        {
                        descrip.type=="unordered-list-item"?

                        <ul style={{listStyleType:"disc"}}>
                          <li>
                        { descrip.text }

                          </li>
                        </ul>

                        : descrip.type=="ordered-list-item"? 

                        <ol >
                          <li>
                        { descrip.text }

                          </li>
                        </ol>
                        :
                        <>
                        {descrip.text}
                        <br></br>
                        </>
                        
                        }
                        </>
                        )
                      })}
                        <span onClick={() => navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                          ...read more
                        </span>
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
            :
            <>
            
            <div id={styles.JobCardWrapper} >

              {AllJobs.map((job, i) => {
                return (
                  <>
                    <div className={styles.JobCard} key={i}>
                      <div style={{ display: "flex", marginTop: "5px" }}>
                        <img className={styles.logo} src={job.Logo} />
                        <h4 className={styles.companyName}>{job.companyName}</h4>
                      </div>

                      <h4 className={styles.jobLocation}> {job.jobLocation}</h4>
                      <h4 className={styles.jobTitle}>{job.jobTitle}</h4>
                      <h4 className={styles.jobtype}> {job.jobtype}, {new Date(job.createdAt).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }
                      )} </h4>
                      <h4 className={styles.salaryRange}>{job.qualification}, {job.experiance} Experience </h4>
                      <h4 >Skills: {job.skills}</h4>
                      <div className={styles.ApplyPackage}>
                        <h3 style={{ marginLeft: "10px" }}><span>&#8377;</span>{job.salaryRange}</h3>
                        <button className={styles.ApplyMobile}><b>Apply</b></button>
                      </div>
                  <h3 className={styles.jobDescriptionHeading}>Job Description:</h3>

                      <p className={styles.jobDescription}> {job.jobDescription}
                        </p>


                    </div>
                  </>
                )
              })}

            </div>
            </>
}          
    </>
  )
}

export default AllJobsForAdmin