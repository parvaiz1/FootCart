import React from "react";
import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
// .......importing components......//
import StudentLogin from "./Login/StudLogin";
import EmployeeLogin from "./Login/EmpLogin"
import StudentSignUp from "./SignUp/StudSignin";
import EmployeeSignUp from "./SignUp/EmplSign";
import StudPrivate from "./Private/OutletStud";
import PostedJobsbyEmp from "./Jobs/mypostedjobs";
import EmpPrivate from "./Private/OuletEmp";
import PostJobs from "./PostJobs/postJobs";
import Jobs from "./Jobs/AllJobs";
import Nav from "./NaveBar/Nav";
import Jobdetails from "./Jobs/AllJobdetails"
import Home from "./Jobs/AllHomeJobs";
import StudentUpdateProfile from "./Profile/StudentUpdateProfile";
import EmployeeUpdateProfile from "./Profile/EmployeeUpdateProfile";
import StudentProfile from "./Profile/StudentProfile";
import EmployeeProfile from "./Profile/EmployeeProfile";
import UpdatePostedJobs from "./PostJobs/updatePostedJobs";
import MyAppliedJobs from "./Jobs/MyAppliedJobs"
import AppliedUserProfile from "./AppliedUserProfile/AppliedUserProfile";
import CheckStudentProfiel from "./Profile/CheckStudentProfiel";
// admin
import AdminLogin from "./Login/AdminLogin"
import AdminProfile from "./Admin/AdminProfile"
import AllJobsForAdmin from "./Admin/AllJobsForAdmin"
import AllJobSeekers from "./Admin/AllJobSeekers";
import AllEmployees from "./Admin/AllEmployees";
import CheckEmpProfileForAdmin from "./Profile/CheckEmplProfileForAdmin";
import CheckStudentProfileForAdmin from "./Profile/CheckStuForAdmin";
import SearchCandidate from "./AppliedUserProfile/SearchCandidat";
import AdminUpdate from "./Admin/AdminUpdate"
import CheckEmpHalfProfile from "./Profile/CheckEmpHalfProfile";
import AboutUs from "./AboutUs"
import Footer from "./Footer/Footer";



import Payment from "./Payment"
import Success from "./Success";
import Faill from "./Faill";

// phone pay
// import Success from './component/Success';
// import Failure from './component/Failure';
// import Phonepe from './file/phonepe/Phonepe';
//       key_id	                   key_secret
// rzp_test_h3n5NBOXNqdSAs	Po87Jfa74x4Saxjo2SCPz5zw



const App = () => {
  let jobSeekerId = JSON.parse(localStorage.getItem("StudId"))
  let empId = JSON.parse(localStorage.getItem("EmpIdG"))
  
  const [Online, setIsOnline] = useState(navigator.onLine);

  useEffect(()=>{
      function onlineHandler(){
     setIsOnline(true)
    //  let isOnline = true
    //  axios.put(`http://localhost:8080/StudentProfile/isOnline/${jobSeekerId}`,{isOnline})
    // .then((res)=>{
    //  console.log("'Stud is offline is'",isOnline, res)
    // })
    
   }
    function offlineHandler(){
     setIsOnline(false); 
    //  let isOnline = false
    //  axios.put(`http://localhost:8080/StudentProfile/isOnline/${jobSeekerId}`,{isOnline})

    // .then((res)=>{
    //  console.log("'Stud is offline is'",isOnline, res)
    // })
    }

     window.addEventListener("online", onlineHandler);
     window.addEventListener("offline", offlineHandler);
   return () => {
           window.removeEventListener("online", onlineHandler);
           window.removeEventListener("offline", offlineHandler);
       }
      },[])

    //   useEffect(()=>{
    //     let StuID=jobSeekerId
    //    if(Online && StuID){
    //    let isOnline =true
    //        axios.put(`http://localhost:8080/StudentProfile/isOnline/${StuID}`,{isOnline})
    //  .then((res)=>{
    //   console.log("' Stu is online '",isOnline, res)
    //  })
    //    }else{
    //     let isOnline = false
    //       axios.put(`http://localhost:8080/StudentProfile/isOnline/${StuID}`,{isOnline})
    //      .then((res)=>{
    //       console.log("' Stu is ofline '",isOnline, res)
    //      })
    //    }
    //   },[])  




  const AppContext = createContext()

  return (
        <>
              <BrowserRouter>
        <Nav />


        <Routes>
          <Route path="/" element={<Home />} />

                {/* ..........Private component for Employee i,e can not search in URL......... */}       
                 <Route element={<EmpPrivate />} >
                   <Route path="/PostJobs" element={<PostJobs />} />
                   <Route path="/postedjobs" element={<PostedJobsbyEmp />} />
                   <Route path="/Updatepostedjobs" element={<UpdatePostedJobs />} />
                   <Route path="/Applied-User-Profile/:jid" element={<AppliedUserProfile />} />
                   <Route path="/Check-Profile/:CP" element={<CheckStudentProfiel />} />
                   <Route path="/UpdateProfile" element={<EmployeeUpdateProfile />} />
                   <Route path="/MyProfile" element={<EmployeeProfile />} />
                   <Route path="Search-Candidate" element ={<SearchCandidate/>}/>             

       
                 </Route>
                 {/* ..........Private component for Jobseeker i,e can not search in URL......... */}       
                 <Route element={<StudPrivate />} >
                   <Route path="/alljobs" element={<Jobs />} />
                   <Route path="/Update-Profile" element={<StudentUpdateProfile />} />
                   <Route path="/My-Profile" element={<StudentProfile />} />
                   <Route path="/My-Applied-Jobs" element={<MyAppliedJobs />} />       
                 </Route>
                 
                 <Route path="/BIAdd@Logg" element={<AdminLogin/>} />
                 <Route path="/BIAddmin@Profile" element ={<AdminProfile/>} />
                 <Route path="/BIAddmin@AllJobs" element ={<AllJobsForAdmin/>} />
                 <Route path="/BIAddmin@AllJobSeekers" element ={<AllJobSeekers/>} />
                 <Route path="/BIAddmin@AllEmployees" element ={<AllEmployees/>} />
                 <Route path="/BIAddmin@AdminUpdate" element ={<AdminUpdate/>} />

                 <Route path="/BIAddmin@CheckEmpProfile/:CP" element={<CheckEmpProfileForAdmin/>} />
                 <Route path="/BIAddmin@CheckStudentProfile/:CP" element={<CheckStudentProfileForAdmin/>} />

          <Route path="/JobSeekerLogin" element={<StudentLogin />} />
          <Route path="/EmployeeLogin" element={<EmployeeLogin />} />          
          <Route path="/CheckEmProfile/:empId" element={<CheckEmpHalfProfile />} />          

          <Route path="/JobSeekerSignUp" element={<StudentSignUp />} />
          <Route path="/EmployeeSignUp" element={<EmployeeSignUp />} />
          <Route path="/JobDetails/:id" element={<Jobdetails />} />
          <Route path="/payment" element ={<Payment/>} />
          <Route path="/success" element ={<Success/>} />
          <Route path="/failure" element ={<Faill/>} />

          <Route path ="/AboutUs" element = {<AboutUs/>} />



          <Route path ="*" element = { <h2 style={{marginLeft:"10px", marginTop:"10px", color:"red"}}>Page Not Found</h2> }/>

{/* phone pay */}
{/* 
<Route exact path='/phone' element={<Phonepe />} />
          <Route exact path='/success' element={<Success />} />
          <Route exact path='/failure' element={<Failure />} /> */}


        
        </Routes>
        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
// export {AppContext}