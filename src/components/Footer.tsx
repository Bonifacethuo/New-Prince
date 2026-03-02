import { useState, useEffect } from "react";
import { Zap, Instagram, Facebook, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const [shopLinks, setShopLinks] = useState<any[]>([
    { name: "Shop All", href: "/collections/all" },
  ]);

  useEffect(() => {
    const fetchFooterCollections = async () => {
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
          setShopLinks([
            ...collections,
            { name: "New Arrivals", href: "/collections/new-arrivals" },
          ]);
        }
      } catch (error) {
        console.error('Error fetching footer collections:', error);
      }
    };
    fetchFooterCollections();
  }, []);

  const customerService = [
    { name: "Contact Us", href: "#contact" },
    { name: "FAQs", href: "#faq" },
    { name: "Shipping Info", href: "#shipping" },
    { name: "Returns & Exchanges", href: "#returns" },
    { name: "Size Guide", href: "#size-guide" },
    { name: "Track Order", href: "#track" },
  ];

  const about = [
    { name: "Our Story", href: "#story" },
    { name: "Careers", href: "#careers" },
    { name: "Press", href: "#press" },
    { name: "Sustainability", href: "#sustainability" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-background text-foreground border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <a href="/" className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-accent animate-pulse" />
              <span className="font-serif text-3xl font-black uppercase tracking-tighter">
                Prince Shop
              </span>
            </a>
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-sm">
              Premium aesthetics meet contemporary design. Carefully curated essentials for the modern lifestyle.
              Crafted for those who define the trend.
            </p>

            {/* Social Links */}
            <div className="flex gap-6 pt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {/* Quick Links */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-foreground">Series</h4>
              <ul className="space-y-4">
                {shopLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-foreground">Support</h4>
              <ul className="space-y-4">
                {customerService.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-foreground">Info</h4>
              <ul className="space-y-4">
                {about.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center md:text-left">
              © 2024 Prince Shop Core. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
                Privacy
              </a>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
                Terms
              </a>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
