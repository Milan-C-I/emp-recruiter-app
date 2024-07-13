'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput({defaultValue}:{defaultValue?:string}){
    const [inp,setinp] = useState(defaultValue||"");
    const router = useRouter();

    return(
        <div className="job-search">
            <input type="text" placeholder="search" onChange={e => setinp(e.target.value)} value={inp}></input>
            <button type="button" onClick={() => router.push(`/profile/${inp}`)}>search</button>
        </div>
    );
}