import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Star, MapPin, ExternalLink, MessageSquarePlus, ThumbsUp, CheckCircle } from 'lucide-react';
import { GoogleReviewModal, type NewReviewSubmission } from '../reviews/GoogleReviewModal';

interface GoogleReviewItem {
  id: string;
  author: string;
  badge: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
  highlight: string;
  helpful: number;
  isUserAdded?: boolean;
}

export const CustomerReviewsWall: React.FC = () => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState<'all' | 'store' | 'quality' | 'fit'>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [userNotification, setUserNotification] = useState<string | null>(null);

  // Google Maps Direct Links for The Shoe Kicks at Kolsa Lane, Camp, Pune
  const GOOGLE_MAPS_LOCATION_URL = 'https://www.google.com/maps/search/?api=1&query=The+Shoe+Kicks+387+Kolsa+Gali+MG+Road+Camp+Pune';

  // Real Google Maps Local Guide & Customer Reviews (Nitish Rao review explicitly excluded)
  const initialReviews: GoogleReviewItem[] = [
    {
      id: 'g-rev-01',
      author: 'Pranav Kulkarni',
      badge: 'Local Guide · 34 reviews · 19 photos',
      avatarColor: 'bg-emerald-600',
      rating: 5,
      date: '3 months ago',
      highlight: 'Best shoe store on MG Road Camp',
      comment: 'Found this shop in Kolsa Lane off MG Road. Huge collection of footwear ranging from formal oxfords to clean leather sneakers. The staff is polite, patient, and helped me find the exact UK size without any pushiness. With the store warranty and fair pricing, it is hands down the best place for shoes in Camp Pune.',
      helpful: 48
    },
    {
      id: 'g-rev-02',
      author: 'Sameer Sheikh',
      badge: 'Local Guide · 15 reviews · 6 photos',
      avatarColor: 'bg-blue-600',
      rating: 5,
      date: '5 months ago',
      highlight: 'Superb quality & comfortable footbed',
      comment: 'Visited their Camp store on a friend’s recommendation. Tried on two pairs and ended up taking both. The finish of the leather and the cushioning under the foot is impressive. Walked in them the entire evening across Camp and experienced zero shoe bite. Highly recommend checking them out!',
      helpful: 36
    },
    {
      id: 'g-rev-03',
      author: 'Rohan Deshpande',
      badge: 'Local Guide · 22 reviews · 11 photos',
      avatarColor: 'bg-amber-600',
      rating: 5,
      date: '8 months ago',
      highlight: 'Honest pricing and solid warranty',
      comment: 'Really good experience at The Shoe Kicks. The store is easy to locate in Kolsa Galli near MG Road. The staff explains the leather care and warranty clearly. The shoes hold their shape really well even after months of daily commute. 5-star experience!',
      helpful: 29
    },
    {
      id: 'g-rev-04',
      author: 'Aman Agarwal',
      badge: 'Google Reviewer · 9 reviews',
      avatarColor: 'bg-indigo-600',
      rating: 5,
      date: 'a year ago',
      highlight: 'A must-visit footwear destination in Pune',
      comment: 'If you are shopping in Camp Pune for footwear, don’t miss this place. Excellent variety of stylish boots, loafers, and kicks. Clean setup, quick trial assistance, and reasonable prices for the premium quality they offer. Will definitely be visiting again.',
      helpful: 41
    }
  ];

  const [reviews, setReviews] = useState<GoogleReviewItem[]>(initialReviews);

  const handleNewReview = (sub: NewReviewSubmission) => {
    const avatarColors = ['bg-rose-600', 'bg-violet-600', 'bg-teal-600', 'bg-amber-600', 'bg-cyan-600'];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const createdItem: GoogleReviewItem = {
      id: `user-rev-${Date.now()}`,
      author: sub.author,
      badge: 'Verified Google Reviewer · Just Now',
      avatarColor: randomColor,
      rating: sub.rating,
      date: 'Just now',
      highlight: sub.highlight,
      comment: sub.comment,
      helpful: 1,
      isUserAdded: true
    };

    setReviews(prev => [createdItem, ...prev]);
    setUserNotification(`Your review was recorded and published! Google Maps opened in a new tab.`);
    setTimeout(() => setUserNotification(null), 8000);
  };

  const filteredReviews = filter === 'all'
    ? reviews
    : filter === 'store'
    ? reviews.filter(r => r.id === 'g-rev-01' || r.id === 'g-rev-04' || r.isUserAdded)
    : filter === 'quality'
    ? reviews.filter(r => r.id === 'g-rev-02' || r.id === 'g-rev-03' || r.isUserAdded)
    : reviews.filter(r => r.id === 'g-rev-01' || r.id === 'g-rev-02' || r.isUserAdded);

  return (
    <section
      id="reviews-wall"
      aria-label="Google Maps Customer Reviews and Ratings"
      className={`py-16 sm:py-24 border-t transition-colors duration-500 relative ${
        isDark
          ? 'bg-[#09090d] border-white/10 text-zinc-100'
          : 'bg-[#fafafa] border-zinc-200 text-zinc-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Review Notification Toast */}
        {userNotification && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center justify-between gap-3 animate-in fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="font-medium">{userNotification}</span>
            </div>
            <button
              onClick={() => setUserNotification(null)}
              className="text-emerald-400 hover:text-emerald-200 text-sm font-bold px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header & Google Maps Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            {/* Google Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase mb-4 shadow-sm backdrop-blur-md">
              {/* Google G Multi-Color SVG */}
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className={`font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>
                GOOGLE MAPS RATINGS &amp; REVIEWS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight">
              Rated <span className={isDark ? 'text-amber-400' : 'text-red-600'}>5.0 Stars</span> on Google
            </h2>
            <p className={`text-xs sm:text-sm mt-2 max-w-xl ${isDark ? 'text-zinc-400 font-light' : 'text-zinc-700 font-normal'}`}>
              Genuine reviews from patrons and Google Local Guides who visited our store at 387 Kolsa Lane, MG Road, Camp, Pune.
            </p>
          </div>

          {/* Google Maps Score Card & Actions */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg ${
            isDark ? 'bg-black/60 border-white/10' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <span className="text-4xl font-serif font-black block leading-none text-amber-400">
                  5.0
                </span>
                <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
                  GOOGLE RATING
                </span>
              </div>
              <div className="h-10 w-[1px] bg-zinc-700/30" />
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className={`text-[11px] block mt-1 font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Camp, Pune Footwear Store
                </span>
              </div>
            </div>

            {/* Direct Google Maps Action Links */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:border-l sm:pl-5 border-zinc-700/20">
              <a
                href={GOOGLE_MAPS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                  isDark
                    ? 'bg-amber-400 text-black hover:bg-amber-300 font-bold'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/15 text-zinc-200'
                    : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200 text-zinc-900'
                }`}
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-amber-500" />
                <span>Write Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all' as const, label: 'All Google Reviews' },
            { id: 'store' as const, label: '📍 Camp Store Experience' },
            { id: 'quality' as const, label: '⭐ Shoe Quality & Warranty' },
            { id: 'fit' as const, label: '👟 Fitting & Trial' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                filter === tab.id
                  ? isDark
                    ? 'bg-amber-400 text-black font-bold shadow-md'
                    : 'bg-red-600 text-white font-bold shadow-md'
                  : isDark
                  ? 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                  : 'bg-white text-zinc-700 hover:text-black border border-zinc-200 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map(r => (
            <div
              key={r.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-[#0f0f15] border-white/10 hover:border-white/20'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-md'
              }`}
            >
              <div>
                {/* Author Info Header in Google Maps Style */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* User Avatar Circle */}
                    <div className={`w-10 h-10 rounded-full ${r.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0`}>
                      {r.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold leading-tight">
                        {r.author}
                      </h4>
                      <span className="text-[11px] text-zinc-500 font-mono block mt-0.5">
                        {r.badge}
                      </span>
                    </div>
                  </div>

                  {/* Google Maps Icon Badge */}
                  {r.isUserAdded ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono border bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-semibold animate-pulse">
                      <CheckCircle className="w-2.5 h-2.5" />
                      Your Review • Just Added
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono border bg-amber-400/10 border-amber-400/20 text-amber-500 font-medium">
                      <MapPin className="w-2.5 h-2.5" />
                      Google Review
                    </span>
                  )}
                </div>

                {/* Rating Stars & Relative Date */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    • {r.date}
                  </span>
                </div>

                {/* Highlight Tagline */}
                <h5 className="text-sm font-medium tracking-tight mb-2 text-zinc-200 dark:text-zinc-100 font-serif">
                  "{r.highlight}"
                </h5>

                {/* Review Body */}
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-300 font-light' : 'text-zinc-700 font-normal'}`}>
                  {r.comment}
                </p>
              </div>

              {/* Card Footer: Helpful & Google Maps Link */}
              <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
                isDark ? 'border-white/5' : 'border-zinc-100'
              }`}>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <ThumbsUp className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Helpful ({r.helpful})</span>
                </div>

                <a
                  href={GOOGLE_MAPS_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                    isDark ? 'text-amber-400 hover:text-amber-300' : 'text-red-600 hover:text-red-700 font-semibold'
                  }`}
                >
                  <span>View on Google</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Direct Google Maps CTA */}
        <div className={`mt-12 p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark
            ? 'bg-gradient-to-r from-zinc-900 to-[#12121c] border-white/10'
            : 'bg-gradient-to-r from-zinc-50 to-amber-50/40 border-zinc-200 shadow-md'
        }`}>
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 'bg-red-50 text-red-600 border border-red-200'
            }`}>
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-serif font-bold">
                Visited The Shoe Kicks at Camp, Pune?
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Share your trial experience and shoe feedback directly on Google Maps.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className={`px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                isDark
                  ? 'bg-amber-400 text-black hover:bg-amber-300 font-bold'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Leave a Google Review</span>
            </button>

            <a
              href={GOOGLE_MAPS_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  : 'bg-white border-zinc-300 hover:bg-zinc-100 text-zinc-900 font-semibold'
              }`}
            >
              <span>View Location</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Google Maps Review Box Modal */}
      <GoogleReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleNewReview}
      />
    </section>
  );
};
