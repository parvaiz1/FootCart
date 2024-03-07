import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate , useLocation} from "react-router-dom";
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 



import Style from "./postJobs.module.css"

function UpdatePostedJobs() {

  const location = useLocation()
  let Jobid = location.state.getId

    let empId = localStorage.getItem("EmpIdG")
    
    const [jobtitle, setJobTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobtype, setJobtype] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [joblocation, setJobLocation] = useState("")
    const [qualification, setQualification] = useState("")
    const [experiance, setExperiance] = useState("")
    const [skills, setSkills] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[successMessage, setSuccessMessage] = useState("")

    async function getPostedJobs(){
       await axios.get(`http://localhost:8080/jobpost/getJobForUpdate/${Jobid}`)
       .then((res)=>{
        console.log(res.data)
        let result=res.data
        if(result){
        setJobTitle(result.jobTitle)
            setJobDescription(result.jobDescription)
            setSalaryRange(result.salaryRange)
            setJobLocation(result.jobLocation)
            setQualification(result.qualification)
            setExperiance(result.experiance)
            setSkills(result.skills)
            setJobtype(result.jobtype)
            setCompanyName(result.companyName)
        }
       }).catch((err)=>{
        alert("server issue occured")
       })
    }

    useEffect(()=>{
        getPostedJobs()
    },[])

    async function updateJob(){
        let jobTitle=   jobtitle.toLowerCase()
        let jobLocation= joblocation.toLocaleLowerCase()
    console.log(" before send to backend" ,Jobid,jobTitle, companyName, jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills)
    await axios.put(`http://localhost:8080/jobpost/updatPostedJob/${Jobid}`,{ jobTitle, companyName, jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills})
    .then((res)=>{
        let result = (res.data)
        console.log(result)
        if(result=="success"){
            setJobTitle("")
            setJobDescription("")
            setSalaryRange("")
            setJobLocation("")
            setQualification("")
            setExperiance("")
            setSkills("")
            setSuccessMessage("Success!  successfully updated")
        }
        
    }).catch((err)=>{
        alert("server issue occured", err)
    })
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}

    return (
        <>
            <h1>update posted jobs</h1>
            <div className={Style.postJobPageWrapper}>

                <div className={Style.postJobWrapper}>
                <p className={Style.successmessage}>{successMessage} </p>
                <p className={Style.errormessage}>{errorMessage} </p>
                 
                    <h4 className={Style.jobHeadline}>Job title</h4>
                    <input className={Style.inputbox} type="text" value={jobtitle} onChange={(e) => { setJobTitle(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Company Name**</h4>
                    <input className={Style.inputbox} type="text" value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Job Description</h4>
                    {/* <input className={Style.inputbox} type="text" value={jobDescription} onChange={(e) => { setJobDescription(e.target.value) }} /> */}

                    <Editor
                    // editorState={jobDescription}
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: "100%", marginTop:"10px",marginLeft:"0px", border: "1px solid black", borderRadius:"4px" }}
         className={Style.inputbox}  
         onChange={(e)=>{ setJobDescription(e.blocks)  }} 
     value={jobDescription}  />

                    <h4 className={Style.jobHeadline}>Job Type</h4>
                    <select className={Style.inputbox} onChange={(e) => { setJobtype(e.target.value) }}>
                        <option value="" >Select Job Type</option>
                        <option value="Full Time" >Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select>

                    <h4 className={Style.jobHeadline}>Salary Range</h4>
                    <input className={Style.inputbox} type="text" value={salaryRange} onChange={(e) => { setSalaryRange(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Job Location</h4>
                    <input className={Style.inputbox} type="text" value={joblocation} onChange={(e) => { setJobLocation(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Qualification Needed</h4>
                    <input className={Style.inputbox} type="text" value={qualification} onChange={(e) => { setQualification(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Experiance Needed</h4>
                    <input className={Style.inputbox} type="text" value={experiance} onChange={(e) => { setExperiance(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Skills Needed</h4>
                    <input className={Style.inputbox} type="text" value={skills} onChange={(e) => { setSkills(e.target.value) }} />
                    <button className={Style.button} onClick={updateJob}>Update</button>

                </div >
            </div >
        </>

    )
}

export default UpdatePostedJobs