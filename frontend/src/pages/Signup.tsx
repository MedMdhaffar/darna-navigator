import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update state when user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Mot de passe min 6 caractères");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/accounts/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Log détaillé pour le débogage
        console.error("Backend error:", {
          status: response.status,
          statusText: response.statusText,
          data: data,
        });

        // Afficher le message d'erreur du backend ou un message générique
        const errorMessage =
          data.error ||
          data.message ||
          data.detail ||
          Object.values(data).join(", ") ||
          "Erreur lors de la création du compte";

        toast.error(errorMessage);
        return;
      }

      toast.success("Code de vérification envoyé à votre email !");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });

      // Redirect to verification page
      setTimeout(() => navigate("/verify"), 1000);

    } catch (error) {
      console.error("Network or parsing error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erreur réseau. Réessayez.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-100 p-4 overflow-hidden">
      {/* Soft light background accents */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-3xl" />

      <Card className="relative w-full max-w-md rounded-3xl border border-border/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-sm bg-background/95">
        <CardHeader className="space-y-6 text-center pb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mx-auto">
            <Heart className="h-8 w-8 fill-secondary text-secondary" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Darna Tunisia
            </span>
          </Link>

          <div>
            <CardTitle className="text-3xl font-light">
              Créer un <span className="font-semibold">compte</span>
            </CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">
              Rejoignez la communauté Darna Tunisia
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-11 rounded-xl"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-11 rounded-xl"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Au moins 6 caractères"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-11 rounded-xl"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirmer le mot de passe
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-11 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-sky-600 to-blue-700 hover:opacity-90 transition"
            >
              Créer mon compte
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition"
            >
              Retour à l'accueil
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
