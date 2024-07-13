'use client';

import { createApplication } from "@/backend";
import { Job, User } from "@/backend/interface";
import { useState } from "react";

export default function ApplyForm({job,user,company}:{job:Job,user:User,company:User}){

    const [submit,setSubmit] = useState<boolean>(false);
    const [textAreaValue,setTextAreaValue] = useState<string>("");

    return(
        <div className="application">
            <div className="profile-jobs-info">
                <br/>
                <label className="app-head">APPLYING FOR :</label>
                <div className="job-det-info">
                    <label>NAME : </label><span>{company?.name}</span>
                    <br/>
                    <label>RECRUITING : </label><span>{job?.jobTitle}</span>
                    <br/>
                    <label>SALARY : </label><span>{job?.salary}</span>
                    <br/>
                    <label>AGE: </label><span>{job?.age}+</span>
                    <br/>
                    <label>LOCATIONS : </label><span>{job?.location}</span>
                </div>
                <div className="job-det-desc">
                    <p>{job?.description}</p>
                </div>
                <div className="apply-contact">
                    <label>contact for more info :<span>{company?.phoneNum}</span><br></br><span>{company?.email}</span></label>
                    <br/>
                </div>
                <div className="job-posted">posted:{job?.createdAt.toString().slice(4,15)}</div>
            </div>
            <div className="app-form">
                <div className="app-det">
                    <label>Name : </label><span> {user?.name}</span>
                    <br/>
                    <label>Email : </label><span> {user?.email}</span>
                    <br/>
                    <label>Age : </label><span> {user?.age}</span>
                    <br/>
                </div>
                {user?.age >= job?.age ? 
                        <form action={createApplication} method="post" onSubmit={() => {
                            if(textAreaValue.trim() !== ""){
                                setSubmit(true);
                            }
                        }}>
                        <input type="hidden" name="recruiterId" value={company?._id}></input>
                        <input type="hidden" name="jobId" value={job?._id}></input>
                        <input type="hidden" name="applicantId" value={user?._id}></input>
                        <input type="hidden" name="status" value="pending"></input>
                        <label>Applicant Description:</label><br/><br/>
                        <textarea name="applicantDesc" placeholder="Enter your description" value={textAreaValue} onChange={e => setTextAreaValue(e.target.value)} required></textarea>
                        <br/>
                        {(textAreaValue.trim() !== "" && submit) 
                            ? <span className="applied-msg">Applied</span>
                            : null}
                        {!submit && <input type="submit" value="Apply" className="applybtn" ></input>}
                    </form>
                :<p style={{color:"red"}}>Age should be greater than or equal to {job?.age} to apply</p>
                }
            </div>
        </div>
    );
}