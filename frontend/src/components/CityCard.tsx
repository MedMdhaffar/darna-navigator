import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CityCardProps {
  name: string;
  image: string;
  description: string;
  id: number;
}

const CityCard = ({ name, image, description, id }: CityCardProps) => {
  return (
    <Link to={`/cities/${id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-bold mb-1">{name}</h3>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Tunisie</span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CityCard;
