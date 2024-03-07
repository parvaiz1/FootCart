import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import Companylogo from "../img/logo.png"
import Style from "./postJobs.module.css"
import { useNavigate } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



function PostJobs() {
    let navigate=useNavigate()
    let empId = JSON.parse(localStorage.getItem("EmpIdG"))

    const [jobtitle, setJobTitle] = useState("")
    const [Source, setSource] = useState("")
    const [SourceLink, setSourceLink] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobtype, setJobtype] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [joblocation, setJobLocation] = useState("")
    const [qualification, setQualification] = useState("")
    const [experiance, setExperiance] = useState("")
    const [skills, setSkills] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [others, setOthers] = useState(false)
    const [Logo, setLogo] = useState()
    const [otherLocation, setotherLocation] = useState(false)

    const [profileData, setProfileData] = useState([])

    async function getProfile() {
        await axios.get(`http://localhost:8080/EmpProfile/getProfile/${empId}`)
            .then((res) => {
                let result = res.data.result
                // console.log(result)
                setProfileData([result])
                let CName = res.data.result.CompanyName
                console.log(CName)
                setCompanyName(CName)


            }).catch((err) => {
                console.log("api issue")
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    async function getLogo() {
        await axios.get(`http://localhost:8080/EmpProfile/getLogo/${empId}`)
            .then((res) => {
                let result = res.data
                console.log( result)
                setLogo(result)
            }).catch((err) => {
                console.log("api issue")
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getLogo()
    }, [])

    

    async function postJob() {
       let jobTitle=   jobtitle.toLowerCase()
      let jobLocation= joblocation.toLowerCase()
        
        console.log(" before send to backend", Logo, jobTitle, companyName, jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills)
        await axios.post("http://localhost:8080/jobpost/jobpost/", { Logo, Source, SourceLink, empId, jobTitle, companyName, jobDescription, jobtype, salaryRange, jobLocation, qualification, experiance, skills })
            .then((res) => {
                let result = (res.data)
                console.log(result)
                if (result == "success") {
                    setJobTitle("")
                    setJobDescription("")
                    setCompanyName("")
                    setSalaryRange("")
                    setJobLocation("")
                    setExperiance("")
                    setExperiance("")
                    setSkills("")
                    setSuccessMessage("Success! job successfully posted")
                }
                else if (result == "field are missing") {
                    setSuccessMessage("Alert!... JobTitle, CompanyName JobDescription, Experiance, JobLocation and Skills must be filled")
                }
            }).catch((err) => {
                alert("server issue occured", err)
            })
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

  async function search(e) {
    let key = e.target.value
    await axios.get(`http://localhost:8080/StudentProfile/getJobSeeker/${key}`)
    .then((res)=>{
        console.log(res.data)
    })
    .catch((err) => {
        alert("server issue occured", err)
    })
  }

function handleEditor(e){
console.log(e.blocks)
setJobDescription(e.blocks)
}
    return (
        <>
            {
                profileData.map((items) => {
                    return (

                        // items.isApproved ?
                        <>
                    
      <button className={Style.searchButton} onClick={()=>{
        navigate("/Search-Candidate")}}>Search Candidate</button>

                            { Logo?<img  className = {Style.logo } src = { Logo } /> :
            <p style={{ color: "red", marginLeft: "10%", fontStyle: "italic" }}> Alert! You have not updated the Company logo, please update the company Logo</p>}
            {/* <h3 style={{ color: "blue", marginLeft: "15%" }}>Welcome to Post job Page, Post a Job and get Connected with Job Seekers</h3> */}

            <div className={Style.postJobPageWrapper} >


                <div className={Style.postJobWrapper}>
                    <p className={Style.successmessage}>{successMessage} </p>
                    {/* <p className={Style.errormessage}>{errorMessage} </p> */}

              



                    <h4 className={Style.jobHeadline}  >Job title**</h4>
                    <input className={Style.inputbox} type="text" value={jobtitle} onChange={(e) => { setJobTitle(e.target.value) }} />

                    <h4 className={Style.jobHeadline}  >Source</h4>
                    <input className={Style.inputbox} type="text" value={Source} onChange={(e) => { setSource(e.target.value) }} />

                    <h4 className={Style.jobHeadline}  >Source Link</h4>
                    <input className={Style.inputbox} type="text" value={SourceLink} onChange={(e) => { setSourceLink(e.target.value) }} />


                    <h4 className={Style.jobHeadline}>Company Name**</h4>
                    <input className={Style.inputbox} type="text" value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />


                    <h4 className={Style.jobHeadline}>Job Description**</h4>
                    {/* <input className={Style.inputbox} type="text" value={jobDescription} onChange={(e) => { setJobDescription(e.target.value) }} /> */}
                    {/* <ReactQuill theme="snow"  onChange={(e) => { handleEditor(e) }} /> */}

                 <Editor
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: "100%", marginTop:"10px",marginLeft:"0px", border: "1px solid black", borderRadius:"4px" }}
         className={Style.inputbox} 
         onChange={(e)=>{ handleEditor(e) }}
        //  onChange={(e)=>{ setJobDescription(e.blocks[0].text) }}
      /> 
                    <h4 className={Style.jobHeadline}>Job Type</h4>
                    {/* <select className={Style.inputbox} onChange={(e) => { setJobtype(e.target.value) }}>
                        <option value="" >Select Job Type</option>
                        <option value="Full Time" >Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select> */}
                    <label><input name="Job-Type" type="radio" value="Full Time " onChange={(e) => { setJobtype(e.target.value) }} />Full Time  </label>
                    <label><input name="Job-Type" type="radio" value="Part Time" onChange={(e) => { setJobtype(e.target.value) }} />Part Time  </label>
                    <label><input name="Job-Type" type="radio" value="Internship" onChange={(e) => { setJobtype(e.target.value) }} />Internship </label>
                    <label><input name="Job-Type" type="radio" value="Contract" onChange={(e) => { setJobtype(e.target.value) }} />Contract   </label>


                    <h4 className={Style.jobHeadline}>Salary Per Annum in Lakhs** &nbsp;<span className={Style.hint}>(e.g 5 or 10)</span></h4>
                    <input maxlength="3" className={Style.inputbox} type="text" value={salaryRange} onChange={(e) => { setSalaryRange(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Job Location**</h4>
                    
                   <div style={{marginTop:"-10px"}}>
                   <label><input name="Location" type="radio" value="Banglore" onChange={(e) => { setJobLocation(e.target.value) }} />Banglore </label>
                   <label><input name="Location" type="radio" value="Hyderabad" onChange={(e) => { setJobLocation(e.target.value) }} />Hyderabad </label>
                   <label><input name="Location" type="radio" value="Chennai" onChange={(e) => { setJobLocation(e.target.value) }} />Chennai </label>
                   <label><input name="Location" type="radio" value="Mumbai" onChange={(e) => { setJobLocation(e.target.value) }} />Mumbai </label>
                   <label><input name="Location" type="radio" value="Delhi" onChange={(e) => { setJobLocation(e.target.value) }} />Delhi </label>
                   <label><input name="Location" type="radio" value="others" onClick={(e) => { setotherLocation((prev)=>!prev) }} />others </label>
                   </div>
                   { otherLocation?
                    <input maxLength="10" className={Style.Otherinputbox} type="text" value={joblocation} onChange={(e) => { setJobLocation(e.target.value) }} />
                   :""

                }
                    <h4 className={Style.jobHeadline}>Qualification Needed**</h4>

                    <div style={{marginTop:"-10px"}}>
                    <label><input name="Qualification" type="radio" value="B.E/CSE" onChange={(e) => { setQualification(e.target.value) }} />B.E/CSE </label>
                    <label><input name="Qualification" type="radio" value="B.E/Civil" onChange={(e) => { setQualification(e.target.value) }} />B.E/Civil </label>
                    <label><input name="Qualification" type="radio" value="B.E/Mech" onChange={(e) => { setQualification(e.target.value) }} />B.E/Mech </label>
                    <label><input name="Qualification" type="radio" value="B.E/ECE" onChange={(e) => { setQualification(e.target.value) }} />B.E/ECE </label>
                    <label><input name="Qualification" type="radio" value="B.E/IT" onChange={(e) => { setQualification(e.target.value) }} />B.E/IT </label>
                    <label><input name="Qualification" type="radio" value="others" onClick={(e) => { setOthers((prev)=>!prev) }} />others </label>
                    </div>
                    {
                        others  ?
                            <input className={Style.Otherinputbox} type="text" value={qualification} onChange={(e) => { setQualification(e.target.value) }} />

                            : ""

                    }


                    <h4 className={Style.jobHeadline}>Experiance Needed** &nbsp;<span className={Style.hint}>(e.g 5Y or 10Y)</span></h4>
                    <input maxLength="3" className={Style.inputbox} type="text" value={experiance} onChange={(e) => { setExperiance(e.target.value) }} />

                    <h4 className={Style.jobHeadline}>Skills Needed**</h4>
                    <input className={Style.inputbox} type="text" value={skills} onChange={(e) => { setSkills(e.target.value) }} />
                    {Logo ? <p ><span style={{ color: "blue" }}>Note** :</span> Logo will also be posted with the Job</p> : ""}

                    <button className={Style.button} onClick={postJob}>Post Job</button>

                </div >
            </div >
            </>
            // :<p style={{color:"red", fontStyle:"italic", marginLeft:"20px"}}>Your account is in under verification process, Once your account gets verified, then you will be able to post a Job</p>

            )
         })
        }
        </>

    )
}

export default PostJobs