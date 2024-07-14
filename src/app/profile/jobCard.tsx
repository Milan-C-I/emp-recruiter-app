'use client';
import { getApplicationsByApplicant, getUser } from "@/backend";
import { Application, Job, User } from "@/backend/interface";
import { useEffect, useState } from "react";
import ApplyForm from "./applyform";

export default function JobCard({job,user}:{job:Job,user:User}) {
    // console.log(user);
    // let company = await getUser({userId: job.recruiterId});

    const [company,setCompany] = useState(null);
    const [apply,setApply] = useState<boolean>(false);
    const [applied,setApplied] = useState(null);

    useEffect(() => {
        getUser({userId: job.recruiterId}).then((data) => {
            setCompany(data);
        });
        getApplicationsByApplicant({applicantId: user._id}).then((data) => setApplied(data));
    }, [apply]);

    let thisApplication = applied?.find((app) => app.jobId === job._id);
    let checkApplied = thisApplication?.applicantId === user?._id;


    return(
        <>
            <div className="profile-jobs-info">
                <div className="job-det">
                    <div className="job-det-user">
                        <label>My Name:<span>{user?.name}</span></label>
                        <br/>
                        <div className="job-det-image">
                            {checkApplied? "Applied!!!": "Applying"}<br/>Through<br/><span>Emp-Recruiter</span>
                        </div>
                    </div>
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
                </div>
                <div className="apply-info">
                    {checkApplied 
                        ? <label className="applied-msg">Applied</label>
                        : <button type="button" className="applybtn" onClick={() => setApply(!apply)}>{(apply ? '← Cancel' : 'Apply →')}</button>
                    }
                    <label>contact for more info :<span>{company?.phoneNum}</span><br></br><span>{company?.email}</span></label>
                    <br/>
                </div>
                <div className="job-posted">posted:{job?.createdAt.toString().slice(4,15)}</div>
            </div>
            {apply && <ApplyForm job={job} user={user} company={company}/>}
    </>
    );
}