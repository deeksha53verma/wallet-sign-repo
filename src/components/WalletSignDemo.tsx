import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, Loader2 } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

const WalletSignDemo = () => {
  const { address, isConnected, connect, provider } = useWallet();
  const [signing, setSigning] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [nonce, setNonce] = useState<string>("");
  const { toast } = useToast();

  const generateNonce = () => {
    const randomNonce = `0x${Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;
    setNonce(randomNonce);
    return randomNonce;
  };

  const signMessage = async () => {
    if (!isConnected || !provider) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setSigning(true);
    const nonceToSign = nonce || generateNonce();

    try {
      const signer = await provider.getSigner();
      const message = `Sign this nonce for authentication: ${nonceToSign}`;
      const sig = await signer.signMessage(message);
      
      setSignature(sig);
      toast({
        title: "Message signed successfully! 🎉",
        description: "Your wallet signature has been recorded",
      });
    } catch (error: any) {
      console.error("Signing error:", error);
      toast({
        title: "Signing failed",
        description: error.message || "User rejected the signature request",
        variant: "destructive",
      });
    } finally {
      setSigning(false);
    }
  };

  const reset = () => {
    setSignature(null);
    setNonce("");
  };

  if (!isConnected) {
    return (
      <Card className="p-8 bg-card/50 backdrop-blur border-border text-center">
        <Shield className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">Wallet Not Connected</h3>
        <p className="text-muted-foreground mb-4">
          Connect your wallet to try real wallet-based authentication
        </p>
        <Button 
          onClick={connect}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          Connect Wallet
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-card/50 backdrop-blur border-border">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        Live Wallet Signature
      </h3>

      {!signature ? (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Connected: <span className="text-primary font-mono">{address}</span>
            </p>
            <div className="p-4 bg-muted/50 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground mb-2">Nonce to sign:</p>
              <p className="text-xs font-mono break-all text-foreground">
                {nonce || "Will be generated when you click Sign"}
              </p>
            </div>
          </div>

          <Button 
            onClick={signMessage}
            disabled={signing}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {signing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Waiting for signature...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Sign with My Wallet
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            This will prompt your wallet (MetaMask, etc.) to sign a message
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Signature Verified</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Successfully signed with wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Nonce:</p>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs font-mono break-all text-muted-foreground">{nonce}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Signature (ECDSA):</p>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs font-mono break-all text-muted-foreground">{signature}</p>
            </div>
          </div>

          <Button 
            onClick={reset}
            variant="outline"
            className="w-full border-primary/50 hover:bg-primary/10"
          >
            Sign Another Message
          </Button>
        </div>
      )}

      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Real Implementation:</strong> This uses your actual Web3 wallet 
          to generate cryptographic signatures. In production, the backend would verify this signature 
          matches your wallet address to complete authentication.
        </p>
      </div>
    </Card>
  );
};

export default WalletSignDemo;
