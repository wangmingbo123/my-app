'use client'

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

import { useRouter, usePathname } from 'next/navigation';

import { useSearchParams } from 'next/navigation';

import { Search, Star, Home, Users, MessageSquare, User } from "lucide-react"

export default function InterviewerList() {
    return (
        <div className="container mx-auto p-4">
            {/* 底部bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 py-2">
                <div className="container mx-auto flex justify-around items-center">
                    <Link href="/interviewerList" className="flex flex-col items-center text-sm text-gray-600 hover:text-primary">
                        <Home className="h-6 w-6" />
                        <span>Home</span>
                    </Link>
                    <Link href="/orderList" className="flex flex-col items-center text-sm text-primary">
                        <Users className="h-6 w-6" />
                        <span>Order</span>
                    </Link>
                    <Link href="/chat" className="flex flex-col items-center text-sm text-gray-600 hover:text-primary">
                        <MessageSquare className="h-6 w-6" />
                        <span>Messages</span>
                    </Link>
                    <Link href="/jobSeekerProfile" className="flex flex-col items-center text-sm text-gray-600 hover:text-primary">
                        <User className="h-6 w-6" />
                        <span>Profile</span>
                    </Link>
                </div>
            </nav>

        </div>
    )
}

