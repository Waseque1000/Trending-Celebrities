import { Calendar, MapPin, Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CelebrityCardProps {
  id: string;
  name: string;
  profession: string;
  image: string;
  birthDate: string;
  birthPlace: string;
  age: number;
  popularity: number;
  tags: string[];
}

const CelebrityCard = ({
  id,
  name,
  profession,
  image,
  birthDate,
  birthPlace,
  age,
  popularity,
  tags
}: CelebrityCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Link to={`/celebrity/${id}`} className="block group-hover:text-primary transition-colors">
    <Card className="group hover:shadow-card-hover transition-all duration-200 bg-card border-border overflow-hidden">
      <div className="relative">
        {/* Celebrity Image */}
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-celebrity opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>

        {/* Age Badge */}
        <div className="absolute top-7 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          Age {age}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-7 left-4 bg-white/90 hover:bg-white p-1 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorited(!isFavorited);
          }}
        >
          <Heart 
            className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center space-x-2 text-xs">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(birthDate)}</span>
            <MapPin className="h-3 w-3 ml-2" />
            <span className="truncate">{birthPlace}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Celebrity Name & Profession */}
        
         
        
        <h3 className="font-semibold text-lg text-foreground mb-1 truncate">
            {name}
          </h3>
        
        <p className="text-primary text-sm font-medium mb-3">
          {profession}
        </p>

        {/* Birth Info */}
        <div className="text-xs text-muted-foreground mb-3">
          <p className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>Born in {birthPlace}</span>
          </p>
        </div>

        {/* Popularity Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Popularity</span>
            <span>{popularity}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-500"
              style={{ width: `${popularity}%` }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge 
              variant="outline" 
              className="text-xs px-2 py-0.5 border-secondary-dark text-muted-foreground"
            >
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default CelebrityCard;