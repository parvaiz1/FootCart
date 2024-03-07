import React  from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'


function AboutUs() {
    const [AboutUs, setAboutUs]= useState([])

   async function getAboutUs(){
    await axios.get("http://localhost:8080/admin/getWebsiteDetails")
    .then((res)=>{
        console.log(res.data)
        let result = res.data.result
        console.log(result[0].AboutUs)
        setAboutUs(result[0].AboutUs)
    })
    }

    useEffect(()=>{
getAboutUs()
    },[])

  return (
    <>
    {
        AboutUs.map((descrip, di) => {
          return (
            <>
              {
                descrip.type == "unordered-list-item" ?

                  <ul style={{ listStyleType: "disc" }}>
                    <li key = {di}>
                      {descrip.text}

                    </li>
                  </ul>

                  : descrip.type == "ordered-list-item" ?
                  

                    <ol >
                      <li key = {di} >
                      {descrip.text}

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
    </>
    // <div style={{marginLeft:"2%"}}> {AboutUs} </div>
  )
}

export default AboutUs

