import {useEffect, useState} from "react";
import BucketList from "./components/BucketList";
import API from "./utils/API";

function App() {
  const [userId, setUserId] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

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
        localStorage.setItem("token",data.token)
      }
    })
  }
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId(0);
    setToken("");
  }
  return (
    <div className="App">
      {isLoggedIn&&<button onClick={handleLogout}>Logout</button>}
      {isLoggedIn?(
        <div>
        <h1>My Bucket List!</h1>
        <BucketList userId={userId} token={token}/>
        </div>
      ):(
        <form onSubmit={handleLoginSubmit}>
          <h3>Login</h3>
          <input name="email"  value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
          <input type="password" name="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
          <button>Log in!</button>
        </form>
      )}
      
    </div>
  );
}

export default App;
