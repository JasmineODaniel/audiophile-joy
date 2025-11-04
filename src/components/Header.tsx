import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { CartPanel } from "./CartPanel";

export const Header = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-hero border-b border-white/10">
      <div className="container mx-auto px-6 lg:px-24">
        <nav className="flex items-center justify-between h-24">
          <Link to="/" className="text-white text-2xl font-bold tracking-wider">
            audiophile
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link to="/" className="text-white text-sm font-bold tracking-widest hover:text-accent transition-colors">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/headphones" className="text-white text-sm font-bold tracking-widest hover:text-accent transition-colors">
                HEADPHONES
              </Link>
            </li>
            <li>
              <Link to="/speakers" className="text-white text-sm font-bold tracking-widest hover:text-accent transition-colors">
                SPEAKERS
              </Link>
            </li>
            <li>
              <Link to="/earphones" className="text-white text-sm font-bold tracking-widest hover:text-accent transition-colors">
                EARPHONES
              </Link>
            </li>
          </ul>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-accent relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>CART ({cartCount})</SheetTitle>
              </SheetHeader>
              <CartPanel />
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};
