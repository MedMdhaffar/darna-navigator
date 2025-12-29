import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import CityCard from "@/components/CityCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface City {
  id: number;
  name: string;
  image: string;
  short_description: string;
}

const Destinations = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/cities/cities/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cities");
        return res.json();
      })
      .then((data) => {
        setCities(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

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
            <MapPin className="h-10 w-10 mx-auto mb-6 text-sky-600" />
            <h1 className="text-5xl font-light mb-6">
              Destinations <span className="font-semibold">Tunisiennes</span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Des villes de caractère, façonnées par l’histoire,
              entre Méditerranée, désert et traditions millénaires.
            </p>
          </div>
        </section>


        {/* ================= SEPARATOR + QUOTE ================= */}
        <section className="py-24">
          <div className="container flex flex-col items-center text-muted-foreground/80">
            <div className="flex items-center gap-6 mb-6">
              <span className="h-px w-24 bg-current" />
              <span className="uppercase tracking-[0.3em] text-xs">
                Lieux & Héritage
              </span>
              <span className="h-px w-24 bg-current" />
            </div>

            <p className="italic text-center max-w-xl text-sm">
              “Chaque ville est un voyage,
              chaque pierre une mémoire.”
            </p>
          </div>
        </section>

        {/* ================= CITIES (INTOUCHABLE) ================= */}
        <section className="relative pb-36">
          {/* Fond doux derrière les cartes */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-[#faf7f3]/60 to-background" />

          <div className="relative container">
            <h2 className="text-4xl font-light text-center mb-24 tracking-[0.15em] uppercase">
              Destinations incontournables
            </h2>

            {loading && (
              <p className="text-center text-lg">
                Chargement des destinations...
              </p>
            )}

            {!loading && cities.length === 0 && (
              <p className="text-center text-lg">
                Aucune destination trouvée pour le moment.
              </p>
            )}

            {!loading && cities.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cities.map((city) => (
                  <CityCard
                    key={city.id}
                    id={city.id}
                    name={city.name}
                    description={city.short_description}
                    image={city.image}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Destinations;
