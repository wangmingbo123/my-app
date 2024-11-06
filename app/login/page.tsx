'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Mail } from 'lucide-react'
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // 这里添加登录或注册逻辑
    console.log('Form submitted')
    // signIn("github", {
    //     callbackUrl: `${window.location.origin}`,
    //   });
  }

  const handleGithubLogin = () => {
    // 这里添加 GitHub 登录逻辑
    console.log('GitHub login')
  }

  const handleGoogleLogin = () => {
    // 这里添加 Google 登录逻辑
    console.log('Google login')
  }

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>{isLogin ? '登录' : '注册'}</CardTitle>
        <CardDescription>
          {isLogin ? '登录您的账户' : '创建一个新账户'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input id="email" type="email" placeholder="your@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input id="password" type="password" required />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
          )}
          <Button type="submit" className="w-full">
            {isLogin ? '登录' : '注册'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">或者使用</span>
        </div>
        <div className="mt-4 space-y-2">
          <Button variant="outline" className="w-full" onClick={handleGithubLogin}>
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>
          <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
            <Mail className="mr-2 h-4 w-4" /> Google
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="w-full" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '没有账户？注册' : '已有账户？登录'}
        </Button>
      </CardFooter>
    </Card>
  )
}