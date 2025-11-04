import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-hero text-white">
        <div className="container mx-auto px-6 lg:px-24 py-20 lg:py-32">
          <div className="max-w-md">
            <p className="text-sm tracking-[10px] text-white/50 uppercase mb-6">NEW PRODUCT</p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-wider uppercase mb-6 leading-tight">
              XX99 MARK II HEADPHONES
            </h1>
            <p className="text-white/75 mb-10 leading-relaxed">
              Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/product/xx99-mark-ii">SEE PRODUCT</Link>
            </Button>
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

      {/* Featured Products */}
      <section className="container mx-auto px-6 lg:px-24 pb-20 space-y-12">
        {/* ZX9 Speaker */}
        <div className="bg-accent rounded-lg overflow-hidden p-12 lg:p-20 text-white grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-48 h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full" />
          </div>
          <div>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-wider uppercase mb-6">ZX9 SPEAKER</h2>
            <p className="text-white/75 mb-10 leading-relaxed max-w-md">
              Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
            </p>
            <Button variant="default" size="lg" asChild>
              <Link to="/product/zx9-speaker">SEE PRODUCT</Link>
            </Button>
          </div>
        </div>

        {/* ZX7 Speaker */}
        <div className="bg-secondary rounded-lg overflow-hidden p-12 lg:p-20">
          <h2 className="text-3xl font-bold tracking-wider uppercase mb-8">ZX7 SPEAKER</h2>
          <Button variant="outline" size="lg" asChild>
            <Link to="/product/zx7-speaker">SEE PRODUCT</Link>
          </Button>
        </div>

        {/* YX1 Earphones */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-secondary rounded-lg h-80" />
          <div className="bg-secondary rounded-lg p-12 lg:p-20 flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-wider uppercase mb-8">YX1 EARPHONES</h2>
            <Button variant="outline" size="lg" asChild>
              <Link to="/product/yx1-earphones">SEE PRODUCT</Link>
            </Button>
          </div>
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

export default Index;
