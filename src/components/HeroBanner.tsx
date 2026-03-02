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
  const videoUrl = settings.videoUrl || 'https://cdn.shopify.com/videos/c/o/v/7a9a06cdd00a40e3aca91106b6eb48b4.mp4';

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
      {/* Dynamic Background Media (Video) */}
      <div className="absolute inset-0">
        {/* Darker Overlay for better text readability on video */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10" />

        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-100"
        />

        {/* Subtle Luxury Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 blur-[150px] rounded-full animate-pulse z-20" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 blur-[150px] rounded-full animate-pulse z-20" />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-32">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="space-y-10 z-20">
            {/* Elevated Typography */}
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              {settings.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed border-t-2 border-accent pt-8 drop-shadow-lg">
              {settings.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 pt-6 justify-center">
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
        </div>
      </div>

      {/* Futuristic Design Elements */}
      <div className="absolute right-0 bottom-0 w-1/3 h-px bg-gradient-to-l from-accent/50 to-transparent" />
      <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
    </section>
  );
};

export default HeroBanner;
