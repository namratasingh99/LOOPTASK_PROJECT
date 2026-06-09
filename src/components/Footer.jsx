import React from 'react';
export default function Footer(){
return(
 <footer className="looptask-footer">
    <div className="footer-box">
       <h2>Looptask</h2>
       <p>Earn, Learn and Build in College</p>
    </div>

    <div className="footer-box">
    <h3>Quick Links</h3>
    <p>Home</p>
    <p>Browse Tasks</p>
    <p>Post a Task</p>
    <p>Login</p>
    </div>

   <div className="footer-box">
     <h3>Contact</h3>
     <a href="mailto:looptask.platform@gmail.com">Email</a>
     <a href="https://instagram.com/looptask">Instagram</a>
     <p>For Colleges & Startups</p>
   </div>

 </footer>
)
}