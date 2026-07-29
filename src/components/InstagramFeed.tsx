// src/components/InstagramFeed.tsx
import React, { useState, useEffect } from 'react';
import { ChevronRight, ExternalLink, Camera } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

interface InstagramPost {
  id: string;
  url: string;
}

interface InstagramFeedProps {
  posts?: InstagramPost[];
  username?: string;
  limit?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({
  posts: initialPosts,
  username = 'nature.raphia',
  limit = 36,
  title,
  subtitle,
  className = '',
}) => {
  const { t } = useLang();

  const defaultPosts: InstagramPost[] = [
    { id: '1', url: 'https://www.instagram.com/p/DbDmcn4lRh8/?img_index=1' },
    { id: '2', url: 'https://www.instagram.com/p/DbDkxu4Fdkv/?img_index=1' },
    { id: '3', url: 'https://www.instagram.com/p/DapS19IFS-c/?img_index=1' },
    { id: '4', url: 'https://www.instagram.com/p/Daesv80lZ3Q/?img_index=1' },
    { id: '5', url: 'https://www.instagram.com/p/DaFktN6FU0L/?img_index=1' },
    { id: '6', url: 'https://www.instagram.com/p/DZuqCUMle3h/?img_index=1' },
  ];

  const [posts, setPosts] = useState<InstagramPost[]>(
    initialPosts || defaultPosts.slice(0, limit)
  );

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts.slice(0, limit));
    }
  }, [initialPosts, limit]);

  const toMediaUrl = (url: string) => {
    try {
      const u = new URL(url);
      const match = u.pathname.match(/\/p\/([^\/]+)/);
      if (!match) return url;
      const shortcode = match[1];
      return `https://www.instagram.com/p/${shortcode}/media/?size=l`;
    } catch {
      return url;
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23F5F1E9"/%3E%3Ctext x="50%25" y="50%25" font-family="serif" font-size="12" fill="%232E4033/40" text-anchor="middle" dy=".3em"%3EInstagram%3C/text%3E%3C/svg%3E';
  };

  return (
    <section className={`bg-[#FAF7F2] py-10 sm:py-14 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* HEADER COMPACT */}
        <div className="mb-8 sm:mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#C97A53]" />
            <div className="flex items-center gap-1.5">
              <Camera size={14} className="text-[#C97A53]" />
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#C97A53]">
                Instagram
              </span>
            </div>
            <span className="h-px w-6 bg-[#C97A53]" />
          </div>
          <h2 className="font-serif text-xl font-light text-[#2E4033] sm:text-2xl">
            {title || t('instagram.title')}
          </h2>
          {subtitle && (
            <p className="mt-2 text-xs text-[#2E4033]/50 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        {/* GRILLE D'IMAGES DEPUIS LES URLS INSTAGRAM */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5 sm:gap-2 lg:gap-2">
          {posts.slice(0, limit).map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-lg bg-[#2E4033]/5 transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={toMediaUrl(post.url)}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>

              <div className="absolute left-1 top-1">
                <div className="rounded-full bg-white/90 backdrop-blur-sm px-1 py-0.5">
                  <Camera size={8} className="text-[#2E4033]" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* BOUTON COMPACT */}
        <div className="mt-8 sm:mt-10 text-center">
          <a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[#2E4033]/20 bg-transparent px-5 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#2E4033] transition-all hover:border-[#C97A53] hover:bg-[#C97A53] hover:text-white sm:px-6 sm:py-2.5"
          >
            <Camera size={12} />
            {t('instagram.follow')}
            <ChevronRight size={12} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
