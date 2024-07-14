'use client';

import { User } from "@/backend/interface";

export default function ProfileCard({user}:{user:User}) {


    return (
            <div className="profile-rec-info">
                <label>Name : <span>{user?.name}</span></label>
                <label>Username : <span>@{user?.username}</span></label>
                <label>Age : <span>{user?.age}</span></label>
                <label>Gender : <span>{user?.gender}</span></label>
                <label>Email : <span>{user?.email}</span></label>
                <label>Phone : <span>{user?.phoneNum}</span></label>
            </div>
    );
}