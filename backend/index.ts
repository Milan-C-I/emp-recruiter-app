"use server"
import mongoose from "mongoose";
import { ApplicationsModel, UsersModel, JobsModel } from "./model";
let isConnected = false;
async function connect() {
    if (isConnected) {
        return;
    }
    await mongoose.connect("mongodb://localhost:27017/emprecruiter");
    isConnected = true;
}

export async function createUserIfNotExists(user: any) {
    try {
        await connect();
        if (await UsersModel.findOne({$or:[{ email: user.email }, { phoneNum: user.phoneNum }, { username: user.username }] })) {
            return null;
        }
        await UsersModel.create(user);
        return true;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function createApplication(application: FormData) {
    try {
        await connect();
        if(await ApplicationsModel.findOne({$and:[{ applicantId: application.get("applicantId") }, { jobId: application.get("jobId") },{recruiterId: application.get("recruiterId")}] })) {
           return null; 
        }
        await ApplicationsModel.create(Object.fromEntries(application.entries()));
        return true;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function logIn(user: { username: string, password: string }) {
    try {
        await connect();
        return (await UsersModel.findOne(user))?.toJSON();
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getApplicationsByRecruiter({ recruiterId }: { recruiterId: string }) {
    try {
        await connect();
        return await ApplicationsModel.find({ recruiterId });
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getApplicationsByApplicant({ applicantId }: { applicantId: string }) {
    try {
        await connect();
        return JSON.parse(JSON.stringify(await ApplicationsModel.find({ applicantId })));
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getAllJobs() {
    try {
        await connect();
        return JSON.parse(JSON.stringify(await JobsModel.find()));
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getJobsByQuery(query: string) {
    try {
        await connect();
        return await JobsModel.find({ $or: [{ jobTitle: { $regex: new RegExp(`.*${query}.*`, 'i') } }, { description: { $regex: new RegExp(`.*${query}.*`, 'i') } }] });
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getJobsByRecruiter({ recruiterId }: { recruiterId: string }) {
    try {
        await connect();
        return await JobsModel.find({ recruiterId });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function postJob(job: FormData) {
    try {
        await connect();
        await JobsModel.create(Object.fromEntries(job.entries()));
        return true;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getJob({ jobId }: { jobId: string }) {
    try {
        await connect();
        return JSON.parse(JSON.stringify(await JobsModel.findOne({ _id: jobId })));
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function deleteJob({ jobId }: { jobId: string }) {
    try {
        await connect();
        return await JobsModel.deleteOne({ _id: jobId });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function searchJob(query: string) {
    try {
        await connect();
        return await JobsModel.find({ $text: { $search: query } });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getUser({ userId }: { userId: string }) {
    try {
        await connect();
        console.log(userId);
        return JSON.parse(JSON.stringify(await UsersModel.findById(userId)));
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getUserByEmail({ email }: { email: string }) {
    try {
        await connect();
        // console.log(email);
        return JSON.parse(JSON.stringify(await UsersModel.findOne({email})));
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function acceptApplication({ applicationId }: { applicationId: string }) {
    try {
        await connect();
        return await ApplicationsModel.updateOne({ _id: applicationId }, { $set: { status: "accepted" } });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function rejectApplication({ applicationId }: { applicationId: string }) {
    try {
        await connect();
        return await ApplicationsModel.updateOne({ _id: applicationId }, { $set: { status: "rejected" } });
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function isRecruiter(email: string) {
    try {
        await connect();
        return await UsersModel.findOne({ email, role:"Recruiter" });
    } catch (err) {
        console.log(err);
        return null;
    }
}
