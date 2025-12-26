import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  UtensilsCrossed,
  Calendar,
  MapPin,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CityCard from "@/components/CityCard";

import heroImage from "@/assets/hero-tunisia.jpg";
import tunisImage from "@/assets/tunis.jpg";
import sousseImage from "@/assets/sousse.jpg";
import djerbaImage from "@/assets/djerba.jpg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Tunisia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Bienvenue chez vous en Tunisie
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Découvrez la magie méditerranéenne, entre histoire millénaire et traditions vivantes
            </p>
            <Link to="/destinations">
              <Button size="lg" className="text-lg">
                Explorer les destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ================= VIDEO SECTION ================= */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Vivez l’expérience tunisienne
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
              Plongez au cœur de la Tunisie à travers ses paysages, sa culture
              et son art de vivre.
            </p>

            <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/DMAaLIIRB38?si=a2TeMCxfAgRlpemv"
                title="Tunisia Travel Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* ================= DESTINATIONS PREVIEW ================= */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Destinations incontournables
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des villes chargées d’histoire aux îles paradisiaques,
                explorez la diversité tunisienne.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CityCard
                name="Tunis"
                image={tunisImage}
                description="Capitale vibrante mêlant histoire et modernité."
                id={1}
              />
              <CityCard
                name="Sousse"
                image={sousseImage}
                description="La perle du Sahel et ses plages dorées."
                id={2}
              />
              <CityCard
                name="Djerba"
                image={djerbaImage}
                description="Île méditerranéenne aux mille palmiers."
                id={3}
              />
            </div>

            <div className="text-center mt-12">
              <Link to="/destinations">
                <Button variant="outline" size="lg">
                  Voir toutes les destinations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= EXPERIENCE SECTION ================= */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <UtensilsCrossed className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Gastronomie</h3>
                <p className="text-muted-foreground">
                  Saveurs authentiques, recettes ancestrales et produits du terroir.
                </p>
              </div>

              <div className="p-6">
                <Calendar className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Événements</h3>
                <p className="text-muted-foreground">
                  Festivals, traditions et rendez-vous culturels toute l’année.
                </p>
              </div>

              <div className="p-6">
                <MapPin className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Patrimoine</h3>
                <p className="text-muted-foreground">
                  Sites antiques, médinas classées et trésors historiques.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
