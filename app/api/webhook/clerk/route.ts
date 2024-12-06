import {NextResponse} from "next/server";
import redis from "@/lib/redis";
import {axios} from "@/lib/axios";
import {getInterviewerUidOrderKey} from "@/lib/auth";


export async function POST(request: Request) {
    console.log(request);
    const {
        data: {
            id
        }
    } = await request.json()
    const token = {
        sub: id,
        name: "",
        picture: ""
    }
    if (token.sub) {
        // 登录送5次机会
        const key = getInterviewerUidOrderKey({userId: token.sub})
        await redis.incrby(key, 5)
        try {
            // 发送post请求，同步数据
            const payUrl = "api/syncUser";
            const param = {
                ...token,
                userId: token.sub,
                username: token?.name,
                avatar: token?.picture
            }
            const response = await axios.post(payUrl, {
                ...param
            })
            console.log("syncUser user")
            console.log(response)
        } catch (e) {
            console.error(e)
        }
    }
    return NextResponse.json({data: "Testing Sentry Error..."});
}
