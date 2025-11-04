import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  image: string;
  link: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, link }) => {
  return (
    <Link to={link} className="group">
      <div className="bg-secondary rounded-lg overflow-hidden flex flex-col items-center pt-20 pb-8 px-8 relative hover:shadow-lg transition-shadow">
        <div className="w-32 h-32 bg-muted rounded-full mb-4 absolute top-0 transform -translate-y-1/2" />
        <h3 className="text-lg font-bold tracking-wider uppercase mb-4 mt-12">{name}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-accent transition-colors">
          <span className="font-bold">SHOP</span>
          <ChevronRight className="h-4 w-4 text-accent" />
        </div>
      </div>
    </Link>
  );
};
