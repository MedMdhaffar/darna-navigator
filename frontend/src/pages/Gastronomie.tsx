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
      .catch((err) => {
        console.error(err);
        setError("Une erreur est survenue lors du chargement des plats.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-accent to-accent-dark text-accent-foreground py-20">
          <div className="container text-center">
            <div className="inline-flex items-center justify-center p-3 bg-background/10 rounded-full mb-6">
              <UtensilsCrossed className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Gastronomie Tunisienne</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Un voyage culinaire entre Méditerranée et Sahara, où chaque plat raconte une histoire
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                La cuisine tunisienne est un savoureux mélange d'influences berbères, arabes, turques,
                italiennes et françaises. Généreuse en saveurs et en couleurs, elle fait la part belle
                aux épices (cumin, carvi, coriandre, harissa), à l'huile d'olive, aux légumes frais et
                aux produits de la mer.
              </p>
            </div>
          </div>
        </section>

        {/* Dishes Grid */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Plats Typiques & Restaurants</h2>

            {loading && (
              <p className="text-center text-lg">Chargement des plats...</p>
            )}

            {error && !loading && (
              <p className="text-center text-lg text-destructive">{error}</p>
            )}

            {!loading && !error && dishes.length === 0 && (
              <p className="text-center text-lg">Aucun plat trouvé pour le moment.</p>
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

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Envie de découvrir plus ?</h2>
            <p className="text-lg mb-6 opacity-90">
              Explorez nos destinations pour trouver les meilleurs restaurants locaux
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gastronomie;
