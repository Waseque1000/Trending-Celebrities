import { Calendar, Gift, Star, PartyPopper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CelebrityCard from "@/components/CelebrityCard";
import { celebrities } from "@/data/celebrities";

const TodaysBirthdays = () => {
  const today = new Date();
  const todayFormatted = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // For demo purposes, let's show some celebrities as if they have birthdays today
  const todaysCelebs = celebrities.slice(0, 3);
  const upcomingCelebs = celebrities.slice(3, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <PartyPopper className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Today's Birthday Celebrations
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-2">
              {todayFormatted}
            </p>
            <p className="text-lg text-primary-foreground/80">
              Celebrating the special day of our favorite celebrities
            </p>
          </div>
        </div>
      </div>

      {/* Today's Birthdays */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Gift className="mr-3 h-7 w-7 text-accent" />
                Celebrating Today
                <Badge variant="secondary" className="ml-3">
                  {todaysCelebs.length} birthdays
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todaysCelebs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No birthdays today
                  </h3>
                  <p className="text-muted-foreground">
                    Check back tomorrow for more birthday celebrations!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {todaysCelebs.map((celebrity) => (
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
                      {/* Birthday Badge */}
                      <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                        🎉 Birthday!
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Birthdays */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Calendar className="mr-3 h-7 w-7 text-primary" />
                Coming Up This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingCelebs.map((celebrity, index) => (
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
                    {/* Days Until Badge */}
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {index + 1} day{index === 0 ? '' : 's'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Birthday Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Birthday Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {todaysCelebs.length}
                  </h3>
                  <p className="text-muted-foreground">Birthdays Today</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {upcomingCelebs.length}
                  </h3>
                  <p className="text-muted-foreground">This Week</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {Math.round(celebrities.reduce((sum, c) => sum + c.popularity, 0) / celebrities.length)}%
                  </h3>
                  <p className="text-muted-foreground">Avg Popularity</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Wish */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              🎂 Happy Birthday! 🎂
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join us in celebrating these amazing talents on their special day. 
              Send your birthday wishes and show your support!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-2xl">🎉</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-2xl">🎈</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-2xl">🎁</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-2xl">🌟</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TodaysBirthdays;