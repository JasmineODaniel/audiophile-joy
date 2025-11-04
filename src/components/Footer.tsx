import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-hero text-white">
      <div className="container mx-auto px-6 lg:px-24 py-16">
        <div className="border-t-4 border-accent w-24 mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-wider mb-8">audiophile</h2>
            <p className="text-white/50 max-w-md">
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we're open 7 days a week.
            </p>
          </div>

          <div>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-sm font-bold tracking-widest hover:text-accent transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/headphones" className="text-sm font-bold tracking-widest hover:text-accent transition-colors">
                  HEADPHONES
                </Link>
              </li>
              <li>
                <Link to="/speakers" className="text-sm font-bold tracking-widest hover:text-accent transition-colors">
                  SPEAKERS
                </Link>
              </li>
              <li>
                <Link to="/earphones" className="text-sm font-bold tracking-widest hover:text-accent transition-colors">
                  EARPHONES
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 items-start lg:justify-end">
            <a href="#" className="text-white hover:text-accent transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-accent transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-white hover:text-accent transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        <p className="text-white/50 text-sm">
          Copyright 2021. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
