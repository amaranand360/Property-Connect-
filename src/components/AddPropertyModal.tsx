
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { addProperty, updateProperty, Property } from "@/store/propertyStore";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (property: any) => void;
  editingProperty?: Property | null;
}

const AddPropertyModal = ({ isOpen, onClose, onAdd, editingProperty }: AddPropertyModalProps) => {
  const [formData, setFormData] = useState({
    title: editingProperty?.title || "",
    location: editingProperty?.location || "",
    price: editingProperty?.price || 0,
    type: editingProperty?.type || "",
    bhk: editingProperty?.bhk || "",
    area: editingProperty?.area || 0,
    images: editingProperty?.images || [""],
    videoUrl: editingProperty?.videoUrl || "",
    listingType: editingProperty?.listingType || "Rent",
    status: editingProperty?.status || "Available",
    description: editingProperty?.description || "",
    amenities: editingProperty?.amenities || [],
    ownerName: editingProperty?.ownerName || "Current User",
    ownerPhone: editingProperty?.ownerPhone || "+919876543210",
    ownerId: editingProperty?.ownerId || "1"
  });

  const availableAmenities = ["Parking", "Gym", "Swimming Pool", "Security", "Power Backup", "Elevator", "Garden", "Balcony"];

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
    } else {
      setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ""),
      adminApproved: false, // New properties need admin approval
      ownerId: String(formData.ownerId) // Ensure ownerId is string
    };

    if (editingProperty) {
      updateProperty(editingProperty.id, propertyData);
    } else {
      addProperty(propertyData);
    }
    
    onAdd(propertyData);
    setFormData({
      title: "",
      location: "",
      price: 0,
      type: "",
      bhk: "",
      area: 0,
      images: [""],
      videoUrl: "",
      listingType: "Rent",
      status: "Available",
      description: "",
      amenities: [],
      ownerName: "Current User",
      ownerPhone: "+919876543210",
      ownerId: "1"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            {editingProperty ? 'Edit Property' : 'Add New Property'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-slate-700">Property Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., 2 BHK Apartment in BTM Layout"
                    required
                    className="border-slate-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-slate-700">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., BTM Layout, Bangalore"
                    required
                    className="border-slate-200"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-slate-700">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="25000"
                      required
                      className="border-slate-200"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="listingType" className="text-slate-700">Listing Type</Label>
                    <Select value={formData.listingType} onValueChange={(value) => setFormData({ ...formData, listingType: value as 'Rent' | 'Sale' })}>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rent">For Rent</SelectItem>
                        <SelectItem value="Sale">For Sale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bhk" className="text-slate-700">BHK</Label>
                    <Select value={formData.bhk} onValueChange={(value) => setFormData({ ...formData, bhk: value })}>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Select BHK" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 BHK">1 BHK</SelectItem>
                        <SelectItem value="2 BHK">2 BHK</SelectItem>
                        <SelectItem value="3 BHK">3 BHK</SelectItem>
                        <SelectItem value="4+ BHK">4+ BHK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="type" className="text-slate-700">Property Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="area" className="text-slate-700">Area (sq ft)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                      placeholder="1200"
                      required
                      className="border-slate-200"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-slate-700">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your property..."
                    rows={4}
                    className="border-slate-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images and Media */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Images & Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-700">Property Images</Label>
                  <div className="space-y-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          placeholder="Enter image URL"
                          className="flex-1 border-slate-200"
                        />
                        {formData.images.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeImageField(index)}
                            className="border-slate-200"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addImageField}
                      className="border-slate-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="videoUrl" className="text-slate-700">Video URL (YouTube)</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="border-slate-200"
                  />
                </div>
                
                <div>
                  <Label className="text-slate-700 mb-3 block">Amenities</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                        />
                        <Label htmlFor={amenity} className="text-sm text-slate-600">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-200">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800">
              {editingProperty ? 'Update Property' : 'Add Property'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyModal;
