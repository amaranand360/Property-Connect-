import { useState } from "react";
import { 
  Shield, 
  Eye, 
  Check, 
  X, 
  Plus,
  Users,
  Home,
  TrendingUp,
  Clock,
  MapPin,
  Bed,
  Square
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import PropertyPreview from "@/components/PropertyPreview";
import AddPropertyModal from "@/components/AddPropertyModal";
import { 
  getAllProperties, 
  getApprovedProperties, 
  getPendingProperties, 
  approveProperty, 
  rejectProperty 
} from "@/store/propertyStore";

const AdminPanel = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const allProperties = getAllProperties();
  const approvedProperties = getApprovedProperties();
  const pendingProperties = getPendingProperties();

  const handleApprove = (propertyId: number) => {
    const success = approveProperty(propertyId);
    if (success) {
      toast({
        title: "Property Approved",
        description: "Property has been approved and is now visible to users.",
      });
      setShowPreview(false);
      setSelectedProperty(null);
    }
  };

  const handleReject = (propertyId: number) => {
    const success = rejectProperty(propertyId);
    if (success) {
      toast({
        title: "Property Rejected",
        description: "Property has been rejected and removed from the system.",
        variant: "destructive",
      });
      setShowPreview(false);
      setSelectedProperty(null);
    }
  };

  const handleEdit = (property: any) => {
    // Handle edit functionality
    console.log("Edit property:", property);
    setShowPreview(false);
  };

  const handlePreview = (property: any) => {
    setSelectedProperty(property);
    setShowPreview(true);
  };

  const handleAddProperty = (property: any) => {
    toast({
      title: "Property Added",
      description: "New property has been added and is pending approval.",
    });
    setShowAddModal(false);
  };

  const stats = [
    {
      title: "Total Properties",
      value: allProperties.length,
      icon: Home,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Approved Properties",
      value: approvedProperties.length,
      icon: Check,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Pending Approval",
      value: pendingProperties.length,
      icon: Clock,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Active Owners",
      value: new Set(allProperties.map(p => p.ownerId)).size,
      icon: Users,
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center">
                <Shield className="mr-3 h-8 w-8 text-purple-600" />
                Admin Dashboard
              </h1>
              <p className="text-slate-600">Manage properties and user approvals</p>
            </div>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-slate-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-0 shadow-lg bg-gradient-to-r ${stat.color} text-white`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Approvals */}
        {pendingProperties.length > 0 && (
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-orange-600" />
                Pending Approvals ({pendingProperties.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingProperties.map((property) => (
                  <Card key={property.id} className="border border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                      <div className="aspect-video relative mb-3 overflow-hidden rounded-lg">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-orange-500">
                          Pending
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">
                        {property.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-slate-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="line-clamp-1">{property.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bhk}
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          {property.area} sq ft
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-slate-800">
                          ₹{property.price.toLocaleString()}
                          {property.listingType === 'Rent' && '/month'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handlePreview(property)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        
                        <Button
                          onClick={() => handleApprove(property.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          onClick={() => handleReject(property.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Properties */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center">
              <Home className="mr-2 h-5 w-5" />
              All Properties ({allProperties.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProperties.map((property) => (
                <Card key={property.id} className={`border ${property.adminApproved ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
                  <CardContent className="p-4">
                    <div className="aspect-video relative mb-3 overflow-hidden rounded-lg">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className={`absolute top-2 left-2 ${property.adminApproved ? 'bg-green-500' : 'bg-orange-500'}`}>
                        {property.adminApproved ? 'Approved' : 'Pending'}
                      </Badge>
                      <Badge className={`absolute top-2 right-2 ${property.listingType === 'Rent' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                        {property.listingType}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center text-sm text-slate-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        {property.bhk}
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        {property.area} sq ft
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-slate-800">
                        ₹{property.price.toLocaleString()}
                        {property.listingType === 'Rent' && '/month'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-slate-600 mb-3">
                      <p><strong>Owner:</strong> {property.ownerName}</p>
                      <p><strong>Phone:</strong> {property.ownerPhone}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handlePreview(property)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      
                      {!property.adminApproved && (
                        <>
                          <Button
                            onClick={() => handleApprove(property.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            onClick={() => handleReject(property.id)}
                            size="sm"
                            variant="destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Preview Modal */}
      <PropertyPreview
        property={selectedProperty}
        isOpen={showPreview}
        onClose={() => {
          setShowPreview(false);
          setSelectedProperty(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
        onEdit={handleEdit}
        showAdminActions={true}
      />

      {/* Add Property Modal */}
      <AddPropertyModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProperty}
      />
    </div>
  );
};

export default AdminPanel;
