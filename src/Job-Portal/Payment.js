import React from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";




function Payment() {
    let navigate = useNavigate()
    let params=useParams()
    // let profleId = params.id
    const location=useLocation()
    // let userid = (location.state.id)
    // console.log(userid)


    function OpenRazorPay(BackendData){
    var options = {
        key: 'rzp_test_h3n5NBOXNqdSAs', // Enter the Key ID generated from the Dashboard
        amount: BackendData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: BackendData.currency,
        name: "Job-Portal",
        description: "Test Transaction",
        order_id: BackendData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response){
            console.log("line  no 27",response)
            axios.post("http://localhost:8080/paymentAPI/verifyPament", {response})
            .then((res)=>{
                console.log("line no 20", res.data)
                if(res.data==="valid signature"){
                    console.log(res.data)
                    console.log(BackendData)
                    let amount=BackendData.amount
                    let amountDue =BackendData.amount_due
                    let amountPaid= BackendData.amount_paid
                    let currency = BackendData.currency
                    let ReceiptId =BackendData.id
  let EmployeeId = JSON.parse(localStorage.getItem("EmpIdG"))


                    // navigate("Check-Profile", {state:{ProfileId: userid}})
                 axios.post("http://localhost:8080/paymentAPI/savePymentReciept",{amount, amountDue, amountPaid, currency, ReceiptId, EmployeeId})
                 .then((res)=>{
                    console.log(res.data)
                 })
                }else{
                    alert("Payment failed, if your payment got deducted, it will be refunded")
                }
            })
            .catch((err)=>{
                alert("backend error")
            })
        }
    }
    var rzp = new window.Razorpay(options);
    rzp.open()

} 


        async function paymentButton(amount){
            let Amount=  Number (amount)
            await axios.post("http://localhost:8080/paymentAPI/rzrPayment", {Amount})
            .then((res)=>{
                // console.log(res.data)
                OpenRazorPay(res.data.order)
            }).catch((err)=>{
                alert("backend error")
            })
        }

       async function PhonePepaymentButton(amount){
        await axios.post("http://localhost:8080/paymentAPI/phonePayPayment",{amount})
        .then((res)=>{
            console.log(res.data)
            window.location.href=res.data
        })
        .catch((err)=>{
            console.log("backend error is ",err)
        })
        }
    
  return (
    <>
    <h2>welcome to payment page</h2>
    <button onClick={()=>{paymentButton(100)}}>PAY 100rs by RzPay</button>
    <button onClick={()=>{PhonePepaymentButton(100)}}>PAY 100rs by PhonePay</button>
    
    </>
  )
}

export default Payment

