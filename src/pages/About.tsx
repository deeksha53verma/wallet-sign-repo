import { Card } from "@/components/ui/card";
import { Shield, Target, Lightbulb } from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About WalletAuth
            </h1>
            <p className="text-xl text-muted-foreground">
              Pioneering the future of secure authentication
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur border-border">
              <div className="flex gap-4 items-start mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We're on a mission to revolutionize digital authentication by leveraging blockchain technology. 
                    Traditional two-factor authentication methods like SMS and email codes are increasingly vulnerable 
                    to attacks, from SIM swapping to phishing. Our wallet-based 2FA solution provides military-grade 
                    security through cryptographic signatures while maintaining user privacy and convenience.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur border-border">
              <div className="flex gap-4 items-start mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">The Problem</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Current 2FA methods face numerous challenges:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>SMS codes are vulnerable to SIM swapping attacks</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Email-based codes can be intercepted or phished</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Delivery delays frustrate users and slow down access</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Requires sharing personal information (phone/email)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur border-border">
              <div className="flex gap-4 items-start mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Solution</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    WalletAuth replaces traditional 2FA codes with cryptographic wallet signatures:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Uses blockchain cryptography for unbreakable security</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Instant verification with no waiting for codes</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Protects user privacy by eliminating PII requirements</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Works globally without carrier or provider dependencies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-primary">Blockchain</h3>
                  <p className="text-sm text-muted-foreground">
                    Ethereum-compatible chains, supporting major wallets like MetaMask, WalletConnect, and Coinbase Wallet
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-primary">Cryptography</h3>
                  <p className="text-sm text-muted-foreground">
                    ECDSA signatures with secp256k1 curve, same standard used by Bitcoin and Ethereum
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-primary">Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Unique nonce generation, signature verification, and replay attack prevention
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-primary">Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    RESTful API, webhooks, and SDKs for JavaScript, Python, Go, and more
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center pt-8">
              <p className="text-muted-foreground">
                Built for <span className="text-primary font-semibold">Track 4: Blockchain x Cybersecurity</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                A solution combining blockchain innovation with enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
