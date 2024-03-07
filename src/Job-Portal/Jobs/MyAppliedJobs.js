import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./MyAppliedJobs.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook';


function AppledJobs() {
  let navigate = useNavigate()

    const [MyAppliedjob, setMyAppliedjob] = useState([])
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
const screenSize = useScreenSize();
  

//   async function getAppliedJob(){   
//     await axios.get(`http://localhost:8080/jobpost/getAppliedjobs/${ jobSeekerId }`)
//     .then((res)=>{
//       console.log("got user",res.data)
//       // setAppliedUser(res.data)

//     })
// }

// useEffect(()=>{
//   getAppliedJob()
// },[])

    
    async function getjobs() {
      await axios.get(`http://localhost:8080/jobpost/getMyAppliedjobs/${jobSeekerId}`)
        .then((res) => {
          let result = (res.data)
          console.log(result)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setMyAppliedjob(sortedate)
        })
    }
  
    useEffect(() => {
      getjobs()
    }, [])

    async function UndoApply(id){
      Swal.fire({
        title: 'Are you sure?',
        position: 'top',        
        // icon: 'warning',
        width: '245px',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: ' delete!',
        customClass: {
          popup: 'large-sa-popup'
        }
        // showConfirmButton:false
      }).then((result) => {
        if (result.isConfirmed) {
       axios.put(`http://localhost:8080/jobpost/updatforUndoJobApplied/${id}`,{jobSeekerId})
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
    {screenSize.width>850?
    <>
    <h3 className={styles.h3}>My applied Jobs</h3>
    <h3 className={styles.h3}>you have total {MyAppliedjob.length} applied jobs</h3>
    <div className={styles.Uiwarpper}>
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
                <li className={`${styles.li} ${styles.DeleteAction}`}><b>Action</b></li>
                <li className={`${styles.li} ${styles.Status}`}><b>Status</b></li>


              </ul>
              {
     MyAppliedjob.length > 0 ?

                MyAppliedjob.map((items, i) => {
                  return (

                    <ul className={styles.ul}>
                             <li className={styles.li}>{items.Logo ?
                  < img style={{ width: "40%", height: "40px" }} src={items.Logo} />
                  : ""}<br></br>{items.companyName}</li>
                    

                      <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle.toUpperCase()}</li>
                <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                      <li className={`${styles.li} ${styles.liDescription}`}> {items.jobDescription.slice(0,60)}
                    <span style={{color:"blue"}} onClick={()=>{navigate(`/Jobdetails/${items._id}`)}} >...see more</span>
                      

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
                      <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation.toUpperCase()}</li>
                      <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}</li>
                      <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}</li>
                <li className={`${styles.li} ${styles.Qualif}`}>{items.qualification} </li>

                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>
                     <li  className={`${styles.li} ${styles.DeleteAction}`}>
                      <button className={styles.DeleteButton} onClick={()=>{UndoApply(items._id)}}>Delete</button></li>
                      <li className={`${styles.li} ${styles.Status}`}>
                              {
                              items.onHoldJobseker.find((onholdProfile)=>{
                                return(
                                  onholdProfile ==jobSeekerId
                                )
                              })?<p style={{color:"blue"}}>HR has put Your Profile on Hold</p>
                              :
                            
                              items.slectedJobseker.find((SelectedProfile)=>{
                                return(
                                  SelectedProfile==jobSeekerId
                                )
                              })?<p style={{color:"rgb(7, 161, 7)"}}>Congrates! Your profile has been selected, HR will get in touch with You very shortly</p>
                              :                              
                                items.rejectedJobseker.find((rejectProfile)=>{
                                  return(
                                  rejectProfile==jobSeekerId
                                  )
                                })?<p style={{color:"red"}}>Sorry! Your profile has not been Matched for this job</p>:"you will get updated"
                              }
                      </li>

                          </ul>
                  )
                })
              : <p style={{marginLeft:"40%", color:"red"}}> You have not applied any jobs yet</p>


              }


            </div>
    </>
    :
    <>
    <div id={styles.JobCardWrapper} >

{MyAppliedjob.length>0?
MyAppliedjob.map((job, i) => {
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

        <div className={styles.ApplyPackage}>
          <h3 style={{ marginLeft: "10px" }}><span>&#8377;</span>{job.salaryRange}</h3>        
          <button className={styles.MobileDelete} onClick={()=>{UndoApply(job._id)}}>Delete</button>
        </div>
        <h3 className={styles.MobileResult}>Result:</h3><span >
        {
                              job.onHoldJobseker.find((onholdProfile)=>{
                                return(
                                  onholdProfile ==jobSeekerId
                                )
                              })?<p style={{color:"blue"}} className={styles.MobileStatus}>HR has put Your Profile on Hold</p>:""
                            }
                            {
                              job.slectedJobseker.find((SelectedProfile)=>{
                                return(
                                  SelectedProfile==jobSeekerId
                                )
                              })?<p style={{color:"rgb(7, 161, 7)"}} className={styles.MobileStatus}>Congrates! Your profile has been selected, HR will get in touch with You very shortly</p>:""
                              }
                              {
                                job.rejectedJobseker.find((rejectProfile)=>{
                                  return(
                                  rejectProfile==jobSeekerId
                                  )
                                })?<p style={{color:"red"}} className={styles.MobileStatus}>Sorry! Your profile has not been Matched for this job</p>:""
                              }
               
           </span>

    <h3 className={styles.jobDescriptionHeading}>Job Description:</h3>

        <p className={styles.jobDescription}> {job.jobDescription}
          </p>


      </div>
    </>
  )
})
: <p style={{marginLeft:"18%", color:"red"}}> You have not applied any jobs yet</p>

}

</div>
    </>
}
    </>
  )
}

export default AppledJobs