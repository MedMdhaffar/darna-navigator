import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Team = () => {
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
                            Notre <span className="font-semibold">Équipe</span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                            Découvrez les passionnés derrière Darna Tunisia, unis par l'amour de la Tunisie.
                        </p>
                    </div>
                </section>

                {/* ===== CONTENT ===== */}
                <section className="py-28">
                    <div className="container max-w-4xl space-y-24">

                        {/* Présentation de l'équipe */}
                        <div className="text-center">
                            <h2 className="text-3xl font-light mb-6">
                                Qui sommes-nous ?
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Darna Tunisia est le fruit du travail d'une équipe dédiée,
                                composée de développeurs, designers et experts en culture tunisienne.
                                <br /><br />
                                Chacun apporte sa vision unique pour créer une plateforme
                                qui célèbre la beauté et la diversité de la Tunisie.
                            </p>
                        </div>

                        {/* Membres de l'équipe */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                            {/* Membre 1 */}
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                                    <span className="text-4xl">👤</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Leith Mabrouk</h3>
                                <p className="text-muted-foreground">Développeur Frontend</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Passionné par l'interface utilisateur et l'expérience utilisateur.
                                </p>
                            </div>

                            {/* Membre 2 */}
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                                    <span className="text-4xl">👩</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Tasnim Selmi</h3>
                                <p className="text-muted-foreground">Designer UX/UI</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Experte en design centré sur l'utilisateur.
                                </p>
                            </div>

                            {/* Membre 3 */}
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                                    <span className="text-4xl">👨‍💼</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Mohamed Mdhaffar</h3>
                                <p className="text-muted-foreground">Développeur Backend</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Spécialiste en architecture serveur et bases de données.
                                </p>
                            </div>

                            

                            {/* Membre 6 */}
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                                    <span className="text-4xl">👩‍💻</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Mahdi Makhlouf</h3>
                                <p className="text-muted-foreground">Chef de Projet</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Coordonne l'équipe et assure la qualité du projet.
                                </p>
                            </div>
                        </div>

                        {/* Valeurs de l'équipe */}
                        <div className="text-center">
                            <h2 className="text-3xl font-light mb-6">
                                Nos Valeurs
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Authenticité, passion, innovation et respect de la culture tunisienne
                                guident chacune de nos décisions.
                                <br /><br />
                                Nous croyons en la puissance du partage et de la découverte
                                pour rapprocher les gens de la beauté de la Tunisie.
                            </p>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Team;