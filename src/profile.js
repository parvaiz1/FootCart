import React from 'react'
import { connect } from 'react-redux'
import {actionReducer} from "./actionReducer"

function profile(props) {
  return (
    <>
    <h1>Profile component {props.AGE} </h1>
    <button onClick={()=>{props.changeName(100)}}>change age profile</button>

    </>
  )
}

const stateProps =(state)=>{
    return state
}

function dispatchProps(dispatch){
    return{
        changeName:(age)=>{
            dispatch(actionReducer(age)) //getting the  action from action reducer 
        }
    }
}

export default connect(stateProps, dispatchProps) (profile)