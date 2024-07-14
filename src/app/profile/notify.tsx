'use client';
import { getJob, getUser } from "@/backend";
import { Application } from "@/backend/interface";
import { useEffect, useState } from "react";

export default function Notify({app}:{app:Application}) {

    const [j,setJ] = useState(null);
    const [rec,setRec] = useState(null);
    const [user,setUser] = useState(null);
    
    useEffect(() => {
        getJob({jobId: app.jobId}).then((data) => setJ(() => data));
        getUser({userId: app.applicantId}).then((data) => setUser(data));
        getUser({userId: app.recruiterId}).then((data) => setRec(data));
    }, []);

    // let j = await getJob({jobId: app.jobId});
    // let rec = await getUser({userId: j?.recruiterId});
    // let user = await getUser({userId: app.applicantId});


    return(
        <div className="pnotify-info">
            <div className="pnotify"> 
                <div className="pnotify-user-info">
                    <label>Your name : <span>{user?.name}</span></label>
                    <br/>
                    <label>Your Age : <span>{user?.age}</span></label>
                    <br/>
                    <label>Gender : <span>{user?.gender}</span></label>
                    <br/>
                </div>
                <div className="pnotify-rec-info">       
                    <label>Applied for : <span>{j?.jobTitle}</span></label>
                    <br/>
                    <label>recruiter name : <span>{rec?.name}</span></label>
                    <br/>
                    <label>salary : <span>{j?.salary}</span></label>
                    <br/>
                    <label>Required age : <span>{j?.age}+</span></label>
                    <br/>
                    <label>location <span>{j?.location}</span></label>
                    <br/>
                </div>
                <div className="pnotify-desc">
                    <label>description : <p>{j?.description}</p></label>
                </div>
            </div>
            <div className="pnotify-status-info">
                <div className="pnotify-status">
                    <label className="status">status : <span>{app?.status.toUpperCase()}</span></label>
                    <br/>
                    <label>contact : <span>{rec?.phoneNum}</span><br/><span>{rec?.email}</span></label>
                </div>
            </div>
            <br/>
            <br/>
            <div className="job-posted">posted:{j?.createdAt.toString().slice(4,15)}</div>
        </div>
    );
}