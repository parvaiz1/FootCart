import React from 'react'
import styles from "./AppliedUserProfile.module.css"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import useScreenSize from '../SizeHook';


function AppliedUserProfile() {
    let params = useParams()
    let JobId = params.jid

    let navigate = useNavigate()

    const [AppliedUser, setAppliedUser] = useState([])
    const [OperationalAppliedUser, setOperationalAppliedUser] = useState([])
    const [select, setselect] = useState("select")
    const [reject, setreject] = useState("reject")
    const [Onhold, setOnhold] = useState("Onhold")
    const screenSize = useScreenSize();

    // const [status, setstatus] = useState({select})
    // let result = (res.data)

    // let sortedate = result.sort((a, b) => {
    //     return new Date(b.createdAt) - new Date(a.createdAt);
    //   });
    //   setJobs(sortedate)

    async function getAppliedUserIds(OId) {

        await axios.get(`http://localhost:8080/jobpost/getAppliedUserIds/${OId}`)
            .then(async (res) => {
                let appliedUserIds = res.data.jobSeekerId
                setOperationalAppliedUser([res.data])
                await axios.get(`http://localhost:8080/StudentProfile/getAppliedProfileByIds/${appliedUserIds}`)
                    .then((res) => {
                        let result=res.data
                        let sorteddata = result.sort( (a,b)=>{
                            return new Date(a.updatedAt)- new Date(b.updatedAt)
                            
                        })
                        setAppliedUser(sorteddata)

                    }).catch((err) => {
                        alert("server error occured")
                    })
            }).catch((err) => {
                alert("server error occured")
            })
    }

    useEffect(() => {
        getAppliedUserIds(JobId)
    }, [])

    function CheckProfile(StudID) {
        // navigate(`/payment/${StudID}`)
        window.open(`/Check-Profile/${StudID}`, '_blank')
        // navigate("/payment",{state:{id:StudID}})
    }

    async function Select(id, status) {
        let slectedJobseker = id
        console.log("job id is ", JobId)
        await axios.put(`http://localhost:8080/jobpost/status/${JobId}`, { slectedJobseker })
            .then((res) => {
                console.log(res)
                getAppliedUserIds(JobId)

            }).catch((err) => {
                alert("server error occured")
                console.log("server error occured")
            })
    }
    async function Reject(id, status) {
        let rejectedJobseker = id
        console.log("job id is ", JobId)
        await axios.put(`http://localhost:8080/jobpost/status/${JobId}`, { rejectedJobseker })
            .then((res) => {
                console.log(res)
                getAppliedUserIds(JobId)

            }).catch((err) => {
                alert("server error occured")
                console.log("server error occured")
            })
    }
    async function onHold(id, status) {
        let onHoldJobseker = id
        console.log("job id is ", JobId)
        await axios.put(`http://localhost:8080/jobpost/status/${JobId}`, { onHoldJobseker })
            .then((res) => {
                console.log(res)
                getAppliedUserIds(JobId)

            }).catch((err) => {
                alert("server error occured")
                console.log("server error occured")
            })
    }

    async function UndoSelect(id) {
        console.log(id)
        let slectedJobseker = id

        await axios.put(`http://localhost:8080/jobpost/updatforUndoJobApplied/${JobId}`, { slectedJobseker })
            .then((res) => {
                console.log(res)
                getAppliedUserIds(JobId)
            }).catch((err) => {
                console.log("server error occured", err)

                alert("server error occured")
            })

    }

    async function UndoReject(id) {
        console.log(id)
        let rejectedJobseker = id

        await axios.put(`http://localhost:8080/jobpost/updatforUndoJobApplied/${JobId}`, { rejectedJobseker })
            .then((res) => {
                console.log(res)
                getAppliedUserIds(JobId)
            }).catch((err) => {
                console.log("server error occured", err)

                alert("server error occured")
            })

    }

    async function UndoOnHold(id) {
        console.log(id)
        let onHoldJobseker = id

        await axios.put(`http://localhost:8080/jobpost/updatforUndoJobApplied/${JobId}`, { onHoldJobseker })
            .then((res) => {
                console.log(res)
                getAppliedUserIds(JobId)
            }).catch((err) => {
                console.log("server error occured", err)

                alert("server error occured")
            })

    }



    return (
        <>
        <h3>Total {AppliedUser.length} Applied users</h3>
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
                    {/* <li className={`${styles.li} ${styles.checkProfile}`}><b>View Profile</b> </li> */}
                    <li className={`${styles.li} ${styles.Status}`}><b>Status</b> </li>

                </ul>

                {
                    AppliedUser.map((Applieduser, i) => {
                        return (
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
                                {/* <li  className={`${styles.li} ${styles.checkProfile}`}><button onClick={()=>{CheckProfile(Applieduser._id)}} className={`${styles.ViewProfile}`}>{Applieduser.name}</button> </li> */}
                                <li className={`${styles.li} ${styles.Status}`}>
                                    <div style={{ marginLeft: "-3%" }}>
                                        {
                                            OperationalAppliedUser.map((operationl) => {
                                                return (
                                                    <>
                                                        {
                                                            operationl.slectedJobseker.find((jobseekerid) => {
                                                                return (
                                                                    jobseekerid == Applieduser._id
                                                                )
                                                            }) ?
                                                                <>
                                                                    <button onClick={() => { UndoSelect(Applieduser._id, "selected") }} style={{
                                                                        marginLeft: "2%", background: "rgb(24, 175, 24)", color: "white",
                                                                        border: "solid", width: "80%", height: "30px", fontWeight: "bold"
                                                                    }} title="Click to Undo Select">Selected<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                :


                                                                (operationl.rejectedJobseker.find((jobseekerid) => {
                                                                    return (
                                                                        jobseekerid == Applieduser._id
                                                                    )
                                                                })) ?
                                                                    <>
                                                                        <button onClick={() => { UndoReject(Applieduser._id, "selected") }} style={{
                                                                            marginLeft: "2%", background: "red", color: "white",
                                                                            border: "solid", width: "80%", height: "30px", fontWeight: "bold"
                                                                        }} title="Click to Undo Reject">Rejected<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                    :


                                                                    (operationl.onHoldJobseker.find((jobseekerid) => {
                                                                        return (
                                                                            jobseekerid == Applieduser._id
                                                                        )
                                                                    })) ?
                                                                        <>
                                                                            <button onClick={() => { UndoOnHold(Applieduser._id, "selected") }} style={{
                                                                                marginLeft: "2%", background: "blue", color: "white",
                                                                                border: "solid", width: "80%", height: "30px", fontWeight: "bold"
                                                                            }} title="Click to Undo On Hold">OnHold<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                        :
                                                                        <>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "70%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { Select(Applieduser._id, "selected") }}>Select</button><br></br>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "70%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { Reject(Applieduser._id, "Rejected") }}>Reject</button><br></br>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "70%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { onHold(Applieduser._id, "OhHold") }}>OnHold</button><br></br>

                                                                        </>

                                                        }
                                                    </>
                                                )
                                            })
                                        }

                    
                                    </div>
                                </li>
                            </ul>

                        )
                    })
                }
            </div>
            :
            <>
             <div id={styles.JobCardWrapper} >

{AppliedUser.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>

     
          <h4 className={styles.Mobname}>Name : <span style={{color:"blue", textDecoration:"underline"}} onClick={() => { CheckProfile(job._id) }} >{job.name}</span></h4>
          {/* <h4 className={styles.name}>Name :
          </h4> */}
        <h4 className={styles.Mobage}> Age : {job.age?job.age:<span style={{color:"red"}}>Not updated</span> } , 
         Notice Period : {job.NoticePeriod?job.NoticePeriod: <span style={{color:"red"}}>Not updated</span>}</h4>
        <h4 className={styles.MobQualification}>Qualification: {job.Qualification?job.Qualification:<span style={{color:"red"}}>Not updated</span>}, Experience: {job.Experiance?job.Experiance:<span style={{color:"red"}}>Not updated</span>}   </h4>
        <h4 > Current CTC : <span>&#8377;</span>{job.currentCTC?job.currentCTC:<span style={{color:"red"}}>Not updated</span>} , Expected CTC : <span>&#8377;</span>{job.ExpectedSalary?job.ExpectedSalary:<span style={{color:"red"}}>Not updated</span>}</h4>

        <h4 className={styles.MobSkills}> Skills : {job.Skills?job.Skills:<span style={{color:"red"}}>Not updated</span>}</h4>
        {
                                            OperationalAppliedUser.map((operationl) => {
                                                return (
                                                    <>
                                                        {
                                                            operationl.slectedJobseker.find((jobseekerid) => {
                                                                return (
                                                                    jobseekerid == job._id
                                                                )
                                                            }) ?
                                                                <>
                                                                    <button onClick={() => { UndoSelect(job._id, "selected") }} style={{
                                                                        marginLeft: "27%", background: "rgb(24, 175, 24)", color: "white",
                                                                        border: "solid", width: "31%", height: "30px", fontWeight: "bold"
                                                                    }} title="Click to Undo Select">Selected<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                :


                                                                (operationl.rejectedJobseker.find((jobseekerid) => {
                                                                    return (
                                                                        jobseekerid == job._id
                                                                    )
                                                                })) ?
                                                                    <>
                                                                        <button onClick={() => { UndoReject(job._id, "selected") }} style={{
                                                                            marginLeft: "27%", background: "red", color: "white",
                                                                            border: "solid", width: "31%", height: "30px", fontWeight: "bold"
                                                                        }} title="Click to Undo Reject">Rejected<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                    :


                                                                    (operationl.onHoldJobseker.find((jobseekerid) => {
                                                                        return (
                                                                            jobseekerid == job._id
                                                                        )
                                                                    })) ?
                                                                        <>
                                                                            <button onClick={() => { UndoOnHold(job._id, "selected") }} style={{
                                                                                marginLeft: "27%", background: "blue", color: "white",
                                                                                border: "solid", width: "31%", height: "30px", fontWeight: "bold"
                                                                            }} title="Click to Undo On Hold">OnHold<span style={{ fontSize: '16px' }} >&#10004;</span></button><br></br></>
                                                                        :
                                                                        <>
                                                                        <div style={{display:"flex", marginLeft:"5%"}}>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "23%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { Select(job._id, "selected") }}>Select</button><br></br>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "23%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { Reject(job._id, "Rejected") }}>Reject</button><br></br>
                                                                            <button style={{
                                                                                marginLeft: "2%", background: "rgb(40, 4, 99)", color: "white", border: "solid",
                                                                                width: "25%", height: "30px", fontWeight: "bold"
                                                                            }} onClick={() => { onHold(job._id, "OhHold") }}>OnHold</button><br></br>
                                                                            </div>
                                                                        </>

                                                        }
                                                    </>
                                                )
                                            })
                                        }


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

export default AppliedUserProfile