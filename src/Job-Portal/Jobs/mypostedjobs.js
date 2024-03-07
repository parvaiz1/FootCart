import React from 'react'
import styles from "./myPostedjobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useScreenSize from '../SizeHook';

function JoppostedByEmp() {

  // let location = useLocation()
  // let empName= location.state.gserid 

  const [myjobs, setMyjobs] = useState([])

  const [isReadMore, setIsReadMore] = useState(true)
  const navigate = useNavigate()
  const screenSize = useScreenSize();




  let empId = JSON.parse(localStorage.getItem("EmpIdG"))

  async function getjobs() {
    await axios.get(`http://localhost:8080/jobpost/getPostedjobs/${empId}`)
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setMyjobs(sortedate)

      })
  }
  useEffect(() => {
    getjobs()
  }, [])
  // .................delete function............
  async function deletejob(deleteid) {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
      // if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/jobpost/deleteProduct/${deleteid}`)
          .then((res) => {
            console.log("connected with backend", res.data)
            getjobs()
          })
          .catch((err) => { console.log("failed :", err)
         })
      // }
    // })
  }
  function update(id) {
    navigate("/Updatepostedjobs", { state: { getId: id } })
  }

  // ........search ........................search...........................

  async function search(e) {
    let key = e.target.value
    if (key) {
      let dubmyjobs = [...myjobs]

      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setMyjobs(filteredItems)
    } else {
      getjobs()
    }

    // console.log(key)

    // await axios.get(`http://localhost:8080/jobpost/searchJob/${key}`)
    //   .then((res) => {
    //     if (key) {
    //       setMyjobs(res.data)
    //     } else {
    //       getjobs()

    //     }
    //   })

  }

  function seeProfilejobSeekerId(id) {
    window.open(`/Applied-User-Profile/${id}`, '_blank')
  }


  return (

    <>

{/* <h1>Your IP Address is: {ipAddress}</h1> */}


      <h3 style={{ marginLeft: "2%", color: "blue" }}> You have posted total {myjobs.length} jobs</h3>
      <div className={styles.searchBoth}>
        <p className={styles.p}>Search </p>
        <input className={styles.inputboxsearch} type="text" placeholder='search for a job you have posted' onChange={(e) => { search(e) }} />
      </div>
      {screenSize.width > 850 ?

        <>


          <div className={styles.Uiwarpper}>
            <ul className={styles.ul}>
              <li className={styles.li}><b>Company Name</b></li>
              <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
              <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li>
              <li className={`${styles.li} ${styles.Pdate}`}><b>Posted Date</b></li>
              <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
              <li className={`${styles.li} ${styles.Package}`}><b>Package </b></li>
              <li className={`${styles.li} ${styles.experiance}`}><b>Exp </b></li>
              <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
              <li className={`${styles.li} ${styles.Action}`}><b>Action</b></li>
              <li className={`${styles.li} ${styles.NuApplied}`}><b>No of JobSeeker Applied</b></li>
            </ul>
            
            {
              myjobs.length > 0 ?

                myjobs.map((items, i) => {
                  return (
                    <>
                     <ul className={styles.ul}>
                      
                      <li className={styles.li}>{items.Logo ?
                        < img style={{ width: "40%", height: "40px" }} src={items.Logo} />
                        : ""}<br></br>{items.companyName}</li>

                      <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle.toUpperCase()}</li>
                      <li className={`${styles.li} ${styles.liDescription}`}>
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
                        <span style={{ color: "blue" }} onClick={() => { navigate(`/Jobdetails/${items._id}`) }} >...see more</span>

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
                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>
                      <li className={`${styles.li} ${styles.Action}`}>
                        <div className={styles.Acbuttons}>
                          <button onClick={() => { update(items._id) }} className={`${styles.Abutton} ${styles.update}`}>update</button>
                          <button onClick={() => { deletejob(items._id) }} className={`${styles.Abutton} ${styles.delete}`}>delete</button>
                        </div>
                      </li>
                      <li className={`${styles.li} ${styles.NuApplied}`}>
                        {items.jobSeekerId.length > 0 ?
                          <button className={`${styles.viewButton}`} onClick={() => { seeProfilejobSeekerId(items._id) }}>{items.jobSeekerId.length}</button>
                          :
                          <button className={`${styles.viewButton}`} >{items.jobSeekerId.length}</button>

                        }
                      </li>

                    </ul>
                    </>
                  )
                })
                : <p style={{ marginLeft: "50%", color: "red" }}> No Jobs Found</p>

            }

          </div>

        </>
        :
        <>
          <div id={styles.JobCardWrapper} >

            {myjobs.length > 0 ?
              myjobs.map((job, i) => {
                return (
                  <>
<div className={styles.JobCard} key={i}>
        <div style={{ display: "flex", marginTop: "5px"}}>
          <img className={styles.logo} src={job.Logo} />
          <span className={styles.companyName}>{job.companyName}</span>
        </div>

        <span className={styles.jobLocation}> {job.jobLocation} </span><br></br>
        <span className={styles.jobTitle}>{job.jobTitle}</span> <br></br>

        <span className={styles.NoOfJobSeekersApplied}> No. of Job Seekers Applied:
        {job.jobSeekerId.length > 0 ?
                          <button className={`${styles.MobileviewButton}`} onClick={() => { seeProfilejobSeekerId(job._id) }}>{job.jobSeekerId.length}</button>
                          :
                          <button className={`${styles.MobileZeroViewButton}`} >{job.jobSeekerId.length}</button>

                        }
        </span><br></br>
        <span className={styles.jobtypeAndDate}> {job.jobtype}, {new Date(job.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </span><br></br>
        <span className={styles.QualificationAndExperiance}>{job.qualification}, {job.experiance} Experience </span>
        <br></br>
        <div className={styles.ApplyPackage}>
          <span className={styles.salaryRange} style={{ marginLeft: "10px" }}><span>&#8377;</span>{job.salaryRange}</span>
          <div className={styles.MobileAcbuttons}>
          <button onClick={() => { update(job._id) }} className={` ${styles.MobileUpdate}`}>update</button>
          <button onClick={() => { deletejob(job._id) }} className={` ${styles.MobileDelete}`}>delete</button>
               </div>
        </div>
    <p className={styles.jobDescriptionHeading}>Job Description:</p>

        <p className={styles.jobDescription}> {job.jobDescription}
          </p>
      </div>
    </>
  )
})
: <p style={{ marginLeft: "40%", color: "red" }}> No Jobs Found</p>
}

</div>
        </>

      }

    </>

  )
}

export default JoppostedByEmp