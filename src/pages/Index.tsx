
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, MapPin, TrendingUp, Users, Home as HomeIcon, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { getApprovedProperties } from "@/store/propertyStore";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8; // Show 8 properties per page
  
  // Only show approved properties on the public homepage
  const allProperties = getApprovedProperties();
  const featuredProperties = allProperties.filter(p => p.featured);
  
  const totalPages = Math.ceil(allProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const paginatedProperties = allProperties.slice(startIndex, startIndex + propertiesPerPage);

  const stats = [
    {
      icon: HomeIcon,
      title: "Properties Listed",
      value: allProperties.length,
      description: "Active approved listings",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Happy Customers",
      value: "500+",
      description: "Satisfied clients",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MapPin,
      title: "Locations",
      value: "25+",
      description: "Areas covered",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Success Rate",
      value: "98%",
      description: "Customer satisfaction",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-slate-700 to-slate-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="mb-6">
            <Badge className="bg-yellow-500/90 text-white px-4 py-2 text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-1" />
              #1 Property Platform in Bangalore
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              Perfect Home
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl mt-2 text-blue-100 font-medium">
              Without Any Hassle
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Discover amazing properties directly from owners. No brokers, no hidden fees. 
            <span className="block mt-2 font-semibold text-yellow-300">
              Your dream home is just one click away!
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-xl">
              <Link to="/search">
                <Search className="mr-2 h-5 w-5" />
                Search Properties Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-whitetext-slate-800 px-8 py-4 text-lg font-semibold">
              <Link to="/login">
                List Your Property Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200 text-sm">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1 text-red-400" />
              <span>Trusted by 1000+ families</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              <span>4.8/5 rating</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-green-400" />
              <span>25+ locations covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className={`border-0 shadow-lg bg-gradient-to-r ${stat.color} text-white transform hover:scale-105 transition-transform duration-300`}>
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 opacity-90" />
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-lg font-semibold mb-1">{stat.title}</p>
                  <p className="text-sm opacity-90">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Featured Properties</h2>
              <p className="text-slate-600 text-lg">Hand-picked premium properties just for you</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="border-slate-300 hover:bg-slate-100">
                <Link to="/search">
                  View All Featured Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* All Properties - Default 8 Properties */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">All Properties</h2>
            <p className="text-slate-600 text-lg">Browse through our complete collection of verified properties</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => setCurrentPage(index + 1)}
                        isActive={currentPage === index + 1}
                        className="cursor-pointer"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-slate-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of satisfied customers who found their perfect property with us</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-slate-800 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link to="/search">
                Start Searching
                <Search className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 text-lg">
              <Link to="/login">
                List Property Free
                <HomeIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
