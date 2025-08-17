// Mock celebrity data
export interface Celebrity {
  id: string;
  name: string;
  profession: string;
  image: string;
  birthDate: string;
  birthPlace: string;
  age: number;
  popularity: number;
  tags: string[];
  biography: string;
  knownFor: string[];
  socialMedia: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

// Import celebrity images
import actor1 from "@/assets/celebrities/actor-1.jpg";
import actress1 from "@/assets/celebrities/actress-1.jpg";
import director1 from "@/assets/celebrities/director-1.jpg";
import singer1 from "@/assets/celebrities/singer-1.jpg";
import athleteActor1 from "@/assets/celebrities/athlete-actor-1.jpg";
import model1 from "@/assets/celebrities/model-1.jpg";

export const celebrities: Celebrity[] = [
  {
    id: "1",
    name: "James Richardson",
    profession: "Actor",
    image: actor1,
    birthDate: "1994-03-15",
    birthPlace: "Los Angeles, CA",
    age: 30,
    popularity: 87,
    tags: ["Action Movies", "Drama", "Hollywood"],
    biography: "James Richardson is a versatile actor known for his compelling performances in both blockbuster action films and intimate character dramas. Born and raised in Los Angeles, he discovered his passion for acting at a young age and has since become one of Hollywood's most sought-after talents.",
    knownFor: ["The Last Stand", "Midnight City", "Breaking Point"],
    socialMedia: {
      instagram: "@jamesrichardson",
      twitter: "@jrichardson_official"
    }
  },
  {
    id: "2",
    name: "Emma Charlotte",
    profession: "Actress",
    image: actress1,
    birthDate: "1996-08-17",
    birthPlace: "New York, NY",
    age: 28,
    popularity: 92,
    tags: ["Drama", "Independent Films", "Award Winner"],
    biography: "Emma Charlotte is an acclaimed actress whose nuanced performances have earned her critical acclaim and numerous awards. Starting her career in independent films, she has successfully transitioned to mainstream Hollywood while maintaining her artistic integrity.",
    knownFor: ["Autumn Leaves", "The Silent Hour", "City Dreams"],
    socialMedia: {
      instagram: "@emmacharlotte",
      twitter: "@emma_charlotte"
    }
  },
  {
    id: "3",
    name: "Michael Thompson",
    profession: "Director",
    image: director1,
    birthDate: "1978-11-22",
    birthPlace: "Chicago, IL",
    age: 45,
    popularity: 78,
    tags: ["Thriller", "Mystery", "Auteur"],
    biography: "Michael Thompson is a visionary director known for his psychological thrillers and intricate storytelling. With over two decades in the film industry, his unique visual style and compelling narratives have made him a respected figure in contemporary cinema.",
    knownFor: ["The Labyrinth", "Echoes in Time", "Shadow Play"],
    socialMedia: {
      instagram: "@michael_thompson_director",
      twitter: "@mthompson_films"
    }
  },
  {
    id: "4",
    name: "Sophia Williams",
    profession: "Singer",
    image: singer1,
    birthDate: "1999-06-08",
    birthPlace: "Nashville, TN",
    age: 25,
    popularity: 95,
    tags: ["Pop", "R&B", "Grammy Winner"],
    biography: "Sophia Williams is a multi-talented singer-songwriter whose powerful voice and heartfelt lyrics have captured audiences worldwide. From her humble beginnings in Nashville to becoming a global superstar, she continues to push musical boundaries.",
    knownFor: ["Golden Heart", "Midnight Dreams", "Rise Up"],
    socialMedia: {
      instagram: "@sophiawilliams",
      twitter: "@sophia_music"
    }
  },
  {
    id: "5",
    name: "Ryan Mitchell",
    profession: "Actor & Former Athlete",
    image: athleteActor1,
    birthDate: "1992-01-30",
    birthPlace: "Miami, FL",
    age: 32,
    popularity: 83,
    tags: ["Action", "Sports Movies", "Fitness"],
    biography: "Ryan Mitchell successfully transitioned from professional athletics to acting, bringing authenticity and physical prowess to his action roles. His dedication to fitness and stunts has made him a favorite for high-octane entertainment.",
    knownFor: ["Speed Force", "The Champion", "Iron Will"],
    socialMedia: {
      instagram: "@ryanmitchell_fit",
      twitter: "@ryan_mitchell"
    }
  },
  {
    id: "6",
    name: "Victoria Stone",
    profession: "Model & Actress",
    image: model1,
    birthDate: "1997-04-12",
    birthPlace: "Paris, France",
    age: 27,
    popularity: 89,
    tags: ["Fashion", "Luxury Brands", "International"],
    biography: "Victoria Stone is an international model and actress who has graced the covers of major fashion magazines and walked runways for top designers. Her transition into acting has been met with critical acclaim and commercial success.",
    knownFor: ["Elegant Strangers", "Fashion Week", "The Muse"],
    socialMedia: {
      instagram: "@victoriastone",
      twitter: "@victoria_stone"
    }
  }
];

// Helper functions
export const getCelebrityById = (id: string): Celebrity | undefined => {
  return celebrities.find(celebrity => celebrity.id === id);
};

export const getTodaysBirthdays = (): Celebrity[] => {
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  
  return celebrities.filter(celebrity => {
    const birthDate = new Date(celebrity.birthDate);
    return birthDate.getMonth() + 1 === todayMonth && birthDate.getDate() === todayDay;
  });
};

export const getTrendingCelebrities = (): Celebrity[] => {
  return celebrities
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);
};

export const searchCelebrities = (query: string): Celebrity[] => {
  const lowercaseQuery = query.toLowerCase();
  return celebrities.filter(celebrity =>
    celebrity.name.toLowerCase().includes(lowercaseQuery) ||
    celebrity.profession.toLowerCase().includes(lowercaseQuery) ||
    celebrity.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};