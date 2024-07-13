'use client'
import "@/styles/login.css";
import LogInPage from "./login";
import SignUpPage from "./signup";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [toggle, setToggle] = useState<boolean|string>(false);

  let {data} = useSession();
  if(data){
    return redirect("/profile");
  }
  return (
    <main>
      <div className="emp-info">
        <p>
          <span>Emp-Recruiter</span> is a cutting-edge web application designed to streamline the job application and recruitment process. Job seekers can easily browse and apply for a variety of job opportunities, creating personalized profiles to showcase their skills and experience.Recruiters and hiring managers can post job listings, search for potential candidates, and manage applications through an intuitive interface. With features like automated matching, application tracking, and direct communication tools, <span>Emp-Recruiter</span> enhances the efficiency of the hiring process, making it easier for employers to find the right talent and for candidates to land their dream jobs.</p>
      </div>
      <div className="log-sign-in">
        <div className="log-in">
          <span>Have an account?</span>
          <button className="log-in-btn" onClick={() => setToggle("logIn")}>LOG-IN</button>
        </div>
        <div className="sign-in">
          <span>Create an account?</span>
          <button className="sign-in-btn" onClick={() => setToggle("signUp")}>SIGN-UP</button>
        </div>
      </div>
      {toggle === "logIn" && <LogInPage setToggle={setToggle}/>}
      {toggle === "signUp" && <SignUpPage setToggle={setToggle}/>}
    </main>
  );
}
