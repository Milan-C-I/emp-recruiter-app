import mongoose from "mongoose";
import * as i from "./interface";
let UserSchema = new mongoose.Schema({
    name: String,
    username: {type:String, unique: true},
    password: String,
    email: {type: String, unique: true},
    phoneNum: {type:Number, validator:{ validate:[/[6-9][0-9]{9}/, "Invalid phone number"], unique: true}},
    role: { type: String, enum: ["Applicant", "Recruiter"]},
    gender: { type: String, enum: ["male", "female"]},
    age: Number,
    jobs: [{ type: mongoose.Types.ObjectId, ref: "jobs" }],
}, {collection: "users"})

let jobsSchema = new mongoose.Schema({
    recruiterId: { type: mongoose.Types.ObjectId, ref: "users" },
    jobTitle: String,
    age: Number,
    salary: Number,
    location: String,
    description: String
},{collection: "jobs",timestamps: true})

let ApplicationsSchema = new mongoose.Schema({
    recruiterId: { type: mongoose.Types.ObjectId, ref: "users" },
    jobId: { type: mongoose.Types.ObjectId, ref: "jobs" },
    applicantId: {type: mongoose.Types.ObjectId, ref: "users"},
    status: {type: String, enum: ["pending","accepted","rejected"]},
    applicantDesc: String
}, {collection: "applications"})


export const UsersModel = mongoose.models.users as mongoose.Model<i.User> || mongoose.model<i.User>('users', UserSchema);
export const ApplicationsModel = mongoose.models.applications as mongoose.Model<i.Application> || mongoose.model<i.Application>('applications', ApplicationsSchema);
export const JobsModel = mongoose.models.jobs as mongoose.Model<i.Job> || mongoose.model<i.Job>('jobs', jobsSchema);