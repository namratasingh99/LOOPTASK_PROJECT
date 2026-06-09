import React, {useState} from 'react';
import supabase from "../supabase-client"
import {useNavigate} from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(""); 
    const handleSignup = async (e) => {   
       e.preventDefault();
       console.log("Signup button clicked");
        if (!name || !email || !password || !confirmPassword || !role) {
             alert("Please fill all fields");
             return;
          }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
         return;
       }

      const { data, error } = await supabase.auth.signUp({ email, password, });
      if (error) {
        alert(error.message);
        return; 
      }

     alert("Account created successfully! ");
     navigate("/login");

     const { data: userData, error: userError } = await supabase .from("users") .insert([ { name, email, role, }, ]);
     console.log("Users Table Data:", userData);
     console.log("Users Table Error:", userError);
   };
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title"> Join Looptask 🚀</h1>
        <p className="signup-subtitle"> Start building projects, earning and growing with students </p>
        <form className="signup-form" onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value = {name} onChange = {(e) =>setName(e.target.value)} />
          <input type="email" placeholder="Email Address"  value = {email} onChange = {(e) =>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value = {password} onChange = {(e) =>setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" value = {confirmPassword} onChange ={(e) =>setConfirmPassword(e.target.value)}/>
          <select  value = {role}  onChange = {(e) =>setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Student Worker">Student Worker</option>
            <option value="Task Poster">Task Poster</option>
          </select>
          <button type="submit">Create Account</button>
   
        </form>
      </div>
    </div>
  );
}
