import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Star, Instagram, Twitter, Facebook, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getCelebrityById } from "@/data/celebrities";

const CelebrityProfile = () => {
  const { id } = useParams<{ id: string }>();
  const celebrity = id ? getCelebrityById(id) : null;

  if (!celebrity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Celebrity Not Found</h1>
          <p className="text-muted-foreground mb-6">The celebrity you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/celebrities">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Celebrities
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild>
          <Link to="/celebrities">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Celebrities
          </Link>
        </Button>
      </div>

      {/* Profile Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Photo */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-celebrity">
                  <img
                    src={celebrity.image}
                    alt={celebrity.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {celebrity.name}
                  </h1>
                  <p className="text-xl text-primary font-medium mb-4">
                    {celebrity.profession}
                  </p>
                  
                  {/* Quick Facts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Born {formatDate(celebrity.birthDate)} (Age {celebrity.age})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{celebrity.birthPlace}</span>
                    </div>
                  </div>

                  {/* Popularity */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>Popularity Score</span>
                      </span>
                      <span>{celebrity.popularity}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary-light h-3 rounded-full transition-all duration-500"
                        style={{ width: `${celebrity.popularity}%` }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {celebrity.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Social Media */}
                  {Object.keys(celebrity.socialMedia).length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Social Media</h3>
                      <div className="flex space-x-3">
                        {Object.entries(celebrity.socialMedia).map(([platform, handle]) => (
                          <Button
                            key={platform}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            {getSocialIcon(platform)}
                            {handle}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <Card>
              <CardHeader>
                <CardTitle>Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {celebrity.biography}
                </p>
              </CardContent>
            </Card>

            {/* Known For */}
            <Card>
              <CardHeader>
                <CardTitle>Known For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {celebrity.knownFor.map((work, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-1">{work}</h4>
                      <p className="text-sm text-muted-foreground">Featured Work</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-semibold text-foreground">{celebrity.age} years old</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Profession</p>
                  <p className="font-semibold text-foreground">{celebrity.profession}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Birthplace</p>
                  <p className="font-semibold text-foreground">{celebrity.birthPlace}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Popularity</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${celebrity.popularity}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{celebrity.popularity}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">More Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" />
                  Add to Favorites
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Birthday Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/celebrities">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Browse More Celebrities
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrityProfile;