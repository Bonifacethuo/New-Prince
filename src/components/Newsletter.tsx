import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Sparkles, Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Access Granted / Prince Shop",
        description: "You've been added to the Prince Shop priority list.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden border-t border-border">
      {/* Futuristic Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Zap className="h-24 w-24 text-accent animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Sparkles className="h-16 w-16 text-accent animate-float" style={{ animationDelay: "1s" }} />
      </div>
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Futuristic Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-none px-6 py-2 mb-4">
            <Mail className="h-3 w-3 text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Join the Core List</span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            Secure early access
          </h2>
          <p className="text-white/60 mb-12 text-lg font-light leading-relaxed max-w-xl mx-auto">
            Get priority notifications for limited edition drops and updates from the Prince Shop lab.
          </p>

          {/* Minimalist Newsletter Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-16 pl-6 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-none focus:ring-accent uppercase text-xs tracking-widest font-bold"
              />
            </div>
            <Button
              type="submit"
              className="h-16 px-10 rounded-none bg-accent hover:bg-white hover:text-black transition-all duration-500 font-bold uppercase text-xs tracking-[0.2em]"
            >
              Sign Up
              <ArrowRight className="h-4 w-4 ml-3" />
            </Button>
          </form>

          <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest pt-8">
            Privacy Guaranteed. Unsubscribe Anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
