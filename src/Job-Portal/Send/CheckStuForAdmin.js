import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import profileDp from "../img/user_3177440.png";
import Swal from "sweetalert2";


function CheckStudentProfileForAdmin() {
  let navigate = useNavigate()


    useEffect(()=>{
        let adminLogin= localStorage.getItem("AdMLog")
            if(!adminLogin){
                navigate("/")
            }
        },[])

    const [profileData, setProfileData] = useState([])

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

            {/* <button onClick={getProfile}></button> */}
           
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
                <li className={`${styles.li} ${styles.Approval}`}  ><b>Approval</b></li>
                <li className={`${styles.li} ${styles.Approval}`}  ><b>Delete</b></li>


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
                       <li className={` ${styles.Hli} ${styles.Approval}`}>{item.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(item._id, false)}}>Approved&#10004;</button>
                  :<button className={styles.Approve} onClick={()=>{Approve(item._id, true)}}>Approve</button>}</li>
                   <li className={`${styles.Hli}`} >
                    <button className={styles.DeleteButton} onClick={() => { DeleteProfile(item._id) }} >Delete</button></li>
                  
                        </ul>
                    )
                })

            }
            </div>

        </>
    )
}

export default CheckStudentProfileForAdmin