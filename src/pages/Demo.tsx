import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, CheckCircle, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import WalletSignDemo from "@/components/WalletSignDemo";
import { useToast } from "@/hooks/use-toast";
import walletIcon from "@/assets/wallet-icon.jpg";

const Demo = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Missing credentials",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      toast({
        title: "Step 1 Complete",
        description: "Credentials verified. Now connect your wallet.",
      });
    }, 1500);
  };

  const handleWalletConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setWalletConnected(true);
      setStep(3);
      toast({
        title: "Wallet Connected",
        description: "Please sign the message in your wallet.",
      });
    }, 1500);
  };

  const handleSign = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
      toast({
        title: "Authentication Successful! 🎉",
        description: "You've been securely authenticated with wallet-based 2FA.",
      });
    }, 2000);
  };

  const resetDemo = () => {
    setStep(1);
    setUsername("");
    setPassword("");
    setWalletConnected(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Interactive Demo
            </h1>
            <p className="text-xl text-muted-foreground">
              Experience wallet-based 2FA in action (simulated)
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= num 
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {step > num ? <CheckCircle className="h-5 w-5" /> : num}
                  </div>
                  {num < 4 && (
                    <div className={`w-12 h-1 transition-all ${
                      step > num ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Demo Cards */}
          <Card className="p-8 bg-card/50 backdrop-blur border-border">
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Step 1: Enter Credentials</h2>
                  <p className="text-muted-foreground">Start with your standard login</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
                  </Button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Step 2: Connect Wallet</h2>
                  <p className="text-muted-foreground">Connect your crypto wallet for 2FA</p>
                </div>
                <div className="max-w-md mx-auto">
                  <div className="mb-6 flex justify-center">
                    <img src={walletIcon} alt="Wallet" className="w-32 h-32 rounded-2xl" />
                  </div>
                  <Button 
                    onClick={handleWalletConnect}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Wallet className="h-4 w-4 mr-2" />
                    )}
                    Connect Wallet
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Step 3: Sign Message</h2>
                  <p className="text-muted-foreground">Sign the nonce to verify ownership</p>
                </div>
                <div className="max-w-md mx-auto space-y-4">
                  <Card className="p-4 bg-muted/50 border-border">
                    <p className="text-sm text-muted-foreground mb-2">Nonce to sign:</p>
                    <p className="font-mono text-sm break-all text-primary">
                      0x{Math.random().toString(16).substr(2, 64)}
                    </p>
                  </Card>
                  <Button 
                    onClick={handleSign}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Sign Message"}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mb-4">
                    <CheckCircle className="h-16 w-16 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Authentication Successful!</h2>
                  <p className="text-muted-foreground mb-8">
                    You've been securely authenticated using wallet-based 2FA
                  </p>
                  <div className="max-w-md mx-auto space-y-3 text-left mb-8">
                    <div className="flex gap-2 items-center">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Credentials verified</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Wallet signature validated</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Secure session established</span>
                    </div>
                  </div>
                  <Button 
                    onClick={resetDemo}
                    variant="outline"
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Live Wallet Integration */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Try Real Wallet Signing
            </h2>
            <WalletSignDemo />
          </div>

          {/* Info Card */}
          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> The demo above is simulated for educational purposes. 
              The "Try Real Wallet Signing" section below uses actual Web3 wallet integration with MetaMask 
              or other compatible wallets to demonstrate real cryptographic signatures.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Demo;
