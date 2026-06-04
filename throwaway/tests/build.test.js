import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { describe, it, expect, beforeEach } from 'vitest';

describe('build.js', () => {
  beforeEach(() => {
    execSync('node build.js', { stdio: 'pipe' });
  });

  it('generates config.js that sets window.APP_CONFIG', () => {
    const content = readFileSync('config.js', 'utf8');
    expect(content).toMatch(/^window\.APP_CONFIG = \{.+\};$/m);
  });

  it('config.js contains a tickerSymbol field', () => {
    const content = readFileSync('config.js', 'utf8');
    expect(content).toContain('"tickerSymbol"');
  });

  it('config.js tickerSymbol is a non-empty string', () => {
    const content = readFileSync('config.js', 'utf8');
    // strip the window.APP_CONFIG = assignment to get the JSON
    const json = content
      .replace('window.APP_CONFIG = ', '')
      .replace(/;\s*$/, '');
    const config = JSON.parse(json);
    expect(typeof config.tickerSymbol).toBe('string');
    expect(config.tickerSymbol.length).toBeGreaterThan(0);
  });
});
