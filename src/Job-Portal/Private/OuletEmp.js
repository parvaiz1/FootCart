import React from 'react'
import {  Outlet, Navigate } from 'react-router-dom'

function Private() {
  const EmployeetAuth = localStorage.getItem("EmpLog")
  let adminLogin= localStorage.getItem("AdMLog")

  return (
    EmployeetAuth || adminLogin ? <Outlet/> : <Navigate to = "/" />
  )
}

export default Private