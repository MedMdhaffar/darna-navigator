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
          const monthKey =
            dateObj.toString() === "Invalid Date"
              ? ""
              : dateObj
                .toLocaleString("fr-FR", { month: "long" })
                .toLowerCase();

          const dateLabel =
            dateObj.toString() === "Invalid Date"
              ? item.date
              : dateObj.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

          return {
            id: item.id,
            title: item.title,
            date: dateLabel,
            location: item.location_name,
            description: item.short_description,
            cityKey: item.location_name?.toLowerCase() || "",
            monthKey,
          };
        });

        setEvents(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError("Une erreur est survenue lors du chargement des événements.");
        setLoading(false);
      });
  }, []);

  const cityOptions = useMemo(() => {
    return Array.from(
      new Set(events.map((e) => e.cityKey).filter(Boolean))
    );
  }, [events]);

  const filteredEvents = events.filter((event) => {
    const cityMatch = filterCity === "all" || event.cityKey === filterCity;
    const monthMatch = filterMonth === "all" || event.monthKey === filterMonth;
    return cityMatch && monthMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="relative py-32 overflow-hidden text-center">
          {/* Fond bleu méditerranéen */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f7fb] via-[#eaf2f8] to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(15,76,117,0.14),transparent_60%)]" />

          <div className="relative container">
            <Calendar className="h-10 w-10 mx-auto mb-6 text-sky-600" />
            <h1 className="text-5xl font-light mb-6">
              Événements <span className="font-semibold">Culturels</span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Festivals, traditions et rendez-vous culturels
              qui rythment la Tunisie tout au long de l’année.
            </p>
          </div>
        </section>


        {/* ================= SEPARATOR + QUOTE ================= */}
        <section className="py-24">
          <div className="container flex flex-col items-center text-muted-foreground/80">
            <div className="flex items-center gap-6 mb-6">
              <span className="h-px w-24 bg-current" />
              <span className="uppercase tracking-[0.3em] text-xs">
                Temps & Traditions
              </span>
              <span className="h-px w-24 bg-current" />
            </div>

            <p className="italic text-center max-w-xl text-sm">
              “Chaque événement est une rencontre,
              chaque date une célébration.”
            </p>
          </div>
        </section>

        {/* ================= FILTERS ================= */}
        <section className="pb-16">
          <div className="container">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="h-5 w-5" />
                <span className="uppercase tracking-widest text-xs">
                  Filtres
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={filterCity} onValueChange={setFilterCity}>
                  <SelectTrigger className="w-[200px]">
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
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Tous les mois" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les mois</SelectItem>
                    {Array.from(
                      new Set(events.map((e) => e.monthKey).filter(Boolean))
                    ).map((month) => (
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

        {/* ================= EVENTS (INTOUCHABLE) ================= */}
        <section className="pb-32">
          <div className="container">
            <h2 className="text-4xl font-light text-center mb-24 tracking-[0.15em] uppercase">
              Événements à venir
            </h2>

            {loading && (
              <p className="text-center text-lg">
                Chargement des événements...
              </p>
            )}

            {error && !loading && (
              <p className="text-center text-lg text-destructive">
                {error}
              </p>
            )}

            {!loading && !error && filteredEvents.length > 0 && (
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
            )}

            {!loading && !error && filteredEvents.length === 0 && (
              <div className="text-center py-20">
                <Calendar className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">
                  Aucun événement trouvé
                </h3>
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
