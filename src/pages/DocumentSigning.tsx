import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Upload, CheckCircle, Shield, Clock, Hash } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const DocumentSigning = () => {
  const [file, setFile] = useState<File | null>(null);
  const [signed, setSigned] = useState(false);
  const [signatureData, setSignatureData] = useState<{
    documentHash: string;
    walletAddress: string;
    signature: string;
    timestamp: string;
    blockchainTx: string;
  } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSigned(false);
      setSignatureData(null);
      toast({
        title: "Document loaded",
        description: `${e.target.files[0].name} ready for signing`,
      });
    }
  };

  const generateHash = (fileName: string): string => {
    // Simulate SHA-256 hash generation
    const randomHash = Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    return `0x${randomHash}`;
  };

  const handleSign = async () => {
    if (!file) {
      toast({
        title: "No document selected",
        description: "Please upload a document first",
        variant: "destructive",
      });
      return;
    }

    // Simulate wallet signature process
    toast({
      title: "Wallet signature requested",
      description: "Please check your wallet to sign the document hash",
    });

    // Simulate delay for wallet interaction
    setTimeout(() => {
      const docHash = generateHash(file.name);
      const walletAddr = `0x${Math.random().toString(16).substr(2, 40)}`;
      const signature = `0x${Array.from({ length: 130 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`;
      const txHash = `0x${Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`;

      setSignatureData({
        documentHash: docHash,
        walletAddress: walletAddr,
        signature: signature,
        timestamp: new Date().toISOString(),
        blockchainTx: txHash,
      });

      setSigned(true);

      toast({
        title: "Document signed successfully! 🎉",
        description: "Signature recorded on blockchain",
      });
    }, 2000);
  };

  const verifySignature = () => {
    toast({
      title: "Signature verified ✓",
      description: "Document authenticity confirmed on blockchain",
    });
  };

  const downloadSignedDocument = () => {
    if (!signatureData) return;

    // Create a JSON file with signature metadata
    const signatureMetadata = {
      originalDocument: file?.name,
      documentHash: signatureData.documentHash,
      signer: signatureData.walletAddress,
      signature: signatureData.signature,
      timestamp: signatureData.timestamp,
      blockchainTransaction: signatureData.blockchainTx,
      network: "Ethereum Mainnet",
      signatureAlgorithm: "ECDSA secp256k1",
    };

    const blob = new Blob([JSON.stringify(signatureMetadata, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.split('.')[0]}_signature.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Signature metadata downloaded",
      description: "Share this file to prove document authenticity",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Blockchain Document Signing
            </h1>
            <p className="text-xl text-muted-foreground">
              Sign documents with cryptographic wallet signatures for tamper-proof verification
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="p-8 bg-card/50 backdrop-blur border-border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Upload className="h-6 w-6 text-primary" />
                Upload Document
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="document" className="text-base">
                    Select document to sign
                  </Label>
                  <Input
                    id="document"
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  {file && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleSign}
                  disabled={!file || signed}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Sign with Wallet
                </Button>

                {signed && (
                  <div className="space-y-3">
                    <Button 
                      onClick={verifySignature}
                      variant="outline"
                      className="w-full border-primary/50 hover:bg-primary/10"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify Signature
                    </Button>
                    <Button 
                      onClick={downloadSignedDocument}
                      variant="outline"
                      className="w-full border-secondary/50 hover:bg-secondary/10"
                    >
                      Download Signature Metadata
                    </Button>
                  </div>
                )}
              </div>

              {/* How it works */}
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-2 text-sm">How it works:</h3>
                <ol className="text-sm text-muted-foreground space-y-2">
                  <li>1. Document is hashed using SHA-256</li>
                  <li>2. Hash is signed with your wallet's private key</li>
                  <li>3. Signature is recorded on blockchain</li>
                  <li>4. Anyone can verify authenticity using the signature</li>
                </ol>
              </div>
            </Card>

            {/* Signature Details */}
            <Card className="p-8 bg-card/50 backdrop-blur border-border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Signature Details
              </h2>

              {!signed ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    Upload and sign a document to see signature details
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-primary">Signature Verified</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This document has been cryptographically signed
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4 text-primary" />
                        <Label className="text-sm font-semibold">Document Hash (SHA-256)</Label>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs font-mono break-all text-muted-foreground">
                          {signatureData?.documentHash}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Signer Wallet Address</Label>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs font-mono break-all text-muted-foreground">
                          {signatureData?.walletAddress}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Digital Signature (ECDSA)</Label>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs font-mono break-all text-muted-foreground">
                          {signatureData?.signature}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <Label className="text-sm font-semibold">Timestamp</Label>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {signatureData && new Date(signatureData.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold mb-2 block">Network</Label>
                        <p className="text-xs text-muted-foreground">
                          Ethereum Mainnet
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Blockchain Transaction</Label>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <a 
                          href={`https://etherscan.io/tx/${signatureData?.blockchainTx}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono break-all text-primary hover:underline"
                        >
                          {signatureData?.blockchainTx}
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        View on Etherscan →
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Real-world Use Cases */}
          <Card className="mt-8 p-8 bg-card/50 backdrop-blur border-border">
            <h2 className="text-2xl font-bold mb-6">Real-World Applications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Legal Contracts</h3>
                <p className="text-sm text-muted-foreground">
                  Sign NDAs, employment contracts, and legal agreements with immutable proof of signature time and identity.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Medical Records</h3>
                <p className="text-sm text-muted-foreground">
                  Authenticate patient consent forms and medical documents while maintaining HIPAA compliance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Financial Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Verify loan agreements, invoices, and financial statements with blockchain-backed authenticity.
                </p>
              </div>
            </div>
          </Card>

          {/* Technical Explanation */}
          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold mb-3">🔐 Technical Implementation</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground">1. Hashing:</strong> The document is processed through SHA-256 to create a unique 256-bit fingerprint.
              </p>
              <p>
                <strong className="text-foreground">2. Signing:</strong> Your wallet uses ECDSA (Elliptic Curve Digital Signature Algorithm) with the secp256k1 curve to sign the hash using your private key.
              </p>
              <p>
                <strong className="text-foreground">3. Blockchain Recording:</strong> The signature is stored on Ethereum, creating an immutable timestamp and proof of authenticity.
              </p>
              <p>
                <strong className="text-foreground">4. Verification:</strong> Anyone can verify the signature by checking the hash against the blockchain record using your public wallet address.
              </p>
              <p className="pt-2 text-xs">
                <strong className="text-foreground">Note:</strong> This demo simulates the signing process. In production, you would integrate with Web3 providers like MetaMask or WalletConnect to access real wallet signatures.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentSigning;
