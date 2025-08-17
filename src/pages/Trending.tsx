import { TrendingUp, Flame, Star, Award, Crown, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CelebrityCard from "@/components/CelebrityCard";
import { getTrendingCelebrities, celebrities } from "@/data/celebrities";

const Trending = () => {
  const trendingCelebs = getTrendingCelebrities();
  const hotList = [...celebrities].sort((a, b) => b.popularity - a.popularity);
  const risingStars = celebrities.filter(c => c.age < 30).sort((a, b) => b.popularity - a.popularity).slice(0, 3);

  const getTrendingRank = (index: number) => {
    switch (index) {
      case 0:
        return { icon: <Crown className="h-5 w-5 text-yellow-500" />, label: "#1 Trending", color: "bg-yellow-50 text-yellow-700" };
      case 1:
        return { icon: <Award className="h-5 w-5 text-gray-400" />, label: "#2 Trending", color: "bg-gray-50 text-gray-700" };
      case 2:
        return { icon: <Award className="h-5 w-5 text-amber-600" />, label: "#3 Trending", color: "bg-amber-50 text-amber-700" };
      default:
        return { icon: <Star className="h-5 w-5 text-primary" />, label: `#${index + 1} Trending`, color: "bg-primary/10 text-primary" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Flame className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Trending Celebrities
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4">
              Most Popular Stars Right Now
            </p>
            <p className="text-lg text-primary-foreground/80">
              Based on social media buzz, public interest, and recent activities
            </p>
          </div>
        </div>
      </div>

      {/* Top Trending */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <TrendingUp className="mr-3 h-7 w-7 text-primary" />
                Top Trending Now
                <Badge variant="destructive" className="ml-3 animate-pulse">
                  🔥 HOT
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingCelebs.map((celebrity, index) => {
                  const ranking = getTrendingRank(index);
                  return (
                    <div key={celebrity.id} className="relative">
                      <CelebrityCard
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
                      {/* Trending Badge */}
                      <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1 ${ranking.color}`}>
                        {ranking.icon}
                        <span className="hidden sm:inline">{ranking.label}</span>
                        <span className="sm:hidden">#{index + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rising Stars */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="mr-3 h-7 w-7 text-accent" />
                Rising Stars
                <Badge variant="secondary" className="ml-3">
                  Under 30
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {risingStars.map((celebrity, index) => (
                  <div key={celebrity.id} className="relative">
                    <CelebrityCard
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
                    {/* Rising Star Badge */}
                    <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>Rising</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trending Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Trending Insights
            </h2>
            
            {/* Top Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Most Popular */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="mr-2 h-5 w-5 text-yellow-500" />
                    Most Popular
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hotList.slice(0, 5).map((celebrity, index) => (
                      <div key={celebrity.id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">#{index + 1}</span>
                        </div>
                        <img 
                          src={celebrity.image} 
                          alt={celebrity.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{celebrity.name}</p>
                          <p className="text-sm text-muted-foreground">{celebrity.profession}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="flex items-center space-x-1">
                            <div className="w-12 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${(celebrity.popularity / 100) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground">{celebrity.popularity}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Category Leaders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Category Leaders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Actor", "Actress", "Director", "Singer", "Model"].map((profession, index) => {
                      const leader = celebrities
                        .filter(c => c.profession.includes(profession))
                        .sort((a, b) => b.popularity - a.popularity)[0];
                      
                      if (!leader) return null;
                      
                      return (
                        <div key={profession} className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                            <Star className="h-4 w-4 text-accent" />
                          </div>
                          <img 
                            src={leader.image} 
                            alt={leader.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{leader.name}</p>
                            <p className="text-sm text-muted-foreground">Top {profession}</p>
                          </div>
                          <Badge variant="outline" className="flex-shrink-0">
                            {leader.popularity}%
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {Math.max(...celebrities.map(c => c.popularity))}%
                  </h3>
                  <p className="text-muted-foreground">Highest Score</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Flame className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {celebrities.filter(c => c.popularity > 85).length}
                  </h3>
                  <p className="text-muted-foreground">Hot Celebrities</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {risingStars.length}
                  </h3>
                  <p className="text-muted-foreground">Rising Stars</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-warning/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-8 w-8 text-warning" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {Math.round(celebrities.reduce((sum, c) => sum + c.popularity, 0) / celebrities.length)}%
                  </h3>
                  <p className="text-muted-foreground">Average Score</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trending;