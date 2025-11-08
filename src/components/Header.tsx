import { Search, Menu, Star, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchCelebrities } from "@/data/celebrities";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Get search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchCelebrities(searchQuery.trim()).slice(0, 5); // Limit to 5 results
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/celebrities?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchFocused(false);
    }
  };

  const handleCelebrityClick = (id: string) => {
    navigate(`/celebrity/${id}`);
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  const showDropdown = isSearchFocused && searchQuery.trim().length > 0;

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
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div ref={searchRef} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Input
                type="text"
                placeholder="Search celebrities, actors, directors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="pl-10 bg-card border-input-border focus:ring-primary"
              />
              
              {/* Search Results Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    {searchResults.length > 0 ? (
                      <>
                        <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
                          Search Results
                        </div>
                        {searchResults.map((celebrity) => (
                          <button
                            key={celebrity.id}
                            onClick={() => handleCelebrityClick(celebrity.id)}
                            className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-left"
                          >
                            <Avatar className="h-10 w-10 flex-shrink-0">
                              <AvatarImage src={celebrity.image} alt={celebrity.name} />
                              <AvatarFallback>{celebrity.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground truncate">
                                {celebrity.name}
                              </div>
                              <div className="text-sm text-muted-foreground truncate">
                                {celebrity.profession}
                              </div>
                            </div>
                          </button>
                        ))}
                        <button
                          onClick={handleSearch}
                          className="w-full flex items-center justify-center space-x-2 px-3 py-2 mt-2 rounded-md hover:bg-muted transition-colors text-sm text-primary font-medium border-t border-border pt-2"
                        >
                          <Search className="h-4 w-4" />
                          <span>View all results for "{searchQuery}"</span>
                        </button>
                      </>
                    ) : (
                      <div className="px-3 py-4 text-center">
                        <div className="text-sm text-muted-foreground mb-2">
                          No results found for "{searchQuery}"
                        </div>
                        <button
                          onClick={handleSearch}
                          className="text-sm text-primary hover:underline"
                        >
                          Search anyway
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;