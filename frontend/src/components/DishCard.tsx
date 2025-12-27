import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DishCardProps {
  id: number;
  name: string;
  image: string;
  description: string;
  restaurant?: string;
}

const DishCard = ({ id, name, image, description, restaurant }: DishCardProps) => {
  const navigate = useNavigate();

  const handleAddToFavorites = async () => {
    const storedTokens = localStorage.getItem("authTokens");
    if (!storedTokens) {
      toast.error("Vous devez être connecté");
      return;
    }
    const parsedTokens = JSON.parse(storedTokens);
    const decoded = JSON.parse(atob(parsedTokens.access.split(".")[1]));
    const username = decoded.username;

    const payload = {
      username,
      type: "plate",
      id: id,
      action: "add"
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/favorite/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log('Add to favorites response:', response); // Debug log
      if (response.ok) {
        toast.success(`${name} ajouté aux favoris`);
        setTimeout(() => navigate("/profil"), 1000);
      } else {
        toast.error("Erreur lors de l'ajout aux favoris");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'ajout aux favoris");
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          {restaurant && (
            <p className="text-sm text-primary">{restaurant}</p>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button
          onClick={handleAddToFavorites}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <Heart className="h-4 w-4 mr-2" />
          Ajouter aux favoris
        </Button>
      </CardContent>
    </Card>
  );
};

export default DishCard;
