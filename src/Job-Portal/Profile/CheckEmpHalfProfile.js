import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import profileDp from "../img/user_3177440.png"
import Swal from "sweetalert2";
import useScreenSize from '../SizeHook';

function CheckEmpHalfProfile() {


  let navigate = useNavigate()
  const [profileData, setProfileData] = useState([])
  const screenSize = useScreenSize();


  let studId = JSON.parse(localStorage.getItem("StudId"))
  let params = useParams()

  async function getProfile() {
    await axios.get(`http://localhost:8080/EmpProfile/getProfile/${params.empId}`)
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

  function Approve(Empid, status) {
    const isApproved = status
    Swal.fire({
      title: "Are You sure to Approve this Account?",
      icon: "question",
      showCancelButton: true
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios.put(`http://localhost:8080/EmpProfile/setApproval/${Empid}`, { isApproved })
          .then((res) => {
            getProfile()

          }).catch((err) => {
            alert("backend error occured")
          })
      }
    })
  }


  function DisApprove(Empid, status) {
    const isApproved = status

    Swal.fire({
      title: "Are You sure to DisApprove this Account?",
      icon: "question",
      showCancelButton: true
    }).then(async (res) => {
      if (res.isConfirmed) {
        await axios.put(`http://localhost:8080/EmpProfile/setApproval/${Empid}`, { isApproved })
          .then((res) => {
            getProfile()

          }).catch((err) => {
            alert("backend error occured")
          })
      }
    })
  }

  async function DeleteEmpProfile(id) {
    Swal.fire({
      title: 'Are you sure to Delete this Account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/EmpProfile/deleteEmployee/${id}`)
          .then((res) => {
            console.log(res)
            navigate("/BIAddmin@AllEmployees")
          }).catch((err) => {
            console.log("server error occured", err)

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
              <img className={styles.imageV} src={item.image ? item.image : profileDp} />
            </div>
          )
        })
      }


      
{screenSize.width>850?
        <div className={styles.uiwrapper}>
          <ul className={styles.ul}>
            <li className={styles.li}><b>Name </b></li>
            <li className={styles.li}><b>Company Name</b></li>
            <li className={styles.li}><b>Company Address</b></li>
            <li className={styles.li}><b>Company Website</b></li>
            {/* <li className={styles.li}><b>Email  Address</b></li>
            <li className={styles.li}><b>Phone  Number</b></li>
            <li className={styles.li}><b>Aadhar</b></li>
            <li className={styles.li}><b>Pan  Card</b></li> 
            <li className={styles.li}><b>CompanyContact</b></li>
            <li className={styles.li}><b>Company Email</b></li>
            <li className={styles.li}><b>Company GSTIN</b></li>
            <li className={styles.li}><b>Type of Organisation</b></li>
            <li className={styles.li}><b>Ip Address</b></li>
            <li className={`${styles.li} ${styles.Approval}`}  ><b>Approval</b></li>
            <li className={`${styles.li} ${styles.Approval}`} ><b>Delete</b></li>*/}


          </ul>
          {

            profileData.map((item, i) => {
              return (
                <ul className={styles.ulR} key={i}>
                  <li className={`${styles.Hli}`}>{item.name ? item.name : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.CompanyName ? item.CompanyName : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.CompanyAddress ? item.CompanyAddress : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.CompanyWebsite ? item.CompanyWebsite : <li className={styles.Nli}>Not Updated</li>}</li>
                  {/* <li className={`${styles.Hli}`}>{item.email ? item.email : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.phoneNumber ? item.phoneNumber : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.Aadhar ? item.Aadhar : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.panCard ? item.panCard : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.CompanyContact ? item.CompanyContact : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.CompanyEmail ? item.CompanyEmail : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.CompanyGSTIN ? item.CompanyGSTIN : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.TypeofOrganisation ? item.TypeofOrganisation : <li className={styles.Nli}>Not Updated</li>}</li>
                  <li className={` ${styles.Hli}`}>{item.ipAddress ? item.ipAddress : <li className={styles.Nli}>Not Updated</li>}</li>
                
                  <li className={` ${styles.Hli} ${styles.Approval}`}>{item.isApproved ?                  
                  <button className={styles.Approved} onClick={() => { DisApprove(item._id, false) }}>Approved&#10004;</button>
                    : <button className={styles.Approve} onClick={() => { Approve(item._id, true) }}>Approve</button>}</li>
                  <li className={`${styles.Hli}`} >
                    <button className={styles.DeleteButton} onClick={() => { DeleteEmpProfile(item._id) }} >Delete</button></li> */}
                </ul>
              )
            })

          }
        </div>
        :
        <>
              <>
             <div id={styles.JobCardWrapper} >

{profileData.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>
        <div style={{display:"flex"}}>

            <div className={styles.LeftTable}>
            <h4 className={styles.Mobname}>Name  :   </h4>
            <h4> Company Name: </h4>
            <h4> Company Website: </h4>
            <h4> Company Address: </h4>
            {/* <h4>  Email Id :</h4>
            <h4>  Phone number :</h4>
            <h4>  Aadhar Id :</h4>
            <h4 className={styles.MobQualification}>Pan Card:</h4>
            <h4 > Company Contact No:</h4>
            <h4> Company Email Id: </h4>
            <h4> Company GSTIN: </h4>
            <h4> Type of Organisation: </h4> */}
        </div>

        <div className={styles.RightTable}>
        <h4  className={styles.Mobname}><span style={{color:"blue"}}  >{job.name}</span></h4>      
        <h4>  {job.CompanyName?<span style={{color:"blue"}}  >{job.CompanyName} </span>:<span style={{color:"red"}}>Not updated</span>}   </h4>
        <h4>  {job.CompanyWebsite?<span style={{color:"blue"}}  >{job.CompanyWebsite} </span>:<span style={{color:"red"}}>Not updated</span>}</h4>          
        <h4>  {job.CompanyAddress?<span style={{color:"blue"}}  >{job.CompanyAddress} </span>:<span style={{color:"red"}}>Not updated</span>}</h4>          
        {/* <h4>  {job.email? <span style={{color:"blue"}}  >{job.email} </span>: <span style={{color:"red"}}>Not updated</span>}</h4>
        <h4>  {job.phoneNumber?<span style={{color:"blue"}}  >{job.phoneNumber} </span>: <span style={{color:"red"}}>Not updated</span>}</h4>
        <h4>  {job.Aadhar?<span style={{color:"blue"}}  >{job.Aadhar} </span>: <span style={{color:"red"}}>Not updated</span>}</h4>
        <h4  className={styles.MobQualification}> {job.panCard?<span style={{color:"blue"}}  >{job.panCard} </span>:<span style={{color:"red"}}>Not updated</span>}</h4>
        <h4> {job.CompanyContact?<span style={{color:"blue"}}  >{job.CompanyContact} </span>:<span style={{color:"red"}}>Not updated</span>} </h4>
        <h4>  {job.CompanyEmail?<span style={{color:"blue"}}  >{job.CompanyEmail} </span>:<span style={{color:"red"}}>Not updated</span>}</h4>          
        <h4>  {job.CompanyGSTIN?<span style={{color:"blue"}}  >{job.CompanyGSTIN} </span>:<span style={{color:"red"}}>Not updated</span>}</h4>          
        <h4>  {job.TypeofOrganisation?<span style={{color:"blue"}}  >{job.TypeofOrganisation} </span>:<span style={{color:"red"}}>Not updated</span>}</h4>           */}
        </div>

      </div>

      {/* <h4> Account Status:  {job.isApproved?<span style={{color:"blue"}}>Congrates! Your account has been Approved, Start posting Jobs</span>:<span style={{color:"red"}}>"Your account is in under Verfication process"</span>}</h4>           */}


      </div>
    </>
  )
})}

</div>
            </>
        </>
        
        
        }       

        </>
          )
}

          export default CheckEmpHalfProfile