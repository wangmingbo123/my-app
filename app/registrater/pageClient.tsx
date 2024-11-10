'use client'

import {useRef, useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {Loader2, Upload, X} from "lucide-react"
import { useRouter } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import {axios} from "@/lib/axios";
import {getCurrentUser, getCurrentUserServer} from "@/lib/session";
import Image from "next/image";
import {supabase} from "@/lib/supabase";
import MultiSelect from "@/components/MultiSelect";

const bucketName = "userinfo"
export default function InterviewerRegistration({user}) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        expertise: "",
        experience: "",
        hourlyRate: "",
        selfIntroduction: "",
        skills: [],
        languages: [],
        availability: [],
        images: [],
        userId:""
        // imagesUrl: [],
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, expertise: value }))
    }

    const handleMultiSelectChange = (name: string) => (value: string[]) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const  url = await handleUpload(files[0])
        console.log("url "+url)

        const newPreviews = files.map(file => url)
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newPreviews] }))

        // const newPreviews = files.map(file => URL.createObjectURL(file))

        setImagePreviews(prev => [...prev, ...newPreviews])

        console.log(formData)
    }
    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
    }

    const randomThreeDigitNumber = () => {
        return Math.floor(Math.random() * 900) + 100;
    };
    const handleUpload = async (file:File) =>  {
        if (!file) return;

        const fileName = randomThreeDigitNumber()+file.name;
        const {data, error} = await supabase.storage
            .from(bucketName) // 替换为你的桶名称
            // .upload(`test/${file.name}`, file);
            .upload(`test/${fileName}`, file);
        console.log("handleUpload start")
        console.log(data)
        console.log(error)
        console.log("handleUpload end")

        const {data: {publicUrl}} = supabase.storage
            .from(bucketName)
            .getPublicUrl(`test/${fileName}`);
        console.log(publicUrl);
        return publicUrl;

    };



    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            // const userId = await getCurrentUser()
            const userId = {...user}

            const body = {
                ...formData,
                "price": formData.hourlyRate,
                "userId": String(userId)
            }
            console.log(body)
            const url = "/api/add"
            const response = await axios.post(url, body)
            console.log(response.data)
            toast({
                title: "Registration Successful",
                description: "Your registration has been submitted successfully.",
            })
            setFormData({
                name: "",
                email: "",
                expertise: "",
                experience: "",
                hourlyRate: "",
                selfIntroduction: "",
                skills: [],
                languages: [],
                availability: [],
                images: [],
                userId: ""
            })
            router.push("/interviewerList")
        } catch (error) {
            console.error('Error submitting form:', error)
            toast({
                title: "Registration Failed",
                description: "There was an error submitting your registration. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Register as an Interviewer</CardTitle>
                <CardDescription>Fill out the form below to register as an interviewer on our platform.</CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="expertise">Area of Expertise</Label>
                        <Select onValueChange={handleSelectChange} value={formData.expertise} required>
                            <SelectTrigger id="expertise">
                                <SelectValue placeholder="Select your area of expertise"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="frontend">Frontend Development</SelectItem>
                                <SelectItem value="backend">Backend Development</SelectItem>
                                <SelectItem value="fullstack">Full Stack Development</SelectItem>
                                <SelectItem value="devops">DevOps</SelectItem>
                                <SelectItem value="mobile">Mobile Development</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                            id="experience"
                            name="experience"
                            type="number"
                            min="0"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                        <Input
                            id="hourlyRate"
                            name="hourlyRate"
                            type="number"
                            min="0"
                            step="1"
                            value={formData.hourlyRate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="skills">Skills</Label>
                        <MultiSelect
                            options={["JavaScript", "React", "Node.js", "Python", "Java", "C++", "SQL", "NoSQL", "AWS", "Docker"]}
                            value={formData.skills}
                            onChange={handleMultiSelectChange("skills")}
                            placeholder="Select your skills"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="languages">Languages</Label>
                        <MultiSelect
                            options={["English", "Mandarin", "Spanish", "French", "German", "Japanese", "Korean", "Russian", "Arabic", "Hindi"]}
                            value={formData.languages}
                            onChange={handleMultiSelectChange("languages")}
                            placeholder="Select languages you speak"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <MultiSelect
                            options={["Weekday Mornings", "Weekday Afternoons", "Weekday Evenings", "Weekend Mornings", "Weekend Afternoons", "Weekend Evenings"]}
                            value={formData.availability}
                            onChange={handleMultiSelectChange("availability")}
                            placeholder="Select your availability"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="selfIntroduction">Self-Introduction</Label>
                        <Textarea
                            id="selfIntroduction"
                            name="selfIntroduction"
                            value={formData.selfIntroduction}
                            onChange={handleInputChange}
                            placeholder="Provide a detailed self-introduction. This will be shown to potential clients."
                            className="h-32"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="images">Profile Images</Label>
                        <div className="flex items-center space-x-4">
                            <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline">
                                <Upload className="mr-2 h-4 w-4"/> Upload Images
                            </Button>
                            <Input
                                id="images"
                                name="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                                ref={fileInputRef}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <Image
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        width={200}
                                        height={200}
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => removeImage(index)}
                                    >
                                        <X className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Submitting...
                            </>
                        ) : (
                            'Register'
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}