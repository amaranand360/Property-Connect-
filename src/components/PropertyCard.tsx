
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Home, Ruler, Heart, Phone, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  bhk: string;
  area: number;
  images: string[];
  videoUrl?: string;
  featured?: boolean;
  status: 'Available' | 'Rented';
  listingType: 'Rent' | 'Sale';
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleContact = () => {
    window.open(`tel:+919876543210`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
      <div className="relative">
        <div className="relative h-40 sm:h-48">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {property.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 h-8 w-8"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 h-8 w-8"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {property.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1 sm:gap-2">
          {property.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
              Featured
            </Badge>
          )}
          <Badge variant={property.status === 'Available' ? 'default' : 'secondary'} className="text-xs">
            {property.status}
          </Badge>
          <Badge 
            className={`text-xs ${
              property.listingType === 'Rent' 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-red-100 text-red-800 border-red-200'
            }`}
          >
            For {property.listingType}
          </Badge>
        </div>

        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1 sm:gap-2">
          {property.videoUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="bg-red-600/90 hover:bg-red-700 text-white rounded-full p-1.5 h-7 w-7 sm:h-8 sm:w-8"
            >
              <Play className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 h-7 w-7 sm:h-8 sm:w-8"
          >
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">{property.title}</h3>
          <div className="text-right">
            <p className="text-xl sm:text-2xl font-bold text-blue-600">₹{property.price.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-gray-500">
              {property.listingType === 'Rent' ? 'per month' : 'total'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-1" />
            <span className="text-xs sm:text-sm">{property.bhk}</span>
          </div>
          <div className="flex items-center">
            <Ruler className="h-4 w-4 mr-1" />
            <span className="text-xs sm:text-sm">{property.area} sq ft</span>
          </div>
          <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
            {property.type}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm py-2">
            <Link to={`/property/${property.id}`}>
              View Details
            </Link>
          </Button>
          <Button variant="outline" className="px-3 py-2" onClick={handleContact}>
            <Phone className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Contact</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
