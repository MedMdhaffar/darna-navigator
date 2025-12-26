import { useEffect, useMemo, useState } from "react";
import { Calendar, Filter } from "lucide-react";
import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventItem {
  id: number;
  title: string;
  date: string;
  short_description: string;
  location: number;
  location_name: string;
}

interface EventViewModel {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  cityKey: string;
  monthKey: string;
}

const Evenements = () => {
  const [events, setEvents] = useState<EventViewModel[]>([]);
  const [filterCity, setFilterCity] = useState<string>("all");
  const [filterMonth, setFilterMonth] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/events")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de récupérer les événements");
        return res.json();
      })
      .then((data: EventItem[]) => {
        const mapped = data.map((item) => {
          const dateObj = new Date(item.date);
          const monthKey = dateObj.toString() === "Invalid Date"
            ? ""
            : dateObj.toLocaleString("fr-FR", { month: "long" }).toLowerCase();
          const dateLabel = dateObj.toString() === "Invalid Date"
            ? item.date
            : dateObj.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

          return {
            id: item.id,
            title: item.title,
            date: dateLabel,
            location: item.location_name,
            description: item.short_description,
            cityKey: item.location_name?.toLowerCase() || "",
            monthKey,
          } as EventViewModel;
        });
        setEvents(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Une erreur est survenue lors du chargement des événements.");
        setLoading(false);
      });
  }, []);

  const cityOptions = useMemo(() => {
    const names = Array.from(new Set(events.map((e) => e.cityKey).filter(Boolean)));
    return names;
  }, [events]);

  const filteredEvents = events.filter((event) => {
    const cityMatch = filterCity === "all" || event.cityKey === filterCity;
    const monthMatch = filterMonth === "all" || event.monthKey === filterMonth;
    return cityMatch && monthMatch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground py-20">
          <div className="container text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
              <Calendar className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Événements & Festivals</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Vivez l'effervescence culturelle de la Tunisie toute l'année
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-muted/30 border-b">
          <div className="container">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Filtrer par :</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Select value={filterCity} onValueChange={setFilterCity}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Toutes les villes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {cityOptions.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city.charAt(0).toUpperCase() + city.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Tous les mois" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les mois</SelectItem>
                    {Array.from(new Set(events.map((e) => e.monthKey).filter(Boolean))).map((month) => (
                      <SelectItem key={month} value={month}>
                        {month.charAt(0).toUpperCase() + month.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(filterCity !== "all" || filterMonth !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterCity("all");
                      setFilterMonth("all");
                    }}
                  >
                    Réinitialiser
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="container">
            {loading && (
              <p className="text-center text-lg">Chargement des événements...</p>
            )}

            {error && !loading && (
              <div className="text-center py-10 text-destructive text-lg">
                {error}
              </div>
            )}

            {!loading && !error && filteredEvents.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-8">
                  {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      date={event.date}
                      location={event.location}
                      description={event.description}
                    />
                  ))}
                </div>
              </>
            ) : null}

            {!loading && !error && filteredEvents.length === 0 && (
              <div className="text-center py-20">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Aucun événement trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier vos filtres de recherche
                </p>
                <Button
                  onClick={() => {
                    setFilterCity("all");
                    setFilterMonth("all");
                  }}
                >
                  Voir tous les événements
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Evenements;
