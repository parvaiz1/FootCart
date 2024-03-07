import React from 'react'
import {  Outlet, Navigate } from 'react-router-dom'

function Private() {
  const studentAuth = localStorage.getItem("StudLog")
  let adminLogin= localStorage.getItem("AdMLog")

  return (
    studentAuth || adminLogin? <Outlet/> : <Navigate to = "/" />
  )
}

export default Private