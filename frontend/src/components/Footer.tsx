import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 fill-secondary text-secondary" />
              <span className="text-lg font-bold">Darna Tunisia</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Découvrez les merveilles de la Tunisie, de ses plages paradisiaques à son patrimoine millénaire.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/gastronomie" className="text-muted-foreground hover:text-primary transition-colors">
                  Gastronomie
                </Link>
              </li>
              <li>
                <Link to="/evenements" className="text-muted-foreground hover:text-primary transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/profil" className="text-muted-foreground hover:text-primary transition-colors">
                  Mon Profil
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-semibold mb-4">À propos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Link to="/mission">Notre mission</Link>

                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Link to="/team">L'équipe</Link>
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Partenaires
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Presse
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>darna.tunisie@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+216 99 655 775</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Tunis, Tunisie</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Darna Tunisia. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
