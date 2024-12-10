import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { getCurrentUserServer } from "@/lib/session";
import { UserInfo } from "@/app/userProfile/page";
import { useRouter } from "next/navigation";
import LogoutSidebar from "@/components/LogoutSidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

// Installation command
// npx shadcn@latest add accordion
export default async function Home() {
    const user3 = (await getCurrentUserServer());
    console.log("home page");
    console.log(user3);

    const jumpPath = user3? "/interviewerList" : "/signup";

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-primary text-primary-foreground py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Interview Consulting Experts</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link href="#features" className="hover:underline">Features</Link></li>
                            <li><Link href="#interviewers" className="hover:underline">Interviewers</Link></li>
                            <li><Link href="#testimonials" className="hover:underline">Testimonials</Link></li>
                            <li><Link href="#faq" className="hover:underline">FAQ</Link></li>
                            <li>
                                <SignedIn>
                                    <UserButton />
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
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Improve Your Interview Skills and Win Your Dream Job</h2>
                        <p className="text-xl mb-8">Communicate one-on-one with industry experts and get personalized interview guidance.</p>
                        <Button size="lg" asChild className="p-8 text-lg">
                            {/*<Link href={jumpPath}>Start Now, Click to Sign Up</Link>*/}
                            <SignedOut>
                                {/*<SignInButton mode="modal">*/}
                                {/*    */}
                                {/*    <Button variant="outline" className="bg-white text-black hover:bg-gray-100 hover:text-black border-gray-300">*/}
                                {/*        Start Now, Click to Sign Up*/}
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
                                        Start Now, Click to Sign Up
                                    </Button>
                                </SignInButton>

                                {/*<SignInButton >Start Now, Click to Sign Up</SignInButton>*/}
                                {/*<CusSignInButton></CusSignInButton>*/}

                            </SignedOut>
                        </Button>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Features of Our Service</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "One-on-One Guidance", description: "Have private communication with experienced interviewers." },
                                { title: "Mock Interviews", description: "Experience the real interview environment and get well-prepared in advance." },
                                { title: "Resume Optimization", description: "Get professional suggestions to make your resume stand out." }
                            ].map((feature, index) => (
                                <Card key= {index}>
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
                        <h2 className="text-3xl font-bold text-center mb-12">Our Interviewers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Zhang San", role: "Technical Interview Expert", avatar: "/placeholder.svg?height=100&width=100" },
                                { name: "Li Si", role: "HR Interview Consultant", avatar: "/placeholder.svg?height=100&width=100" },
                                { name: "Wang Wu", role: "Behavioral Interview Expert", avatar: "/placeholder.svg?height=100&width=100" }
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
                        <h2 className="text-3xl font-bold text-center mb-12">User Testimonials</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    name: "Liu Ming",
                                    comment: "Through one-on-one guidance, I successfully passed the interview of my dream company. Thank you very much!",
                                    avatar: "/placeholder.svg?height=60&width=60"
                                },
                                {
                                    name: "Zhao Fang",
                                    comment: "Mock interviews made me more confident in the actual interview. Highly recommend this service!",
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
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                            {[
                                {
                                    question: "How to book an interview consultation?",
                                    answer: "You can register an account on our website, and then choose the appropriate interviewer and time period to make a reservation."
                                },
                                {
                                    question: "What's the consultation fee?",
                                    answer: "The fee varies depending on the interviewer and the consultation duration. You can check the specific price when making a reservation. We also offer bulk purchase discounts."
                                },
                                {
                                    question: "What should I do if I'm not satisfied with the service?",
                                    answer: "We offer a 100% satisfaction guarantee. If you're not satisfied with the service, you can contact our customer service to apply for a refund or reschedule the consultation."
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
                        <h2 className="text-3xl font-bold mb-4">Are you ready to improve your interview skills?</h2>
                        <p className="text-xl mb-8">Sign up now and start your professional interview consulting journey.</p>
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/signup">Sign Up for Free</Link>
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="bg-background py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Interview Consulting Experts. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}