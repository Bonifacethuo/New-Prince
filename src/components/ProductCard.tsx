import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div
        className="group relative bg-background border border-border overflow-hidden transition-all duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Modern Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Minimalist Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest">
                New
              </span>
            )}
            {product.isSale && (
              <span className="px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest">
                -{discount}%
              </span>
            )}
          </div>

          {/* Clean Quick Actions */}
          <div
            className={`absolute top-4 right-4 flex flex-col gap-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
              }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className="p-3 bg-white hover:bg-black hover:text-white transition-colors duration-300 border border-border"
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              className="p-3 bg-white hover:bg-black hover:text-white transition-colors duration-300 border border-border"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Minimal Add to Cart */}
          <div
            className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 transform ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            <Button variant="default" className="w-full h-12 rounded-none bg-foreground text-background hover:bg-black uppercase text-xs tracking-widest" size="sm">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Bag
            </Button>
          </div>
        </div>

        {/* Minimalist Product Info */}
        <div className="p-6 space-y-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            {product.category}
          </p>
          <h3 className="text-sm font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through decoration-accent/30">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {/* Subtle Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-foreground text-foreground" />
              <span className="text-[10px] font-bold">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-none bg-background">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="aspect-[3/4] bg-secondary overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="flex flex-col p-12 justify-center space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
                    Series / {product.category}
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 fill-foreground text-foreground" />
                    <span className="text-[10px] font-black">{product.rating}</span>
                  </div>
                </div>

                <h2 className="font-serif text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-4 pt-4">
                  <span className="text-3xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through decoration-accent/30">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground font-light leading-relaxed border-l-2 border-accent pl-6">
                  Experience the Prince Shop Series. Precision cut for the modern silhouette.
                  Contemporary design meets effortless style.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-8">
                <Button variant="default" size="xl" className="w-full h-16 rounded-none bg-foreground text-background hover:bg-black uppercase text-xs font-bold tracking-[0.2em]">
                  <ShoppingBag className="h-5 w-5 mr-3" />
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full h-16 rounded-none border-border hover:bg-secondary transition-colors"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 mr-3 ${isLiked ? "fill-foreground" : ""}`} />
                  {isLiked ? "In Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
