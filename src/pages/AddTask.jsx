import React,{useState} from "react";

export default function AddTask(props){

  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [category,setCategory]=useState("");
  const [skills,setSkills]=useState("");
  const [deadline,setDeadline]=useState("");
  const [message,setMessage]=useState("");

  const submit=(e)=>{
     e.preventDefault();
     if(title===""||desc===""||category===""||skills===""){
        alert("Fill all required fields");
      }
     else{
        props.addTask(title,desc,category,skills,deadline);
        setMessage("Task Added Successfully !!");
        setTitle("");
        setDesc("");
        setCategory("");
        setSkills("");
        setDeadline("");
      }
    }

 return(

     <div className="task-box">

     <form onSubmit={submit} className="task-form">
     <h2>Post a Task</h2>
     <input type="text" placeholder="Task Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
     <textarea placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} > </textarea>
     <select value={category} onChange={(e)=>setCategory(e.target.value)}>
       <option value="">Category</option>
       <option>Web Development</option>
       <option>App Development</option>
       <option>UI / UX</option>
       <option>Content Writing</option>
       <option>Marketing</option>
       <option>Video Editing</option>
       <option>AI / ML</option>
       <option>Graphic Designing</option>
      </select>
       <input type="text" placeholder="Required Skills" value={skills} onChange={(e)=>setSkills(e.target.value)} />
      <div className="date-box">
      <label>Deadline</label>
     <input type="date" value={deadline} onChange={(e)=>setDeadline(e.target.value)}/>
     </div>
      {message && <p className="success-msg">{message}</p>}
     <button type="submit" className="task-btn">Post Task</button>
     </form >
     </div>
    )
}