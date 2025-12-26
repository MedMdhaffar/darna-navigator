import { Heart, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Place {
    id: number;
    name: string;
    description: string;
}

interface City {
    id: number;
    name: string;
    image: string;
    short_description: string;
    description: string;
    population: string;
    area: string;
    climate: string;
    best_period: string;
    places: Place[];
}

const CityDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [city, setCity] = useState<City | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/cities/cities/${id}/`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch city");
                return res.json();
            })
            .then((data) => {
                setCity(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleAddToFavorites = () => {
        if (city) {
            toast.success(`${city.name} ajoutée à vos favoris !`);
            setTimeout(() => navigate("/profil"), 1000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-lg">Chargement...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (!city) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-lg">Ville introuvable</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[500px] flex items-end overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={city.image}
                            alt={city.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    </div>

                    <div className="relative z-10 w-full">
                        <div className="container pb-12">
                            <div className="max-w-3xl">
                                <h1 className="text-5xl font-bold text-white mb-4">
                                    {city.name}
                                </h1>
                                <div className="flex items-center text-white/90 mb-4">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span className="text-lg">Tunisie</span>
                                </div>
                                <p className="text-xl text-white/90">
                                    {city.short_description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Description */}
                <section className="py-12 bg-muted/30">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4">
                                        À propos de {city.name}
                                    </h2>
                                    <div className="prose prose-lg max-w-none text-muted-foreground">
                                        <p>{city.description}</p>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleAddToFavorites}
                                    size="lg"
                                    className="w-full sm:w-auto"
                                >
                                    <Heart className="mr-2 h-5 w-5" />
                                    Ajouter aux favoris
                                </Button>
                            </div>

                            {/* Info Cards */}
                            <div className="space-y-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-lg mb-4">
                                            Informations pratiques
                                        </h3>
                                        <dl className="space-y-3 text-sm">
                                            <div>
                                                <dt className="font-medium text-muted-foreground">
                                                    Population
                                                </dt>
                                                <dd>{city.population}</dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium text-muted-foreground">
                                                    Superficie
                                                </dt>
                                                <dd>{city.area}</dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium text-muted-foreground">
                                                    Climat
                                                </dt>
                                                <dd>{city.climate}</dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium text-muted-foreground">
                                                    Meilleure période
                                                </dt>
                                                <dd>{city.best_period}</dd>
                                            </div>
                                        </dl>
                                    </CardContent>
                                </Card>

                                <Card className="bg-accent">
                                    <CardContent className="p-6">
                                        <Camera className="h-8 w-8 text-accent-foreground mb-3" />
                                        <h3 className="font-semibold text-lg mb-2 text-accent-foreground">
                                            Partagez vos photos
                                        </h3>
                                        <p className="text-sm text-accent-foreground/80">
                                            Utilisez le hashtag #DarnaTunis pour partager vos souvenirs
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Places */}
                <section className="py-20">
                    <div className="container">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            Lieux à visiter
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {city.places.map((place) => (
                                <Card key={place.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <MapPin className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">{place.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {place.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CityDetails;
