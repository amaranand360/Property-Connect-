
import { useState } from "react";
import { Plus, Edit, Eye, Trash2, MoreVertical, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddPropertyModal from "@/components/AddPropertyModal";
import PropertyPreview from "@/components/PropertyPreview";
import { getPropertiesByOwner, updateProperty, Property } from "@/store/propertyStore";

const OwnerDashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewProperty, setPreviewProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Mock current owner ID (in real app, this would come from auth context)
  const currentOwnerId = "1";
  const properties = getPropertiesByOwner(currentOwnerId);

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setIsEditModalOpen(true);
  };

  const handleUpdateProperty = (updatedProperty: any) => {
    if (editingProperty) {
      updateProperty(editingProperty.id, updatedProperty);
      setEditingProperty(null);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Owner Dashboard</h1>
            <p className="text-slate-600">Manage your property listings</p>
          </div>
          
          <Button 
            className="bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Properties</p>
                  <p className="text-3xl font-bold">{properties.length}</p>
                </div>
                <HomeIcon className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Approved</p>
                  <p className="text-3xl font-bold">{properties.filter(p => p.adminApproved).length}</p>
                </div>
                <Eye className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Pending</p>
                  <p className="text-3xl font-bold">{properties.filter(p => !p.adminApproved).length}</p>
                </div>
                <Plus className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-500 to-slate-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-100">Available</p>
                  <p className="text-3xl font-bold">{properties.filter(p => p.status === 'Available').length}</p>
                </div>
                <HomeIcon className="h-8 w-8 text-slate-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties List */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="text-slate-800">Your Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-slate-50 border-slate-200">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-slate-800">{property.title}</h3>
                    <p className="text-slate-600">{property.location}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-blue-600 font-semibold">₹{property.price.toLocaleString()}/month</span>
                      <Badge variant={property.status === 'Available' ? 'default' : 'secondary'}>
                        {property.status}
                      </Badge>
                      <Badge variant={property.listingType === 'Rent' ? 'outline' : 'destructive'}>
                        For {property.listingType}
                      </Badge>
                      <Badge variant={property.adminApproved ? 'default' : 'secondary'}>
                        {property.adminApproved ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setPreviewProperty(property)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditProperty(property)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Property
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
              
              {properties.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <HomeIcon className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>No properties listed yet. Add your first property!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={() => setIsAddModalOpen(false)}
      />

      <AddPropertyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProperty(null);
        }}
        onAdd={handleUpdateProperty}
        editingProperty={editingProperty}
      />

      <PropertyPreview
        property={previewProperty}
        isOpen={!!previewProperty}
        onClose={() => setPreviewProperty(null)}
        onEdit={handleEditProperty}
        showOwnerActions={true}
      />
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
