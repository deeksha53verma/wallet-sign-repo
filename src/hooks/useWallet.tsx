import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { BrowserProvider } from "ethers";
import { useToast } from "@/hooks/use-toast";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  provider: BrowserProvider | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAddress(accounts[0].address);
            setProvider(provider);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    checkConnection();

    // Listen for account changes
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          setAddress(null);
          setProvider(null);
        } else {
          setAddress(accounts[0]);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, []);

  const connect = async () => {
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask or another Web3 wallet",
        variant: "destructive",
      });
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setIsConnecting(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setProvider(provider);
        toast({
          title: "Wallet connected! 🎉",
          description: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setProvider(null);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        isConnecting,
        connect,
        disconnect,
        provider,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
