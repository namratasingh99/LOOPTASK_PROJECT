import React,{useState} from 'react';
import{Link} from "react-router-dom";
import supabase from "../supabase-client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password, });

  if (error) {
    alert(error.message);
   } 
   else {
    navigate("/dashboard");
   }
  };

  return (
      <div className="login-container">
         <div className="login-box">

         <h1 className="login-title">Welcome Back 👋</h1>
         <p className="login-subtitle"> Login to continue building, earning and growing with Looptask </p>
         <form className="login-form" onSubmit={handleLogin} >
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
            <button type="submit"> Login </button>
         </form>
         <p className="signup-text"> Don't have an account?
         <Link to = "/signup"> Sign Up</Link> </p>
         </div>
       </div>
  );
}
