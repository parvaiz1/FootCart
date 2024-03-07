import React from 'react'
import styles from "./Allobs.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import useScreenSize from '../SizeHook';
// import useScreenSize from '../SizeHook';
// const screenSize = useScreenSize();





function Jobdetails() {

  const [jobs, setJobs] = useState([])
  const [jobdescription, setjobdescription] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
  const screenSize = useScreenSize();


  const navigate = useNavigate()
  let params = useParams();

  async function getjobs() {
    await axios.get(`http://localhost:8080/jobpost/getjobs/${params.id}`)
      .then((res) => {
        let result = (res.data)
        console.log(result)
        setjobdescription(result.jobDescription)
        setJobs(result)
      })
  }

  useEffect(() => {
    getjobs()
  }, [])
  function showless() {
    navigate(-1)
  }

  return (


    <>
      {
        screenSize.width > 850 ?

          <>
            <div className={styles.dUiwarpper}>
              <ul className={styles.Hul}>
                <li className={styles.Hli}><b>Company Name</b></li>
                <li className={styles.Hli}><b>Job Title</b></li>
                <li className={styles.Hli}><b>Location</b></li>
                <li className={styles.Hli}><b>Package </b></li>
                <li className={styles.Hli}><b>Experiance Required</b></li>
                <li className={styles.Hli}><b>Skills Required</b></li>
                <li className={styles.Hli}><b>Posted Date</b></li>
                <ul className={`${styles.DUIli}`}>
                  <li className={`${styles.Dli}`}><b>Job Description:</b></li>
                  <li className={`${styles.RDli} `}>
                     {/* {jobs.jobDescription} */}
                     {
                         jobdescription.map((descrip, di)=>{
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

                    <span className={styles.showLess} onClick={showless}>...show less</span></li>
                </ul>
              </ul>

              <ul className={styles.Rul}>
                <li className={styles.Rli}>{jobs.companyName}</li>

                <li className={styles.Rli}>{jobs.jobTitle}</li>
                <li className={styles.Rli}>{jobs.jobLocation}</li>
                <li className={styles.Rli}>{jobs.salaryRange}</li>
                <li className={styles.Rli}>{jobs.experiance}</li>
                <li className={styles.Rli}>{jobs.skills}  </li>
                <li className={styles.Rli}>
                  {new Date(jobs.updatedAt).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )}
                </li>

              </ul>

            </div>


          </>
          :
          <>
            {/* <h2>cards</h2> */}
            <div id={styles.JobCardWrapper} >


              <>
                <div className={styles.JobCard} >
                  <div style={{ display: "flex", marginTop: "5px" }}>
                    <img className={styles.logo} src={jobs.Logo} />
                    <h4 className={styles.companyName}>{jobs.companyName}</h4>
                  </div>
                  <h4 className={styles.jobLocation}> {jobs.jobLocation}</h4>
                  <h4 className={styles.jobTitle}>{jobs.jobTitle}</h4>
                  <h4 className={styles.jobtype}> {jobs.jobtype}, {new Date(jobs.createdAt).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )} </h4>
                  <h4 className={styles.salaryRange}>{jobs.qualification}, {jobs.experiance} Experience </h4>
                  <div className={styles.ApplyPackage}>
                    <h3 style={{ marginLeft: "25px" }}><span>&#8377;</span>{jobs.salaryRange} Per Annum</h3>
                  </div>
                  <h4 className={styles.jobDescription}>Job Description: 
                  {/* {jobs.jobDescription} */}
                  {
                         jobdescription.map((descrip, di)=>{
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
                    <span onClick={() => navigate(-1)} className={styles.showLess}>
                      ...show less
                    </span> </h4>


                </div>
              </>


            </div>

          </>
      }
    </>
  )
}

export default Jobdetails