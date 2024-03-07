import React, { useState, useEffect, useRef } from 'react';

import styles from "./Allobs.module.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useScreenSize from '../SizeHook';

import { Bars, Puff } from 'react-loader-spinner'
import locaion from "../img/icons8-location-20.png"


function Home() {

  const [jobs, setJobs] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
  const [showJobs, setshowJobs] = useState(false)
  const [showExperiance, setshowExperiance] = useState(false)
  const [showPackage, setshowPackage] = useState(false)
  const [PageLoader, setPageLoader] = useState(false)
  const [NouserFound, setNouserFound] = useState("")
  const screenSize = useScreenSize();

  let navigate = useNavigate()

  useEffect(() => {
    // let studentAuth = localStorage.getItem("StudLog")
    let EmployeeAuth = localStorage.getItem("EmpLog")
    if (EmployeeAuth) {
      navigate("/postedjobs")
    }
  }, [])

  useEffect(() => {
    let studentAuth = localStorage.getItem("StudLog")
    if (studentAuth) {
      navigate("/alljobs")
    }
  }, [])
  useEffect(() => {
    let adminLogin = localStorage.getItem("AdMLog")
    if (adminLogin) {
      navigate("/BIAddmin@Profile")
    }
  }, [])



  // let menuRef = useRef();
  // let imgRef = useRef();

  // window.addEventListener("click", (e) => {
  //   if (e.target !== menuRef.current && e.target !== imgRef.current) {
  //     setshowJobs(false)
  //   }
  // })
  async function getjobs() {
    setPageLoader(true)
    await axios.get("http://localhost:8080/jobpost/getjobs")
      .then((res) => {
        let result = (res.data)
        let sortedate = result.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setJobs(sortedate)
        setPageLoader(false)
      })
  }

  useEffect(() => {
    getjobs()
  }, [])
  const [isActive, setIsActive] = useState(false);

  async function JobtitleFilter(jobTitle, e){
    console.log(e.currentTarget.id);
    setIsActive((prev)=>!prev)
    // setPageLoader(true)

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

  async function applyforJob(id) {
    navigate("/JobSeekerLogin", { state: { Jid: id } })
  }

  // ...................search..........

  // async function search(e) {
  //   let key = e.target.value
  //   await axios.get(`http://localhost:8080/jobpost/searchJob/${key}`)
  //     .then((res) => {
  //       if (key) {
  //         setJobs(res.data)
  //       } else {
  //         getjobs()
  //       }
  //     })
  // }

  async function search(e) {
    let key = e.target.value
    if (key) {
      let dubmyjobs = [...jobs]

      const filteredItems = dubmyjobs.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(key.toLowerCase())
      )
      setJobs(filteredItems)
    } else {
      getjobs()
    }
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
    console.log("sorted are the ", sorted);
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
    console.log("sorted are the ", sorted);
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
    console.log("sorted are the ", sorted);
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
    console.log("sorted are the ", sorted);
    setJobs(sorted)
  }

  // ....... Crads.. Api...
  const [products, setProducts] = useState([])
  const [filterdata, setFilterdata] = useState([])

  useEffect(() => {
    async function getData() {
      let result = await axios.get("https://dummyjson.com/products")
      try {
        console.log(result)
        setProducts(result.data.products)
        setFilterdata(result.data.products)
      } catch (err) {
        console.log("isss", err)
      }
    }
    getData()
  }, [])

  function checkEmProfile(empId){
    navigate(`/CheckEmProfile/${empId}`)
  }


  const [from, setfrom] = useState(0)
  const [to, setto] = useState(10)

  function changefrom(e){
console.log(e.target.value-1)
setfrom(e.target.value-1)
  }
  function changeTo(e){
    console.log(e.target.value)
    setto(e.target.value)
      }

  return (
    <>
    {/* <input value ={from} style={{width:"50px"}} onChange={(e)=>{changefrom(e)}} />
    <input value ={to} style={{width:"50px"}} onChange={(e)=>{changeTo(e)}} /> 
    */}

{/* 
      <div>
        <p > Width: {screenSize.width}</p>
        <p>Height: {screenSize.height}</p>
      </div> */}

      <h3 style={{ color: " rgb(55, 16, 92)", marginLeft: "2%" }}>Welcome to the Home Page of Blue Impulse</h3>
      <h3 style={{ color: " rgb(55, 16, 92)", marginLeft: "2%" }}>Sign In to Explore more</h3>

      <div className={styles.JobtitleFilterWrapper}>
              <button id="1" className={ isActive? styles.ActiveClass : styles.JobtitleFilter} onClick={()=>{getjobs()}} >All</button>
              <button id="2" className={ isActive? styles.ActiveClass :  styles.JobtitleFilter} onClick={(e)=>{JobtitleFilter('java', e) }} >Java developer</button>
              <button id="3" className={ isActive? styles.ActiveClass :  styles.JobtitleFilter} onClick={(e)=>{JobtitleFilter('full', e) }} >Full Stack Developer</button>
              <button id="4" className={ isActive? styles.ActiveClass :  styles.JobtitleFilter} onClick={(e)=>{JobtitleFilter('front', e) }}  >Frontend Developer</button>
              <button id="5" className={ isActive? styles.ActiveClass :  styles.JobtitleFilter} onClick={(e)=>{JobtitleFilter('back', e) }}  >Backend developer</button>
              <button id="6" className={ isActive? styles.ActiveClass :  styles.JobtitleFilter} onClick={(e)=>{JobtitleFilter('python', e) }}  >Python Developer</button>
            </div> 

            <div className={styles.searchBoth}>
              <p className={styles.p}>Search </p>
              <input className={styles.inputboxsearch} type="text" placeholder='Search for a Job / Skills / Location/Experiance' onChange={(e) => { search(e) }} />
            </div>

            <div style={{marginLeft:"20px"}}>
    <select className={styles.dropdownleft} onChange={(e)=>{changefrom(e)}}>      
      {
        jobs.map((items, i) => {
        return (
          <>
<option> {i+1} </option>
</>
        )
      })
           } 
    </select>
    <input value ={from+1} className={styles.inputtypeLeft}  />
    <input value ={to} className={styles.inputtypeRight} /> 

    <select  className={styles.dropdownright} onChange={(e)=>{changeTo(e)}}> 
{/* <option > {to} </option> */}
      {
        jobs.map((items, i) => {
        return (
          <>
<option > {i+1} </option>
</>
        )})
           } 
    </select>
    </div>


            {
        screenSize.width > 850 ?
        <>

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
              </div>
              

            

            <div className={styles.Uiwarpper}>
              <ul className={styles.ul}>
                <li style={{ position: "sticky" }} className={`${styles.li} ${styles.CompanyName}`}><b>Company Name</b></li>
                <li className={`${styles.li} ${styles.Source}`}><b>Source</b></li>
                <li className={`${styles.li} ${styles.Jtitle}`}><b>Job Title</b></li>
                <li className={`${styles.li} ${styles.JobType}`}><b>JobType</b></li>

                <li className={`${styles.li} ${styles.liDescription}`}><b>Job description</b></li>
                <li className={`${styles.li} ${styles.date}`}><b>Posted Date</b>
                </li>

                <li className={`${styles.li} ${styles.Location}`}><b>Location</b></li>
                <li className={`${styles.li} ${styles.Package}`}><b>Package </b>

                </li>
                <li className={`${styles.li} ${styles.experiance}`}><b>Exp</b>

                </li>
                <li className={`${styles.li} ${styles.qualification}`}><b>Qualif</b></li>


                <li className={`${styles.li} ${styles.Skills}`}><b>Skills Required</b></li>
                <li className={`${styles.li} ${styles.Apply}`}><b>Apply</b></li>

              </ul>
              {PageLoader ?
                <Puff height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{ marginLeft: "45%" }} />
                : ""
              }
              {jobs.length > 0 ?
                jobs.map((items, i) => {
                  return (

                    <ul className={styles.ul} key={i}>

                      <li className={`${styles.li} ${styles.CompanyName}`} onClick={()=>{checkEmProfile(items.empId)}} > {i+1} {items.Logo ?
                        < img style={{ width: "40%", height: "40px" }} src={items.Logo} />
                        : ""}<br></br>{items.companyName}</li>
                <li className={`${styles.li} ${styles.Source}`}>{items.Source}</li>

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
                      })}
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
                      <li className={`${styles.li} ${styles.Location}`}>{items.jobLocation.toLowerCase()}</li>
                      <li className={`${styles.li} ${styles.Package}`}>{items.salaryRange}</li>
                      <li className={`${styles.li} ${styles.experiance}`}>{items.experiance}</li>
                      <li className={`${styles.li} ${styles.qualification}`}>{items.qualification}</li>
                      <li className={`${styles.li} ${styles.Skills}`}>{items.skills}</li>

                      <li className={`${styles.li} ${styles.Apply}`}>
                        <button className={styles.Applybutton} title='click to go the page' onClick={() => { applyforJob(items._id) }}>Apply</button>

                      </li>



                    </ul>
                  )
                }).slice(from, to)
                : <p style={{ color: "red", marginLeft: "45%" }}>No Record Found  </p>
              }
            </div>
          </>

          // .........Cards.....



          :
          <>
            <div id={styles.JobCardWrapper} >

              {jobs.map((job, i) => {
                return (
                  <>
                   <div className={styles.JobCard} key={i}>
                    {/* <div style={{display:"flex"}}> */}


                      {/* <div> */}
        <p className={styles.jobTitle} style={{textDecoration:"underline"}}>{job.jobTitle.toUpperCase()}</p>
        <span className={styles.date}>{new Date(job.createdAt).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )} </span>
        <br></br>

        <div style={{ display: "flex", marginTop: "5px" }} onClick={()=>{checkEmProfile(job.empId)}} >
          {/* <img className={styles.logo} src={job.Logo} /> */}
          <span className={styles.companyName} style={{textDecoration:"underline"}}>{job.companyName} {job.companyName}  </span>
        <  img className={styles.jobLocationImage} src={locaion}  /> <span className={styles.jobLocation}>{job.jobLocation[0].toUpperCase()+job.jobLocation.slice(1)},</span>
        </div>

        <span className={styles.qualificationAndExperiance}>{job.qualification},   {job.experiance} Experience,   {job.jobtype}
        {/* <span className={styles.jobtypeAndDate}> {job.jobtype}</span> */}
        </span><br></br>     
                
           {/* </div> */}
           {/* <div> */}
        <span className={styles.skillsHeading}>Skills: </span><span className={styles.skills}> {job.skills}</span><br></br>
        
           <div className={styles.ApplyPackage}>
          <span className={styles.salaryRange}><span>&#8377;</span>{job.salaryRange}</span>

          <button className={styles.ApplyMobile} onClick={() => { navigate("/JobSeekerLogin") }}><b>Apply</b></button>
        </div>

           {/* </div> */}

           {/* </div> */}

           <p className={styles.jobDescriptionHeading}>Job Description:</p>
        <p className={styles.jobDescription}> 
        {/* {job.jobDescription} */}
        {
                         job.jobDescription.map((descrip, di)=>{
                        return(
                          <>
                        {
                        descrip.type=="unordered-list-item"?

                        <ul style={{listStyleType:"disc"}}>
                          <li style={{marginTop:"-12px", marginLeft:"-15px"}}>
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
              })}

            </div>
          </>


      }


    </>


  )
}
export default Home

