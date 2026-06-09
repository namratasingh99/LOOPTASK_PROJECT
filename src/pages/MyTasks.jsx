import React, { useEffect, useState } from "react";
import supabase from "../supabase-client";

export default function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchTasks() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("poster_email", user.email);

      if (error) {
        console.log(error);
      } else {
        setTasks(data);
        setLoading(false);
      }
    }

    fetchTasks();

  }, []);
  
  async function deleteTask(id) {
    if (!window.confirm("Delete this task?")) {
  return;
}

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Delete failed");
    console.log(error);
  } else {
    alert("Task deleted successfully");

    setTasks(
      tasks.filter(
        (task) => task.id !== id
      )
    );
  }
}
   if (loading) {
      return <h2>Loading Tasks...</h2>;
    }

  return (
    <div>
      <h1>My Tasks</h1>

      {tasks.length > 0 ? (

        tasks.map((task) => (

          <div key={task.id} className="task-card">

            <h3> Title :{task.title}</h3>

            <p>{task.desc}</p>

            <p>{task.category}</p>

            <p>{task.skills}</p>

            <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
           >
            Delete
          </button>

          </div>

        ))

      ) : (

        <p>No tasks posted yet</p>

      )}
    </div>
  );
}