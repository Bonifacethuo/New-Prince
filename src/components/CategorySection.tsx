import { useState, useEffect } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";

// Import special edition assets
import goldenLegacyImg from "@/assets/products/golden-legacy.png";
import legendModeImg from "@/assets/products/legend-mode.png";
import loveBoldlyImg from "@/assets/products/love-boldly.png";

const CategorySection = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/collections.json');
        if (!response.ok) throw new Error('Collections endpoint not available');
        const data = await response.json();

        const mappedCategories = data.collections
          .map((c: any, index: number) => ({
            id: c.id,
            name: c.title,
            description: c.body_html?.replace(/<[^>]*>?/gm, '').slice(0, 80) || `Premium ${c.title} collection`,
            // Lead with our special visuals
            image: index === 0 ? goldenLegacyImg : (index === 1 ? legendModeImg : (c.image?.src || "/placeholder.svg")),
            count: c.products_count || 0,
            handle: c.handle
          }))
          // Only show clothing/fashion relevant collections
          .filter((cat: any) =>
            cat.count > 0 &&
            !['beauty', 'nails', 'hair', 'jewelry'].some(term => cat.name.toLowerCase().includes(term))
          );

        setCategories(mappedCategories);
      } catch (error) {
        console.error('Error fetching real collections:', error);
        // Fallback demo categories
        setCategories([
          { id: 1, name: "Series / 001", handle: "new-arrivals", count: 12, image: goldenLegacyImg },
          { id: 2, name: "Essentials", handle: "essentials", count: 24, image: legendModeImg },
          { id: 3, name: "Valentines Edit", handle: "valentines", count: 8, image: loveBoldlyImg },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return null;
  if (categories.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Minimal Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
              Collections
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Curated essentials for the modern wardrobe. Minimalist designs, high-performance fabrics.
            </p>
          </div>
          <a href="/collections" className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground hover:text-accent transition-colors">
            View All Series
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.slice(0, 3).map((category, index) => (
            <a
              key={category.id}
              href={`/collections/${category.handle}`}
              className="group block space-y-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Clean Image Card */}
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="bg-background p-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                      {category.count} Pieces
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      Explore {category.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="flex items-center justify-between pt-2 border-b border-border pb-6">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                  {category.name}
                </h3>
                <ShoppingBag className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
