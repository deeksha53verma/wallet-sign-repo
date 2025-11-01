import { Card } from "@/components/ui/card";
import { Shield, Zap, Lock, Globe, Code, Users } from "lucide-react";
import Navigation from "@/components/Navigation";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Leverages blockchain cryptography and digital signatures for authentication that's virtually impossible to compromise.",
      highlights: ["Cryptographic signatures", "Nonce-based verification", "Zero-knowledge proofs"]
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "No more waiting for SMS codes or searching through email. Authentication happens in seconds.",
      highlights: ["Sub-second response", "No network delays", "Always available"]
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Your phone number and email stay private. Only your wallet address is needed.",
      highlights: ["No PII collection", "Pseudonymous auth", "GDPR compliant"]
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Works globally without dependency on SMS networks or email providers.",
      highlights: ["Cross-border ready", "No carrier dependencies", "Internet-only requirement"]
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Simple API integration with comprehensive documentation and SDKs for popular platforms.",
      highlights: ["RESTful API", "Multiple SDKs", "Webhook support"]
    },
    {
      icon: Users,
      title: "User Experience",
      description: "Seamless wallet integration with major providers like MetaMask, WalletConnect, and more.",
      highlights: ["One-click signing", "Mobile wallet support", "Browser extensions"]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Powerful Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for secure, fast, and user-friendly authentication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Comparison Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Comparison: Traditional vs Wallet-Based 2FA</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 bg-card/30 border-border">
                <h3 className="text-xl font-bold mb-4 text-muted-foreground">Traditional 2FA</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2">❌ Delays from SMS/email delivery</li>
                  <li className="flex gap-2">❌ Phone number required</li>
                  <li className="flex gap-2">❌ Vulnerable to SIM swapping</li>
                  <li className="flex gap-2">❌ Email phishing risks</li>
                  <li className="flex gap-2">❌ Network dependent</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/50">
                <h3 className="text-xl font-bold mb-4 text-primary">Wallet-Based 2FA</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2">✅ Instant cryptographic verification</li>
                  <li className="flex gap-2">✅ No personal info needed</li>
                  <li className="flex gap-2">✅ Immune to SIM attacks</li>
                  <li className="flex gap-2">✅ No phishing possible</li>
                  <li className="flex gap-2">✅ Works anywhere with internet</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
