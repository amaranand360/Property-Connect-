
import { useState } from "react";
import { Send, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);

  const conversations = [
    {
      id: 1,
      name: "Rajesh Kumar",
      property: "2 BHK Apartment, BTM Layout",
      lastMessage: "The property is available for immediate move-in",
      time: "2:30 PM",
      unread: 2,
      avatar: "RK",
      online: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      property: "3 BHK House, Koramangala",
      lastMessage: "Can we schedule a visit tomorrow?",
      time: "1:15 PM",
      unread: 0,
      avatar: "PS",
      online: false
    },
    {
      id: 3,
      name: "Amit Patel",
      property: "1 BHK Studio, Indiranagar",
      lastMessage: "What about the parking facility?",
      time: "11:45 AM",
      unread: 1,
      avatar: "AP",
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "other",
      content: "Hi! I'm interested in your 2 BHK apartment in BTM Layout.",
      time: "2:25 PM"
    },
    {
      id: 2,
      sender: "me",
      content: "Hello! Thank you for your interest. The apartment is available for immediate move-in.",
      time: "2:27 PM"
    },
    {
      id: 3,
      sender: "other",
      content: "Great! What's the monthly rent and security deposit?",
      time: "2:28 PM"
    },
    {
      id: 4,
      sender: "me",
      content: "The monthly rent is ₹25,000 and security deposit is ₹50,000. It includes water and maintenance charges.",
      time: "2:29 PM"
    },
    {
      id: 5,
      sender: "other",
      content: "The property is available for immediate move-in",
      time: "2:30 PM"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Messages</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[500px] sm:h-[600px]">
            {/* Conversations List - Mobile Responsive */}
            <Card className="border-0 shadow-lg lg:col-span-1 order-2 lg:order-1">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Conversations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[200px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedChat(conversation.id)}
                      className={`p-3 sm:p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                        selectedChat === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm">
                              {conversation.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-semibold text-xs sm:text-sm truncate">{conversation.name}</p>
                            <span className="text-xs text-gray-500 ml-1">{conversation.time}</span>
                          </div>
                          <p className="text-xs text-blue-600 mb-1 truncate">{conversation.property}</p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        </div>
                        
                        {conversation.unread > 0 && (
                          <Badge className="bg-blue-600 text-white text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window - Mobile Responsive */}
            <Card className="border-0 shadow-lg lg:col-span-2 flex flex-col order-1 lg:order-2">
              {/* Chat Header */}
              <CardHeader className="pb-3 sm:pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm">
                          {selectedConversation?.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation?.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">{selectedConversation?.name}</h3>
                      <p className="text-xs sm:text-sm text-blue-600">{selectedConversation?.property}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1 sm:space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9">
                      <Video className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9">
                      <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
                        msg.sender === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-xs sm:text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="p-3 sm:p-4 border-t">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9">
                    <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 text-sm"
                  />
                  <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9">
                    <Smile className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 h-8 sm:h-9 px-3 sm:px-4">
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Chat;
