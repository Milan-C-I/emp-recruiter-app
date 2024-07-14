
import '@/styles/recprofile.css';
import JobCard from './jobCard';
import JobPost from './jobPost';
import Notify from './notify';
import { getApplicationsByRecruiter, getJobsByRecruiter, getUserByEmail } from '@/backend';
import RecruiterProtectedRoute from '../RecruiterProtectedRoute';
import SignOut from './signout';
import { getServerSession } from 'next-auth';
import ProfileCard from './profilecard';

export default async function Recprofile(){
    let session = await getServerSession();
    let user = await getUserByEmail({email: session?.user.email});
    let jobs = await getJobsByRecruiter({recruiterId: user?._id});
    let apps = await getApplicationsByRecruiter({recruiterId: user?._id});
    return(
        <RecruiterProtectedRoute>
            <div className="rec-body">
                <div className="posting">
                    <h1>Create Posting</h1>
                    {/* <button type="button">ADD</button> */}
                    <JobPost user={user}/>
                    <br/>
                    <hr/>
                    <h1>Your Postings</h1>
                    {jobs?.map((job) => (
                <JobCard key={job.id} job={job} />   
            ))}
                </div>
                <div className="notification">
                    <h1>My Profile</h1>
                    <ProfileCard user={user}/>
                    <h1>Notify</h1>
                    {apps?.map((app) => (
                        <Notify key={app.id} app={app}/>
                    ))}
                </div>
            </div>
            <SignOut/>
        </RecruiterProtectedRoute>
    );
}