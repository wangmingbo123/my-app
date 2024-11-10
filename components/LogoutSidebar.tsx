'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User } from 'lucide-react'
import {signOut} from "next-auth/react";

export default function LogoutSidebar({user}) {
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    // 在这里处理退出登录逻辑
    console.log('用户退出登录')
    signOut({
      callbackUrl: `${window.location.origin}/singup`,
    });
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="用户菜单">
          <Avatar>
            <AvatarImage src={user?.avatar} alt="用户头像" />
            <AvatarFallback>{user?.username}</AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>用户菜单</SheetTitle>
          <SheetDescription>
            管理您的账户设置和退出登录
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <Button variant="outline" className="w-full justify-start" onClick={() => console.log('查看个人资料')}>
            <User className="mr-2 h-4 w-4" />
            个人资料
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => console.log('打开设置')}>
            <Settings className="mr-2 h-4 w-4" />
            设置
          </Button>
          <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            退出登录
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}