
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Home, Ruler, Calendar, Phone, MessageCircle, Heart, Share2, 
  Bed, Bath, Car, Wifi, Dumbbell, Shield, Zap, Trees, ChevronLeft, ChevronRight, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPropertyById } from "@/store/propertyStore";

const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // Get the actual property data based on the ID
  const property = getPropertyById(Number(id));

  // If property not found, show error
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/search">Back to Search</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const videoId = url.includes('watch?v=') ? url.split('watch?v=')[1]?.split('&')[0] : url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleContact = () => {
    window.open(`tel:${property.ownerPhone}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-blue-600">Search</Link>
          <span>/</span>
          <span>Property Details</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="relative">
                {showVideo && property.videoUrl ? (
                  <div className="relative h-96">
                    <iframe
                      src={getYouTubeEmbedUrl(property.videoUrl)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white"
                      onClick={() => setShowVideo(false)}
                    >
                      Show Images
                    </Button>
                  </div>
                ) : (
                  <div className="relative h-96">
                    <img
                      src={property.images[currentImageIndex]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant={property.status === 'Available' ? 'default' : 'secondary'}>
                        {property.status}
                      </Badge>
                      <Badge variant={property.listingType === 'Rent' ? 'outline' : 'destructive'}>
                        For {property.listingType}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {property.videoUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-red-600/90 hover:bg-red-700 text-white"
                          onClick={() => setShowVideo(true)}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Video
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 flex-shrink-0 ${
                      index === currentImageIndex && !showVideo ? 'border-blue-600' : 'border-gray-200'
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowVideo(false);
                    }}
                  />
                ))}
                {property.videoUrl && (
                  <div
                    className={`w-20 h-20 bg-red-600 rounded cursor-pointer border-2 flex-shrink-0 flex items-center justify-center ${
                      showVideo ? 'border-red-600' : 'border-gray-200'
                    }`}
                    onClick={() => setShowVideo(true)}
                  >
                    <Play className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
            </Card>

            {/* Property Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{property.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">₹{property.price.toLocaleString()}</div>
                    <div className="text-gray-500">
                      {property.listingType === 'Rent' ? 'per month' : 'total'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{property.bhk}</Badge>
                  <Badge variant="secondary">{property.area} sq ft</Badge>
                  <Badge variant="secondary">{property.type}</Badge>
                  {property.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-medium">{property.bhk.split(' ')[0]} Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-medium">{property.bhk.split(' ')[0]} Bathrooms</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Home className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-medium">{property.type}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Car className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-medium">1 Parking</div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                        {amenity === 'Parking' && <Car className="h-4 w-4 text-blue-600" />}
                        {amenity === 'Gym' && <Dumbbell className="h-4 w-4 text-blue-600" />}
                        {amenity === 'Swimming Pool' && <Wifi className="h-4 w-4 text-blue-600" />}
                        {amenity === 'Security' && <Shield className="h-4 w-4 text-blue-600" />}
                        {amenity === 'Power Backup' && <Zap className="h-4 w-4 text-blue-600" />}
                        {amenity === 'Wi-Fi' && <Wifi className="h-4 w-4 text-blue-600" />}
                        {amenity === 'Garden' && <Trees className="h-4 w-4 text-blue-600" />}
                        {!['Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup', 'Wi-Fi', 'Garden'].includes(amenity) && 
                          <Home className="h-4 w-4 text-blue-600" />}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">{property.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Owner Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Property Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {property.ownerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{property.ownerName}</div>
                    <div className="text-sm text-gray-600">
                      ⭐ Verified Owner
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleContact}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Owner
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat with Owner
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  Response rate: 95% • Responds within 2 hours
                </div>
              </CardContent>
            </Card>

            {/* Schedule Visit */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Schedule a Visit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Site Visit
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Free property visit • No brokerage charges
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Visit the property in person</li>
                  <li>• Verify owner documents</li>
                  <li>• Don't pay advance without agreement</li>
                  <li>• Check property legal status</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
