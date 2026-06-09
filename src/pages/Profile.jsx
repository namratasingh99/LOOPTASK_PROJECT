import React, { useEffect, useState } from "react";
import supabase from "../supabase-client";

export default function Profile() {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProfile(); }, []);
  async function fetchProfile() {
    const {
       data: { user },
        } = await supabase.auth.getUser();
       console.log("Auth User:", user);
       if (!user) {
         return;
        }

     const { data, error } = await supabase .from("users") .select("*") .eq("email", user.email) .single();
     console.log("Profile Data:", data);
     console.log("Profile Error:", error);

     if (error) {
     console.log(error);
     setLoading(false);
     } 
     else {
      setProfile(data);
      setLoading(false);
     }
  }
  if (loading) {
     return <h2>Loading profile...</h2>;
   }
  if (!profile) {
   return <h2>Profile not found in users table</h2>;
  }

  return (
    <div className="profile-container">
     <div className="profile-card">
      <div className="profile-avatar">
        👤
      </div>
      <h1>My Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.Role}</p>
     </div>
    </div>
   </div>
  );
}