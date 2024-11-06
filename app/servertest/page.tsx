
// 服务端渲染test
import { AlertDialogDemo } from "@/components/interviewer-registration"
import { getCurrentUser } from "@/lib/session"

export default async function Page() {

    const { userId } = await getCurrentUser()
    const listUrl = `${process.env.base_url}`+"/api/learn"

    return (

        <><div>mm {userId}</div>
        {listUrl}
            <br />
            <AlertDialogDemo />
        </>
    )
}

