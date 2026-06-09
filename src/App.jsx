import React, { useState, useEffect } from "react";
import './style.css';
import supabase from "./supabase-client";
import Header from"./components/Header";
import Home from "./pages/Home"
import BrowseTasks from"./pages/BrowseTasks";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Applications from "./pages/Applications"
import MyTasks from "./pages/MyTasks"
import Applied from "./pages/Applied"
import Footer from"./components/Footer";
import AddTask from"./pages/AddTask";
import Body from"./components/Body";
import{BrowserRouter , Routes,Route} from "react-router-dom" ;
function App(){

  const [tasks, setTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const[appliedTasks,setAppliedTasks]=useState(JSON.parse(localStorage.getItem("appliedTasks"))||[]);
      useEffect(() => { fetchTasks(); }, []);
  async function fetchTasks() {
      const { data, error } = await supabase.from("tasks").select("*");

      if (error) {
        console.log(error);
      } 
      else {
        setTasks(data);
      }
    }
  const onDelete = async (task) => {
    console.log("Deleting Task" , task);
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);
     if (error) {
       console.log(error);
       alert("Delete failed");
      }
     else {
       alert("Deleted successfully");
       fetchTasks();
      }
  };
  const addTask = async ( title,desc,category,skills,deadline) => {
      const {
           data: { user },
           } = await supabase.auth.getUser();
      const { data, error } = await supabase.from("tasks").insert([ { title, desc,category,skills,deadline ,poster_email :user.email} ]).select();

      if (error) {
       console.log(error);
       alert("Task not added");
      } 
      else {
       alert("Task added successfully");
       fetchTasks();
      }
    };

  const onApply = async (task) => {
    setSuccessMessage("✅ Application submitted successfully!");
    setTimeout(() => { setSuccessMessage(""); }, 3000);
    const { data: { user }, } = await supabase.auth.getUser();
    if (!user) {
     alert("Please login first");
     return;
    }
    const { data: existingApplication } = await supabase.from("applications").select("*").eq("user_id", user.id).eq("task_id", task.id);

    if (existingApplication.length > 0) {
     alert("You have already applied for this task");
     return;
    }

   const { error } = await supabase.from("applications").insert([
    {
      user_id: user.id,
      task_id: task.id,
      task_title: task.title,
      desc: task.desc,
      category: task.category,
      skills: task.skills,
      poster_email : task.poster_email,
      student_email : user.email,
    }
   ]);

   if (error) {
    console.log(error);
    alert("Application failed");
    alert(error.message);
   }
   else {
    alert("Applied successfully");
   }
  };


  return (
   <BrowserRouter>
     <Header />
     <Routes>

        <Route path="/"
         element={
          <>
          <Home tasks={tasks} addTask={addTask} onDelete={onDelete}/>
          <Footer />
          </>
         }
        />
        <Route path="/browse"
          element={<BrowseTasks tasks ={tasks} onDelete={onDelete} onApply={onApply} successMessage={successMessage}
           />}
        />
        <Route path="/post"
          element={<AddTask addTask={addTask} />}
        />
       <Route path="/login"
          element={<Login />}
       />
       <Route path="/signup"
        element={<SignUp />}
       />
       <Route path="/dashboard"
        element={<Dashboard />}
       />
       <Route path="/applied"
        element={<Applied/>}
       />
       <Route path="/mytasks"
        element={<MyTasks/>}
       />
       <Route
        path="/profile"
        element={<Profile />}
       />
       <Route
        path="/applications"
        element={<Applications />}
       />
       
      </Routes>
   </BrowserRouter>
  );
}
export default App;