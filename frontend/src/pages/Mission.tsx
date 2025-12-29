import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Mission = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                {/* ===== HERO ===== */}
                <section className="relative py-32 overflow-hidden text-center">
                    {/* Fond bleu méditerranéen */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f4f7fb] via-[#eaf2f8] to-background" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(15,76,117,0.14),transparent_60%)]" />

                    <div className="relative container">
                        <span className="uppercase tracking-[0.3em] text-xs text-muted-foreground">
                            Darna Tunisia
                        </span>

                        <h1 className="text-5xl font-light mt-6 mb-8">
                            Notre <span className="font-semibold">Mission</span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                            Donner du sens au voyage, en révélant l’âme authentique de la Tunisie.
                        </p>
                    </div>
                </section>

                {/* ===== CONTENT ===== */}
                <section className="py-28">
                    <div className="container max-w-4xl space-y-24">

                        {/* Pourquoi ce site */}
                        <div className="text-center">
                            <h2 className="text-3xl font-light mb-6">
                                Pourquoi ce site ?
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Darna Tunisia est né d’un constat simple :
                                la Tunisie ne se résume pas à une destination touristique,
                                mais à une expérience humaine, culturelle et sensorielle.
                                <br /><br />
                                Ce site a été conçu comme un guide élégant et accessible,
                                permettant de découvrir le pays à travers ses lieux,
                                ses saveurs et ses événements emblématiques.
                            </p>
                        </div>

                        {/* À qui il s’adresse */}
                        <div className="text-center">
                            <h2 className="text-3xl font-light mb-6">
                                À qui s’adresse-t-il ?
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Aux voyageurs curieux, aux amoureux de la culture,
                                aux Tunisiens désireux de redécouvrir leur patrimoine,
                                ainsi qu’à toute personne recherchant une vision
                                authentique et inspirante du pays.
                            </p>
                        </div>

                        {/* Valorisation */}
                        <div className="text-center">
                            <h2 className="text-3xl font-light mb-6">
                                Valorisation de la culture locale
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Notre ambition est de mettre en lumière
                                les richesses locales : traditions culinaires,
                                villes chargées d’histoire, événements culturels
                                et savoir-faire transmis de génération en génération.
                                <br /><br />
                                Darna Tunisia se veut un pont entre héritage et modernité.
                            </p>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Mission;
