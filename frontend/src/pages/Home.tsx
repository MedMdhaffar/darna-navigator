import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  UtensilsCrossed,
  Calendar,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CityCard from "@/components/CityCard";

import heroImage from "@/assets/hero-tunisia.jpg";
import tunisImage from "@/assets/tunis.jpg";
import sousseImage from "@/assets/sousse.jpg";
import djerbaImage from "@/assets/djerba.jpg";

/* ===== Animation presets ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="relative min-h-[90vh] flex items-center">
          <img
            src={heroImage}
            alt="Tunisia"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.9 }}
            className="relative container max-w-3xl text-white"
          >
            <span className="uppercase tracking-[0.3em] text-sm text-white/80">
              Darna Tunisia
            </span>

            <h1 className="text-6xl font-light mt-6 leading-tight">
              L’élégance du voyage,
              <br />
              <span className="font-semibold">l’âme de la Tunisie</span>
            </h1>

            <p className="mt-8 text-lg text-white/85">
              Une sélection raffinée de destinations, de saveurs
              et d’expériences culturelles authentiques.
            </p>

            <Link to="/destinations">
              <Button size="lg" className="mt-10 px-10 text-lg
              bg-gradient-to-r from-sky-600 to-blue-700 
              hover:opacity-90 transition" >
                Explorer
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* ================= VIDEO ================= */}
        <section className="py-32">
          <motion.div
            className="container grid lg:grid-cols-2 gap-20 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-4xl font-light mb-6">
                Une destination
                <br />
                <span className="font-semibold">à ressentir</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Chaque instant en Tunisie est une rencontre :
                la lumière, les saveurs, les traditions et les lieux
                façonnent une expérience unique et intemporelle.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src="https://www.youtube.com/embed/DMAaLIIRB38"
                title="Tunisia Experience"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ================= INTENTION DU VOYAGEUR ================= */}
        <section className="relative py-32 overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f7fb] via-[#eaf2f8] to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(15,76,117,0.12),transparent_60%)]" />

          <motion.div
            className="relative container max-w-4xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-light mb-10"
            >
              Pourquoi venir en <span className="font-semibold">Tunisie</span> ?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg mb-16 leading-relaxed"
            >
              La Tunisie ne se visite pas pour une seule raison.
              Elle se découvre différemment selon ce que l’on cherche,
              ce que l’on ressent, ce que l’on souhaite vivre.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-left">
              {[
                {
                  title: "Détente",
                  text: "Pour la douceur du littoral, la lumière méditerranéenne et le rythme apaisant des journées.",
                },
                {
                  title: "Culture",
                  text: "Pour un patrimoine millénaire, des médinas vivantes et des sites classés à ciel ouvert.",
                },
                {
                  title: "Gastronomie",
                  text: "Pour une cuisine sincère, généreuse, façonnée par la terre, la mer et les traditions.",
                },
                {
                  title: "Festivals & traditions",
                  text: "Pour vibrer au rythme des événements, des musiques et des célébrations locales.",
                },
                {
                  title: "Nature & évasion",
                  text: "Pour les contrastes uniques entre oasis, désert, montagnes et horizons infinis.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="border rounded-2xl p-8 bg-background/80 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeUp}
              className="mt-20 text-sm text-muted-foreground italic"
            >
              Quelle que soit votre intention, la Tunisie vous offre
              une expérience à votre mesure.
            </motion.p>
          </motion.div>
        </section>



        {/* ================= DESTINATIONS ================= */}
        <section className="py-28">
          <motion.div
            className="container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-light text-center mb-16"
            >
              Destinations d’exception
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div variants={fadeUp}>
                <CityCard
                  id={1}
                  name="Tunis"
                  image={tunisImage}
                  description="Capitale culturelle et contemporaine."
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <CityCard
                  id={2}
                  name="Sousse"
                  image={sousseImage}
                  description="Héritage méditerranéen et douceur de vivre."
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <CityCard
                  id={3}
                  name="Djerba"
                  image={djerbaImage}
                  description="Île de sérénité et de spiritualité."
                />
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
