import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { getProductsByCategory } from "@/lib/products";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const products = getProductsByCategory(category || "");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Category Header */}
      <section className="bg-hero text-white py-20">
        <div className="container mx-auto px-6 lg:px-24">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-wider uppercase text-center">
            {category}
          </h1>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-6 lg:px-24 py-20 space-y-32">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="bg-secondary rounded-lg h-80 flex items-center justify-center">
                <div className="w-48 h-48 bg-muted rounded" />
              </div>
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              {product.new && (
                <p className="text-sm tracking-[10px] text-accent uppercase mb-4">NEW PRODUCT</p>
              )}
              <h2 className="text-3xl lg:text-4xl font-bold tracking-wider uppercase mb-6">
                {product.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                {product.description}
              </p>
              <Button variant="accent" size="lg" asChild>
                <Link to={`/product/${product.slug}`}>SEE PRODUCT</Link>
              </Button>
            </div>
          </div>
        ))}
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

export default Category;
