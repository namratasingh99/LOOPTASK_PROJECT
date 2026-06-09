import React, { useEffect, useState } from "react";
import supabase from "../supabase-client";

export default function Applied(){
    const [appliedTasks, setAppliedTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log("Received:", appliedTasks);
    useEffect(() => { fetchApplications(); }, []);

   async function fetchApplications() {
     const { data:userData } = await supabase.auth.getUser();
     const user = userData.user;
     const { data, error } = await supabase.from("applications").select("*").eq("user_id", user.id);

     if (error) {
      console.log(error);
      setLoading(false);
      } 
     else {
      setAppliedTasks(data);
      setLoading(false);
      }
    }
    if (loading) {
      return <h2>Loading applied tasks...</h2>;
    }
  return(

     <div>
      <h1>Applied Tasks</h1>
      {appliedTasks && appliedTasks.length>0
       ?

         appliedTasks.map((task,index)=>(
          <div key={index} className="task-card">
          <h3> {task.task_title}</h3>
          <p> {task.desc}</p>
          <p>{task.category} </p>
          <p>{task.skills}</p>
          </div>
        ))

       :

       <p> No tasks applied </p>

      }
   </div>
  )
}