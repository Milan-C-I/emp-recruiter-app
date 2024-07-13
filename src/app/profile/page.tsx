
import "@/styles/profile.css";
import JobCard from "./jobCard";
import { getAllJobs, getUserByEmail } from "@/backend";
import UserProtectedRoute from "../UserProtectedRoute";
import SignOut from "./signout";
import { getServerSession } from "next-auth";
import Menu from "./menu";

export default async function Profile(){
    let session = await getServerSession();
    let user = await getUserByEmail({email: session?.user.email});
    let jobs = await getAllJobs();
    return(
    <UserProtectedRoute>
        <Menu user={user} jobs={jobs}/>
        {/* <div className="profile-body">
            <span>JOB POSTINGS »</span>
            {jobs?.map((job) => (
                <JobCard key={job.id} job={job} user={user} />
            ))}
        </div> */}
        <SignOut/>
    </UserProtectedRoute>
    );
}