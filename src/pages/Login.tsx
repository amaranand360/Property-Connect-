
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Shield, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'user' | 'owner' | 'admin'>('user');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const demoAccounts = {
    user: {
      email: "user@demo.com",
      password: "demo123",
      redirect: "/search"
    },
    owner: {
      email: "owner@demo.com",
      password: "demo123",
      redirect: "/owner-dashboard"
    },
    admin: {
      email: "admin@demo.com",
      password: "demo123",
      redirect: "/admin"
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(email, password, userType);
    
    if (success) {
      toast({
        title: "Login Successful!",
        description: `Welcome ${userType}!`,
      });
      
      navigate(demoAccounts[userType].redirect);
    } else {
      toast({
        title: "Login Failed",
        description: "Please use the demo credentials provided.",
        variant: "destructive",
      });
    }
  };

  const handleDemoLogin = (type: 'user' | 'owner' | 'admin') => {
    const account = demoAccounts[type];
    setEmail(account.email);
    setPassword(account.password);
    setUserType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Welcome to PropertyConnect</h1>
          <p className="text-slate-600">Choose your account type and sign in</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Demo Accounts */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Demo Accounts</CardTitle>
                <p className="text-sm text-slate-600">Click on any account to auto-fill credentials</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  onClick={() => handleDemoLogin('user')}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors border-blue-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm md:text-base">User Account</h3>
                        <p className="text-xs md:text-sm text-slate-600">user@demo.com</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">User</Badge>
                  </div>
                </div>

                <div 
                  onClick={() => handleDemoLogin('owner')}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors border-green-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Home className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm md:text-base">Owner Account</h3>
                        <p className="text-xs md:text-sm text-slate-600">owner@demo.com</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">Owner</Badge>
                  </div>
                </div>

                <div 
                  onClick={() => handleDemoLogin('admin')}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors border-purple-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm md:text-base">Admin Account</h3>
                        <p className="text-xs md:text-sm text-slate-600">admin@demo.com</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs">Admin</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Login Form */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Sign In</CardTitle>
                <p className="text-sm text-slate-600">Enter your credentials to continue</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pr-10 border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Account Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['user', 'owner', 'admin'] as const).map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant={userType === type ? "default" : "outline"}
                          onClick={() => setUserType(type)}
                          className="capitalize text-sm"
                          size="sm"
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 py-2 md:py-3"
                  >
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="mt-4 md:mt-6 text-center">
                  <p className="text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                      Sign up here
                    </Link>
                  </p>
                </div>

                <div className="mt-4 p-3 md:p-4 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-600 text-center">
                    Demo credentials: Use the accounts above or password "demo123" for all accounts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
