
import "@/styles/profile.css";
import JobCard from "../jobCard";
import { getJobsByQuery, getUserByEmail } from "@/backend";
import SearchInput from "./SearchInput";
import { getServerSession } from "next-auth";
import Menu from "./menu";

export default async function Profile({params:{query}}){
    // console.log(query)
    let session = await getServerSession();
    let user = await getUserByEmail({email: session?.user.email});
    let jobs = await getJobsByQuery(query)
    return(
    <>
        <Menu user={user} jobs={jobs} query={query}/>
    </>
    );
}