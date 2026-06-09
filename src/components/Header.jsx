
import React from 'react'
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase-client";

export default function Header(){
    const [user, setUser] = useState(null);
   useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
         const {
          data: { subscription },
           } = supabase.auth.onAuthStateChange((event, session) => {
          setUser(session?.user ?? null);
          });
        return () => subscription.unsubscribe();
      });
      }, []);

  return(

   <nav className="navbar">
      <Link to ="/" className="logo">LOOPTASK</Link>
      <div className="nav-center">
       <Link to ="/browse">Browse Tasks</Link>
       <Link to ="/post">Post a Task</Link>
      </div>
      <div className="nav-right">
     { !user 
       ?
        (<Link to="/login" className="btn"> Login </Link>)

          :

        (<Link to="/dashboard" className="profile-icon">👤 </Link>)
      }
     </div>
   </nav>
  )
}