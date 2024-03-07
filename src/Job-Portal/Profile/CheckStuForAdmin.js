import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import profileDp from "../img/user_3177440.png";
import Swal from "sweetalert2";
import useScreenSize from '../SizeHook';


function CheckStudentProfileForAdmin() {
  let navigate = useNavigate()


    useEffect(()=>{
        let adminLogin= localStorage.getItem("AdMLog")
            if(!adminLogin){
                navigate("/")
            }
        },[])

    const [profileData, setProfileData] = useState([])
    const screenSize = useScreenSize();


    const [message, setmessage] = useState("")
    
    async function sendMessage(id){
      await axios.put(`http://localhost:8080/StudentProfile/sendMessage/${id}`, {message})
      .then((res)=>{
        if(res.data){
        alert("Message Sent Successfully")
        }
      }).catch((err)=>{
        alert("some thing went wrong")
      })
    }


    let studId = JSON.parse(localStorage.getItem("StudId"))
    let params =useParams()
    
    async function getProfile() {
        await axios.get(`http://localhost:8080/StudentProfile/getProfile/${params.CP}`)
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

    
    function Reject(Empid , status){
      const isReject = status
      Swal.fire({
        title: "Are You sure, to Approve this Account?",
        icon:"question",
        showCancelButton:true
      }).then( async (res)=>{
        if(res.isConfirmed){
          await axios.put(`http://localhost:8080/StudentProfile/isReject/${Empid}`,{isReject})
          .then((res)=>{
              getProfile()
 
          }).catch((err)=>{
            alert("backend error occured")
          })
        }
      })
  
    }
  
    function UnReject(Empid , status){
      const isReject = status
      Swal.fire({
        title: "Are You sure, to Approve this Account?",
        icon:"question",
        showCancelButton:true
      }).then( async (res)=>{
        if(res.isConfirmed){
          await axios.put(`http://localhost:8080/StudentProfile/isReject/${Empid}`,{isReject})
          .then((res)=>{
              getProfile()
  
          }).catch((err)=>{
            alert("backend error occured")
          })
        }
      })
    }


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
                getProfile()
   
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
                getProfile()
    
            }).catch((err)=>{
              alert("backend error occured")
            })
          }
        })
      }

      async function DeleteProfile(id){
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
          navigate("/BIAddmin@AllJobSeekers")
        }).catch((err)=>{
  
          alert("server error occured")
        })
      }
    })
      }



    return (
        <>

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
                <li className={styles.li}><b>Email  Address</b></li>
                <li className={styles.li}><b>Phone  Number</b></li>
                <li className={styles.li}><b>Aadhar</b></li>
                <li className={styles.li}><b>Pan  Card</b></li>
                <li className={styles.li}><b>Age</b></li>
                <li className={styles.li}><b>Notice  Period</b></li>
                <li className={styles.li}><b>Expected  Salary</b></li>
                <li className={styles.li}><b>Current  CTC</b></li>
                <li className={styles.li}><b>Qualification</b></li>
                <li className={styles.li}><b>Skills</b></li>
                <li className={styles.li}><b>Experiance</b></li>
                <li className={styles.li}><b>Ip address</b></li>

                <li className={`${styles.li} ${styles.Approval}`}  ><b>Approval</b></li>
                <li className={`${styles.li} ${styles.Approval}`}  ><b>Delete</b></li>
                <li className={styles.li} style={{height:"30px"}}><b>Message </b></li>
                <li className={`${styles.li} ${styles.Approval}`}  ><b>Reject</b></li>




            </ul>

            {

                profileData.map((item, i) => {
                    return (
                        <ul className={styles.ulR} key={i}>
                            <li className={`${styles.Hli}`}>{item.name?item.name:<li className={styles.Nli}>Not Updated</li>}</li>
                            <li className={`${styles.Hli}`}>{item.email?item.email:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.phoneNumber?item.phoneNumber:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Aadhar?item.Aadhar:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.panCard?item.panCard:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.age?item.age:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.NoticePeriod?item.NoticePeriod:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ExpectedSalary?item.ExpectedSalary:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.currentCTC?item.currentCTC:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Qualification?item.Qualification:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Skills?item.Skills:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Experiance?item.email:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ipAddress?item.ipAddress:<li className={styles.Nli}>Not Updated</li>}</li>
                     
                       <li className={` ${styles.Hli} ${styles.Approval}`}>{item.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(item._id, false)}}>Approved&#10004;</button>
                  :<button className={styles.Approve} onClick={()=>{Approve(item._id, true)}}>Approve</button>}</li>
                   <li className={`${styles.Hli}`} >
                    <button className={styles.DeleteButton} onClick={() => { DeleteProfile(item._id) }} >Delete</button></li>
                    <li style={{height:"30px"}} className={` ${styles.Hli}`}> <input style={{height:"24px", width:"80%", marginLeft:"11%"}}  value ={message} onChange={(e)=>{setmessage(e.target.value)}} />
                     <button onClick={()=>{sendMessage(item._id)}}>Send</button> </li>

                     
                     <li className={` ${styles.Hli} ${styles.Approval}`}>{item.isReject?
                  <button className={styles.Approved} onClick={()=>{UnReject(item._id, false)}}>Rejected&#10004;</button>
                  :<button className={styles.Approve} onClick={()=>{Reject(item._id, true)}}>Reject</button>}</li>

                  
                        </ul>
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
                        <h4 className={styles.Mobname}>Name  :   </h4>
                        <h4 className={styles.Mobage} > Age   :</h4>
                        <h4>  Email Id :</h4>
                        <h4>  Phone number :</h4>
                        <h4>  Notice Period :</h4>
                        <h4 className={styles.MobQualification}>Qualification:</h4>
                        <h4> Experience: </h4>
                        <h4 > Current CTC     :</h4>
                        <h4> Expected CTC     : </h4>
                        
                    </div>
            
                    <div className={styles.RightTable}>
                    <h4  className={styles.Mobname}><span style={{color:"blue", textDecoration:"underline"}}  >{job.name}</span></h4>      
                    <h4  className={styles.Mobage}> {job.age?job.age:<span style={{color:"red"}}>Not updated</span> }</h4>
                    <h4>  {job.email?job.email: <span style={{color:"red"}}>Not updated</span>}</h4>
                    <h4>  {job.phoneNumber?job.phoneNumber: <span style={{color:"red"}}>Not updated</span>}</h4>
                    <h4>  {job.NoticePeriod?job.NoticePeriod: <span style={{color:"red"}}>Not updated</span>}</h4>
                    <h4  className={styles.MobQualification}> {job.Qualification?job.Qualification:<span style={{color:"red"}}>Not updated</span>}</h4>
                    <h4>  {job.Experiance?job.Experiance:<span style={{color:"red"}}>Not updated</span>}   </h4>
                    <h4> {job.currentCTC?job.currentCTC:<span style={{color:"red"}}>Not updated</span>} </h4>
                    <h4>  {job.ExpectedSalary?job.ExpectedSalary:<span style={{color:"red"}}>Not updated</span>}</h4>          
                    </div>
            
                  </div>
                  <h4 className={styles.MobSkills}> Skills : {job.Skills?job.Skills:<span style={{color:"red"}}>Not updated</span>}</h4>
                  <h4>Message:  <input style={{height:"24px", width:"80%", marginLeft:"11%"}}  value ={message} onChange={(e)=>{setmessage(e.target.value)}} />
                     <button onClick={()=>{sendMessage(job._id)}}>Send</button> </h4>
                  </div>
                </>
              )
            })}
            
            </div>
            
}
        </>
    )
}

export default CheckStudentProfileForAdmin