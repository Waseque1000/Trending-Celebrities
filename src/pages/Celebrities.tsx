import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Grid, List, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CelebrityCard from "@/components/CelebrityCard";
import { celebrities, searchCelebrities } from "@/data/celebrities";
import { useSearchParams } from "react-router-dom";

const Celebrities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterProfession, setFilterProfession] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Update search query from URL params when component mounts or URL changes
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    setSearchQuery(searchParam);
  }, [searchParams]);

  // Update URL when search query changes (debounced or on blur)
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setSearchParams({ search: value.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Get unique professions for filter
  const professions = useMemo(() => {
    const uniqueProfessions = Array.from(new Set(celebrities.map(c => c.profession)));
    return uniqueProfessions.sort();
  }, []);

  // Filter and sort celebrities
  const filteredCelebrities = useMemo(() => {
    let filtered = searchQuery 
      ? searchCelebrities(searchQuery)
      : [...celebrities];

    // Apply profession filter
    if (filterProfession !== "all") {
      filtered = filtered.filter(c => c.profession === filterProfession);
    }

    // Sort celebrities
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "age":
          aValue = a.age;
          bValue = b.age;
          break;
        case "popularity":
          aValue = a.popularity;
          bValue = b.popularity;
          break;
        case "profession":
          aValue = a.profession;
          bValue = b.profession;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortOrder === "asc" 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [searchQuery, filterProfession, sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Celebrity Directory
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover detailed profiles of actors, directors, singers, and entertainment industry professionals
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, profession, or tags..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 text-base  border-input-border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Filters and Controls */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Profession Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterProfession} onValueChange={setFilterProfession}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Professions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Professions</SelectItem>
                    {professions.map((profession) => (
                      <SelectItem key={profession} value={profession}>
                        {profession}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="profession">Profession</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )}
              </Button>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Results Count */}
              <div className="ml-auto">
                <Badge variant="secondary" className="text-sm">
                  {filteredCelebrities.length} results
                </Badge>
              </div>
            </div>

            {/* Active Filters */}
            {(searchQuery || filterProfession !== "all") && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="outline" className="gap-1">
                    Search: {searchQuery}
                    <button 
                      onClick={() => {
                        setSearchQuery("");
                        setSearchParams({});
                      }}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {filterProfession !== "all" && (
                  <Badge variant="outline" className="gap-1">
                    {filterProfession}
                    <button 
                      onClick={() => setFilterProfession("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {filteredCelebrities.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No celebrities found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clear some filters
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilterProfession("all");
                  setSearchParams({});
                }}
              >
                Clear all filters
              </Button>
            </div>
          </div>
        ) : (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredCelebrities.map((celebrity) => (
              <CelebrityCard
                key={celebrity.id}
                id={celebrity.id}
                name={celebrity.name}
                profession={celebrity.profession}
                image={celebrity.image}
                birthDate={celebrity.birthDate}
                birthPlace={celebrity.birthPlace}
                age={celebrity.age}
                popularity={celebrity.popularity}
                tags={celebrity.tags}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Celebrities;