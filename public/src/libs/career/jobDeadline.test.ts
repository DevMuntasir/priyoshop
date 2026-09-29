import { describe, expect, it } from 'vitest';
import {
  getDaysUntilAutoDelete,
  getEffectiveDeadline,
  isJobDeadlinePassed,
  isJobExpiredWithinGracePeriod,
  isJobPastAutoDeleteThreshold,
  ONE_WEEK_MS,
} from './jobDeadline';

describe('jobDeadline utilities', () => {
  describe('getEffectiveDeadline', () => {
    it('extends midnight UTC deadlines to end of day', () => {
      const input = '2026-09-28T00:00:00.000Z';
      const effective = getEffectiveDeadline(input);
      expect(effective.toISOString()).toBe('2026-09-28T23:59:59.999Z');
    });

    it('preserves deadlines with explicit time components', () => {
      const input = '2026-09-28T14:30:00.000Z';
      const effective = getEffectiveDeadline(input);
      expect(effective.toISOString()).toBe('2026-09-28T14:30:00.000Z');
    });
  });

  describe('isJobDeadlinePassed', () => {
    it('returns false when deadline is in the future', () => {
      const now = new Date('2026-09-28T12:00:00.000Z');
      const deadline = '2026-10-05T00:00:00.000Z';
      expect(isJobDeadlinePassed(deadline, now)).toBe(false);
    });

    it('returns false during deadline day when deadline was set without time', () => {
      const now = new Date('2026-09-28T15:00:00.000Z');
      const deadline = '2026-09-28T00:00:00.000Z';
      expect(isJobDeadlinePassed(deadline, now)).toBe(false);
    });

    it('returns true when deadline date has completely ended', () => {
      const now = new Date('2026-09-29T00:00:01.000Z');
      const deadline = '2026-09-28T00:00:00.000Z';
      expect(isJobDeadlinePassed(deadline, now)).toBe(true);
    });
  });

  describe('isJobExpiredWithinGracePeriod', () => {
    it('returns false if deadline has not passed yet', () => {
      const now = new Date('2026-09-28T12:00:00.000Z');
      const deadline = '2026-09-28T18:00:00.000Z';
      expect(isJobExpiredWithinGracePeriod(deadline, now)).toBe(false);
    });

    it('returns true when deadline passed 2 days ago', () => {
      const deadline = new Date('2026-09-25T23:59:59.999Z');
      const now = new Date('2026-09-27T12:00:00.000Z');
      expect(isJobExpiredWithinGracePeriod(deadline, now)).toBe(true);
    });

    it('returns true on exact 7th day boundary', () => {
      const deadline = new Date('2026-09-20T00:00:00.000Z');
      const effective = getEffectiveDeadline(deadline);
      const exact7Days = new Date(effective.getTime() + ONE_WEEK_MS);
      expect(isJobExpiredWithinGracePeriod(deadline, exact7Days)).toBe(true);
    });

    it('returns false when deadline passed more than 7 days ago', () => {
      const deadline = new Date('2026-09-20T00:00:00.000Z');
      const effective = getEffectiveDeadline(deadline);
      const eightDays = new Date(effective.getTime() + ONE_WEEK_MS + 1000);
      expect(isJobExpiredWithinGracePeriod(deadline, eightDays)).toBe(false);
    });
  });

  describe('isJobPastAutoDeleteThreshold', () => {
    it('returns false when within 7 days of deadline', () => {
      const deadline = '2026-09-25T23:59:59.999Z';
      const now = new Date('2026-09-28T12:00:00.000Z');
      expect(isJobPastAutoDeleteThreshold(deadline, now)).toBe(false);
    });

    it('returns true when 8 days after deadline', () => {
      const deadline = '2026-09-20T23:59:59.999Z';
      const now = new Date('2026-09-29T00:00:00.000Z');
      expect(isJobPastAutoDeleteThreshold(deadline, now)).toBe(true);
    });
  });

  describe('getDaysUntilAutoDelete', () => {
    it('returns remaining days for expired job', () => {
      const deadline = new Date('2026-09-25T23:59:59.999Z');
      const now = new Date('2026-09-27T23:59:59.999Z'); // 2 days past deadline, 5 days remaining
      expect(getDaysUntilAutoDelete(deadline, now)).toBe(5);
    });

    it('returns 0 when past 1 week threshold', () => {
      const deadline = new Date('2026-09-10T23:59:59.999Z');
      const now = new Date('2026-09-28T12:00:00.000Z');
      expect(getDaysUntilAutoDelete(deadline, now)).toBe(0);
    });
  });
});
