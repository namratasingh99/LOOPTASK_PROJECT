import React from 'react';
import {Link} from "react-router-dom";

export default function Body() {
  return (
    <div>
       <div className="hero-section">

         <div className="hero-left">

            <h1> Empowering College Students to Build, Earn and Grow</h1>
            <p>Looptask helps students gain real-world experience,connect with startups, work on projects and build 
               their portfolio before graduation.</p>

            <div className="hero-buttons">
            <Link to ="/browse"><button className="work-btn">FIND WORK</button></Link>
            <button className="hire-btn">HIRE A STUDENT</button>
         </div>
       </div>

      <div className="hero-right">
        <img src = "/upworkImage.png" className ="hero-image" />
      </div>
     </div>

     <div className="feature-section">

      <div className="feature-card">
        <h2>📝 Post your task</h2>
        <p> Create projects, assignments, design work or college tasks. </p>
      </div>

      <div className="feature-card">
        <h2>👩‍💻 Find student talent</h2>
        <p> Hire skilled students for coding, editing, design and content.</p>
      </div>

      <div className="feature-card">
        <h2>🚀 Earn & collaborate</h2>
        <p> Work together, finish projects and earn from skills.</p>
      </div>
      </div>
    </div>   
  )
}
