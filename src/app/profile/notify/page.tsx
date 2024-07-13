import Link from "next/link";
import Notify from "../notify";
import "@/styles/profile.css";
import { getApplicationsByApplicant } from "@/backend";
export default async function Page() {

    let applied = await getApplicationsByApplicant({applicantId: "66865589c787c6fde73323bb"});

    return(
        <>
            <div className="user-notification">
                {applied?.map((app) => (
                    <Notify key={app.id} app={app} />
                ))}
            </div>
            <Link href="../profile"><button className="pback" type="button">&larr;back</button></Link>
        </>
    );
}