import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllJobSeekers.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook';



function AllJobSeekersAdmin() {
  let navigate = useNavigate()

  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])

  const [jobSeekers , setjobSeekers] = useState([])
const screenSize = useScreenSize();
const[notApproved, setnotApproved] = useState([])



  // let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
      
  async function getAllJobSeekers() {
    await axios.get("http://localhost:8080/StudentProfile/getAllJobseekers")
      .then((res) => {
        let result = (res.data)
        console.log(result)
  // if(Aadhar && ExpectedSalary && Experiance && NoticePeriod && Qualification && Skills && age && email && currentCTC && name && panCard && phoneNumber && !isApproved)
  //     {
  //       alert("not approved")
  //     }
  let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setjobSeekers(sortedate)  
      })
  }

  
  useEffect(() => {
    getAllJobSeekers()

  }, [])

  async function AllJoseekerApANdDis() {
    await axios.get("http://localhost:8080/StudentProfile/getAllJobseekers")

      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setjobSeekers(sortedate)
      })
  }

  async function Approvedjobseekers() {
    await axios.get("http://localhost:8080/StudentProfile/getApprovedStu")
      .then((res) => {
        let result = (res.data)

        setjobSeekers(result)
      })
      .catch((err) => {
        alert("server issue occured")
      })
  }

  
  async function NotApprovedjobseekers() {
    await axios.get("http://localhost:8080/StudentProfile/getNotApprovedStu")
      .then((res) => {
        let result = (res.data)
        // console.log(result)        
        setjobSeekers(result)
      })
      .catch((err) => {
        alert("server issue occured")
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
    getAllJobSeekers()

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
    getAllJobSeekers()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }

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
       axios.delete(`http://localhost:8080/StudentProfile/deleteProfile/${id}`)
      .then((res)=>{
        console.log(res)
        getAllJobSeekers()
      }).catch((err)=>{

        alert("server error occured")
      })
    }
  })
    }

    async function search(e) {
      let key = e.target.value
      if (key) {
        let dubmyjobs = [...jobSeekers] 
        const filteredItems = dubmyjobs.filter((user) =>
          JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
        )
        setjobSeekers(filteredItems)
      } else {
        getAllJobSeekers()
      }
    }

    const getHoursDiffBetweenDates = ((dateInitial, dateFinal) =>{
      return(
  (dateFinal - dateInitial) / (1000 * 3600)
      )
})

console.log(getHoursDiffBetweenDates(
  new Date('2021-04-24 10:25:00'),
  new Date('2021-04-25 10:25:00')
)); // 24

// let yesterDate=new Date("2023-12-08T13:34:57.439+00:00").toLocaleDateString('en-US')
let yesterDate=new Date("2017-12-13")
console.log(yesterDate)
// var Nowdate =  new Date("2023-12-08T14:34:57.439+00:00")
var NNowdate =  new Date("2017-12-13")
// let toDate = date.toTimeString()
// console.logN(NNowdate) //Tue, 26 Dec 2023 13:57:58 GMT // Tue Dec 26 2023 19:36:47 GMT+0530
  // console.log((NNowdate - yesterDate) / (1000 * 3600))
  console.log((new Date().toLocaleString() - new Date ("2023-11-15T12:45:16.243+00:00").toLocaleString())/(1000 * 3600*24))
  

// to get the number of days
//   const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
//   (dateFinal - dateInitial) / (1000 * 3600 * 24);

// getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22'))



  return (
    <>
    <h1>All JobSeekers for admin</h1>
    <h3>There are total {jobSeekers.length} jobSeekers</h3>
    {/* {notApproved} */}

 {   jobSeekers.map((items, i) => {
    return(
    items.Aadhar && items.ExpectedSalary && items.Experiance && items.NoticePeriod && items.Qualification && items.Skills
     && items.age && items.email && items.currentCTC && items.name && items.panCard && items.phoneNumber && 
     !items.isApproved 
    //  && (new Date().toLocaleString() - new Date (items.updatedAt).toLocaleString() / (1000*3600))
     ?
  
  <>            
{
    alert( items.name+ " is not approved yet")

}
<span style={{color:"blue", marginLeft:"10px"}}><b>{items.name}</b></span> <span style={{color:"red"}}> has filled all the details but not yet approved</span>
<br></br>
{/* {(new Date().toLocaleTimeString() - new Date (items.updatedAt).toLocaleTimeString())} */}
{
  
}

</>

                
                :""
    )  
}
)}


    <div className={styles.searchBoth}>
              <p className={styles.p}>Search </p>
              <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location/Experiance' onChange={(e) => { search(e) }} />
            </div>
            <div style={{marginLeft:"10px"}}>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{AllJoseekerApANdDis(e)}} /><span>All Joseeker</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{Approvedjobseekers(e)}} /><span>Approved Joseeker</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{NotApprovedjobseekers(e)}} /><span>Yet to Approve Joseeker</span></label><br></br>
      </div>

    <div style={{marginLeft:"7px"}} className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li className={`${styles.li} ${styles.name}`}><b>Name</b></li>
                <li className={`${styles.li} ${styles.phoneNumber}`}><b>Phone Number</b></li>
                <li className={`${styles.li} ${styles.age}`}><b>Age</b></li>

                <li className={`${styles.li} ${styles.Aadhar}`}><b>Aadhar</b></li>
                <li className={`${styles.li} ${styles.Pdate}`}><b>Registered Date</b></li>
                <li className={`${styles.li} ${styles.Qualification}`}><b>Qualif.</b></li>
                <li className={`${styles.li} ${styles.Skills}`}><b>Skills </b></li>
                <li className={`${styles.li} ${styles.Approval}`}><b>Approval </b></li>
                <li className={`${styles.li} ${styles.Action}`} ><b>Action</b></li>

              </ul>
              {
     jobSeekers.length > 0 ?

     jobSeekers.map((items, i) => {
                  return (
                    <>
                  
                    <ul className={styles.ul}>

                      <li className={`${styles.li} ${styles.name}`} onClick={()=>{navigate(`/BIAddmin@CheckStudentProfile/${items._id}`)}}><Link style={{color:"blue"}}>{items.name}</Link></li>
                <li className={`${styles.li} ${styles.phoneNumber}`}>{items.phoneNumber}</li>
                <li className={`${styles.li} ${styles.age}`}>{items.age}</li>

                      <li className={`${styles.li} ${styles.Aadhar}`}> {items.Aadhar}</li>
                      <li className={`${styles.li} ${styles.Pdate}`}>
                        {new Date(items.createdAt).toLocaleString
                        (
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )
                        }
                      </li>
                      <li className={`${styles.li} ${styles.Qualification}`}>{items.Qualification}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.Skills}</li>
                      <li className={`${styles.li} ${styles.Approval}`}>{items.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(items._id, false)}}>Approved&#10004;</button>
                    :<button className={styles.Approve} onClick={()=>{Approve(items._id, true)}}>Approve</button>}</li>

                     <li  className={`${styles.li} ${styles.Action}`} >
                      <button className={styles.DeleteButton} onClick={()=>{DeleteJob(items._id)}} >Delete</button></li>
                     
                          </ul>
                          </>
                  )
                })
            : <p style={{ color: "red", marginLeft: "45%" }}>No User Found</p>


              }


            </div>
    </>
  )
}


export default AllJobSeekersAdmin