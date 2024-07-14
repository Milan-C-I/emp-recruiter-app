import { postJob } from "@/backend";
import { User } from "@/backend/interface";

export default async function JobPost({user}:{user:User}) {
    return(
        <div>
            <form className="add-job" action={postJob}>
                <h1>Enter your Requirements</h1>
                <br/>
                <input type="hidden" name="recruiterId" value={user._id}></input>
                <div>
                    <label>Job-Title :</label>
                    <input type="text" name="jobTitle" placeholder="Enter job title" required></input>
                </div><br/>
                <div>
                    <label>Age :</label>
                    <input type="number" name="age" placeholder="Enter age required" required></input>
                </div><br/>
                <div>
                    <label>Salary :</label>
                    <input type="number" name="salary" placeholder="Enter your salary" required></input>
                </div><br/>
                <div>
                    <label>Address :</label>
                    <input type="text" name="location" placeholder="Enter your address" required></input>
                </div><br/>
                <div>
                    <label>Description :</label>
                    <textarea name="description" placeholder="Enter job description" required></textarea>
                </div><br/>
                <input type="submit" value="Create &rarr;"></input>
            </form>
        </div>
    );
}