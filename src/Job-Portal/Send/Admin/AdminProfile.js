import React from 'react'
import { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"

function AdminProfile() {

  const [jobs , setJobs] = useState([])
  const [employees , setemployees] = useState([])
  const [jobSeekers , setjobSeekers] = useState([])

    let navigate = useNavigate()

    useEffect(()=>{
    let adminLogin= localStorage.getItem("AdMLog")
        if(!adminLogin){
            navigate("/")
        }
    },[])

    async function getAlljobs() {
      await axios.get("http://localhost:8080/jobpost/getjobs")
        .then((res) => {
          let result = (res.data)
          console.log(result)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setJobs(sortedate)  
        })
    }
  
    useEffect(() => {
      getAlljobs()
    }, [])

    async function getAllEmployees() {
      await axios.get("http://localhost:8080/EmpProfile/getAllEmployees")
        .then((res) => {
          let result = (res.data)
          console.log(result)
          let sortedate = result.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setemployees(sortedate)  
        })
    }
  
    useEffect(() => {
      getAllEmployees()
    }, [])

    async function getAllJobSeekers() {
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
  
    useEffect(() => {
      getAllJobSeekers()
    }, [])


  return (
    <>

    <h2>Admin Profile</h2>
    <h3>There are total {jobs.length} Jobs</h3>
    <h3>There are total {employees.length} Employees</h3>
    <h3>There are total {jobSeekers.length} Job Seekers</h3>

    </>
  )
}

export default AdminProfile