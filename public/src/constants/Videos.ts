/**
 * Centralized video assets registry for Cloudinary and YouTube videos.
 * Each entry includes the video source, high-quality thumbnail poster, and optional title.
 */

export type VideoAsset = {
  src: string;
  poster: string;
  title: string;
};

export const APP_VIDEOS = {
  defaultPoster: '/distribution/about.png',

  about: {
    infrastructure: {
      src: '/video/1.mp4',
      poster: '/about/village.png',
      title: 'PriyoShop Infrastructure',
    },
    story: {
      src: '/video/1.mp4',
      poster: '/about/ab-bg.png',
      title: 'Our Story',
    },
  },

  distribution: {
    /** YouTube video ID or full YouTube URL for distribution showcase */
    showcaseYouTubeId: 'dQw4w9WgXcQ',
    showcaseYouTubePoster: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    b2bPlatform: {
      src: '/video/1.mp4',
      poster: '/distribution/about.png',
      title: 'One B2B Platform for All Your Retail Business Needs',
    },
    coverage: {
      src: '/video/1.mp4',
      poster: '/distribution/1.png',
      title: 'Distribution Coverage',
    },
    brandGrowth: {
      src: '/video/1.mp4',
      poster: '/distribution/4.png',
      title: 'Together with Brands, Growing Retail',
    },
  },

  career: {
    banner: {
      src: '/video/1.mp4',
      poster: '/career/all.png',
      title: 'Life & Career at PriyoShop',
    },
  },

  commerce: {
    retail: {
      src: '/video/1.mp4',
      poster: '/retail/about.png',
      title: 'Delivering to Retailers Across Bangladesh',
    },
    roadDrive: {
      src: '/video/road-drive.mp4',
      poster: '/business/van.png',
      title: 'Retail Road Delivery',
    },
    stories: [
      {
        title: 'Building stronger retail businesses',
        videoPath: '/video/1.mp4',
        poster: '/retail/1.png',
      },
      {
        title: 'Empowering local shop owners',
        videoPath: '/video/1.mp4',
        poster: '/retail/2.png',
      },
      {
        title: 'Seamless wholesale ordering experience',
        videoPath: '/video/1.mp4',
        poster: '/retail/3.png',
      },
    ],
  },

  retailFinance: {
    intro: {
      src: '/video/1.mp4',
      poster: '/retail/about.png',
      title: 'Embedded Credit for Smarter Retail Growth',
    },
    stories: [
      {
        title: 'How PriyoShop grew my store',
        videoPath: '/video/1.mp4',
        poster: '/retail/1.png',
      },
      {
        title: 'Restocking without the hassle',
        videoPath: '/video/1.mp4',
        poster: '/retail/2.png',
      },
      {
        title: 'Faster delivery, happier customers',
        videoPath: '/video/1.mp4',
        poster: '/retail/3.png',
      },
    ],
  },

  dipty: {
    intro: {
      src: '/video/1.mp4',
      poster: '/dipty/about.png',
      title: 'What is Dipty',
    },
  },

  impact: {
    network: {
      src: '/video/1.mp4',
      poster: '/impact/green.png',
      title: 'PriyoShop Green Hub Network',
    },
    greenHub: {
      src: '/video/1.mp4',
      poster: '/impact/n1.png',
      title: 'Sustainable Infrastructure, Inclusive Impact',
    },
    womenStories: [
      {
        title: 'Empowering women entrepreneurs',
        videoPath: '/video/1.mp4',
        poster: '/impact/Image 01 1.png',
      },
      {
        title: 'Female retailers growing with PriyoShop',
        videoPath: '/video/1.mp4',
        poster: '/impact/Image 02 1.png',
      },
      {
        title: 'Gender equality across our business',
        videoPath: '/video/1.mp4',
        poster: '/impact/Image 03 1.png',
      },
      {
        title: 'Community leadership and MSME growth',
        videoPath: '/video/1.mp4',
        poster: '/impact/Image 04 1.png',
      },
      {
        title: 'Financial independence for retailers',
        videoPath: '/video/1.mp4',
        poster: '/impact/Image 05 1.png',
      },
    ],
  },

  opportunity: {
    distribution: {
      src: '/video/1.mp4',
      poster: '/opportunities/city.png',
      title: 'Distribution Structure',
    },
  },
} as const;

export type AppVideosType = typeof APP_VIDEOS;
