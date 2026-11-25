import React, { useState, useEffect, useCallback } from 'react';
import { Star, X, MapPin, Check, Camera, ExternalLink, Copy, ThumbsUp, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../context/ThemeContext';

export interface NewReviewSubmission {
  author: string;
  rating: number;
  highlight: string;
  comment: string;
  tags: string[];
  photoUrl?: string;
}

interface GoogleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview?: (review: NewReviewSubmission) => void;
}

export const GoogleReviewModal: React.FC<GoogleReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const { isDark } = useTheme();

  // Form states
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const [headline, setHeadline] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Footwear Quality', 'Perfect Fit']);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Official Google Maps location for The Shoe Kicks at Camp, Pune
  const GOOGLE_MAPS_LOCATION_URL =
    'https://www.google.com/maps/search/?api=1&query=The+Shoe+Kicks+387+Kolsa+Gali+MG+Road+Camp+Pune';

  const ratingDescriptions: Record<number, string> = {
    1: 'Poor · Not satisfied',
    2: 'Fair · Needs improvement',
    3: 'Average · Acceptable experience',
    4: 'Very Good · High quality shoes & service',
    5: 'Loved it! · 5-Star exceptional bespoke footwear'
  };

  const experiencePills = [
    'Footwear Quality',
    'Perfect Fit',
    'Foaming Shoe Cleaner',
    'Courteous Staff',
    'Camp Pune Location',
    'Solid Warranty'
  ];

  const handleModalClose = useCallback(() => {
    setIsSubmitted(false);
    setErrorMsg(null);
    setCopiedNotice(false);
    onClose();
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleModalClose]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 10) {
      setErrorMsg('Please write at least a brief sentence (min 10 characters) about your experience.');
      return;
    }

    setErrorMsg(null);

    // Copy review text to clipboard for easy pasting into Google Maps
    const clipboardText = `${rating} Stars — ${headline || 'The Shoe Kicks Camp Pune Review'}\n\n${comment}\n\n— Review by ${authorName}`;
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(clipboardText);
        setCopiedNotice(true);
      }
    } catch {
      // Ignore clipboard fallback error
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#d4af37']
      });
    } catch {
      // Confetti fallback
    }

    // Notify parent to add review to the wall
    if (onSubmitReview) {
      onSubmitReview({
        author: authorName.trim(),
        rating,
        highlight: headline.trim() || 'Exceptional experience at The Shoe Kicks',
        comment: comment.trim(),
        tags: selectedTags,
        photoUrl: photoPreview || undefined
      });
    }

    // Automatically open Google Maps location in new tab so they can submit to Google
    window.open(GOOGLE_MAPS_LOCATION_URL, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="google-review-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={handleModalClose}
    >
      <div
        className={`relative w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 my-8 ${
          isDark
            ? 'bg-[#121217] border-white/15 text-zinc-100 shadow-[0_25px_60px_rgba(0,0,0,0.8)]'
            : 'bg-white border-zinc-200 text-zinc-900 shadow-[0_25px_50px_rgba(0,0,0,0.15)]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Google Colored Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

        {/* Modal Header */}
        <div className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 ${
          isDark ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50/50'
        }`}>
          <div className="flex items-start gap-3">
            {/* Google Multi-Color G Logo */}
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border shadow-sm ${
              isDark ? 'bg-black/60 border-white/10' : 'bg-white border-zinc-200'
            }`}>
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-500 font-semibold">
                  Google Maps Review Box
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 font-medium border border-emerald-500/20">
                  Verified Place
                </span>
              </div>
              <h3 id="google-review-dialog-title" className="text-lg sm:text-xl font-serif font-bold leading-tight mt-0.5">
                The Shoe Kicks
              </h3>
              <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                <span>387 Kolsa Lane, MG Road, Camp, Pune - 411001</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleModalClose}
            aria-label="Close review dialog"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isDark ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            /* Success State */
            <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-serif font-bold text-emerald-400">
                  Review Published &amp; Logged!
                </h4>
                <p className={`text-xs sm:text-sm max-w-md mx-auto ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  Thank you, <strong className="text-amber-400">{authorName}</strong>! Your {rating}-star review has been published on our reviews wall, and Google Maps was opened in a new tab.
                </p>
              </div>

              {copiedNotice && (
                <div className={`p-3 rounded-xl border text-xs max-w-sm mx-auto flex items-center gap-2 ${
                  isDark ? 'bg-white/5 border-white/10 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                }`}>
                  <Copy className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Review text was copied to your clipboard so you can paste it directly on Google Maps.</span>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={GOOGLE_MAPS_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#2B6CB0] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:opacity-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Google Maps Again</span>
                </a>

                <button
                  onClick={handleModalClose}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isDark ? 'border-white/15 hover:bg-white/10 text-white' : 'border-zinc-300 hover:bg-zinc-100 text-zinc-800'
                  }`}
                >
                  Close Box
                </button>
              </div>
            </div>
          ) : (
            /* Review Submission Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Star Rating Selector */}
              <div className={`p-4 rounded-2xl border text-center space-y-2 ${
                isDark ? 'bg-black/40 border-white/10' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Select Your Google Rating
                </label>

                {/* 5 Interactive Stars */}
                <div
                  className="flex items-center justify-center gap-2 py-1"
                  onMouseLeave={() => setHoverRating(null)}
                >
                  {[1, 2, 3, 4, 5].map(star => {
                    const active = (hoverRating !== null ? star <= hoverRating : star <= rating);
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        className="p-1 rounded-lg transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        aria-label={`Rate ${star} out of 5 stars`}
                      >
                        <Star
                          className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${
                            active
                              ? 'fill-[#FBBC05] text-[#FBBC05] drop-shadow-[0_2px_8px_rgba(251,188,5,0.4)]'
                              : isDark
                              ? 'fill-zinc-800 text-zinc-700'
                              : 'fill-zinc-200 text-zinc-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-medium text-amber-500 min-h-[1.25rem]">
                  {ratingDescriptions[hoverRating || rating]}
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    isDark
                      ? 'bg-black/50 border-white/15 text-white placeholder-zinc-500'
                      : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              {/* Review Headline */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Review Headline (Optional)
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  placeholder="e.g. Best footwear store on MG Road Camp Pune!"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    isDark
                      ? 'bg-black/50 border-white/15 text-white placeholder-zinc-500'
                      : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              {/* Review Comment Details */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider">
                    Share Details of Your Experience <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {comment.length} characters
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Share details of your own experience at The Shoe Kicks — shoe comfort, leather finish, store service, foaming shoe cleaner results, or warranty assistance..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 leading-relaxed ${
                    isDark
                      ? 'bg-black/50 border-white/15 text-white placeholder-zinc-500'
                      : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              {/* Experience Tags */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
                  What did you like the most? (Tap to select)
                </label>
                <div className="flex flex-wrap gap-2">
                  {experiencePills.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? isDark
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm'
                              : 'bg-red-50 text-red-700 border border-red-300 shadow-sm'
                            : isDark
                            ? 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
                            : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 flex-shrink-0" />}
                        <span>{tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Photo Attachment */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
                  Add Photos (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className={`cursor-pointer px-4 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                    isDark ? 'bg-white/5 border-white/15 text-zinc-300 hover:bg-white/10' : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200'
                  }`}>
                    <Camera className="w-4 h-4 text-amber-500" />
                    <span>{photoPreview ? 'Change Photo' : 'Upload Shoe Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                  </label>

                  {photoPreview && (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/20">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Submit &amp; Open Google Maps</span>
                </button>

                <a
                  href={GOOGLE_MAPS_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto py-3.5 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isDark ? 'border-white/15 text-zinc-300 hover:bg-white/10' : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <span>Open Directly</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Trust Footer Note */}
              <p className="text-[11px] text-center text-zinc-500 leading-normal">
                Your review will be instantly reflected on our wall and copied to your clipboard to post directly on Google Maps.
              </p>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
