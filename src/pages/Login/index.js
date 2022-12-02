import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom"
export default function Login(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(props.isLoggedIn){
            navigate("/profile")
        }
    },[props.isLoggedIn])
  return (
    <div>
    <form onSubmit={props.handleLoginSubmit}>
      <h3>Login</h3>
      <input name="email"  value={props.loginEmail} onChange={e=>props.setLoginEmail(e.target.value)}/>
      <input type="password" name="password" value={props.loginPassword} onChange={e=>props.setLoginPassword(e.target.value)}/>
      <button>Log in!</button>
    </form>
    <form onSubmit={props.handleSignupSubmit}>
      <h3>Signup</h3>
      <input name="email"  value={props.signupEmail} onChange={e=>props.setSignupEmail(e.target.value)}/>
      <input type="password" name="password" value={props.signupPassword} onChange={e=>props.setSignupPassword(e.target.value)}/>
      <button>Signup!</button>
    </form>
    </div>
  )
}
