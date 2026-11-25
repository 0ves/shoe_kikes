import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { X, Trash2, Plus, Minus, ArrowRight, Check, Sparkles, Tag, ShoppingBag, ShieldCheck, CreditCard } from 'lucide-react';
import { RazorpayModal } from '../checkout/RazorpayModal';
import type { RazorpaySuccessResponse } from '../../services/razorpay';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotalUSD,
    discountUSD,
    taxUSD,
    totalUSD,
    isCartOpen,
    closeCart,
    appliedPromo,
    applyPromo,
    removePromo,
    checkoutSuccess,
    processCheckout,
    resetCheckout
  } = useCart();

  const { formatPrice } = useCurrency();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [reservationToken, setReservationToken] = useState('');
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [razorpayPaymentDetails, setRazorpayPaymentDetails] = useState<RazorpaySuccessResponse | null>(null);
  const [validationError, setValidationError] = useState('');

  // Customer Details Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requests: ''
  });

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, success: res.success });
    if (res.success) setPromoInput('');
  };

  const handleRazorpaySuccess = async (response: RazorpaySuccessResponse) => {
    setIsRazorpayOpen(false);
    setRazorpayPaymentDetails(response);
    setReservationToken(response.razorpay_payment_id);
    await processCheckout({
      name: formData.name || response.customer.name || 'Valued Patron',
      email: formData.phone || response.customer.phone || '+91 73500 51590',
      address: formData.requests || response.customer.address || 'Paid via Razorpay'
    });
  };

  const handleOpenRazorpay = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setValidationError('Please enter your Full Name and Mobile Number to proceed with Razorpay checkout.');
      return;
    }
    setValidationError('');
    setIsRazorpayOpen(true);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setValidationError('Please enter your Full Name and Mobile Number.');
      return;
    }
    setValidationError('');
    setIsSubmitting(true);
    const token = `SK-BESPOKE-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationToken(token);
    await processCheckout({
      name: formData.name,
      email: formData.phone,
      address: formData.requests
    });
    setIsSubmitting(false);
  };

  const handleCloseAndReset = () => {
    closeCart();
    resetCheckout();
    setStep('cart');
    setReservationToken('');
    setRazorpayPaymentDetails(null);
    setValidationError('');
    setFormData({ name: '', phone: '', requests: '' });
  };

  const shippingRemaining = Math.max(0, 500 - subtotalUSD);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleCloseAndReset}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-2 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#0c0c10] border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h3 className="text-lg font-serif font-medium text-white">
                Atelier Shopping Bag
              </h3>
              <span className="text-xs font-mono text-zinc-500">
                ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>

            <button
              onClick={handleCloseAndReset}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen */}
          {checkoutSuccess ? (
            <div className="p-8 text-center flex flex-col items-center justify-center flex-grow space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif text-white">Order Confirmed</h4>
              
              {razorpayPaymentDetails ? (
                <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-500/40 text-left space-y-1.5 w-full max-w-sm">
                  <div className="flex items-center gap-1.5 text-sky-400 text-xs font-mono font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Paid & Verified via Razorpay</span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-300">
                    Payment ID: <strong className="text-white">{razorpayPaymentDetails.razorpay_payment_id}</strong>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Amount Paid: <strong className="text-emerald-400">₹{razorpayPaymentDetails.amount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">
                    Atelier: Kolsa Lane, Camp, Pune - 411001
                  </div>
                </div>
              ) : (
                <p className="text-xs font-mono text-[#d4af37]">
                  Atelier Token: {reservationToken || 'SK-BESPOKE-284910'}
                </p>
              )}

              <p className="text-xs text-zinc-300 max-w-sm font-light leading-relaxed">
                Thank you for your patronage. Your order is logged at our Camp, Pune boutique atelier (Kolsa Lane, MG Road). Our master concierge (<a href="tel:+917350051590" className="text-amber-400 font-mono underline">+91 73500 51590</a>) will confirm dispatch and delivery details via WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <a
                  href={`https://wa.me/917350051590?text=Hello%20The%20Shoe%20Kicks%20Atelier,%20I%20have%20completed%20order%20token%20${encodeURIComponent(reservationToken)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
                >
                  WhatsApp Atelier
                </a>
                <button
                  onClick={handleCloseAndReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-all"
                >
                  Return to Store
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Bespoke Fitting & Gift Progress Bar */}
              <div className="px-6 py-3 bg-[#131319] border-b border-white/5 text-xs">
                {shippingRemaining > 0 ? (
                  <div>
                    <div className="flex justify-between text-zinc-400 mb-1">
                      <span>Add <strong className="text-amber-400">{formatPrice(shippingRemaining)}</strong> for Private Atelier Fitting & Cedar Trees</span>
                      <span className="font-mono text-zinc-400 font-bold">{Math.round((subtotalUSD / 500) * 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gold-gradient transition-all duration-500"
                        style={{ width: `${Math.min(100, (subtotalUSD / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-emerald-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Unlocked: Private In-Store Fitting Session & Cedar Shoe Trees!</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      VIP PRIVILEGE
                    </span>
                  </div>
                )}
              </div>

              {/* Body: Items List or Checkout Form */}
              <div className="p-6 overflow-y-auto flex-grow space-y-4">
                {step === 'cart' ? (
                  items.length > 0 ? (
                    <div className="space-y-4">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-[#14141a] border border-white/5 flex gap-4 items-center group"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/50 flex-shrink-0 border border-white/5">
                            <img
                              src={item.product.images.hero}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-grow min-w-0">
                            <h4 className="text-sm font-serif font-medium text-white truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-[#e8caa4] font-light truncate">
                              {item.selectedColor.name} • US {item.selectedSize} ({item.selectedWidth})
                            </p>
                            <div className="text-xs font-semibold text-white mt-1">
                              {formatPrice(item.product.price * item.quantity)}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center rounded-lg bg-black/60 border border-white/10 px-1 py-0.5">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 text-zinc-400 hover:text-white"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-mono text-white">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 text-zinc-400 hover:text-white"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors ml-auto"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center space-y-3">
                      <ShoppingBag className="w-10 h-10 text-zinc-600 mx-auto" />
                      <p className="text-base font-serif text-zinc-300">Your shopping bag is empty.</p>
                      <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                        Explore our handcrafted masterpieces and select your bespoke configuration.
                      </p>
                    </div>
                  )
                ) : (
                  /* Step 2: Checkout Form */
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                      <h4 className="text-sm font-serif font-semibold text-white">Boutique Fitting & Salon Reservation</h4>
                      <button
                        type="button"
                        onClick={() => setStep('cart')}
                        className="text-xs text-[#d4af37] underline"
                      >
                        Edit Bag
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Deshmukh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141a] border border-white/10 text-xs text-white focus:border-[#d4af37] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                        Mobile Number (WhatsApp updates):
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141a] border border-white/10 text-xs text-white focus:border-[#d4af37] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">
                        Preferred Fitting Date or Special Requests:
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Saturday afternoon, looking for custom patina trial at Camp store."
                        value={formData.requests}
                        onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141a] border border-white/10 text-xs text-white focus:border-[#d4af37] outline-none resize-none"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/50 border border-[#d4af37]/30 space-y-1.5 text-xs">
                      <div className="flex justify-between text-zinc-400">
                        <span>Boutique Salon:</span>
                        <span className="text-white font-medium text-right">Kolsa Lane, MG Road, Camp, Pune</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Direct Concierge:</span>
                        <a href="tel:+917350051590" className="text-amber-400 font-mono font-bold hover:underline">+91 73500 51590</a>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Salon Experience:</span>
                        <span className="text-emerald-400">Private 3D Measurement & Trial</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Footer Calculations & Buttons */}
              {items.length > 0 && (
                <div className="p-6 bg-[#0a0a0d] border-t border-white/10 space-y-4">
                  {/* Promo Input */}
                  {step === 'cart' && (
                    <div>
                      {appliedPromo ? (
                        <div className="flex items-center justify-between p-2 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs">
                          <div className="flex items-center gap-1.5 text-[#e8caa4]">
                            <Tag className="w-3.5 h-3.5" />
                            <span>Privilege Code: <strong>{appliedPromo}</strong></span>
                          </div>
                          <button
                            onClick={removePromo}
                            className="text-zinc-400 hover:text-white text-xs underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div>
                          <form onSubmit={handleApplyPromo} className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Discount Code (e.g. ROYAL10)"
                              value={promoInput}
                              onChange={(e) => setPromoInput(e.target.value)}
                              className="flex-grow px-3 py-2 rounded-xl bg-[#14141a] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl glass-panel text-xs font-medium text-zinc-200 hover:text-white hover:border-[#d4af37]/50"
                            >
                              Apply
                            </button>
                          </form>

                          {/* One-Click Coupon Tags (Neeman's style) */}
                          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-zinc-500 font-mono">POPULAR OFFERS:</span>
                            <button
                              type="button"
                              onClick={() => {
                                applyPromo('ROYAL10');
                                setPromoMessage({ text: 'ROYAL10: 10% instant privilege applied!', success: true });
                              }}
                              className="px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-mono hover:bg-amber-400/20 transition-colors"
                            >
                              ⚡ ROYAL10 (10% Off)
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                applyPromo('ATELIER10');
                                setPromoMessage({ text: 'ATELIER10 applied!', success: true });
                              }}
                              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-mono hover:bg-white/10 transition-colors"
                            >
                              🎁 ATELIER10
                            </button>
                          </div>
                        </div>
                      )}

                      {promoMessage && (
                        <div className={`mt-1.5 text-[11px] ${promoMessage.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {promoMessage.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span className="text-white font-mono">{formatPrice(subtotalUSD)}</span>
                    </div>

                    {discountUSD > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Privilege Discount</span>
                        <span className="font-mono">-{formatPrice(discountUSD)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-zinc-400">
                      <span>Boutique Fitting & Reservation</span>
                      <span className="text-emerald-400 font-mono font-medium">
                        Complimentary
                      </span>
                    </div>

                    <div className="flex justify-between text-zinc-400">
                      <span>GST & Applicable Taxes</span>
                      <span className="text-white font-mono">{formatPrice(taxUSD)}</span>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex justify-between text-base font-serif font-bold text-white">
                      <span>Total Due</span>
                      <span className="text-gold-gradient text-lg">{formatPrice(totalUSD)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {step === 'cart' ? (
                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full py-4 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Express Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="space-y-2.5">
                      {validationError && (
                        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-mono">
                          {validationError}
                        </div>
                      )}

                      {/* Primary Online Checkout: Razorpay */}
                      <button
                        type="button"
                        onClick={handleOpenRazorpay}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0c2340] hover:from-[#0369a1] hover:to-[#08182b] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-900/40 flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <CreditCard className="w-4 h-4 text-sky-200" />
                        <span>Pay via Razorpay • ₹{Math.round(totalUSD * 83.5).toLocaleString('en-IN')}</span>
                      </button>

                      {/* Secondary Offline Fitting / Salon Reservation */}
                      <button
                        type="button"
                        onClick={handleCheckoutSubmit}
                        disabled={isSubmitting}
                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Securing Atelier Reservation...</span>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Reserve for In-Salon Fitting / Trial</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Indian Payment Badges & Trust (Neeman's / Bacca Bucci Style) */}
                  <div className="pt-2 text-center space-y-1">
                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400 flex-wrap">
                      <span>✓ Razorpay UPI / Cards</span>
                      <span>•</span>
                      <span>✓ In-Store Fitting</span>
                      <span>•</span>
                      <span>✓ Concierge +91 73500 51590</span>
                    </div>
                    <div className="text-[9px] font-mono text-zinc-500">
                      Flagship Boutique: Kolsa Lane, MG Road, Camp, Pune - 411001
                    </div>
                  </div>

                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* Embedded & Official Razorpay Checkout Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        amountInINR={Math.round(totalUSD * 83.5)}
        productName={items.length === 1 ? items[0].product.name : `The Shoe Kicks Order (${items.length} items)`}
        orderDescription={items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
        customerDetails={{
          name: formData.name,
          email: 'concierge@theshoekicks.com',
          phone: formData.phone,
          address: formData.requests || 'Kolsa Lane, Camp, Pune - 411001'
        }}
        onSuccess={handleRazorpaySuccess}
      />
    </div>
  );
};
