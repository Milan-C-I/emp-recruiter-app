'use client';

import { signOut } from "next-auth/react";

export default function SignOut() {
    return (
        <div className="signout">
            <button className="signout-btn" onClick={() => signOut()}>Sign Out</button>
        </div>
    );
}