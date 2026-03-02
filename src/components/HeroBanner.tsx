import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import legendModeShirt from "@/assets/products/legend-mode-shirt.png";
import heroBg from "@/assets/hero-banner.jpg";

// Use a high-quality local placeholder for local dev
const LOCAL_PLACEHOLDER = heroBg;

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
      {/* Dynamic Background Image & Color Layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background/60 to-background z-10" />
        <img
          src={heroImage}
          alt={settings.title}
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Subtle Neutral Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/10 blur-[150px] rounded-full animate-pulse z-20" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 blur-[150px] rounded-full animate-pulse z-20" />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 animate-fade-in-up">
          <div className="lg:w-[55%] space-y-10 z-20">
            {/* Elevated Typography */}
            <h1 className="font-serif text-3xl md:text-5xl lg:text-5xl font-black tracking-tighter text-foreground leading-[1] uppercase drop-shadow-md">
              {settings.title}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-lg font-light leading-relaxed border-l-4 border-accent pl-8">
              {settings.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 pt-6">
              <Button
                variant="default"
                size="xl"
                className="rounded-full px-16 group h-20 text-xl bg-black text-white hover:bg-accent hover:text-black hover:scale-105 transition-all duration-500 shadow-2xl shadow-black/20"
                onClick={() => window.location.href = settings.buttonLink || '/collections/all'}
              >
                {settings.buttonText}
                <ArrowRight className="h-6 w-6 ml-6 transition-transform group-hover:translate-x-3" />
              </Button>
            </div>
          </div>

          {/* Featured Image - Enhanced Visibility */}
          <div className="relative group w-full lg:w-[45%] flex justify-center lg:justify-end z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent blur-[140px] rounded-full scale-110 group-hover:scale-125 transition-transform duration-1000 animate-pulse" />
            <div className="relative bg-white/40 backdrop-blur-3xl rounded-[3rem] p-4 lg:p-8 border border-black/5 shadow-2xl overflow-hidden group-hover:border-accent/50 transition-colors duration-700">
              <img
                src={mainFeaturedImage}
                alt={settings.featuredAlt || "Legend Mode"}
                className="relative z-10 max-w-full h-auto drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-3"
              />
            </div>
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
