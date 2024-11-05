'use client'

import { useState } from "react"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from  "@/hooks/use-toast"
import { Loader2, Check } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

const expertiseOptions = [
  { id: "frontend", label: "Frontend Development" },
  { id: "backend", label: "Backend Development" },
  { id: "fullstack", label: "Full Stack Development" },
  { id: "devops", label: "DevOps" },
  { id: "mobile", label: "Mobile Development" },
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  expertise: z.array(z.string()).min(1, {
    message: "Please select at least one area of expertise.",
  }),
  experience: z.number().min(0, {
    message: "Experience must be a positive number.",
  }),
  hourlyRate: z.number().min(0, {
    message: "Hourly rate must be a positive number.",
  }),
  selfIntroduction: z.string().min(1, {
    message: "Self-introduction must be at least 50 characters.",
  }).max(1000, {
    message: "Self-introduction must not exceed 1000 characters.",
  }),
})

export default function InterviewerRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      expertise: [],
      experience: 0,
      hourlyRate: 0,
      selfIntroduction: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      console.log(values)
      values["price"]=values["hourlyRate"]
      console.log(values)

      const response = await axios.post('https://api.example.com/register-interviewer', values)
      console.log(response.data)
      toast({
        title: "Registration Successful",
        description: "Your registration has been submitted successfully.",
      })
      form.reset()
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expertise"
              render={() => (
                <FormItem>
                  <FormLabel>Areas of Expertise</FormLabel>
                  <div className="space-y-2">
                    {expertiseOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="expertise"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, option.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== option.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selfIntroduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Self-Introduction</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-32" />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed self-introduction. This will be shown to potential clients (50-1000 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
      </Form>
    </Card>
  )
}