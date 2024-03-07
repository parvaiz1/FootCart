import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./AllEmployees.module.css"
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useScreenSize from '../SizeHook';


function AllEmployeesForadmin() {
  let navigate = useNavigate()
  
  useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])
 

  const [AllEmployees, setAllEmployees] = useState([])
  const [Result, setResult] = useState(false)
const screenSize = useScreenSize();

  // const [isApproved, setisApproved] = useState(true)
  // const [DisApproved, setisApproved] = useState(true)

  async function getEmployees() {
    await axios.get("http://localhost:8080/EmpProfile/getAllEmployees")
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        setAllEmployees(sortedate)
      })
  }

  async function AllEmployeesApANdDis() {
    await axios.get("http://localhost:8080/EmpProfile/getAllEmployees")
      .then((res) => {
        let result = (res.data)
        console.log(result)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setAllEmployees(sortedate)
      })
  }

  useEffect(() => {
    getEmployees()
  }, [])

   function Approve(Empid , status){
    const isApproved=status
    Swal.fire({
      title: "Are You sure to Approve this Account?",
      icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`http://localhost:8080/EmpProfile/setApproval/${Empid}`,{isApproved})
        .then((res)=>{
    getEmployees()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }


  function DisApprove(Empid , status){
    const isApproved=status

    Swal.fire({
      title: "Are You sure to DisApprove this Account?",
      icon:"question",
      showCancelButton:true
    }).then( async (res)=>{
      if(res.isConfirmed){
        await axios.put(`http://localhost:8080/EmpProfile/setApproval/${Empid}`,{isApproved})
        .then((res)=>{
    getEmployees()

        }).catch((err)=>{
          alert("backend error occured")
        })
      }
    })
  }


  async function DeleteJob(id) {
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
            getEmployees()

          }).catch((err) => {
            console.log("server error occured", err)

            alert("server error occured")
          })
      }
    })

  }
  async function search(e) {
    let key = e.target.value
    console.log(key)
    if (key) {
      setResult(true)
      let dubmyjobs = [...AllEmployees]

      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setAllEmployees(filteredItems)
    } else {
      getEmployees()
      setResult(false)

    }
  }

  async function checkAllApproved(e){
    if(e.target.checked){
    await axios.get("http://localhost:8080/EmpProfile/getApprovedEmp")
    .then((res) => {
      let result = (res.data)
      setAllEmployees(result)  
    })
    .catch((err) => {
      alert("server issue occured")
    })
  }else{
      getEmployees()
    }  
  }
  async function checkAllNotApproved(e){
    if(e.target.checked){
    await axios.get("http://localhost:8080/EmpProfile/getNotApprovedEmp")

    .then((res) => {
      let result = (res.data)
      setAllEmployees(result)  
    })
    .catch((err) => {
      alert("server issue occured")
    })
  }else{
      getEmployees()
    }  
  }

  return (
    <>
      <div className={styles.searchBoth}>
              <p className={styles.p}>Search </p>
              <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location/Experiance' onChange={(e) => { search(e) }} />
            </div>      
{Result?
      <h4 style={{marginLeft:"14%", marginTop:"10px"}}>{AllEmployees.length} Matching Found</h4>
      :""
}
      <div style={{marginLeft:"10px"}}>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{AllEmployeesApANdDis(e)}} /><span>All Employers</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{checkAllApproved(e)}} /><span>Approved Employers</span></label><br></br>
      <label><input id="checkApproved" name="checkApproved" type="radio" onChange={(e)=>{checkAllNotApproved(e)}} /><span>Yet to Approve Employers</span></label><br></br>
      </div>
      {screenSize.width>850?

      <div className={styles.Uiwarpper}>
        <ul className={styles.ul}>
          <li className={`${styles.li} ${styles.Name}`}><b>Emp. Name</b></li>
          <li className={`${styles.li} ${styles.phoneNumber}`}><b>Emp. Phone Number</b></li>

          <li className={`${styles.li} ${styles.CompanyName}`}><b>Company Name</b></li>
          <li className={`${styles.li} ${styles.CompanyAddress}`}><b>Company Address</b></li>
          <li className={`${styles.li} ${styles.Date}`}><b>Date</b></li>
          <li className={`${styles.li} ${styles.CompanyWebsite}`}><b>Company Website </b></li>
          <li className={`${styles.li} ${styles.Approval}`} ><b>Approval</b></li>
          <li className={`${styles.li} ${styles.DeleteAction}`} ><b>Delete</b></li>
        </ul>
        {
          AllEmployees.length > 0 ?
            AllEmployees.map((items, i) => {
              return (
                <ul className={styles.ul}>
                  <li className={`${styles.li} ${styles.Name}`} title='Click to Check the Full Profile' onClick={() => navigate(`/BIAddmin@CheckEmpProfile/${items._id}`)}>
                    <Link style={{ color: "blue" }}>{items.name}</Link></li>
                  <li className={`${styles.li} ${styles.phoneNumber}`}>{items.phoneNumber}</li>

                  <li className={`${styles.li} ${styles.CompanyName}`}>{items.CompanyName}</li>
                  <li className={`${styles.li} ${styles.CompanyAddress}`}>{items.CompanyAddress}</li>
                  <li className={`${styles.li} ${styles.Date}`}>
                    {new Date(items.createdAt).toLocaleString(
                      "en-US",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </li>

                  <li className={`${styles.li} ${styles.CompanyWebsite}`}>{items.CompanyWebsite}</li>
                  <li className={`${styles.li} ${styles.Approval}`}>{items.isApproved?
                  <button className={styles.Approved} onClick={()=>{DisApprove(items._id, false)}}>Approved&#10004;</button>
                    :<button className={styles.Approve} onClick={()=>{Approve(items._id, true)}}>Approve</button>}
                    </li>

                  {/* <li className={`${styles.li} ${styles.DeleteAction}`} > */}
                    {/* <button className={styles.DeleteButton} onClick={() => { DeleteJob(items._id) }} >Delete</button></li> */}

                </ul>
              )
            })
            : <p style={{ color: "red", marginLeft: "45%" }}>No User Found</p>
        }

      </div>
      :
      <>
        <div id={styles.JobCardWrapper} >

{AllEmployees.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>

     
          <h4 className={styles.Mobname}>Name : <span style={{color:"blue", textDecoration:"underline"}} onClick={() => navigate(`/BIAddmin@CheckEmpProfile/${job._id}`)} >{job.name}</span></h4>
          {/* <h4 className={styles.name}>Name :
          </h4> */}

<h4 > Contact Number : {job.phoneNumber?<span style={{ color: "blue" }}  >{job.phoneNumber} </span>:<span style={{color:"red"}}>Not updated</span> } </h4> 
<h4>Company Name : {job.CompanyName?<span style={{ color: "blue" }}  >{job.CompanyName} </span>: <span style={{color:"red"}}>Not updated</span>}</h4>
        <h4 >Company Address: {job.CompanyAddress?<span style={{ color: "blue" }}  >{job.CompanyAddress}</span>:<span style={{color:"red"}}>Not updated</span>}</h4>
        <h4> Company Website: {job.CompanyWebsite?<span style={{ color: "blue" }}  >{job.CompanyWebsite} </span>:<span style={{color:"red"}}>Not updated</span>}   </h4>
         <h4>  Registered On: <span style={{ color: "blue" }}>{new Date(job.createdAt).toLocaleString(
                      "en-US",
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )} </span> </h4>
                    {job.isApproved?
                  <button style={{marginLeft:"30%"}} className={styles.Approved} onClick={()=>{DisApprove(job._id, false)}}>Approved&#10004;</button>
                 :<button style={{marginLeft:"30%"}} className={styles.Approve} onClick={()=>{Approve(job._id, true)}}>Approve</button>}
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


export default AllEmployeesForadmin