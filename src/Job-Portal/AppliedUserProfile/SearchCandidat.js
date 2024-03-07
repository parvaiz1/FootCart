import React from 'react'
import styles from "./AppliedUserProfile.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import useScreenSize from '../SizeHook';
// import { useSnapCarousel } from 'react-snap-carousel';
// import AutoplaySlider from 'react-awesome-slider'
// import Slider from "react-slick";

function SearchCandidate() {
    let params = useParams()
    let navigate = useNavigate()

    const [Candidate, setCandidate] = useState([])

    const [jobSeekers, setjobSeekers] = useState([])
    const [NotFound, setNotFound] = useState("")
    const screenSize = useScreenSize();




    // let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))

    async function getAllJobSeekers() {
        await axios.get("http://localhost:8080/StudentProfile/getAllJobseekers")
            .then((res) => {
                let result = (res.data)
                let sortedate = result.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setCandidate(sortedate)
            })
    }

    useEffect(() => {
        getAllJobSeekers()
    }, [])

    // const [status, setstatus] = useState({select})

    async function search(e) {
        let key = e.target.value
        await axios.get(`http://localhost:8080/StudentProfile/getJobSeeker/${key}`)
            .then((res) => {
                console.log(res.data)

                if (key) {
                    setCandidate(res.data)
                } else if (!key) {
                    setCandidate([])
                }
                if (res.data.length == 0) {
                    setNotFound("No Record found")
                }
                if (!key) {
                    getAllJobSeekers()
                }
            })
            .catch((err) => {
                alert("server issue occured", err)
            })
    }

    function CheckProfile(StudID) {
        // navigate(`/Check-Profile/${StudID}`)
        window.open(`/Check-Profile/${StudID}`, '_blank')
    }
    return (
        <>
            <button className={styles.GoBackButton} onClick={() => {
                navigate(-1)
            }}>Go Back</button>
            <>
                <h4 style={{ marginLeft: "6%", opacity: 0.6, width: "220px", marginTop:"10px",backgroundColor:"red" }}>Looking for candidates?</h4>
                <h4 style={{ marginLeft: "6%", opacity: 0.6 ,width: "55%", backgroundColor:"red"}}>Search candidate's Skills, Notice period, Education, Experience, Expected CTC and get directly touched with the Candidate</h4>
            </>
            <div className={styles.searchBoth}>
                <p className={styles.p}>Search </p>
                <input className={styles.inputboxsearch} type="text" placeholder="candidate's/skills/experience/qualification/noticeperiod" onChange={(e) => { search(e) }} />
            </div>
            {screenSize.width>850?
            <div className={styles.AllUiWrapper}>
                <ul className={styles.ul} >
                    <li className={`${styles.li} ${styles.name}`}><b>Name</b>  </li>
                    <li className={`${styles.li} ${styles.NoticePeriod}`}><b>Notice Period</b>  </li>
                    <li className={`${styles.li} ${styles.age}`}> <b>Age</b> </li>
                    <li className={`${styles.li} ${styles.Qualification}`}>  <b>Qualif</b> </li>
                    <li className={`${styles.li} ${styles.Experiance}`}><b>Experiance</b>  </li>
                    <li className={`${styles.li} ${styles.Skills}`}> <b>Skills</b> </li>
                    <li className={`${styles.li} ${styles.currentCTC}`}> <b>Current CTC</b> </li>
                    <li className={`${styles.li} ${styles.ExpectedSalary}`}><b>Expected CTC</b> </li>

                </ul>

                {
                    Candidate.length > 0 ?
                        Candidate.map((Applieduser, i) => {
                            return (
                                <>

                                    <ul className={styles.ul} key={i}>

                                        <li className={`${styles.li} ${styles.name} ${styles.onclick}`} onClick={() => { CheckProfile(Applieduser._id) }} >
                                            {Applieduser.name ? <a className={styles.namelink} title="Click to check the Contact Details">
                                                {Applieduser.name}</a> : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.NoticePeriod}`}> {Applieduser.NoticePeriod ?
                                            Applieduser.NoticePeriod : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.age}`}> {Applieduser.age ?
                                            Applieduser.age : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.Qualification}`}> {Applieduser.Qualification ?
                                            Applieduser.Qualification : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.Experiance}`}> {Applieduser.Experiance ?
                                            Applieduser.Experiance : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.Skills}`}> {Applieduser.Skills ?
                                            Applieduser.Skills : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.currentCTC}`}> {Applieduser.currentCTC ?
                                            Applieduser.currentCTC : <li className={styles.Nli}>not updated</li>} </li>
                                        <li className={`${styles.li} ${styles.ExpectedSalary}`}> {Applieduser.ExpectedSalary ?
                                            Applieduser.ExpectedSalary : <li className={styles.Nli}>not updated</li>} </li>

                                    </ul>
                                </>

                            )
                        })
                        :
                        <p style={{ marginLeft: "45%", color: "red" }}>{NotFound}</p>
                }
            </div >
            :
            <>
             <div id={styles.JobCardWrapper} >

{Candidate.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>

     
          <h4 >Name : <span style={{color:"blue", textDecoration:"underline"}} onClick={() => { CheckProfile(job._id) }} >{job.name}</span></h4>
          {/* <h4 className={styles.name}>Name :
          {job.name ? <a className={styles.namelink} title="Click to check the Contact Details">
                                        {job.name}</a> : <li className={styles.Nli}>not updated</li>}
          </h4> */}
        <h4 > Age : {job.age?<span style={{ color: "blue" }}  >{job.age} </span>:<span style={{color:"red"}}>Not updated</span> } , 
         Notice Period : {job.NoticePeriod?<span style={{ color: "blue" }}  >{job.NoticePeriod} </span>: <span style={{color:"red"}}>Not updated</span>}</h4>
        <h4 >Qualification: {job.Qualification?<span style={{ color: "blue" }}  >{job.Qualification} </span>:<span style={{color:"red"}}>Not updated</span>}, Experience: {job.Experiance?<span style={{ color: "blue" }}  >{job.Experiance} </span>:<span style={{color:"red"}}>Not updated</span>}   </h4>
        <h4 > Current CTC : <span>&#8377;</span>{job.currentCTC?<span style={{ color: "blue" }}  >{job.currentCTC} </span>:<span style={{color:"red"}}>Not updated</span>} , Expected CTC : <span>&#8377;</span>{job.ExpectedSalary?<span style={{ color: "blue" }}  >{job.ExpectedSalary} </span>:<span style={{color:"red"}}>Not updated</span>}</h4>
        {/* <h4 >Expected CTC: <span>&#8377;</span>{job.ExpectedSalary}</h4> */}
        {/* <h4> Experience: {job.Experiance}  </h4>  */}        

        <h4 className={styles.MobSkills}> Skills : {job.Skills?<span style={{ color: "blue" }}  >{job.Skills} </span>:<span style={{color:"red"}}>Not updated</span>}</h4>

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

export default SearchCandidate

