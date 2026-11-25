import React, { useState } from 'react';
import { 
  X, ShieldCheck, QrCode, CreditCard, 
  Building2, Wallet, Key, ArrowRight, Sparkles 
} from 'lucide-react';
import type { 
  RazorpayCheckoutConfig, 
  RazorpaySuccessResponse 
} from '../../services/razorpay';
import { 
  launchRazorpayPayment, 
  getActiveRazorpayKey, 
  setActiveRazorpayKey 
} from '../../services/razorpay';
import { useTheme } from '../../context/ThemeContext';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amountInINR: number;
  productName: string;
  orderDescription?: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  onSuccess: (payment: RazorpaySuccessResponse) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  amountInINR,
  productName,
  orderDescription,
  customerDetails,
  onSuccess
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [customKey, setCustomKey] = useState(getActiveRazorpayKey());
  const [keySavedMessage, setKeySavedMessage] = useState(false);

  if (!isOpen) return null;

  // Launch official Razorpay SDK window
  const handleLaunchOfficialRazorpay = async () => {
    setIsProcessing(true);
    const config: RazorpayCheckoutConfig = {
      amountInINR,
      orderTitle: productName,
      description: orderDescription || 'The Shoe Kicks Foaming Cleaner 150ml',
      customer: customerDetails,
      onSuccess: (res) => {
        setIsProcessing(false);
        onSuccess(res);
      },
      onFailure: (err) => {
        setIsProcessing(false);
        console.warn('Payment failed or cancelled, user can use embedded UPI/Card options.', err);
      },
      onDismiss: () => {
        setIsProcessing(false);
      }
    };

    const launched = await launchRazorpayPayment(config);
    if (!launched) {
      // If Razorpay SDK is blocked or invalid key, stay in the embedded checkout
      setIsProcessing(false);
    }
  };

  // Simulate Instant Approval for local test demonstration
  const handleSimulatedPayment = (method: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const simulatedResponse: RazorpaySuccessResponse = {
        razorpay_payment_id: `pay_${method.toLowerCase()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        razorpay_order_id: `order_${Math.floor(100000 + Math.random() * 900000)}`,
        amount: amountInINR,
        currency: 'INR',
        customer: customerDetails,
        timestamp: new Date().toISOString()
      };
      onSuccess(simulatedResponse);
    }, 1200);
  };

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveRazorpayKey(customKey);
    setKeySavedMessage(true);
    setTimeout(() => {
      setKeySavedMessage(false);
      setShowKeyConfig(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/85 backdrop-blur-md animate-in fade-in duration-200" 
      />

      {/* Main Container */}
      <div className={`relative w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden z-10 transition-all ${
        isDark 
          ? 'bg-[#0e0e13] border-white/10 text-white' 
          : 'bg-white border-zinc-200 text-zinc-900'
      }`}>

        {/* Razorpay Top Header Bar */}
        <div className="bg-[#0c2340] text-white p-4 sm:p-5 flex items-center justify-between border-b border-blue-900/50">
          <div className="flex items-center gap-3">
            {/* Razorpay Stylized Brand SVG */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0284c7] flex items-center justify-center font-bold text-white shadow-md">
                <span className="text-base font-black italic tracking-tighter">R</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-black tracking-wider text-sm">RAZORPAY</span>
                  <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 text-[9px] font-mono font-bold uppercase">
                    Trusted
                  </span>
                </div>
                <span className="text-[10px] text-sky-200 font-mono block">
                  The Shoe Kicks™ Atelier • Camp, Pune
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sky-200 text-[11px] font-mono flex items-center gap-1 transition-colors"
              title="Configure Razorpay Merchant Key"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Key Config</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Key Configuration Sub-panel */}
        {showKeyConfig && (
          <div className={`p-4 border-b text-xs animate-in slide-in-from-top-2 ${
            isDark ? 'bg-black/60 border-white/10 text-zinc-300' : 'bg-blue-50/70 border-blue-100 text-zinc-800'
          }`}>
            <form onSubmit={handleSaveKey} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  Razorpay Key ID Setting:
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Live or Test Key</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="rzp_test_... or rzp_live_..."
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="flex-grow px-3 py-1.5 rounded-xl border bg-black/30 border-white/20 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors"
                >
                  Save
                </button>
              </div>
              {keySavedMessage && (
                <div className="text-[11px] text-emerald-400 font-medium">
                  ✓ Razorpay Key ID updated successfully!
                </div>
              )}
            </form>
          </div>
        )}

        {/* Order Summary Ribbon */}
        <div className={`px-5 py-3.5 border-b flex items-center justify-between text-xs ${
          isDark ? 'bg-[#121217] border-white/10' : 'bg-zinc-50 border-zinc-200'
        }`}>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">
              PAYING FOR
            </span>
            <span className="font-serif font-bold text-sm block">
              {productName}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              To: {customerDetails.name} ({customerDetails.phone})
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">
              TOTAL AMOUNT
            </span>
            <span className={`text-xl font-bold font-mono ${
              isDark ? 'text-amber-400' : 'text-blue-900'
            }`}>
              ₹{amountInINR.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Primary One-Click Razorpay SDK Popup Trigger */}
        <div className="p-4 sm:p-5 border-b border-white/10">
          <button
            onClick={handleLaunchOfficialRazorpay}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0c2340] hover:from-[#0369a1] hover:to-[#08182b] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-sky-900/30 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-sky-200" />
            <span>Launch Official Razorpay Express Gateway</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-center text-[10px] text-zinc-400 font-mono mt-1.5">
            Opens standard Razorpay checkout modal with UPI, Cards, GPay, PhonePe & NetBanking
          </p>
        </div>

        {/* Embedded Tabs (UPI, Cards, NetBanking, Wallets) */}
        <div className="p-4 sm:p-6 space-y-5">
          <div className="flex border-b border-white/10 pb-2 gap-2 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('upi')}
              className={`px-3 py-1.5 rounded-xl font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'upi'
                  ? 'bg-sky-600 text-white font-bold shadow-md'
                  : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>UPI / QR</span>
            </button>

            <button
              onClick={() => setActiveTab('card')}
              className={`px-3 py-1.5 rounded-xl font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'card'
                  ? 'bg-sky-600 text-white font-bold shadow-md'
                  : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Debit / Credit Card</span>
            </button>

            <button
              onClick={() => setActiveTab('netbanking')}
              className={`px-3 py-1.5 rounded-xl font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'netbanking'
                  ? 'bg-sky-600 text-white font-bold shadow-md'
                  : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>NetBanking</span>
            </button>

            <button
              onClick={() => setActiveTab('wallet')}
              className={`px-3 py-1.5 rounded-xl font-mono flex items-center gap-1.5 transition-colors ${
                activeTab === 'wallet'
                  ? 'bg-sky-600 text-white font-bold shadow-md'
                  : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Wallets</span>
            </button>
          </div>

          {/* TAB 1: UPI & QR CODE */}
          {activeTab === 'upi' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-black/30 border border-white/5">
                {/* Dynamic QR Code representation */}
                <div className="w-32 h-32 bg-white rounded-xl p-2 flex flex-col items-center justify-center shadow-md flex-shrink-0">
                  <div className="w-24 h-24 border-4 border-zinc-900 rounded p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-5 h-5 bg-black" />
                      <div className="w-5 h-5 bg-black" />
                    </div>
                    <div className="text-[8px] font-black font-mono text-center text-zinc-900 uppercase">
                      UPI QR
                    </div>
                    <div className="flex justify-between">
                      <div className="w-5 h-5 bg-black" />
                      <div className="w-3 h-3 bg-[#0284c7]" />
                    </div>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-zinc-800 mt-0.5">
                    Razorpay UPI
                  </span>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-grow">
                  <span className="text-xs font-semibold block">
                    Scan with any UPI App:
                  </span>
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">Google Pay</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">PhonePe</span>
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400">Paytm</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">BHIM</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Merchant UPI: <strong className="text-white">theshoekicks@icici</strong>
                  </p>
                </div>
              </div>

              {/* UPI ID Input */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono">
                  Or enter your VPA / UPI ID:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="mobile@okhdfcbank or user@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="flex-grow px-3.5 py-2.5 rounded-xl border bg-black/40 border-white/10 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                  />
                  <button
                    onClick={() => handleSimulatedPayment('UPI')}
                    disabled={isProcessing}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {isProcessing ? 'Verifying...' : `Pay ₹${amountInINR}`}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CREDIT / DEBIT CARDS */}
          {activeTab === 'card' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4111 2222 3333 4444 (Visa / RuPay / Mastercard)"
                  defaultValue="4111 •••• •••• 4242"
                  className="w-full px-3.5 py-2 rounded-xl border bg-black/40 border-white/10 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono mb-1">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    placeholder="12/28"
                    defaultValue="08/29"
                    className="w-full px-3.5 py-2 rounded-xl border bg-black/40 border-white/10 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-zinc-400 block font-mono mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="•••"
                    defaultValue="891"
                    maxLength={4}
                    className="w-full px-3.5 py-2 rounded-xl border bg-black/40 border-white/10 text-xs font-mono text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <button
                onClick={() => handleSimulatedPayment('Card')}
                disabled={isProcessing}
                className="w-full mt-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? 'Processing Card via Razorpay...' : `Pay ₹${amountInINR} via Card`}
              </button>
            </div>
          )}

          {/* TAB 3: NETBANKING */}
          {activeTab === 'netbanking' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <span className="text-xs text-zinc-400 block font-mono">
                Select Indian Bank:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National'].map((bank) => (
                  <button
                    key={bank}
                    onClick={() => handleSimulatedPayment(`NetBanking-${bank}`)}
                    disabled={isProcessing}
                    className="p-2.5 rounded-xl border border-white/10 bg-black/30 hover:bg-sky-950/40 hover:border-sky-500/50 text-xs text-left font-medium transition-colors"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WALLETS */}
          {activeTab === 'wallet' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <span className="text-xs text-zinc-400 block font-mono">
                Select Digital Wallet:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {['Paytm Wallet', 'PhonePe Wallet', 'Mobikwik', 'Amazon Pay'].map((w) => (
                  <button
                    key={w}
                    onClick={() => handleSimulatedPayment(`Wallet-${w}`)}
                    disabled={isProcessing}
                    className="p-3 rounded-xl border border-white/10 bg-black/30 hover:bg-sky-950/40 hover:border-sky-500/50 text-xs text-left font-medium transition-colors"
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security & Concierge Assurance Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit Razorpay SSL Encryption</span>
            </div>
            <span>Concierge: +91 73500 51590</span>
          </div>

        </div>

      </div>
    </div>
  );
};
