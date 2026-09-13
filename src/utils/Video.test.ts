import { describe, expect, it } from 'vitest';
import { extractYouTubeId, parseVideoSource } from './Video';

describe('Video utility', () => {
  describe('extractYouTubeId', () => {
    it('returns raw 11-char video ID', () => {
      expect(extractYouTubeId('0B2MieWr4rE')).toBe('0B2MieWr4rE');
      expect(extractYouTubeId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    });

    it('extracts ID from standard watch URL', () => {
      expect(extractYouTubeId('https://www.youtube.com/watch?v=0B2MieWr4rE')).toBe('0B2MieWr4rE');
      expect(extractYouTubeId('https://youtube.com/watch?v=dQw4w9WgXcQ&t=10s')).toBe('dQw4w9WgXcQ');
    });

    it('extracts ID from short youtu.be URL', () => {
      expect(extractYouTubeId('https://youtu.be/0B2MieWr4rE')).toBe('0B2MieWr4rE');
    });

    it('extracts ID from embed URL', () => {
      expect(extractYouTubeId('https://www.youtube-nocookie.com/embed/0B2MieWr4rE')).toBe('0B2MieWr4rE');
    });

    it('returns null for non-YouTube URLs or invalid inputs', () => {
      expect(extractYouTubeId('/video/1.mp4')).toBeNull();
      expect(extractYouTubeId('https://res.cloudinary.com/demo/video/upload/sample.mp4')).toBeNull();
      expect(extractYouTubeId('')).toBeNull();
      expect(extractYouTubeId(null)).toBeNull();
    });
  });

  describe('parseVideoSource', () => {
    it('parses YouTube link into structured youtube object', () => {
      const parsed = parseVideoSource('https://www.youtube.com/watch?v=0B2MieWr4rE');
      expect(parsed.type).toBe('youtube');
      if (parsed.type === 'youtube') {
        expect(parsed.videoId).toBe('0B2MieWr4rE');
        expect(parsed.embedUrl).toContain('https://www.youtube-nocookie.com/embed/0B2MieWr4rE');
        expect(parsed.thumbnailUrl).toContain('https://img.youtube.com/vi/0B2MieWr4rE/hqdefault.jpg');
      }
    });

    it('parses direct MP4 or Cloudinary link into direct object', () => {
      const cloudinaryUrl = 'https://res.cloudinary.com/priyoshop/video/upload/intro.mp4';
      const parsed = parseVideoSource(cloudinaryUrl);
      expect(parsed).toEqual({
        type: 'direct',
        src: cloudinaryUrl,
      });
    });

    it('falls back to default video on null or empty input', () => {
      expect(parseVideoSource(null)).toEqual({
        type: 'direct',
        src: '/video/1.mp4',
      });
    });
  });
});
