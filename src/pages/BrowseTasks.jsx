import React from "react";
import supabase from "../supabase-client";

export default function BrowseTasks(props){
  const role="poster";
  return(

    <div className="browse-container">
    <h1 className="browse-title">Browse Tasks</h1>
    { props.successMessage && <p className="success-message"> {props.successMessage}</p> }

    { props.tasks && props.tasks.length===0 ?

      <p className="no-task"> No Tasks Available </p>

      :
     
      props.tasks?.map((task)=>( <div className="task-card" key={task.id} >
        <h2>{task.title}</h2>
        <p> Description: {task.desc} </p>
        <p>Category: {task.category || "Not Added"}</p>
        <p>Skills: {task.skills || "Not Added"}</p>
        <p>Deadline: {task.deadline || "Not Added"}</p>

       {
          role==="Task Poster"?
          <button className="delete-btn" onClick={()=>props.onDelete(task)}> Delete </button>
          :
          <button className="apply-btn" onClick ={()=>props.onApply(task)}>Apply </button>
       }

        </div>
      ))
    }
    </div>
  );
}