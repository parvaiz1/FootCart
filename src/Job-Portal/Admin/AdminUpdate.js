import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./AdminProfile.module.css"
import { EditorState } from 'draft-js';
import { Editor  } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function AdminUpdate() {

  const [AboutUs, setAboutUs] = useState([])
  const [Services, setServices] = useState("")
  const [Contact, setContact] = useState("")
  const [TermsAndCondition, setTermsAndCondition] = useState("")

  async function update(){
    await axios.put("http://localhost:8080/admin/UpdateWebsite", {AboutUs, Services, Contact, TermsAndCondition } )
    .then((res)=>{
      console.log(res.data)
    })
  }

  async function getWebsiteDetails(){
    await axios.get("http://localhost:8080/admin/getWebsiteDetails")
    .then((res)=>{
      console.log(res.data.result[0])
      let result = res.data.result[0]
      setAboutUs(result.AboutUs)
      setServices(result.Services)
      setContact(result.Contact)
      setTermsAndCondition(result.TermsAndCondition)

    }).catch((err)=>{
      alert("some thing went wrong")
    })
  }

  useEffect(()=>{
    getWebsiteDetails()
  },[])

  const [editorState, setEditorState] = useState("djkchsdksd")
  console.log(editorState)
  return (
    <>   
     <div className={styles.AdminEditWrapper}>
     <h4 className={styles.AdminEdit}  >About Us</h4>
       <textarea className={styles.inputbox} type="text" value={AboutUs} onChange={(e) => { setAboutUs(e.target.value) }}></textarea>
       {/* <ReactQuill theme="snow" value={AboutUs} onChange={(e)=>{ setAboutUs(e.innerText) }} />; */}       
        
       
        {/* <Editor
        EditorState={AboutUs}
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: "70%", marginTop:"10px",marginLeft:"0px", border: "1px solid black", borderRadius:"4px" }}
         className={styles.inputbox} 
        onChange={(e)=>{ setAboutUs(e.blocks) }}

      />  */}
          <h4 className={styles.AdminEdit}  >Services</h4>
       {/* <textarea className={styles.inputbox} type="text" value={Services} onChange={(e) => { setServices(e.target.value) }}></textarea> */}

       <Editor
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: "70%", marginTop:"10px",marginLeft:"0px", border: "1px solid black", borderRadius:"4px" }}
         className={styles.inputbox} 
         onChange={(e)=>{ setServices(e.blocks) }}
      />

         <h4 className={styles.AdminEdit}  >Contact</h4>
       {/* <textarea className={styles.inputbox} type="text" value={Contact} onChange={(e) => { setContact(e.target.value) }}></textarea> */}

       <Editor
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: "70%", marginTop:"10px",marginLeft:"0px", border: "1px solid black", borderRadius:"4px" }}
         className={styles.inputbox} 
         onChange={(e)=>{ setContact(e.blocks) }}
      />


         <h4 className={styles.AdminEdit}  >Terms And Condition</h4>
       <textarea className={styles.inputbox} type="text" value={TermsAndCondition} onChange={(e) => { setTermsAndCondition(e.target.value) }}></textarea><br></br>

       {/* <Editor
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: "70%", marginTop:"10px",marginLeft:"0px", border: "1px solid black", borderRadius:"4px" }}
         className={styles.inputbox} 
         onChange={(e)=>{ setTermsAndCondition(e.blocks) }}
      /> */}

        <button onClick={()=>{update()}}>Update</button>       

     </div>

    </>

  )
}

export default AdminUpdate