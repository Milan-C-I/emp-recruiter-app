import { getJob, getUser } from "@/backend";
import { Application } from "@/backend/interface";
import Status from "./status";


export default async function Notify({app}:{app:Application}){
    
    let user = await getUser({userId:app.applicantId});
    // console.log(app);
    let job = await getJob({jobId:app.jobId})
    
    return(
        <div className="notify-user-info">
            <h4>Application :</h4>
            <div className="user-info">
                <div>
                    <label>Applied By : </label><span>@{user?.username}</span>
                </div>
                <div>
                    <label>Applied For : </label><span>{job?.jobTitle}</span>
                </div>
                <div>
                    <label>Age : </label><span>{user?.age}</span>
                </div>
                <div>
                    <label>Gender : </label><span>{user?.gender}</span>
                </div>
                <div>
                    <label>ph number : </label><span>{user?.phoneNum}</span>
                </div>
                <div>
                    <label>email : </label><span>{user?.email}</span>
                </div>
            </div>
            <div className="user-desc">
                <p>{app.applicantDesc}</p>
            </div>
            <Status key={app._id} app={app}/>
        </div>
    );
}