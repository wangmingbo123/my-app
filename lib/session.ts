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
    const session = await getServerSession(authOptions)

    return session?.user
}
