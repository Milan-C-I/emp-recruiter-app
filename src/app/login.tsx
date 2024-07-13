"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LogInPage({setToggle}:{setToggle:(e:any)=>any}){
    const [err, setErr] = useState("");
    return(
        <div className="log-in-page">
            <form className="log-in-form" 
            onSubmit={async(e) => { 
                e.preventDefault();
                let res = await signIn("credentials",{redirect:false,...Object.fromEntries(new FormData(e.currentTarget)) as any}); 
                setErr(res.error ? res.error : "Invalid credentials."); 
               }}>
                <div className="log-in-head">Login</div>
                <div>
                    <label>Username : </label>
                    <input type="text" placeholder="username" name="username" required></input>
                </div>
                <br/><br/>
                <div>
                    <label>Password : </label>
                    <input type="password" required  name="password"></input>
                </div>
                <br/>
                {err && <label className="error">Invalid credentials.</label>}
                <br/>
                <button type="button" onClick={() => setToggle(false)}>&larr;back</button>
                <button type="button"><input type="submit" value={"confirm"}></input></button>
            </form>
        </div>
    );
}