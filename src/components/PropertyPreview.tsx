
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Ruler, Play, Phone, CheckCircle, XCircle, Edit, User } from "lucide-react";
import { Property } from "@/store/propertyStore";

interface PropertyPreviewProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onEdit?: (property: Property) => void;
  showAdminActions?: boolean;
  showOwnerActions?: boolean;
}

const PropertyPreview = ({ 
  property, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject, 
  onEdit,
  showAdminActions = false,
  showOwnerActions = false
}: PropertyPreviewProps) => {
  if (!property) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600" />
            {property.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Status and Type Badges */}
          <div className="flex flex-wrap gap-3">
            <Badge variant={property.status === 'Available' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
              {property.status}
            </Badge>
            <Badge 
              variant={property.listingType === 'Rent' ? 'outline' : 'destructive'} 
              className={`text-sm px-3 py-1 ${property.listingType === 'Rent' ? 'bg-green-50 text-green-700 border-green-200' : ''}`}
            >
              For {property.listingType}
            </Badge>
            {property.featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm px-3 py-1">
                ⭐ Featured
              </Badge>
            )}
            <Badge variant={property.adminApproved ? 'default' : 'secondary'} className="text-sm px-3 py-1">
              {property.adminApproved ? '✓ Approved' : '⏳ Pending Approval'}
            </Badge>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">₹{property.price.toLocaleString()}</p>
              <p className="text-slate-600 text-lg">
                {property.listingType === 'Rent' ? 'per month' : 'total price'}
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4 text-lg">Property Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {index + 1} / {property.images.length}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          {property.videoUrl && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 text-lg flex items-center gap-2">
                <Play className="h-5 w-5 text-red-600" />
                Property Video Tour
              </h3>
              <div className="relative w-full h-80 bg-slate-100 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={getYouTubeEmbedUrl(property.videoUrl)}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title="Property Video"
                />
              </div>
            </div>
          )}

          {/* Property Details Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-4 text-lg">Property Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-slate-700">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                    <span className="font-medium">{property.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-700">
                      <Home className="h-5 w-5 mr-3 text-blue-600" />
                      <span>{property.bhk}</span>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <Ruler className="h-5 w-5 mr-3 text-blue-600" />
                      <span>{property.area} sq ft</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md text-center font-medium">
                      {property.type}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-4 text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Owner Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Name</p>
                    <p className="font-medium text-slate-800">{property.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Contact</p>
                    <p className="font-medium text-slate-800">{property.ownerPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-4 text-lg">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-800 mb-4 text-lg">Description</h3>
                <p className="text-slate-600 leading-relaxed">{property.description}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200">
            {showAdminActions && (
              <>
                <Button
                  onClick={() => onApprove?.(property.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={property.adminApproved}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {property.adminApproved ? 'Already Approved' : 'Approve Property'}
                </Button>
                <Button
                  onClick={() => onReject?.(property.id)}
                  variant="destructive"
                  className="hover:bg-red-700"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Property
                </Button>
                {onEdit && (
                  <Button
                    onClick={() => onEdit(property)}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Property
                  </Button>
                )}
              </>
            )}
            
            {showOwnerActions && (
              <Button
                onClick={() => onEdit?.(property)}
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Property
              </Button>
            )}
            
            <Button
              onClick={() => window.open(`tel:${property.ownerPhone}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Owner
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyPreview;
