'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search } from 'lucide-react'

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
}

const mockContacts: Contact[] = [
  { id: '1', name: 'Alice Johnson', avatar: '/avatars/alice.jpg', lastMessage: 'Thanks for the interview tips!', timestamp: '2023-06-10T14:30:00Z', unreadCount: 2 },
  { id: '2', name: 'Bob Smith', avatar: '/avatars/bob.jpg', lastMessage: 'When can we schedule our next session?', timestamp: '2023-06-09T11:20:00Z', unreadCount: 0 },
  { id: '3', name: 'Charlie Davis', avatar: '/avatars/charlie.jpg', lastMessage: 'The mock interview was very helpful.', timestamp: '2023-06-08T16:45:00Z', unreadCount: 1 },
]

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Messages</CardTitle>
          <p className="text-sm text-muted-foreground">
            Connect with your interviewers for one-on-one consultations
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search contacts..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[400px]">
            {filteredContacts.map((contact) => (
              <Link href={`/chatDetail/${contact.id}`} key={contact.id}>
                <div className="flex items-center space-x-4 p-3 hover:bg-accent rounded-lg cursor-pointer">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {contact.unreadCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs rounded-full"
                      >
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {contact.timestamp}
                        {/* {new Date(contact.timestamp).toLocaleString()} */}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{contact.lastMessage}</p>
                  </div>
                </div>
              </Link>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}