import { Card } from "@/components/ui/card";
import { Wallet, Key, CheckCircle, Shield, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";

const HowItWorks = () => {
  const steps = [
    {
      icon: Key,
      title: "Initial Login",
      description: "User enters their standard credentials (username/email and password) to begin the authentication process.",
      details: "This establishes the first factor of authentication using traditional credentials stored securely in the database."
    },
    {
      icon: Wallet,
      title: "Wallet Connection",
      description: "The system generates a unique nonce (random number) and prompts the user to connect their crypto wallet.",
      details: "The nonce ensures each authentication request is unique, preventing replay attacks and maintaining security."
    },
    {
      icon: Shield,
      title: "Signature Request",
      description: "User's wallet prompts them to sign the nonce with their private key, creating a cryptographic signature.",
      details: "This signature proves wallet ownership without exposing the private key, serving as the second authentication factor."
    },
    {
      icon: CheckCircle,
      title: "Verification Complete",
      description: "The system verifies the signature matches the wallet address, granting secure access upon success.",
      details: "Backend validates the signature cryptographically, ensuring both factors are authenticated before access."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              How Wallet-Based 2FA Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A revolutionary authentication method combining traditional credentials with blockchain cryptography 
              for unparalleled security and user privacy.
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-mono text-primary">Step {index + 1}</span>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-lg text-foreground mb-3">{step.description}</p>
                    <p className="text-muted-foreground">{step.details}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-6 w-6 text-primary/50 flex-shrink-0 hidden lg:block" />
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Technical Benefits */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <h3 className="text-xl font-bold mb-4 text-primary">Security Advantages</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Cryptographic proof of wallet ownership</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>No SMS interception or email phishing possible</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Unique nonce prevents replay attacks</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Private keys never leave the wallet</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <h3 className="text-xl font-bold mb-4 text-secondary">User Benefits</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>Instant authentication without waiting for codes</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>No phone number or email required</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>Works across devices with wallet access</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>Enhanced privacy and control</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
