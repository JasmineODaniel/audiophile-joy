import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.shortName} x${quantity} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-6 lg:px-24 py-12">
        <Link to={`/${product.category}`} className="text-muted-foreground hover:text-accent">
          Go Back
        </Link>
      </div>

      {/* Product Details */}
      <section className="container mx-auto px-6 lg:px-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="bg-secondary rounded-lg h-96 flex items-center justify-center">
            <div className="w-64 h-64 bg-muted rounded" />
          </div>
          <div>
            {product.new && (
              <p className="text-sm tracking-[10px] text-accent uppercase mb-4">NEW PRODUCT</p>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold tracking-wider uppercase mb-6">
              {product.name}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>
            <p className="text-2xl font-bold mb-8">$ {product.price.toLocaleString()}</p>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-4 bg-secondary rounded px-4 py-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-muted-foreground hover:text-accent"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-muted-foreground hover:text-accent"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button variant="accent" size="lg" onClick={handleAddToCart}>
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>

        {/* Features & In the Box */}
        <div className="grid lg:grid-cols-3 gap-12 mb-32">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-wider uppercase mb-8">FEATURES</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.features}
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-wider uppercase mb-8">IN THE BOX</h2>
            <ul className="space-y-2">
              {product.includes.map((item, index) => (
                <li key={index} className="flex gap-6">
                  <span className="text-accent font-bold">{item.quantity}x</span>
                  <span className="text-muted-foreground">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
          <div className="space-y-8">
            <div className="bg-secondary rounded-lg h-64" />
            <div className="bg-secondary rounded-lg h-64" />
          </div>
          <div className="bg-secondary rounded-lg h-full min-h-[544px]" />
        </div>

        {/* You May Also Like */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold tracking-wider uppercase text-center mb-12">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="bg-secondary rounded-lg h-80 mb-8" />
                <h3 className="text-2xl font-bold tracking-wider uppercase mb-8">XX99 MARK I</h3>
                <Button variant="accent" asChild>
                  <Link to="/product/xx99-mark-i">SEE PRODUCT</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 lg:px-24 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CategoryCard name="HEADPHONES" image="/placeholder.svg" link="/headphones" />
          <CategoryCard name="SPEAKERS" image="/placeholder.svg" link="/speakers" />
          <CategoryCard name="EARPHONES" image="/placeholder.svg" link="/earphones" />
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 lg:px-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <div className="bg-secondary rounded-lg h-80" />
          </div>
          <div className="lg:order-1">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-wider uppercase mb-8">
              BRINGING YOU THE <span className="text-accent">BEST</span> AUDIO GEAR
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
