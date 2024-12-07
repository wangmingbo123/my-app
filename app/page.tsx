import Link from 'next/link'
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {getCurrentUserServer} from "@/lib/session";
import {UserInfo} from "@/app/userProfile/page";
import {useRouter} from "next/navigation";
import LogoutSidebar from "@/components/LogoutSidebar";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

// 安装命令
// npx shadcn@latest add accordion
export default async function Home() {
    const user3 = (await getCurrentUserServer())
    console.log("home page")
    console.log(user3)

    const jumpPath = user3 ? "/interviewerList" : "/singup"


    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-primary text-primary-foreground py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">面试咨询专家</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link href="#features" className="hover:underline">特点</Link></li>
                            <li><Link href="#interviewers" className="hover:underline">面试官</Link></li>
                            <li><Link href="#testimonials" className="hover:underline">评价</Link></li>
                            <li><Link href="#faq" className="hover:underline">FAQ</Link></li>
                            <li>
                                <SignedIn>
                                    <UserButton/>
                                </SignedIn>
                            </li>
                        </ul>
                    </nav>
                    {/*<SignedIn>*/}
                    {/*    <UserButton />*/}
                    {/*</SignedIn>*/}
                    {/*{user3?(<LogoutSidebar user={user3}/>):null}*/}
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">提升您的面试技巧，赢得理想工作</h2>
                        <p className="text-xl mb-8">与行业专家一对一交流，获得个性化的面试指导</p>
                        <Button size="lg" asChild className="p-8 text-lg">
                            {/*<Link href={jumpPath}>立即开始,点击注册</Link>*/}
                            <SignedOut>
                                {/*<SignInButton mode="modal">*/}
                                {/*    */}
                                {/*    <Button variant="outline" className="bg-white text-black hover:bg-gray-100 hover:text-black border-gray-300">*/}
                                {/*        立即开始,点击注册*/}
                                {/*    </Button>*/}
                                {/*</SignInButton>*/}
                                <SignInButton mode="modal">
                                    <Button
                                        variant="outline"
                                        className="bg-white text-black border-gray-300
          hover:bg-blue-500 hover:text-white hover:border-blue-500
          transition-all duration-300 ease-in-out
          transform hover:scale-105
          shadow-md hover:shadow-lg
        ">
                                        立即开始,点击注册
                                    </Button>
                                </SignInButton>

                                {/*<SignInButton >立即开始,点击注册</SignInButton>*/}
                                {/*<CusSignInButton></CusSignInButton>*/}

                            </SignedOut>
                        </Button>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">我们的服务特点</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {title: "一对一指导", description: "与经验丰富的面试官进行私人交流"},
                                {title: "模拟面试", description: "体验真实面试环境，提前做好准备"},
                                {title: "简历优化", description: "获得专业建议，让您的简历脱颖而出"}
                            ].map((feature, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Interviewers Section */}
                <section id="interviewers" className="py-16 bg-secondary">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">我们的面试官</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {name: "张三", role: "技术面试专家", avatar: "/placeholder.svg?height=100&width=100"},
                                {name: "李四", role: "HR面试顾问", avatar: "/placeholder.svg?height=100&width=100"},
                                {name: "王五", role: "行为面试专家", avatar: "/placeholder.svg?height=100&width=100"}
                            ].map((interviewer, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6 text-center">
                                        <Avatar className="w-24 h-24 mx-auto mb-4">
                                            <AvatarImage src={interviewer.avatar} alt={interviewer.name}/>
                                            <AvatarFallback>{interviewer.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-xl font-semibold mb-2">{interviewer.name}</h3>
                                        <p className="text-muted-foreground">{interviewer.role}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">用户评价</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    name: "刘明",
                                    comment: "通过一对一指导，我成功通过了梦想公司的面试。非常感谢！",
                                    avatar: "/placeholder.svg?height=60&width=60"
                                },
                                {
                                    name: "赵芳",
                                    comment: "模拟面试让我对实际面试更有信心。强烈推荐这个服务！",
                                    avatar: "/placeholder.svg?height=60&width=60"
                                }
                            ].map((testimonial, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6 flex items-start space-x-4">
                                        <Avatar>
                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name}/>
                                            <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="mb-2">{testimonial.comment}</p>
                                            <p className="font-semibold">{testimonial.name}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-16 bg-secondary">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">常见问题</h2>
                        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                            {[
                                {
                                    question: "如何预约面试咨询？",
                                    answer: "您可以在我们的网站上注册账号，然后选择合适的面试官和时间段进行预约。"
                                },
                                {
                                    question: "咨询费用是多少？",
                                    answer: "费用因面试官和咨询时长而异。您可以在预约时查看具体价格。我们也提供批量购买优惠。"
                                },
                                {
                                    question: "如果对服务不满意怎么办？",
                                    answer: "我们提供100%满意保证。如果您对服务不满意，可以联系客服申请退款或重新安排咨询。"
                                }
                            ].map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent>{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">准备好提升您的面试技巧了吗？</h2>
                        <p className="text-xl mb-8">立即注册，开始您的专业面试咨询之旅</p>
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/singup">免费注册</Link>
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="bg-background py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 面试咨询专家. 保留所有权利。</p>
                </div>
            </footer>
        </div>
    )
}