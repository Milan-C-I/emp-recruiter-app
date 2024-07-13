
import "@/styles/profile.css";
import JobCard from "../jobCard";
import { getJobsByQuery, getUserByEmail } from "@/backend";
import SearchInput from "./SearchInput";
import { getServerSession } from "next-auth";

export default async function Profile({params:{query}}){
    // console.log(query)
    let session = await getServerSession();
    let user = await getUserByEmail({email: session?.user.email});
    let jobs = await getJobsByQuery(query)
    return(
    <>
        <div className="profile-sidebar">
            <SearchInput defaultValue={query}/>
            <div className="profile-notify">
                notify
            </div>
            <div className="profile-info">
                profile
            </div>
        </div>
        <div className="profile-body">
            {jobs?.map((job) => (
                <JobCard key={job.id} job={job} user={user}/>
            ))}
        </div>
    </>
    );
}