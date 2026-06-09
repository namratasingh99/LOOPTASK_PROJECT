import React, { useState, useEffect } from "react";
import{Link ,useNavigate} from "react-router-dom"
import supabase from "../supabase-client";

export default function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
    };
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");
    useEffect(() => { supabase.auth.getUser().then(async({ data }) => { 
      setUser(data.user);

      if (data.user) {
        const { data: userData, error } = await supabase.from("users").select("role").eq("email", data.user.email).single();
        
        if (userData) {
           setRole(userData.role);
          }
          setLoading(false);
        }
        else{
          setLoading(false);
        }

    }); }, []);
    
    if (loading) {
       return <h2>Loading...</h2>;
      }
    if (!user) {
        return (
        <div className="dashboard">
        <h1>Welcome to Looptask 🚀</h1>
        <p>Please login or sign up to continue.</p>
        </div>
       );
    }
    console.log("Role from DB:", role);
  return (

    <div className="dashboard">
    <h1>Welcome to Looptask 🚀</h1>
     { role === "Student Worker"
         ?

        <div className="student">
         <Link to = "/browse" className="box">
            <h2>Browse Tasks</h2>
            <p>Find work opportunities</p>
          </Link>
         <Link to ="/applied" className="box">
            <h2>Applied Tasks</h2>
            <p>View applications</p>
         </Link>
         <Link to = "/profile" className="box">
           <h2>Profile</h2>
           <p>Edit profile</p>
         </Link>
        </div>

         :

        <div className="poster">
          <Link to ="/post" className="box">
             <h2>Post Task</h2>
             <p>Create task</p>
          </Link>
          <Link to = "/mytasks" className="box">
              <h2>My Tasks</h2>
              <p>See posted tasks</p>
          </Link>
          <Link to ="/applications" className="box">
              <h2>Applications</h2>
              <p>See applicants</p>
          </Link>
        </div>

      }
      <br />
       <button onClick={handleLogout}>Logout</button>

      </div>
  );
}