import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from "./StudentProfile.module.css"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import profileDp from "../img/user_3177440.png"



function CheckStudentProfile() {

    const [profileData, setProfileData] = useState([])

    let studId = JSON.parse(localStorage.getItem("StudId"))
    let params =useParams()

    async function getProfile() {
        await axios.get(`http://localhost:8080/StudentProfile/getProfile/${params.CP}`)
            .then((res) => {
                let result = res.data.result
                console.log(result)
                setProfileData([result])
            }).catch((err) => {
                console.log("api issue")
                alert("some thing went wrong")
            })
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>

{

profileData.map((item, i) => {
    return (
        <div key={i}>
        <img className={styles.imageV} src={item.image?item.image : profileDp}/>
        
        </div>
    )

})
    }


            {/* <button onClick={getProfile}></button> */}
           
<div className={styles.uiwrapper}>
            <ul className={styles.ul}>
                <li className={styles.li}><b>Name </b></li>
                <li className={styles.li}><b>Email  Address</b></li>
                <li className={styles.li}><b>Phone  Number</b></li>
                <li className={styles.li}><b>Aadhar</b></li>
                <li className={styles.li}><b>Pan  Card</b></li>
                <li className={styles.li}><b>Age</b></li>
                <li className={styles.li}><b>Notice  Period</b></li>
                <li className={styles.li}><b>Expected  Salary</b></li>
                <li className={styles.li}><b>Current  CTC</b></li>
                <li className={styles.li}><b>Qualification</b></li>
                <li className={styles.li}><b>Skills</b></li>
                <li className={styles.li}><b>Experiance</b></li>

            </ul>

            {

                profileData.map((item, i) => {
                    return (
                        <ul className={styles.ulR} key={i}>
                            <li className={`${styles.Hli}`}>{item.name?item.name:<li className={styles.Nli}>Not Updated</li>}</li>
                            <li className={`${styles.Hli}`}>{item.email?item.email:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.phoneNumber?item.phoneNumber:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Aadhar?<li className={styles.Nli}>###########</li>:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.panCard?<li className={styles.Nli}>###########</li>:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.age?item.age:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.NoticePeriod?item.NoticePeriod:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.ExpectedSalary?item.ExpectedSalary:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.currentCTC?item.currentCTC:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Qualification?item.Qualification:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Skills?item.Skills:<li className={styles.Nli}>Not Updated</li>}</li>
                       <li className={` ${styles.Hli}`}>{item.Experiance?item.email:<li className={styles.Nli}>Not Updated</li>}</li>
                        </ul>
                    )
                })

            }
            </div>

        </>
    )
}

export default CheckStudentProfile