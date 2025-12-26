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
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20">
          <div className="container text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
              <MapPin className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Destinations</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Explorez les trésors de la Tunisie, de la Méditerranée au Sahara
            </p>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-20">
          <div className="container">
            {loading ? (
              <p className="text-center text-lg">Chargement des destinations...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cities.map((city) => (
                  <CityCard
                    key={city.id}
                    name={city.name}
                    description={city.short_description}
                    image={city.image}
                    id={city.id}
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
