import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Search, Menu, X, Zap } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<any[]>([
    { name: "Shop All", href: "/collections/all" },
  ]);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchNavCollections = async () => {
      try {
        const response = await fetch('/collections.json');
        if (response.ok) {
          const data = await response.json();
          const collections = data.collections
            .filter((c: any) =>
              !['beauty', 'nails', 'hair', 'jewelry'].some(term => c.title.toLowerCase().includes(term))
            )
            .slice(0, 4).map((c: any) => ({
              name: c.title,
              href: `/collections/${c.handle}`
            }));
          setNavLinks([
            ...collections,
            { name: "Series / 001", href: "/collections/new-arrivals" },
            { name: "Sale", href: "/collections/sale" },
          ]);
        }
      } catch (error) {
        console.error('Error fetching nav collections:', error);
      }
    };

    const fetchCart = async () => {
      try {
        const response = await fetch('/cart.js');
        if (response.ok) {
          const cart = await response.json();
          setCartCount(cart.item_count);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchNavCollections();
    fetchCart();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border">
      {/* Dynamic Top Banner - Minimalist */}
      <div className="bg-primary text-background py-3 px-4">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em]">
          Prince Shop Core Series / Now Live / USE: <span className="text-accent">PRINCE20</span>
        </p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-secondary rounded-none transition-colors border border-transparent hover:border-border"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo - Minimal & Futuristic */}
          <a href="/" className="flex items-center gap-3 group">
            <Zap className="h-6 w-6 text-accent animate-pulse" />
            <span className="font-serif text-2xl md:text-3xl font-black tracking-tighter uppercase">
              Prince Shop
            </span>
          </a>

          {/* Desktop Navigation - Ultra Minimal */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-all duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions - Subtle & Sharp */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-secondary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-secondary relative">
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="relative rounded-none h-12 w-12 bg-primary hover:bg-black transition-all"
              onClick={() => window.location.href = '/cart'}
            >
              <ShoppingBag className="h-5 w-5 text-background" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-white text-[10px] flex items-center justify-center font-black">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-background border-t border-border animate-fade-in-up">
          <div className="container mx-auto px-6 py-12 flex flex-col gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-black uppercase tracking-tighter text-foreground/80 hover:text-accent transition-all animate-fade-in"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
