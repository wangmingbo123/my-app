'use client'

import { useState, useRef } from "react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, X, Upload } from "lucide-react"
import {supabase} from "@/lib/supabase";

const expertiseOptions = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Mobile Development",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Product Management",
  "Other"
]

const bucketName = "userinfo"

// 带文件上传
export default function InterviewerRegistration() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    hourlyRate: "",
    selfIntroduction: "",
    images: [] as File[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, expertise: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
    const  url = await handleUpload(files[0])
    console.log("url "+url)

    const newPreviews = files.map(file => url)
    // const newPreviews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(prev => [...prev, ...newPreviews])
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

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your backend
      // For this example, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: "Registration Successful",
        description: "Your interviewer profile has been created.",
      })

      router.push('/interviewer-dashboard') // Redirect to dashboard or confirmation page
    } catch (error) {
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
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Register as an Interviewer</CardTitle>
            <CardDescription>Fill out the form below to create your interviewer profile.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
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
                    <SelectValue placeholder="Select your area of expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    {expertiseOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
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
                    step="0.01"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selfIntroduction">Self Introduction</Label>
                <Textarea
                    id="selfIntroduction"
                    name="selfIntroduction"
                    value={formData.selfIntroduction}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself, your experience, and why you'd be a great interviewer."
                    className="h-32"
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Profile Images</Label>
                <div className="flex items-center space-x-4">
                  <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> Upload Images
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
                          <X className="h-4 w-4" />
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                ) : (
                    'Register'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
  )
}