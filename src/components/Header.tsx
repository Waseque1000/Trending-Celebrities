import { Search, Menu, Star, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <Star className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">OTT Celebs</h1>
              <p className="text-xs text-muted-foreground">Entertainment Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/celebrities" className="text-muted-foreground hover:text-primary transition-colors">
              Celebrities
            </Link>
            <Link to="/today" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Today's Birthdays</span>
            </Link>
            <Link to="/trending" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/celebrities" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Celebrities
              </Link>
              <Link 
                to="/today" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                <span>Today's Birthdays</span>
              </Link>
              <Link 
                to="/trending" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search celebrities, actors, directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-input-border focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;