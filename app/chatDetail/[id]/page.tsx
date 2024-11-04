'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, RefreshCw } from 'lucide-react'
import moment from 'moment';

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
}

interface ChatParticipant {
  id: string
  name: string
  avatar: string
}



const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'user',
    content: 'Hi, I have some questions about the upcoming interview.',
    timestamp: '2023-06-10T14:32:00',
  },
  {
    id: '2',
    senderId: 'interviewer',
    content: 'Sure, I\'d be happy to help. What would you like to know?',
    timestamp: '2023-06-10T14:32:00',
  },
  {
    id: '3',
    senderId: 'user',
    content: 'What should I prepare for a system design interview?',
    timestamp: '2023-06-10T14:32:00',
  },
  {
    id: '4',
    senderId: 'interviewer',
    content: 'For system design interviews, it\'s important to understand scalability, load balancing, caching, and database design. Would you like me to elaborate on any of these topics?',
    timestamp: '2023-06-10T14:32:00',
  },
];

const mockParticipants: ChatParticipant[] = [
  { id: '1', name: 'Alice Johnson', avatar: '/avatars/alice.jpg' },
  { id: '2', name: 'Bob Smith', avatar: '/avatars/bob.jpg' },
  { id: '3', name: 'Charlie Davis', avatar: '/avatars/charlie.jpg' },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [participants, setParticipants] = useState<ChatParticipant[]>(mockParticipants)
  const [selectedParticipant, setSelectedParticipant] = useState<ChatParticipant>(mockParticipants[0])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'user',
        content: newMessage.trim(),
        timestamp: new Date().toISOString()
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulating an API call to fetch new messages
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'interviewer',
        content: 'This is a new message from refreshing.',
        timestamp: new Date().toISOString()
      }
      setMessages(prevMessages => [newMessage, ...prevMessages])
      setIsRefreshing(false)
    }, 1000)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget
    if (scrollTop === 0 && !isRefreshing) {
      handleRefresh()
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/chat')}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Avatar>
            <AvatarImage src={selectedParticipant.avatar} alt={selectedParticipant.name} />
            <AvatarFallback>{selectedParticipant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <CardTitle>{selectedParticipant.name}</CardTitle>
        </CardHeader>
        <div className="flex-shrink-0 p-4 border-b overflow-x-auto">
          <div className="flex space-x-2">
            {participants.map((participant) => (
              <Avatar 
                key={participant.id} 
                className="cursor-pointer"
                onClick={() => setSelectedParticipant(participant)}
              >
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <CardContent className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full" onScroll={handleScroll} ref={scrollAreaRef}>
            {isRefreshing && (
              <div className="text-center py-2 text-sm text-muted-foreground">
                Loading more messages...
              </div>
            )}
            <div className="space-y-4 p-4">
              {messages.map((message, index) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp}
                      {/* {new Date(message.timestamp).toLocaleString()} */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}