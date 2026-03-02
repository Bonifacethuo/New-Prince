import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import legendModeShirt from "@/assets/products/legend-mode-shirt.png";

// Use a high-quality local placeholder for local dev
const LOCAL_PLACEHOLDER = "/placeholder.svg";

const HeroBanner = () => {
  // Pull settings from Shopify if available, otherwise use defaults
  const settings = (window as any).ShopifySettings?.hero || {
    image: LOCAL_PLACEHOLDER,
    featuredImage: legendModeShirt,
    featuredAlt: "Legend Mode T-Shirt",
    title: "Your Prince Shop Style",
    subtitle: "Modern aesthetics meet contemporary design. Elevate your everyday wardrobe.",
    buttonText: "Shop Collection",
    buttonLink: "/collections/all"
  };

  const heroImage = settings.image?.includes('no-image') || !settings.image ? LOCAL_PLACEHOLDER : settings.image;
  // Fallback to our provided shirt if Shopify image isn't set
  const mainFeaturedImage = settings.featuredImage?.includes('no-image') || !settings.featuredImage ? legendModeShirt : settings.featuredImage;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={settings.title}
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Futurist Minimal Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-background/10 backdrop-grayscale-[0.2]" />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 animate-fade-in-up">
          <div className="lg:w-1/2 space-y-8">
            {/* Elevated Typography */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter text-foreground leading-[0.9] uppercase">
              {settings.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg font-light leading-relaxed">
              {settings.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button
                variant="default"
                size="xl"
                className="rounded-none px-12 group h-16 text-lg bg-foreground text-background hover:bg-accent hover:text-white transition-all duration-500"
                onClick={() => window.location.href = settings.buttonLink || '/collections/all'}
              >
                {settings.buttonText}
                <ArrowRight className="h-5 w-5 ml-4 transition-transform group-hover:translate-x-2" />
              </Button>
            </div>
          </div>

          {/* Featured Image (T-shirt provided by user or Shopify setting) - Enlarged */}
          <div className="relative group w-full lg:w-1/2 max-w-3xl">
            <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full scale-90 group-hover:scale-110 transition-transform duration-1000" />
            <img
              src={mainFeaturedImage}
              alt={settings.featuredAlt || "Legend Mode"}
              className="relative z-10 w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover:scale-110 group-hover:-translate-y-8"
            />
          </div>
        </div>
      </div>

      {/* Futuristic Design Elements */}
      <div className="absolute right-0 bottom-0 w-1/3 h-px bg-gradient-to-l from-accent/50 to-transparent" />
      <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
    </section>
  );
};

export default HeroBanner;
