import { useEffect, useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import DishCard from "@/components/DishCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Plate {
  id: number;
  name: string;
  image: string;
  description: string;
  restaurant?: string;
}

const Gastronomie = () => {
  const [dishes, setDishes] = useState<Plate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/gastronomie/plates/")
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de récupérer les plats");
        return res.json();
      })
      .then((data) => {
        const mapped: Plate[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          description: item.definition,
          restaurant: item.restaurants,
        }));
        setDishes(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError("Une erreur est survenue lors du chargement des plats.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="relative py-32 overflow-hidden text-center">

          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f7fb] via-[#eaf2f8] to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(15,76,117,0.14),transparent_60%)]" />

          <div className="relative container">
            <UtensilsCrossed className="h-10 w-10 mx-auto mb-6 text-sky-600" />
            <h1 className="text-5xl font-light mb-6">
              Gastronomie <span className="font-semibold">Tunisienne</span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Une cuisine d’âme, transmise de génération en génération,
              entre terre, mer et soleil.
            </p>
          </div>
        </section>


        {/* ================= SEPARATOR + QUOTE ================= */}
        <section className="py-24">
          <div className="container flex flex-col items-center text-muted-foreground/80">
            <div className="flex items-center gap-6 mb-6">
              <span className="h-px w-24 bg-current" />
              <span className="uppercase tracking-[0.3em] text-xs">
                Héritage & Saveurs
              </span>
              <span className="h-px w-24 bg-current" />
            </div>

            <p className="italic text-center max-w-xl text-sm">
              “Chaque plat est une mémoire,
              chaque saveur raconte une terre.”
            </p>
          </div>
        </section>

        {/* ================= PLATS (INTOUCHABLE) ================= */}
        <section className="pb-32">
          <div className="container">
            <h2 className="text-4xl font-light text-center mb-24 tracking-[0.15em] uppercase">
              Plats emblématiques
            </h2>

            {loading && (
              <p className="text-center text-lg">Chargement des plats...</p>
            )}

            {error && !loading && (
              <p className="text-center text-lg text-destructive">{error}</p>
            )}

            {!loading && !error && dishes.length === 0 && (
              <p className="text-center text-lg">
                Aucun plat trouvé pour le moment.
              </p>
            )}

            {!loading && !error && dishes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    id={dish.id}
                    name={dish.name}
                    image={dish.image}
                    description={dish.description}
                    restaurant={dish.restaurant}
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

export default Gastronomie;
