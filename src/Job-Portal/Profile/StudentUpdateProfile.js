import React, { useEffect, useState } from 'react';
import styles from "./SudentUpdateProfile.module.css"
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import logo from "../img/Blue.jpg"
import { Navigate, useNavigate } from 'react-router-dom';
import profileDp from "../img/user_3177440.png"
import delet from "../img/icons8-delete-48.png"
import { TailSpin } from "react-loader-spinner"
import useScreenSize from '../SizeHook';

function StudentUpdateProfile() {
  const [file, setFile] = useState()
  const [uploaded, setUploaded] = useState()
const screenSize = useScreenSize();


  const [image, setimage] = useState()

  const [name, setname] = useState("")
  const [emailAddress, setemailAddress] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [Aadhar, setAadhar] = useState("")
  const [panCard, setpanCard] = useState("")
  const [NoticePeriod, setNoticePeriod] = useState("")
  const [ExpectedSalary, setExpectedSalary] = useState("")
  const [currentCTC, setcurrentCTC] = useState("")
  const [age, setage] = useState("")
  const [Qualification, setQualification] = useState("")
  const [Skills, setSkills] = useState("")
  const [Experiance, setExperiance] = useState("")
  const [loader, setLoader] = useState(false)

// let input = document.getElementsByClassName("input").value
window.addEventListener("keypress", (e)=>{
let key  = e.target.value
console.log(key)
if(key=="a"){
  return false
}
})

  let navigate = useNavigate()

  let studId = JSON.parse(localStorage.getItem("StudId"))

  const [topMessage, settopMessage] = useState("")

  async function getUser() {

    await axios.get(`http://localhost:8080/StudentProfile/getProfile/${studId}`)
      .then((res) => {
        let result = res.data.result
        console.log(result)
        if (result) {
          setname(result.name)
          setemailAddress(result.email)
          setimage(result.image)
          setphoneNumber(result.phoneNumber)
          setAadhar(result.Aadhar)
          setpanCard(result.panCard)
          setNoticePeriod(result.NoticePeriod)
          setExpectedSalary(result.ExpectedSalary)
          setcurrentCTC(result.currentCTC)
          setQualification(result.Qualification)
          setSkills(result.Skills)
          setExperiance(result.Experiance)
          setage(result.age)
        }
      }).catch((err) => {
        alert("server issue occured", err)
      })
  }
  useEffect(() => {
    getUser()
  }, [])


  // ...............upload Image.....................
   async function uploadImage() {
    const formdata = new FormData()
    formdata.append('image', image)
    
    // console.log(formdata)
    await axios.put(`http://localhost:8080/StudentProfile/uploadImage/${studId}`, formdata)
      .then((res) => {
        console.log(res.data)  
    window.location.reload()


      }).catch((err) => {
        console.log(err)
      })
  }
  async function saveUpdate(e) {
    // e.preventDefault()
    console.log("before saving", studId, name , emailAddress, phoneNumber, Aadhar, panCard, NoticePeriod, ExpectedSalary, currentCTC, age, Qualification, Skills, Experiance)
    await axios.put(`http://localhost:8080/StudentProfile/updatProfile/${studId}`, { name, emailAddress, phoneNumber, Aadhar, panCard, NoticePeriod, ExpectedSalary, currentCTC, age, Qualification, Skills, Experiance })
      .then( async (res) => {
        let result = res.data
        console.log(result)
        if (result == "success") {
          settopMessage("Success! Profile updated succesfully")
        } else if (result == "feilds are missing") {
          settopMessage("Alert!..name, emailAddress, NoticePeriod, phoneNumber, Qualification, Skills and Experiance should not be empty")
        }
        
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });


      }).catch((err) => {
        console.log("server error occured", err)
      })
  }
  async function prevewImage(e) {
    setLoader(true)
    setFile(URL.createObjectURL(e.target.files[0]))
    // setimage(e.target.files[0])
    const imageFile = e.target.files[0];
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  }
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    setimage(compressedFile)
    setLoader(false)

  } catch (error) {
    console.log(error);
  }
  }
async function deletePic(){
  await axios.put(`http://localhost:8080/StudentProfile/deleteImage/${studId}`,{image})
  .then((res) => {
    console.log(res)
    window.location.reload()
  }).catch((err)=>{
    alert("server issue occured")
  })
}
// const input = document.getElementById('input');


window.addEventListener('keypress', function(event){
    
  // Get the key code
  let keycode = event.which || event.keyCode;
  
  // Check if key pressed is a special character
  if(keycode < 32 || 
   (keycode > 32 && keycode < 44) || 
   (keycode > 44 && keycode < 46) || 
   (keycode > 46 && keycode < 48) || 
   (keycode > 57 && keycode < 64) || 
   (keycode > 90 && keycode < 97) ||
   keycode > 122
  ){
      // Restrict the special characters
      event.preventDefault();  
      // alert("special characters are not allowed")
      return false;
  }
}); 



  return (
    <>

      <div className={styles.EntireFullWrapper}>
        <div className={styles.EntireWrapper}>
          <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"40%"}}>Update your Profile</h3>
          <div className={styles.imageViewWrapper}>

          <img className={styles.imageView} src={image?image :profileDp} />
            <img className={styles.fileView} src={file} />

            <div className={styles.addfileDiconwrapper}>
          <input className={`${styles.addfile} ${styles.addfileD}`} type="file" accept='.png, .jpg, .jpeg' onChange={prevewImage}/>
          <div className={styles.loader}> { loader?<TailSpin height={"40px"}/> : ""} </div>
         
          {/* <img style ={{color:"blue" , marginTop:"4px", width:"15%"}} src={delet} onClick={deletePic}/> */}      
          </div>

          </div>
          <div className={styles.saveDelete}>
          {file?<button className={styles.saveImage} onClick={uploadImage}>Save</button>:""}
         {image?<button className={styles.DeleteImage} onClick={deletePic}>Delete</button>:""}
          </div>

          <p style={{ fontStyle: "italic", color: "green" }}>{topMessage}</p>
{screenSize.width>850?
          

          <div className={styles.inputWrapper}>


            <label className={styles.inputName}>
              <h4>Name:</h4>
              <input className={styles.input} value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Email Address:</h4>
              <input className={styles.input} value={emailAddress} onChange={(e) => { setemailAddress(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Age:</h4>
              <input className={styles.input} value={age} id='input' onChange={(e) => { setage(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Phone number:</h4>
              <input className={styles.input} value={phoneNumber} id='input' onChange={(e) => { setphoneNumber(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Aadhaar number:</h4>
              <input className={styles.input} value={Aadhar} id='input' onChange={(e) => { setAadhar(e.target.value) }}  />
            </label>

            <label className={styles.inputName}>
              <h4>Pan Card Number:</h4>
              <input  className={styles.input} value={panCard} onChange={(e) => { setpanCard(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Notice Period in days: </h4>
              <input className={styles.input} value={NoticePeriod} onChange={(e) => { setNoticePeriod(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Expected Salary:</h4>
              <input className={styles.input} value={ExpectedSalary} onChange={(e) => { setExpectedSalary(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Current CTC:</h4>
              <input className={styles.input} value={currentCTC} onChange={(e) => { setcurrentCTC(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Qualification:</h4>
              <input className={styles.input} value={Qualification} onChange={(e) => { setQualification(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Skills:</h4>
              <input className={styles.input} value={Skills} onChange={(e) => { setSkills(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Experiance:</h4>
              <input className={styles.input} value={Experiance} onChange={(e) => { setExperiance(e.target.value) }} type="text" />
            </label>

            <button className={styles.Save} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.cancel} onClick={() => { navigate(-1) }} >cancel</button>

          </div>
          :
          <>
          

          <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Name:</h4>
              <input className={styles.Mobileinput} value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Email Address:</h4>
              <input className={styles.Mobileinput} value={emailAddress} onChange={(e) => { setemailAddress(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Age:</h4>
              <input className={styles.Mobileinput} value={age} onChange={(e) => { setage(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Phone number:</h4>
              <input className={styles.Mobileinput} value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Aadhaar number:</h4>
              <input className={styles.Mobileinput} value={Aadhar} onChange={(e) => { setAadhar(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Pan Card Number:</h4>
              <input className={styles.Mobileinput} value={panCard} onChange={(e) => { setpanCard(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Notice Period in days: </h4>
              <input className={styles.Mobileinput} value={NoticePeriod} onChange={(e) => { setNoticePeriod(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Expected Salary:</h4>
              <input className={styles.Mobileinput} value={ExpectedSalary} onChange={(e) => { setExpectedSalary(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Current CTC:</h4>
              <input className={styles.Mobileinput} value={currentCTC} onChange={(e) => { setcurrentCTC(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Qualification:</h4>
              <input className={styles.Mobileinput} value={Qualification} onChange={(e) => { setQualification(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Skills:</h4>
              <input className={styles.Mobileinput} value={Skills} onChange={(e) => { setSkills(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Experiance:</h4>
              <input className={styles.Mobileinput} value={Experiance} onChange={(e) => { setExperiance(e.target.value) }} type="text" />
            </label>

            <button className={styles.MobileSave} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.Mobilecancel} onClick={() => { navigate(-1) }} >cancel</button>

          </>
}

</div>

      </div>

    </>
  )
}
export default StudentUpdateProfile