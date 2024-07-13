
import '@/styles/recprofile.css';
import JobCard from './jobCard';
import JobPost from './jobPost';
import Notify from './notify';
import { getApplicationsByRecruiter, getJobsByRecruiter } from '@/backend';
import RecruiterProtectedRoute from '../RecruiterProtectedRoute';
import SignOut from './signout';

export default async function Recprofile(){
    let jobs = await getJobsByRecruiter({recruiterId: "668655bbc787c6fde73323bd"});
    let apps = await getApplicationsByRecruiter({recruiterId: "668655bbc787c6fde73323bd"});
    return(
        <RecruiterProtectedRoute>
            <div className="rec-body">
                <div className="posting">
                    <h1>Create Posting</h1>
                    {/* <button type="button">ADD</button> */}
                    <JobPost/>
                    <br/>
                    <hr/>
                    <h1>Your Postings</h1>
                    {jobs?.map((job) => (
                <JobCard key={job.id} job={job} />   
            ))}
                </div>
                <div className="notification">
                    <h1>notify</h1>
                    {apps?.map((app) => (
                        <Notify key={app.id} app={app}/>
                    ))}
                </div>
            </div>
            <SignOut/>
        </RecruiterProtectedRoute>
    );
}