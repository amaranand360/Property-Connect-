
import { useState, useMemo } from "react";
import { Search as SearchIcon, Filter, SlidersHorizontal, MapPin, ArrowRight, Shield, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { getApprovedProperties } from "@/store/propertyStore";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8; // Show 8 properties by default

  // Get only admin-approved properties for users
  const allProperties = getApprovedProperties();

  const filteredProperties = useMemo(() => {
    let filtered = allProperties.filter(property => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Price filter
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      
      // BHK filter
      const matchesBHK = selectedBHK.length === 0 || selectedBHK.includes(property.bhk);
      
      // Type filter
      const matchesType = selectedType === "all" || property.type.toLowerCase() === selectedType.toLowerCase();
      
      // Amenities filter
      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => property.amenities.includes(amenity));

      return matchesSearch && matchesPrice && matchesBHK && matchesType && matchesAmenities;
    });

    // Sort properties
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "area":
        filtered.sort((a, b) => b.area - a.area);
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }, [allProperties, searchTerm, priceRange, selectedBHK, selectedType, selectedAmenities, sortBy]);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + propertiesPerPage);

  const handleBHKChange = (bhk: string, checked: boolean) => {
    if (checked) {
      setSelectedBHK([...selectedBHK, bhk]);
    } else {
      setSelectedBHK(selectedBHK.filter(item => item !== bhk));
    }
    setCurrentPage(1);
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
    }
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedBHK([]);
    setSelectedType("all");
    setSelectedAmenities([]);
    setPriceRange([0, 100000]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Banner Section - Fully Responsive */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              Find Your Perfect Home
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 px-2">
              Discover amazing properties without broker fees. Connect directly with owners.
            </p>
            
            {/* Trust Indicators - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 px-4">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-4 w-4 sm:h-5 w-5 lg:h-6 lg:w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100 text-sm sm:text-base">Verified Properties</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-4 w-4 sm:h-5 w-5 lg:h-6 lg:w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100 text-sm sm:text-base">Direct Owner Contact</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-4 w-4 sm:h-5 w-5 lg:h-6 lg:w-6 text-green-400 flex-shrink-0" />
                <span className="text-blue-100 text-sm sm:text-base">No Broker Fees</span>
              </div>
            </div>

            {/* Hero Search Bar - Mobile Responsive */}
            <Card className="max-w-3xl mx-auto border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                    <Input
                      placeholder="Search by location, area, or property name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 sm:pl-10 py-2 sm:py-3 text-sm sm:text-lg border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
                    onClick={handleSearch}
                  >
                    <SearchIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Search Properties
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        {/* Quick Filters - Mobile Responsive */}
        <Card className="mb-4 sm:mb-6 border-0 shadow-lg bg-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 sm:px-6 py-2 sm:py-3 border-slate-200 text-sm sm:text-base w-full sm:w-auto"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Advanced Filters
                </Button>
                
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <Button
                    variant={selectedType === "all" ? "default" : "outline"}
                    onClick={() => setSelectedType("all")}
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    All Types
                  </Button>
                  <Button
                    variant={selectedType === "apartment" ? "default" : "outline"}
                    onClick={() => setSelectedType("apartment")}
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    Apartment
                  </Button>
                  <Button
                    variant={selectedType === "villa" ? "default" : "outline"}
                    onClick={() => setSelectedType("villa")}
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    Villa
                  </Button>
                  <Button
                    variant={selectedType === "house" ? "default" : "outline"}
                    onClick={() => setSelectedType("house")}
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    House
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar - Mobile Responsive */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="border-0 shadow-lg bg-white sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-slate-800 text-lg sm:text-xl">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3 text-slate-800 text-sm sm:text-base">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => {
                      setPriceRange(value);
                      setCurrentPage(1);
                    }}
                    max={100000}
                    min={0}
                    step={5000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-slate-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* BHK Type */}
                <div>
                  <h3 className="font-semibold mb-3 text-slate-800 text-sm sm:text-base">BHK Type</h3>
                  <div className="space-y-2">
                    {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((bhk) => (
                      <div key={bhk} className="flex items-center space-x-2">
                        <Checkbox 
                          id={bhk} 
                          checked={selectedBHK.includes(bhk)}
                          onCheckedChange={(checked) => handleBHKChange(bhk, checked as boolean)}
                        />
                        <label htmlFor={bhk} className="text-xs sm:text-sm text-slate-600 cursor-pointer">{bhk}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <h3 className="font-semibold mb-3 text-slate-800 text-sm sm:text-base">Property Type</h3>
                  <Select value={selectedType} onValueChange={(value) => {
                    setSelectedType(value);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3 text-slate-800 text-sm sm:text-base">Amenities</h3>
                  <div className="space-y-2">
                    {["Parking", "Gym", "Swimming Pool", "Security", "Power Backup"].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={amenity} 
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                        />
                        <label htmlFor={amenity} className="text-xs sm:text-sm text-slate-600 cursor-pointer">{amenity}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-slate-700 text-sm sm:text-base"
                  onClick={clearAllFilters}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results - Mobile Responsive */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                {filteredProperties.length} Properties Found
              </h2>
              <Select value={sortBy} onValueChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-full sm:w-48 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="area">Largest Area</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Grid - Show 8 properties in responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {paginatedProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-base sm:text-lg mb-4">No properties found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                  className="mt-4"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination - Mobile Responsive */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 sm:mt-12">
                <Pagination>
                  <PaginationContent className="gap-1 sm:gap-2">
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm px-2 sm:px-3`}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => setCurrentPage(index + 1)}
                          isActive={currentPage === index + 1}
                          className="cursor-pointer text-xs sm:text-sm px-2 sm:px-3"
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm px-2 sm:px-3`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Search;
