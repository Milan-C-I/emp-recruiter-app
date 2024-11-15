'use client';

import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Notify from "./notify";
import { Job, User } from "@/backend/interface";
import { getApplicationsByApplicant } from "@/backend";
import JobCard from "./jobCard";
import ProfileCard from "./profilecard";

export default function Menu({user,jobs}:{user:User,jobs:Job[]}) {
    const [applied,setApplied] = useState(null);

    useEffect(() => {
        getApplicationsByApplicant({applicantId: user._id}).then((data) => setApplied(data))
    },[])

    const [notify,setNotify] = useState<boolean>(false);
    const [profile,setProfile] = useState<boolean>(false);

    return(
        <>
            <div className="profile-sidebar">
                <SearchInput/>
                <div className="profile-notify" onClick={() => {
                    setNotify(prevNotify => !prevNotify);
                    setProfile(false);
                }}>
                    {notify ? "← back" : "notify"}
                </div>
                <div className="profile-info" onClick={() => {
                    setProfile(prevProfile => !prevProfile);
                    setNotify(false);
                }}>
                    {profile ? "← back" : "profile"}
                </div>
            </div>
            {profile && <ProfileCard user={user} />}
            {notify && 
                <div className="user-notification">
                    <span>NOTIFICATIONS »</span>
                    { applied?.map((app) => (
                        <Notify key={app.id} app={app} />
                    ))}
                    {applied.length == 0 && <p>No new notifications</p>}
                </div>    
            }
            {!profile && !notify && <div className="profile-body">
                <span>JOB POSTINGS »</span>
                {jobs?.map((job) => (
                    <JobCard key={job._id} job={job} user={user}/>
                ))}
            </div> } 
        </>
    ); 
}