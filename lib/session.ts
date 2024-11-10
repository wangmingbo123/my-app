import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";

export async function getCurrentUser() {

    return {
        userId: 14872046,
    }
}

export function getCurrentUserTong() {

    return {
        userId: 14872046,
    }
}



export async function getCurrentUserServer() {
    //测试环境
    if (process.env.NODE_ENV === "development") {
        return {
            userId: 14872047,
        }
    }
    const session = await getServerSession(authOptions)

    return session?.user
}
