
import { useState } from "react";
import { Phone, Mail, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Navbar from "@/components/Navbar";

const Help = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const faqs = [
    {
      question: "How do I list my property?",
      answer: "To list your property, sign up as a property owner, go to your dashboard, and click 'Add New Property'. Fill in all the required details, upload photos, and submit for approval."
    },
    {
      question: "Is there any brokerage fee?",
      answer: "No, our platform is completely free from brokerage fees. You can directly connect with property owners without any middleman charges."
    },
    {
      question: "How do I contact property owners?",
      answer: "Once you find a property you're interested in, you can directly call the owner or use our chat feature to send messages."
    },
    {
      question: "How long does property approval take?",
      answer: "Property approval typically takes 24-48 hours. Our team reviews all listings to ensure quality and authenticity."
    },
    {
      question: "Can I edit my property listing?",
      answer: "Yes, you can edit your property listing anytime from your owner dashboard. Changes will need to be approved again."
    },
    {
      question: "How do I schedule a property visit?",
      answer: "You can schedule a visit by contacting the property owner directly through phone or chat, or use the 'Schedule Visit' button on the property page."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support ticket submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Help & Support</h1>
            <p className="text-lg text-gray-600">
              We're here to help you with any questions or concerns
            </p>
          </div>

          {/* Quick Contact */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Mon-Sat, 9 AM - 6 PM</p>
                <Button 
                  asChild
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  <a href="tel:+918123456789">
                    +91 8123456789
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">24/7 Support</p>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <a href="mailto:support@propertyconnect.com">
                    support@propertyconnect.com
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-4">Quick Response</p>
                <Button 
                  asChild
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  <a href="https://wa.me/918123456789" target="_blank" rel="noopener noreferrer">
                    Chat with Us
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="border-0 shadow-lg mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible 
                  key={index} 
                  open={openFAQ === index} 
                  onOpenChange={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="font-medium">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 text-gray-600">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your issue or question in detail..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Need Immediate Help?</h3>
            <p className="text-gray-600 mb-4">
              For urgent issues, please call us directly or reach out via WhatsApp for the fastest response.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a href="tel:+918123456789">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a href="https://wa.me/918123456789" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
