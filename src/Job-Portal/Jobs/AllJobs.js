import React, { useState, useEffect, useRef } from 'react';

import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner"

import useScreenSize from '../SizeHook';


function AllJobs(props) {

  const [jobs, setJobs] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
  const [jobapplied, setjobapplied] = useState(false)
  const [userProfile, setuserProfile] = useState([])
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  const [Loader, setLoader] = useState(false)
  const [clickedJobId, setclickedJobId] = useState() //for single job loader

  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
  const screenSize = useScreenSize();


  // let menuRef = useRef();
  // let imgRef = useRef();

  // window.addEventListener("click", (e) => {
  //   if (e.target !== menuRef.current) {
  //     setshowPosteddateJobs(false)
  //     console.log(menuRef.current)
  //   }
  // })



  const navigate = useNavigate()
  const Location = useLocation()
  // useEffect(() => {
  //   console.log(navigator);
  // }, []);


  async function getjobs() {
    await axios.get("http://localhost:8080/jobpost/getjobs")
      .then((res) => {
        console.log(res.data)
        let result = (res.data)
        let sortedate = result.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)

      })
  }

  useEffect(() => {
    getjobs()
  }, [])

  async function applyforJob(jobId) {
    setclickedJobId(jobId)
    setLoader(true)
    setTimeout(async () => {
      await axios.put(`http://localhost:8080/jobpost/updatforJobApply/${jobId}`, {jobSeekerId })
        .then((res) => {
          setLoader(false)
          getjobs()

        }).catch((err) => {
          alert("server issue occured", err)
        })
    }, 1000)
  }

  async function search(e) {
    let key = e.target.value
    //     const newjobs = [...jobs]
    // const filter= newjobs.filter((filtereditem)=>{
    //   return(
    //   filtereditem.jobTitle==key
    //   )
    // })
    // console.log(filter)
    // setJobs(filter)
    await axios.get(`http://localhost:8080/jobpost/searchJob/${key}`)
      .then((res) => {
        if (key) {
          setJobs(res.data)
        } else {
          getjobs()

        }
      })
  }

  function sortbyOldjobs() {
    let newjob = [...jobs]
    let oldjobSort = newjob.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    setJobs(oldjobSort)

  }
  function sortbyNewjobs() {
    let newjob = [...jobs]
    let newjobSort = newjob.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setJobs(newjobSort)

  }

  function SdescendingOrder() {
    let newJobs = [...jobs]
    // const desendSort = newJobs.sort(function (a, b) {
    //   return (
    //     b.salaryRange - a.salaryRange
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJobs.sort((a, b) => {
      return collator.compare(b.salaryRange, a.salaryRange)
    })
    setJobs(sorted)
  }

  function SascendingOrder() {
    let newJObs = [...jobs]
    // const AscendSort = newJObs.sort(function (a, b) {
    //   return (
    //     a.salaryRange - b.salaryRange
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newJObs.sort((a, b) => {
      return collator.compare(a.salaryRange, b.salaryRange)
    })
    setJobs(sorted)
  }

  function EdescendingOrder() {
    let newjob = [...jobs]
    // const descend = newjob.sort(function (a, b) {
    //   return (
    //     b.experiance - a.experiance
    //   )
    // })
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(b.experiance, a.experiance)
    })
    setJobs(sorted)

  }

  function EascendingOrder() {
    let newjob = [...jobs]
    // const Ascend = newjob.sort(function (a, b) {
    //   return (
    //     a.experiance - b.experiance
    //   )
    // })
    // setJobs(Ascend)
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    const sorted = newjob.sort((a, b) => {
      return collator.compare(a.experiance, b.experiance)
    })
    setJobs(sorted)
  }
  
// const [jobTitle, setjobTitle] = useState("")
const [jobLocation, setjobLocation] = useState("AllL")
const [jobTitle, setjobTitle] = useState("")
// const [getJobTitle, setgetJobTitle] = useState(true)

async function getjobTitleAll(all) {
  await axios.get("http://localhost:8080/jobpost/getjobs")
    .then((res) => {
      let result = (res.data)
      let sortedate = result.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setJobs(sortedate)

    })
}
async function getjobsAllLoc(all) {
  await axios.get("http://localhost:8080/jobpost/getjobs")
    .then((res) => {
      let result = (res.data)
      let sortedate = result.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setJobs(sortedate)

    })
}

async function JobtitleFilter(jobTitle){
await axios.get(`http://localhost:8080/jobpost/getjobTitle/${jobTitle}`)
.then((res)=>{
let result = (res.data)
let sortedate = result.sort(function (a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt);
});
setJobs(sortedate)
// setPageLoader(false)
}).catch((err)=>{
alert("some thing went wrong")
})
}

async function getLocation(jobLocation){
await axios.get(`http://localhost:8080/jobpost/getjobLocation/${jobLocation}`)
.then((res)=>{
let result = (res.data)
console.log(result)
let sortedate = result.sort(function (a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt);
});
setJobs(sortedate)
// setPageLoader(false)
}).catch((err)=>{
alert("some thing went wrong")
})
}

async function getBothFiltered(jobTitle){

  await axios.post(`http://localhost:8080/jobpost/getBothjobFilter/${jobLocation}`,{jobTitle})
  .then((res)=>{
    let result = (res.data)
    console.log(result)
    let sortedate = result.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setJobs(sortedate)
    // setPageLoader(false)
  }).catch((err)=>{
    alert("some thing went wrong")
  })
    }



  return (
    <>
          <div className={styles.searchBoth}>
        <p className={styles.p}>Search </p>
        <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location/Experiance' onChange={(e) => { search(e) }} />
      </div>
{
  screenSize.width>850?
  <>     
        <div className={styles.JobtitleFilterWrapper_}>

     <label> <input type = "radio" name ="location" checked={jobLocation === 'AllL'} className={styles.JobtitleFilter_} onClick={()=>{ getjobsAllLoc(); setjobLocation("AllL") }} />All</label>
     <label> <input type = "radio" name ="location" checked={jobLocation === 'banglore'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("banglore"); setjobLocation('banglore') }} />Banglore</label>
     <label> <input type = "radio" name ="location" disabled checked={jobLocation === 'chennai'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("chennai"); setjobLocation('chennai') }} />Chennai</label>
     <label> <input type = "radio" name ="location" disabled checked={jobLocation === 'hyderabad'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("hyderabad"); setjobLocation('hyderabad') }}  />Hyderabad</label>
     <label> <input type = "radio" name ="location" disabled checked={jobLocation === 'mumbai'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("mumbai"); setjobLocation('mumbai') }}  />Mumbai</label>
     <label> <input type = "radio" name ="location" disabled checked={jobLocation === 'delhi'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("delhi"); setjobLocation('delhi') }}  />Delhi</label>
     </div>
     <br></br>

      <div className={styles.JobtitleFilterWrapper_}>
      {/* <label><input type="radio" name="jobtitle"  className={styles.JobtitleFilter_} onClick={()=>{getjobTitleAll('all');setjobTitle("all")}} />All</label>             */}
      <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered ('java'): JobtitleFilter('java')} }} />Java developer</label> 
      <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered('full') : JobtitleFilter('full')} }} />Full Stack Developer</label> 
      <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered('front') : JobtitleFilter('front')} }} />Frontend Developer</label>
      <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered('back') : JobtitleFilter('back')}}}  />Backend developer</label> 
       <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered('python') : JobtitleFilter('python')} }}  />Python Developer</label> 
         </div> 
          


      <div className={styles.AllHeadingSortWrapper}>

        {/* <div className={styles.AllradioWrapper} > */}
        <p className={`${styles.FilterHeading} ${styles.JobSorting}`} onClick={() => { setshowJobs((prev) => !prev) }}  ><b>Job Posted Date <i className={`${styles.arrow} ${styles.down}`}></i></b></p>

        {showJobs ?
          <>
            <div className={`${styles.JobradioWrapper} ${styles.RadioWrapper}`}  >

              <label ><input className={styles.radio} type="radio" name="Job" onClick={sortbyOldjobs} />Show old</label><br></br>
              <label ><input className={styles.radio} type="radio" name="Job" onClick={sortbyNewjobs} />Show latest</label>

            </div>
          </>
          : ""
        }
        <p className={`${styles.FilterHeading} ${styles.ExpSorting}`} onClick={() => { setshowExperiance((prev) => !prev) }}><b>Experiance Level <i className={`${styles.arrow} ${styles.down}`}></i></b></p>

        {showExperiance ?
          <>

            <div className={`${styles.PackageradioWrapper} ${styles.RadioWrapper}`}>

              <label><input className={styles.radio} type="radio" name="Package" onClick={EdescendingOrder} />High-Low</label><br></br>
              <label><input className={styles.radio} type="radio" name="Package" onClick={EascendingOrder} />Low-High</label>
            </div>
          </>
          : ""
        }
        <p className={`${styles.FilterHeading} ${styles.PackageSorting}`} onClick={() => { setshowPackage((prev) => !prev) }}><b>Package Level <i className={`${styles.arrow} ${styles.down}`}></i></b></p>

        {showPackage ?
          <>
            <div className={`${styles.ExperianceradioWrapper} ${styles.RadioWrapper}`}>
              <label><input className={styles.radio} type="radio" name="Experiance" onClick={SdescendingOrder} />High-Low</label><br></br>
              <label><input className={styles.radio} type="radio" name="Experiance" onClick={SascendingOrder} />Low-High</label>
            </div>
          </>
          : ""
        }
        {/* </div> */}
      </div>


      <div className={styles.Uiwarpper}>
        <ul className={styles.ul}>
          <li className={`${styles.li} ${styles.CompanyName}`}><b>Company Name</b></li>
          <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
          <li className={`${styles.li} ${styles.JobType}`}><b>JobType</b></li>
          <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li>
          <li className={`${styles.li} ${styles.date}`}><b>Posted Date</b> </li>
          <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
          <li className={`${styles.li} ${styles.Package}`}><b>Package </b> </li>
          <li className={`${styles.li} ${styles.experiance}`}><b>Exp</b></li>
          <li className={`${styles.li} ${styles.qualification}`}><b>Qualif</b></li>
          <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
          <li className={`${styles.li} ${styles.Apply}`}><b>Status</b></li>

        </ul>
        {

jobs.length > 0 ?
          jobs.map((items, i) => {
            return (

              <ul className={styles.ul} key={i}>

                <li className={`${styles.li} ${styles.CompanyName}`}>{items.Logo ?
                  < img style={{ width: "40%", height: "40px" }} src={items.Logo} />
                  : ""}<br></br>{items.companyName}</li>

                <li className={`${styles.li} ${styles.Jtitle}`}>{items.jobTitle.toUpperCase()}</li>
                <li className={`${styles.li} ${styles.JobType}`}>{items.jobtype}</li>

                <li className={`${styles.li} ${styles.liDescription}`}>
                   {/* {items.jobDescription.slice(0, 100)} */}
                   {
                         items.jobDescription.map((descrip, di)=>{
                        return(
                          <>
                        {
                        descrip.type=="unordered-list-item"?

                        <ul style={{listStyleType:"disc"}}>
                          <li>
                        { descrip.text }

                          </li>
                        </ul>

                        : descrip.type=="ordered-list-item"? 

                        <ol >
                          <li>
                        { descrip.text }

                          </li>
                        </ol>
                        :
                        <>
                        {descrip.text}
                        <br></br>
                        </>
                        
                        }
                        </>
                        )
                      }).slice(0, 3)
                      }


                  <span onClick={() => navigate(`/Jobdetails/${items._id}`)} className={styles.seeMore}>
                    ...read more
                  </span>
                </li>
                <li className={`${styles.li} ${styles.date}`}>
                  {new Date(items.createdAt).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )}
                </li>
                <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation.toUpperCase()}</li>
                <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}</li>
                <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}</li>
                <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>

                <li className={`${styles.li} ${styles.Apply}`}>

                  {items.jobSeekerId.find((jobseeker) => {
                    return (
                      jobseeker == jobSeekerId
                    )
                  }) ?
                    <button className={styles.Appliedbutton} > Applied <span style={{ fontSize: '15px' }}>&#10004;</span></button>
                    :
                    <button className={styles.Applybutton} onClick={() => { applyforJob(items._id) }}>Apply
                      <span className={styles.Loader} >{Loader && items._id == clickedJobId ?
                        <TailSpin color="white" height={20} />
                        : ""}</span></button>
                  }

                </li>



              </ul>
            )
          })
          : <p style={{ color: "red", marginLeft: "45%" }}>No Record Found  </p>

        }


      </div>
      </>
      :
      <>

      <div style={{display : "flex",marginLeft:"18px"}}>
        <div className={styles.JobtitleFilterWrapper_} style={{ width:"120px"}}>

<label> <input type = "radio" name ="location" checked={jobLocation === 'AllL'} className={styles.JobtitleFilter_} onClick={()=>{ getjobsAllLoc(); setjobLocation("AllL") }} />All</label><br></br>
<label> <input type = "radio" name ="location" checked={jobLocation === 'banglore'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("banglore"); setjobLocation('banglore') }} />Banglore</label><br></br>
<label> <input type = "radio" name ="location" disabled checked={jobLocation === 'chennai'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("chennai"); setjobLocation('chennai') }} />Chennai</label><br></br>
<label> <input type = "radio" name ="location" disabled checked={jobLocation === 'hyderabad'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("hyderabad"); setjobLocation('hyderabad') }}  />Hyderabad</label><br></br>
<label> <input type = "radio" name ="location" disabled checked={jobLocation === 'mumbai'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("mumbai"); setjobLocation('mumbai') }}  />Mumbai</label><br></br>
<label> <input type = "radio" name ="location" disabled checked={jobLocation === 'delhi'} className={styles.JobtitleFilter_} onClick={()=>{ getLocation("delhi"); setjobLocation('delhi') }}  />Delhi</label>
</div>
<br></br>

 <div className={styles.JobtitleFilterWrapper_} style={{width:"200px" ,marginLeft:"1px"}}>
 {/* <label><input type="radio" name="jobtitle"  className={styles.JobtitleFilter_} onClick={()=>{getjobTitleAll('all');setjobTitle("all")}} />All</label>            <br></br> */}
 <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered ('java'): JobtitleFilter('java')} }} />Java developer</label> <br></br>
 <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered('full') : JobtitleFilter('full')} }} />Full Stack Developer</label> <br></br>
 <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered('front') : JobtitleFilter('front')} }} />Frontend Developer</label><br></br>
 <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered('back') : JobtitleFilter('back')}}}  />Backend developer</label> <br></br>
  <label><input type="radio" name="jobtitle" className={styles.JobtitleFilter_} onClick={()=>{{jobLocation!=="AllL" ?getBothFiltered('python') : JobtitleFilter('python')} }}  />Python Developer</label> 
    </div> 
    </div>

      <div id={styles.JobCardWrapper} >

{jobs.length>0?
jobs.map((job, i) => {
  return (
    <>
      <div className={styles.JobCard} key={i}>
        <div style={{ display: "flex", marginTop: "5px" }}>
          <img className={styles.logo} src={job.Logo} />
          <h4 className={styles.companyName}>{job.companyName}</h4>
        </div>

        <h4 className={styles.jobLocation}> {job.jobLocation}</h4>
        <h4 className={styles.jobTitle}>{job.jobTitle}</h4>
        <h4 className={styles.jobtype}> {job.jobtype}, {new Date(job.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </h4>
        <h4 className={styles.salaryRange}>{job.qualification}, {job.experiance} Experience </h4>

        <div className={styles.ApplyPackage}>
          <h3 style={{ marginLeft: "10px" }}><span>&#8377;</span>{job.salaryRange}</h3>

          {/* <button className={styles.ApplyMobile}><b>Apply</b></button> */}
          {job.jobSeekerId.find((jobseeker) => {
                    return (
                      jobseeker == jobSeekerId
                    )
                  }) ?
                    <button className={styles.MobileAppliedButton} > Applied <span style={{ fontSize: '13.8px', marginBottom:"3px", marginLeft:"2px" }}>&#10004;</span></button>
                    :
                    <button className={styles.ApplyMobile} onClick={() => { applyforJob(job._id) }}>Apply
                      <span className={styles.Loader} >{Loader && job._id == clickedJobId ?
                        <TailSpin color="white" height={20} />
                        : ""}</span></button>
                  }

        </div>

    <h3 className={styles.jobDescriptionHeading}>Job Description:</h3>

        <p className={styles.jobDescription}> 
        {/* {job.jobDescription} */}
        {
                         job.jobDescription.map((descrip, di)=>{
                        return(
                          <>
                        {
                        descrip.type=="unordered-list-item"?

                        <ul style={{listStyleType:"disc"}}>
                          <li>
                        { descrip.text }

                          </li>
                        </ul>

                        : descrip.type=="ordered-list-item"? 

                        <ol >
                          <li>
                        { descrip.text }

                          </li>
                        </ol>
                        :
                        <>
                        {descrip.text}
                        <br></br>
                        </>
                        
                        }
                        </>
                        )
                      })}
          </p>


      </div>
    </>
  )
})
: <p style={{ color: "red", marginLeft: "38%" }}>No Record Found  </p>

}

</div>
      </>
}

    </>

  )
}

export default AllJobs