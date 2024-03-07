import React, { useEffect, useState } from 'react';
import styles from "./SudentUpdateProfile.module.css"
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import logo from "../img/Blue.jpg"
import { Navigate, useNavigate } from 'react-router-dom';
import profileDp from "../img/user_3177440.png"
import delet from "../img/icons8-delete-48.png"
import { TailSpin } from "react-loader-spinner"
import Companylogo from "../img/logo.png"
import useScreenSize from '../SizeHook';



function EmployeeUpdateProfile() {
  const [file, setFile] = useState()
  const [uploaded, setUploaded] = useState()
const screenSize = useScreenSize();


  const [image, setimage] = useState()

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [Aadhar, setAadhar] = useState("")
  const [panCard, setpanCard] = useState("")
  const [CompanyName, setCompanyName] = useState("")
  const [CompanyContact, setCompanyContact] = useState("")
  const [CompanyGSTIN, setCompanyGSTIN] = useState("")
  const [CompanyWebsite, setCompanyWebsite] = useState("")
  const [CompanyAddress, setCompanyAddress] = useState("")
  const [CompanyEmail, setCompanyEmail] = useState("")
  const [TypeofOrganisation, setTypeofOrganisation] = useState("")
  const [loader, setLoader] = useState(false)

  let navigate = useNavigate()

  let empId = JSON.parse(localStorage.getItem("EmpIdG"))


  const [topMessage, settopMessage] = useState("")

  async function getUser() {

    await axios.get(`http://localhost:8080/EmpProfile/getProfile/${empId}`)
      .then((res) => {
        let result = res.data.result
        console.log(result)
        if (result) {
          setname(result.name)
          setemail(result.email)
          // result.image? setimage(result.image):setimage(Companylogo)
          setimage(result.image)
          setphoneNumber(result.phoneNumber)
          setAadhar(result.Aadhar)
          setpanCard(result.panCard)
          setCompanyName(result.CompanyName)
          setCompanyContact(result.CompanyContact)
          setCompanyGSTIN(result.CompanyGSTIN)
          setCompanyWebsite(result.CompanyWebsite)
          setCompanyAddress(result.CompanyAddress)
          setTypeofOrganisation(result.TypeofOrganisation)
          setCompanyEmail(result.CompanyEmail)
        }
      }).catch((err) => {
        alert("server issue occured", err)
      })
  }
  useEffect(() => {
    getUser()
  }, [])

  async function saveUpdate(e) {
    // e.preventDefault()
    // console.log("before saving", empId,
    //   name, email, phoneNumber, Aadhar, panCard,CompanyName,CompanyContact, CompanyGSTIN, CompanyWebsite, CompanyAddress,
    //   CompanyEmail, TypeofOrganisation 
    // )
    await axios.put(`http://localhost:8080/EmpProfile/updatProfile/${empId}`, {
      name, email, phoneNumber, Aadhar, panCard, CompanyName, CompanyContact, CompanyGSTIN, CompanyWebsite,
      CompanyAddress, CompanyEmail, TypeofOrganisation

    })
      .then(async (res) => {
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


  // ...............upload Image.....................
  async function uploadImage() {
    const formdata = new FormData()
    formdata.append('image', image)

    // console.log(formdata)
    await axios.put(`http://localhost:8080/EmpProfile/uploadImage/${empId}`, formdata)
      .then((res) => {
        console.log(res.data)
        window.location.reload()


      }).catch((err) => {
        console.log(err)
      })
  }

  async function prevewImage(e) {
    setLoader(true)
    setFile(URL.createObjectURL(e.target.files[0]))
    // setimage(e.target.files[0])
    const imageFile = e.target.files[0];
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 0.08,
      // maxWidthOrHeight: 2000,
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
  async function deletePic() {
    await axios.put(`http://localhost:8080/EmpProfile/deleteImage/${empId}`, { image })
      .then((res) => {
        console.log(res)
        window.location.reload()
      }).catch((err) => {
        alert("server issue occured")
      })
  }



  return (
    <>

      <div className={styles.EntireFullWrapper}>
        <div className={styles.EntireWrapper}>
        <h3 style={{color:"rgb(40, 4, 99)", marginLeft:"2%"}}>Update your Profile</h3>


          <div className={styles.EmpimageViewWrapper}>
            {file?"":<img className={styles.EmpimageView} src={image ? image : Companylogo} />}
            {file?<img className={styles.EmpfileView} src={file} />:""}

            <div className={styles.EmpaddfileDiconwrapper}>
              <input className={`${styles.addfile} ${styles.EmpaddfileD}`} type="file" accept='.png, .jpg, .jpeg' onChange={prevewImage} />
              <div className={styles.Emploader}> {loader ? <TailSpin height={"40px"} /> : ""} </div>

              {/* <img style ={{color:"blue" , marginTop:"4px", width:"15%"}} src={delet} onClick={deletePic}/> */}
            </div>

          </div>
          <div className={styles.saveDelete}>
            {file ? <button className={styles.EmpsaveImage} onClick={uploadImage}>Save</button> : ""}
            {image ? <button className={styles.EmpDeleteImage} onClick={deletePic}>Delete</button> : ""}
          </div>

          <p style={{ fontStyle: "italic", color: "green" }}>{topMessage}</p>
{screenSize.width>850?
          <div className={styles.inputWrapper}>


            <label className={styles.inputName}>
              <h4>Name:</h4>
              <input className={styles.input} value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Email Id:</h4>
              <input className={styles.input} value={email} onChange={(e) => { setemail(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Phone number:</h4>
              <input className={styles.input} value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} type="text" />
            </label>
            
            <label className={styles.inputName}>
              <h4>Aadhaar number:</h4>
              <input className={styles.input} value={Aadhar} onChange={(e) => { setAadhar(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Pan Card Number:</h4>
              <input className={styles.input} value={panCard} onChange={(e) => { setpanCard(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Name: </h4>
              <input className={styles.input} value={CompanyName} onChange={(e) => { setCompanyName(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Email id:</h4>
              <input className={styles.input} value={CompanyEmail} onChange={(e) => { setCompanyEmail(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Contact No:</h4>
              <input className={styles.input} value={CompanyContact} onChange={(e) => { setCompanyContact(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company GSTIN: </h4>
              <input className={styles.input} value={CompanyGSTIN} onChange={(e) => { setCompanyGSTIN(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Website:</h4>
              <input className={styles.input} value={CompanyWebsite} onChange={(e) => { setCompanyWebsite(e.target.value) }} type="text" />
            </label>

            <label className={styles.inputName}>
              <h4>Company Address:</h4>
              <textarea style={{height:"100px"}} className={styles.input} value={CompanyAddress} onChange={(e) => { setCompanyAddress(e.target.value) }} type="text">khvhjhjhvjhv ligkgkug</textarea> 
            </label>
           
            <div className={styles.inputName}>
              <h4>Type of Organisation :  <span style={{color:"blue"}}>{TypeofOrganisation}</span></h4>          
            <select className={styles.input } style={{height:"35px"}}onChange={(e)=>{setTypeofOrganisation(e.target.value)}}>
            {TypeofOrganisation? <option style={{color:"blue"}} >{TypeofOrganisation}</option>
            :<option value="" >Select Company type</option>
            }
              <option value="Pvt.Ltd.">Pvt. Ltd.</option>
              <option value="Firm">Firm</option>
              <option value="Consultancy">Consultancy</option> 
            </select>
                                 
            </div>       



            <button className={styles.Save} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.cancel} onClick={() => { navigate(-1) }} >cancel</button>


          </div>
          // Or mobile
          :
          <>
          
          <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Name:</h4>
              <input className={styles.Mobileinput} value={name} onChange={(e) => { setname(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Email Id:</h4>
              <input className={styles.Mobileinput} value={email} onChange={(e) => { setemail(e.target.value) }} type="text" />
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
              <h4 className={styles.MobileName}>Company Name: </h4>
              <input className={styles.Mobileinput} value={CompanyName} onChange={(e) => { setCompanyName(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Email id:</h4>
              <input className={styles.Mobileinput} value={CompanyEmail} onChange={(e) => { setCompanyEmail(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Contact No:</h4>
              <input className={styles.Mobileinput} value={CompanyContact} onChange={(e) => { setCompanyContact(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company GSTIN: </h4>
              <input className={styles.Mobileinput} value={CompanyGSTIN} onChange={(e) => { setCompanyGSTIN(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Website:</h4>
              <input className={styles.Mobileinput} value={CompanyWebsite} onChange={(e) => { setCompanyWebsite(e.target.value) }} type="text" />
            </label>

            <label className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Company Address:</h4>
              <input className={styles.Mobileinput} value={CompanyAddress} onChange={(e) => { setCompanyAddress(e.target.value) }} type="text" />
            </label>
           
            <div className={styles.MobileinputName}>
              <h4 className={styles.MobileName}>Type of Organisation :  <span style={{color:"blue"}}>{TypeofOrganisation}</span></h4>          
            <select className={styles.Mobileinput } style={{height:"35px"}}onChange={(e)=>{setTypeofOrganisation(e.target.value)}}>
            {TypeofOrganisation? <option style={{color:"blue"}} >{TypeofOrganisation}</option>
            :<option value="" >Select Company type</option>
            }
              <option value="Pvt.Ltd.">Pvt. Ltd.</option>
              <option value="Firm">Firm</option>
              <option value="Consultancy">Consultancy</option> 
            </select>  
            
            <button className={styles.MobileSave} onClick={(e) => { saveUpdate(e) }}>Save</button>
            <button className={styles.Mobilecancel} onClick={() => { navigate(-1) }} >cancel</button>                               
            </div>    

          </>
}
        </div>

      </div>

    </>
  )
}
export default EmployeeUpdateProfile