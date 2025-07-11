
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { Home, Users, TrendingUp, DollarSign } from "lucide-react";

const propertyData = [
  { month: "Jan", properties: 45 },
  { month: "Feb", properties: 52 },
  { month: "Mar", properties: 48 },
  { month: "Apr", properties: 61 },
  { month: "May", properties: 55 },
  { month: "Jun", properties: 67 },
];

const typeData = [
  { name: "Apartments", value: 65, color: "#3b82f6" },
  { name: "Houses", value: 25, color: "#10b981" },
  { name: "Villas", value: 7, color: "#f59e0b" },
  { name: "Studios", value: 3, color: "#ef4444" },
];

const locationData = [
  { location: "BTM Layout", count: 25 },
  { location: "Koramangala", count: 18 },
  { location: "HSR Layout", count: 22 },
  { location: "Whitefield", count: 15 },
  { location: "Electronic City", count: 12 },
];

const chartConfig = {
  properties: {
    label: "Properties",
    color: "#3b82f6",
  },
  count: {
    label: "Count",
    color: "#10b981",
  },
};

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Properties</p>
                <p className="text-3xl font-bold">127</p>
              </div>
              <Home className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Users</p>
                <p className="text-3xl font-bold">1,248</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Revenue</p>
                <p className="text-3xl font-bold">₹12.5L</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Growth Rate</p>
                <p className="text-3xl font-bold">+23%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Properties Over Time */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Properties Added Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={propertyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="properties" fill="var(--color-properties)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Property Types Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Property Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>Properties by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={locationData} layout="horizontal">
                <XAxis type="number" />
                <YAxis dataKey="location" type="category" width={100} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
