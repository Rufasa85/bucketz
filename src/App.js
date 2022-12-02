import {useEffect, useState} from "react";
import BucketList from "./components/BucketList";
import API from "./utils/API";
import Home from "./pages/Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Profile from "./pages/Profile";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";

function App() {
  const [userId, setUserId] = useState(0)
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  useEffect(()=>{
    const storedToken = localStorage.getItem("token")
    if(storedToken){
      console.log(storedToken)
      API.getUserFromToken(storedToken).then(data=>{
        if(data.user){
          console.log(data)
          setToken(storedToken)
          setIsLoggedIn(true)
          setUserId(data.user.id)
          setUserEmail(data.user.email)
        }
      })
    } else {
      console.log('no stored token')
    }
  },[])

  const handleLoginSubmit = e=>{
    e.preventDefault();
    API.login({
      email:loginEmail,
      password:loginPassword
    }).then(data=>{
      console.log(data);
      if(data.token){
        setUserId(data.user.id)
        setToken(data.token)
        setIsLoggedIn(true)
        setUserEmail(data.user.email)
        localStorage.setItem("token",data.token)
      }
    })
  }
  const handleSignupSubmit = e=>{
    e.preventDefault();
    API.signup({
      email:signupEmail,
      password:signupPassword
    }).then(data=>{
      console.log(data);
      if(data.token){
        setUserId(data.user.id)
        setToken(data.token)
        setIsLoggedIn(true)
        setUserEmail(data.user.email)
        localStorage.setItem("token",data.token)
      }
    })
  }
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId(0);
    setToken("");
    setUserEmail("")
  }
  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login
            isLoggedIn={isLoggedIn}
            loginEmail={loginEmail}
            setLoginEmail={setLoginEmail}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            signupEmail={signupEmail}
            setSignupEmail={setSignupEmail}
            signupPassword={signupPassword}
            setSignupPassword={setSignupPassword}
            handleLoginSubmit={handleLoginSubmit}
            handleSignupSubmit={handleSignupSubmit}
          />}/>
          <Route path="/profile" element={<Profile 
          isLoggedIn={isLoggedIn} 
          userId={userId} 
          token={token} 
          userEmail={userEmail}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          setUserId={setUserId}
          setUserEmail={setUserEmail}
          />}/>
          <Route path="*" element={<h1>404 page</h1>}/>
        </Routes>
        <h2>Footer</h2>
      </Router>
      {/* {isLoggedIn&&<button onClick={handleLogout}>Logout</button>}
      {isLoggedIn?(
        <div>
        <h1>Welcome {userEmail}!</h1>
        <BucketList userId={userId} token={token}/>
        </div>
      ):(
        <div>
        <form onSubmit={handleLoginSubmit}>
          <h3>Login</h3>
          <input name="email"  value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
          <input type="password" name="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
          <button>Log in!</button>
        </form>
        <form onSubmit={handleSignupSubmit}>
          <h3>Signup</h3>
          <input name="email"  value={signupEmail} onChange={e=>setSignupEmail(e.target.value)}/>
          <input type="password" name="password" value={signupPassword} onChange={e=>setSignupPassword(e.target.value)}/>
          <button>Signup!</button>
        </form>
        </div>
      )} */}
      
    </div>
  );
}

export default App;
