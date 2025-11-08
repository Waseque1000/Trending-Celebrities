import { Calendar, TrendingUp, Star, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CelebrityCard from "@/components/CelebrityCard";
import { celebrities, getTrendingCelebrities } from "@/data/celebrities";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const trendingCelebs = getTrendingCelebrities();
  const recentCelebs = celebrities.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-hero text-primary-foreground py-20 px-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.7)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Discover Your Favorite
            <span className="block text-accent">Celebrities</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 animate-fade-in">
            Explore the world of entertainment with detailed profiles, birthdays, and trending stars
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/celebrities">
                <Users className="mr-2 h-5 w-5" />
                Browse All Celebrities
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-primary">
              <Link to="/today">
                <Calendar className="mr-2 h-5 w-5" />
                Today's Birthdays
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
              <p className="text-muted-foreground">Celebrity Profiles</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Daily</h3>
              <p className="text-muted-foreground">Updates & News</p>
            </div>
            <div className="text-center">
              <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Trending</h3>
              <p className="text-muted-foreground">Celebrity Rankings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Celebrities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <TrendingUp className="inline mr-3 h-8 w-8 text-primary" />
              Trending Celebrities
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the most popular celebrities right now based on social media buzz and public interest
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {trendingCelebs.map((celebrity) => (
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
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/trending">
                View All Trending
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Today's Birthdays */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-foreground flex items-center justify-center">
                <Calendar className="mr-3 h-8 w-8 text-primary" />
                Today's Birthday Celebrations
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 mb-6">
                {recentCelebs.map((celebrity) => (
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
              <div className="text-center">
                <Button asChild>
                  <Link to="/today">
                    <Calendar className="mr-2 h-4 w-4" />
                    View All Today's Birthdays
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Celebrity News
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Get the latest updates on your favorite celebrities, birthday alerts, and trending entertainment news
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/celebrities">
                <Search className="mr-2 h-5 w-5" />
                Explore All Celebrities
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;