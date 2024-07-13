'use client';
import { acceptApplication, rejectApplication } from "@/backend";
import { Application } from "@/backend/interface";
import { useState } from "react";
export default function Status({app}:{app:Application}) {
    const [status,setStatus] = useState(app?.status);
    return (
        <div className="status-button">
            <button type="button" onClick={() => {
                acceptApplication({applicationId: app?._id});
                setStatus("accepted");}}> accept</button>
            <button type="button" onClick={() => {
                rejectApplication({applicationId: app?._id});
                setStatus("rejected");
                }}> reject</button>
            <span>{status}</span>
        </div>
    );
}