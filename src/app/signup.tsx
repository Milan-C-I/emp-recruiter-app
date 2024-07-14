"use client"

import { createUserIfNotExists } from "@/backend";
import { useState } from "react";

export default function SignUpPage({setToggle}:{setToggle:(e:any)=>any}) {
    const [msg, setMsg] = useState<any>("");
    return (
        <div className="sign-up-page">
            <form className="sign-up-form" 
            onSubmit={async(e) => { 
                e.preventDefault(); 
                let res = await createUserIfNotExists(Object.fromEntries(new FormData(e.currentTarget))); 
                setMsg(<span className="error" style={{color:`${res?'green':'red'}`}}>{res? "Success Go To Login!":"User already exists!"}</span>)
                }}>
                <div className="sign-up-head">SignUp</div>
                <div>
                    <label>Email : </label>
                    <input type="text" placeholder="123@gmail.com" name="email" required></input>
                </div>
                <br />
                <div>
                    <label>ph number : </label>
                    <input type="tel" placeholder="1234567890" name="phoneNum" pattern="[6-9][0-9]{9}" required></input>
                </div>
                <br />
                <div>
                    <label>Age : </label>
                    <input type="number" placeholder="18" name="age" required></input>
                </div>
                <br />
                <div className="gender">
                    <label>Gender :</label><br />
                    <label>
                        Male
                        <input type="radio" name="gender" value="male" required></input>
                    </label>
                    <label>
                        Female
                        <input type="radio" name="gender" value="female" required></input>
                    </label> 
                </div>
                <br />
                <label>
                    Job_Aspirant
                    <input type="radio" name="role" value="Applicant" required></input>
                </label><br />
                <label>
                    Recruiter
                    <input type="radio" name="role" value="Recruiter" required></input>
                </label>
                <br />
                <div>
                    <label>Name : </label>
                    <input type="text" placeholder="Name" name="name" required></input>
                </div>
                <br />
                <div>
                    <label>Username : </label>
                    <input type="text" placeholder="username" name="username" required></input>
                </div>
                <br />
                <div>
                    <label> Password : </label>
                    <input type="password" name="password" required></input>
                </div>
                <br />
                {msg && <>{msg}</>}
                <br />
                <button type="button" onClick={() => setToggle(false)}>&larr;back</button>
                <button type="button"><input type="submit"></input></button>
            </form>
        </div>
    );
}