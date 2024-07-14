

export interface Job {
    _id: string,
    recruiterId: string,
    jobTitle: string,
    age: number,
    salary: number,
    location: string,
    description: string,
    createdAt: Date
}

export interface Application {
    _id: string,
    recruiterId: string,
    jobId: string,
    applicantId: string,
    status: string,
    applicantDesc: string
}

export interface User {
    _id: string,
    name: string,
    username: string,
    password: string,
    email: string,
    phoneNum: number,
    role: string,
    gender: string,
    age: number,
    jobs: string[],
}