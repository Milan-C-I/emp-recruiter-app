import { postJob } from "@/backend";

export default async function JobPost(){
    return(
        <div>
            <form className="add-job" action={postJob}>
                <h1>Enter your Requirements</h1>
                <br/>
                <input type="hidden" name="recruiterId" value="668655bbc787c6fde73323bd"></input>
                <div>
                    <label>Job-Title :</label>
                    <input type="text" name="jobTitle" placeholder="developer" required></input>
                </div><br/>
                <div>
                    <label>Age :</label>
                    <input type="number" name="age" placeholder="22" required></input>
                </div><br/>
                <div>
                    <label>Salary :</label>
                    <input type="number" name="salary" placeholder="22" required></input>
                </div><br/>
                <div>
                    <label>Address :</label>
                    <input type="text" name="location" placeholder="1st street somewhere on earth" required></input>
                </div><br/>
                <div>
                    <label>Description :</label>
                    <textarea name="description" required></textarea>
                </div><br/>
                <input type="submit" value="Create &rarr;"></input>
            </form>
        </div>
    );
}