import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import profileDp from "../img/user_3177440.png"
import { useNavigate } from 'react-router-dom'
import useScreenSize from '../SizeHook';


function StudentProfile() {

    const [profileData, setProfileData] = useState([])
const screenSize = useScreenSize();

  let navigate= useNavigate()


    let studId = JSON.parse(localStorage.getItem("StudId"))

    async function getProfile() {
        await axios.get(`http://localhost:8080/StudentProfile/getProfile/${studId}`)
            .then((res) => {
                let result = res.data.result
                console.log(result)
                setProfileData([result])
            }).catch((err) => {
                console.log("api issue")
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
                <div style={{display:"flex"}}>
        <button style={{ height:"25px", color:"grey", marginTop:"20px", marginLeft:"40px", cursor:"pointer", width:"50px"}} onClick={()=>{
            navigate(-1)}} >back</button>
        <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"40%", backgroundColor:"red"}}>My Profile</h3>
        </div>
         {

profileData.map((item, i) => {
    return (
        <div key={i}> 
        <img className={styles.imageV} src={item.image?item.image : profileDp}/>
        
        </div>
    )

})
    }
           {screenSize.width>850?
           
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                <li className={styles.li}><b>Name </b></li>
                <li className={styles.li}><b>Email Address</b></li>
                <li className={styles.li}><b>Phone Number</b></li>
                <li className={styles.li}><b>Aadhar Id</b></li>
                <li className={styles.li}><b>Pan Card Id</b></li>
                <li className={styles.li}><b>Age</b></li>
                <li className={styles.li}><b>Notice  Period</b></li>
                <li className={styles.li}><b>Expected  Salary</b></li>
                <li className={styles.li}><b>Current  CTC</b></li>
                <li className={styles.li}><b>Qualification</b></li>
                <li className={styles.li}><b>Skills</b></li>
                <li className={styles.li}><b>Experiance</b></li>
                <li className={styles.li}><b>Account status</b></li>


            </ul>

            {

                profileData.map((item, i) => {
                    return (
                        <>
                        <ul className={styles.ulR} key={i}>
                            <li className={`${styles.Hli}`}>{item.name}</li>
                            <li className={`${styles.Hli}`}>{item.email}</li>
                      {item.phoneNumber?         <li className={` ${styles.Hli}`}>{item.phoneNumber}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your phone Number yet</li>}
                         {item.Aadhar?           <li className={` ${styles.Hli}`}>{item.Aadhar}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Aadhar Id yet</li>}
                         {item.panCard?          <li className={` ${styles.Hli}`}>{item.panCard}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your pan Id yet</li>}
                         {item.age?              <li className={` ${styles.Hli}`}>{item.age}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your age yet</li>}
                         {item.NoticePeriod?     <li className={` ${styles.Hli}`}>{item.NoticePeriod}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your NoticePeriod yet</li>}
                         {item.ExpectedSalary?   <li className={` ${styles.Hli}`}>{item.ExpectedSalary}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Expected Salary yet</li>}
                         {item.currentCTC?       <li className={` ${styles.Hli}`}>{item.currentCTC}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your current CTC yet</li>}
                         {item.Qualification?    <li className={` ${styles.Hli}`}>{item.Qualification}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Qualification yet</li>}
                         {item.Skills?           <li className={` ${styles.Hli}`}>{item.Skills}</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your Skills yet</li>}
                         {item.Experiance?       <li className={` ${styles.Hli}`}>{item.Experiance}</li>:  <li className={` ${styles.Hli} ${styles.Nli}`}>you have not updated your experiance yet</li> }
                         {item.isApproved?   <li className={` ${styles.Hli}`} style={{color:"blue"}}>Congrates! Your account has been Approved</li>: <li className={` ${styles.Hli} ${styles.Nli}`}>"Your account is in under Verfication process"</li>}                        
                         {item.message?<p style={{width:"450%",  marginLeft:"-70%"}}><b> Message :</b><span style={{color:"red"}}> {item.message}! </span></p>:""}

                        </ul>
                        </>
                    )
                })

            }
            </div>
            :
            <div id={styles.JobCardWrapper} >

            {profileData.map((job, i) => {
              return (
                <>
                  <div className={styles.JobCard} key={i}>
                    <div style={{display:"flex"}}>
            
                        <div className={styles.LeftTable}>
                        <span className={styles.span}>Name :  </span> <br></br>
                        <span className={styles.span}>Age :</span><br></br>
                        <span className={styles.span}> Email Id :</span><br></br>
                        <span className={styles.span}> Phone number :</span><br></br>
                        <span className={styles.span}> Notice Period :</span><br></br>
                        <span className={styles.span}>Qualification :</span><br></br>
                        <span className={styles.span}>Experience : </span><br></br>
                        <span className={styles.span}> Current CTC :</span><br></br>
                        <span className={styles.span}>Expected CTC : </span><br></br>
                    </div>
            
                    <div className={styles.RightTable}>
                    <span className={styles.span}><span style={{color:"blue"}}  >{job.name}</span></span><br></br>      
                    <span className={styles.span}>{job.age? <span style={{ color: "blue" }}>{job.age} </span>:<span style={{color:"red"}}>Not updated</span> }</span><br></br>
                    <span className={styles.span}> {job.email?<span style={{ color: "blue" }}>{job.email} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.phoneNumber?<span style={{ color: "blue" }}>{job.phoneNumber} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.NoticePeriod?<span style={{ color: "blue" }}>{job.NoticePeriod} </span>: <span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.Qualification?<span style={{ color: "blue" }}>{job.Qualification} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
                    <span className={styles.span}> {job.Experiance?<span style={{ color: "blue" }}>{job.Experiance} </span>:<span style={{color:"red"}}>Not updated</span>}   </span><br></br>
                    <span className={styles.span}>{job.currentCTC?<span style={{ color: "blue" }}>{job.currentCTC} </span>:<span style={{color:"red"}}>Not updated</span>} </span><br></br>
                    <span className={styles.span}> {job.ExpectedSalary?<span style={{ color: "blue" }}>{job.ExpectedSalary} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>          
                    </div>
            
                  </div>

                  <div className={styles.Down}>
                  <span className={styles.span}> Skills : {job.Skills?<span style={{ color: "blue" }}>{job.Skills} </span>:<span style={{color:"red"}}>Not updated</span>}</span><br></br>
                  <span className={styles.span}> Account Status:  {job.isApproved ? <span style={{ color: "blue" }}>Congrates! Your account has been Approved, Start posting Jobs</span> : <span style={{ color: "red" }}>"Your account is in under Verfication process"</span>}</span><br></br>
                  {job.message?<span style={{}} className={styles.span}> Message :<span style={{color:"red"}}> {job.message}! </span></span>:""}
                  
                  </div>
                 
            
                  </div>
                </>
              )
            })}
            
            </div>
}           

        </>
    )
}

export default StudentProfile