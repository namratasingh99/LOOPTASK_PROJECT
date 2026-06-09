import React, { useEffect, useState } from "react";
import supabase from "../supabase-client";

export default function Applications() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchApplications() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("poster_email", user.email);

      if (error) {
        console.log(error);
      } else {
        setApplications(data);
        setLoading(false);
      }
    }

    fetchApplications();

  }, []);
    if (loading) {
     return <h2>Loading applications...</h2>;
    }
  return (
    <div>

      <h1>Applications Received</h1>

      {applications.length > 0 ? (

        applications.map((app) => (

          <div
            key={app.id}
            className="task-card"
          >

            <h3>{app.task_title}</h3>

            <p>
              Category: {app.category}
            </p>

            <p>
              Applicant: {app.student_email}
            </p>

          </div>

        ))

      ) : (

        <p>No applications received yet</p>

      )}

    </div>
  );
}