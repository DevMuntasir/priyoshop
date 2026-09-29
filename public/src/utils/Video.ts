/**
 * Video parsing and embed URL utility.
 * Supports YouTube URLs/IDs, Cloudinary media URLs, and direct video paths.
 */

export type ParsedVideo =
  | {
      type: 'youtube';
      videoId: string;
      embedUrl: string;
      thumbnailUrl: string;
    }
  | {
      type: 'direct';
      src: string;
    };

/**
 * Extracts YouTube video ID from various URL patterns or raw ID.
 * @param source URL string or video ID.
 * @returns 11-character video ID if found, otherwise null.
 */
export function extractYouTubeId(source?: string | null): string | null {
  if (!source) {
    return null;
  }

  const trimmed = source.trim();

  // Raw 11-character ID (standard YouTube ID format)
  if (/^[a-zA-Z0-9_-]{11}$/u.test(trimmed)) {
    return trimmed;
  }

  // youtu.be/<id> or (youtube.com|youtube-nocookie.com)/(embed|v|shorts|live)/<id>
  const shortMatch = trimmed.match(
    /(?:youtu\.be\/|(?:[a-zA-Z0-9-]+\.)?youtube(?:-nocookie)?\.com\/(?:embed|v|shorts|live)\/)([a-zA-Z0-9_-]{11})/iu
  );
  if (shortMatch && shortMatch[1]) {
    return shortMatch[1];
  }

  // (youtube.com|youtube-nocookie.com)/watch?v=<id>
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/iu);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  return null;
}

/**
 * Parses any video string into a structured representation (YouTube embed vs Direct MP4/Cloudinary).
 * @param source Video URL, Cloudinary URL, or YouTube ID.
 * @returns ParsedVideo object.
 */
export function parseVideoSource(source?: string | null): ParsedVideo {
  const fallback = '/video/1.mp4';
  if (!source) {
    return { type: 'direct', src: fallback };
  }

  const trimmed = source.trim();
  const youTubeId = extractYouTubeId(trimmed);

  if (youTubeId) {
    return {
      type: 'youtube',
      videoId: youTubeId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${youTubeId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`,
    };
  }

  return {
    type: 'direct',
    src: trimmed || fallback,
  };
}
