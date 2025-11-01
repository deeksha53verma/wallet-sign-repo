import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const Navigation = () => {
  const location = useLocation();
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/features", label: "Features" },
    { path: "/demo", label: "Demo" },
    { path: "/document-signing", label: "Sign Document" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Wallet className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              WalletAuth
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {!isConnected ? (
            <Button 
              onClick={connect}
              disabled={isConnecting}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono text-primary">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              </div>
              <Button 
                onClick={disconnect}
                variant="outline"
                size="sm"
                className="border-primary/50 hover:bg-primary/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
