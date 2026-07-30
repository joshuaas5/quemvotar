import { describe, expect, it } from 'vitest';
import { GUIDE_ARTICLES, getGuideSources } from './guides';

describe('guide sources', () => {
  it('gives every guide a direct path to official sources', () => {
    for (const article of GUIDE_ARTICLES) {
      const sources = getGuideSources(article);

      expect(sources.length).toBeGreaterThan(0);
      for (const source of sources) {
        expect(source.href).toMatch(/^https:\/\//);
        expect(source.label).not.toHaveLength(0);
        expect(source.description).not.toHaveLength(0);
      }
    }
  });

  it('does not return duplicate source links for a guide', () => {
    const hrefs = getGuideSources(GUIDE_ARTICLES[0]).map((source) => source.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
