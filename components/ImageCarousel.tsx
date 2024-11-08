'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Interviewer {
    id: string
    name: string
    email: string
    expertise: string
    experience: string
    hourlyRate: string
    selfIntroduction: string
    skills: string[]
    languages: string[]
    availability: string[]
    images: string[]
}

const ImageCarousel = ({ images }: { images: string[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel()

    const scrollPrev = () => {
        if (emblaApi) emblaApi.scrollPrev()
    }

    const scrollNext = () => {
        if (emblaApi) emblaApi.scrollNext()
    }

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {images?.map((image, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0">
                            <div className="relative w-full h-64 md:h-96">
                                <Image
                                    src={image || '/placeholder.svg?height=384&width=384'}
                                    alt={`Interviewer image ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-2 transform -translate-y-1/2"
                onClick={scrollPrev}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={scrollNext}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default ImageCarousel
