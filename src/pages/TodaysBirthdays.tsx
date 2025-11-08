import { Calendar, Gift, Star, PartyPopper, Sparkles, Cake, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CelebrityCard from "@/components/CelebrityCard";
import { celebrities, getTodaysBirthdays } from "@/data/celebrities";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const TodaysBirthdays = () => {
  const today = new Date();
  const todayFormatted = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const todaysCelebs = getTodaysBirthdays();
  // If no birthdays today, show some for demo
  const displayCelebs = todaysCelebs.length > 0 ? todaysCelebs : celebrities.slice(0, 3);
  const upcomingCelebs = celebrities.slice(3, 6);
  
  const [animated, setAnimated] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-20 md:py-28 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`flex justify-center mb-8 transition-all duration-1000 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-white/20 backdrop-blur-sm p-6 rounded-full border border-white/30 shadow-2xl">
                  <PartyPopper className="h-16 w-16 animate-bounce" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 text-orange-300 animate-spin-slow" />
                </div>
              </div>
            </div>
            
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 transition-all duration-1000 delay-200 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent animate-gradient">
                Today's Birthday
              </span>
              <br />
              <span className="text-white">Celebrations</span>
            </h1>
            
            <div className={`mb-8 transition-all duration-1000 delay-400 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <Calendar className="h-5 w-5" />
                <p className="text-xl md:text-2xl font-semibold">{todayFormatted}</p>
              </div>
            </div>
            
            <p className={`text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto transition-all duration-1000 delay-600 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Join us in celebrating the special day of our favorite celebrities
            </p>

            {/* Stats Badges */}
            <div className={`flex flex-wrap justify-center gap-4 mt-10 transition-all duration-1000 delay-800 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <div className="flex items-center space-x-2">
                  <Cake className="h-5 w-5" />
                  <span className="font-bold text-2xl">{displayCelebs.length}</span>
                  <span className="text-sm">Birthdays</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-300" />
                  <span className="font-bold text-2xl">{upcomingCelebs.length}</span>
                  <span className="text-sm">Coming Up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Birthdays */}
      <section className="py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center space-x-3 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-transparent to-primary"></div>
                <Gift className="h-8 w-8 text-primary animate-bounce" />
                <div className="h-1 w-12 bg-gradient-to-l from-transparent to-primary"></div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Celebrating <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Today</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                {displayCelebs.length} {displayCelebs.length === 1 ? 'celebrity is' : 'celebrities are'} celebrating their special day
              </p>
            </div>

            {displayCelebs.length === 0 ? (
              <Card className="max-w-2xl mx-auto border-2 border-dashed">
                <CardContent className="py-16 text-center">
                  <div className="bg-gradient-to-br from-muted to-muted/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Calendar className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    No birthdays today
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Check back tomorrow for more birthday celebrations! 🎉
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayCelebs.map((celebrity, index) => (
                  <div 
                    key={celebrity.id} 
                    className="relative group"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                    <div className="relative">
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
                      {/* Modern Birthday Badge */}
                      <div className="absolute -top-3 -left-3 z-20">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                          <div className="relative bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center space-x-1">
                            <Sparkles className="h-3 w-3" />
                            <span>Birthday!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Birthdays */}
      <section className="py-16 md:py-20 relative z-10 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center space-x-3 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-transparent to-primary"></div>
                <Calendar className="h-8 w-8 text-primary" />
                <div className="h-1 w-12 bg-gradient-to-l from-transparent to-primary"></div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Coming <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Up Soon</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Don't miss these upcoming birthday celebrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingCelebs.map((celebrity, index) => (
                <div 
                  key={celebrity.id} 
                  className="relative group"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  <div className="relative">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Stats */}
      <section className="py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Birthday <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Statistics</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Quick insights into our celebrity birthdays
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="pt-8 pb-8">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-orange-400/20 to-pink-500/20 w-20 h-20 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:scale-110 transition-transform">
                      <Gift className="h-10 w-10 text-orange-500" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-extrabold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {displayCelebs.length}
                  </h3>
                  <p className="text-muted-foreground font-medium">Birthdays Today</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="pt-8 pb-8">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 w-20 h-20 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:scale-110 transition-transform">
                      <Calendar className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-extrabold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {upcomingCelebs.length}
                  </h3>
                  <p className="text-muted-foreground font-medium">Coming This Week</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="pt-8 pb-8">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-blue-400/20 to-purple-500/20 w-20 h-20 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:scale-110 transition-transform">
                      <Star className="h-10 w-10 text-blue-500 fill-blue-500" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-extrabold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {Math.round(celebrities.reduce((sum, c) => sum + c.popularity, 0) / celebrities.length)}%
                  </h3>
                  <p className="text-muted-foreground font-medium">Avg Popularity</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Wish CTA */}
      <section className="py-20 md:py-28 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              <CardContent className="pt-16 pb-16 px-8 md:px-16 relative z-10 text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center space-x-2 mb-6">
                    <Cake className="h-12 w-12 text-primary animate-bounce" />
                    <Sparkles className="h-8 w-8 text-orange-400 animate-pulse" />
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                      Happy Birthday!
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Join us in celebrating these amazing talents on their special day. 
                    Send your birthday wishes and show your support!
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 mt-10">
                  {['🎉', '🎈', '🎁', '🌟', '🎊', '🎂'].map((emoji, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm px-6 py-4 rounded-full border border-primary/30 shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <span className="text-3xl group-hover:scale-125 transition-transform inline-block">
                        {emoji}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TodaysBirthdays;