
import { isRecruiter } from "@/backend";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function RecruiterProtectedRoute({children}: {children: React.ReactNode}) {
    let session = await getServerSession();
    if (!session?.user) {
        redirect('/')
    }

    if (!await isRecruiter(session.user.email)) {
        redirect('/profile')
    }

    return <>{children}</>
}