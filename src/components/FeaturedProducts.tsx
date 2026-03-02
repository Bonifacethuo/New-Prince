import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

// Import special edition assets
import goldenLegacyImg from "@/assets/products/golden-legacy.png";
import legendModeImg from "@/assets/products/legend-mode.png";
import loveBoldlyImg from "@/assets/products/love-boldly.png";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Special Edition Drops
  const specialDrops = [
    {
      id: 10001,
      name: "Golden Legacy Sweatshirt",
      price: 125.00,
      originalPrice: 150.00,
      image: goldenLegacyImg,
      category: "Collector's Series",
      rating: 5.0,
      isSale: true,
      isNew: true
    },
    {
      id: 10002,
      name: "Legend Mode T-Shirt",
      price: 45.00,
      image: legendModeImg,
      category: "Essentials",
      rating: 5.0,
      isNew: true
    },
    {
      id: 10003,
      name: "Love Boldly Long-Sleeve",
      price: 55.00,
      image: loveBoldlyImg,
      category: "Valentines Edit",
      rating: 5.0,
      isNew: true
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        // Map Shopify product format to our component format
        const mappedProducts = data.products
          .map((p: any) => ({
            id: p.id,
            name: p.title,
            price: parseFloat(p.variants[0]?.price || "0"),
            originalPrice: p.variants[0]?.compare_at_price ? parseFloat(p.variants[0].compare_at_price) : undefined,
            image: p.images[0]?.src || "/placeholder.svg",
            category: p.product_type || "Essential",
            rating: 5,
            isSale: p.variants[0]?.compare_at_price ? true : false,
            isNew: new Date(p.published_at).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000),
          }))
          // Filter for clothing items only
          .filter((p: any) =>
            !['beauty', 'nails', 'hair', 'jewelry', 'polish', 'makeup'].some(term =>
              p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
            )
          );

        // Prepend special drops and fill with others
        setProducts([...specialDrops, ...mappedProducts].slice(0, 8));
      } catch (error) {
        console.error('Error fetching real products:', error);
        setProducts(specialDrops);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-light uppercase tracking-widest text-xs">Syncing inventory...</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 text-center">
        {/* Minimalist Section Header */}
        <div className="mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4 uppercase">
            Curated selection
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
