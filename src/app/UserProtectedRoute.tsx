
import { isRecruiter } from "@/backend";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function UserProtectedRoute({children}: {children: React.ReactNode}) {
    let session = await getServerSession();
    if (!session?.user) {
        redirect('/')
    }

    if (await isRecruiter(session.user.email)) {
        redirect('/recprofile')
    }

    return <>{children}</>
}