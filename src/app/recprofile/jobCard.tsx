'use client'

import { useEffect, useState } from 'react';
import { deleteJob, getUser } from '@/backend';
import { Job } from '@/backend/interface';
import '@/styles/profile.css';

export default function JobCard({job}:{job:Job}){

    const [company,setCompany] = useState(null);
    
    useEffect(() => {
        getUser({userId: job.recruiterId}).then((data) => {
            setCompany(data);
        });
    }, []);
    return(
        <div className="jobs-info">
            <div className="job-det">
                <div className="job-det-image">image</div>
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
                <button type="button" className="applybtn" onClick={() => deleteJob({ jobId: job._id })}>delete</button>
                <label>My Contacts : <span>{company?.phoneNum}</span><br></br><span>{company?.email}</span></label>
                <br/>
            </div>
            <div className="job-posted">posted:{job?.createdAt.toString().slice(4,15)}</div>
        </div>
    );
}