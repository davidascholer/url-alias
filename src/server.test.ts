import { getRandomAlphanumeric } from "./util";

describe('getRandomAlphanumeric', () => {
  it('should return a string of the specified length', () => {
    const length: number = 10;
    const result = getRandomAlphanumeric(length);
    expect(result).toHaveLength(length);
  });

  it('should return a string containing only alphanumeric characters', () => {
    const length: number = 10;
    const result = getRandomAlphanumeric(length);
    expect(result).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it('should return different strings on multiple calls', () => {
    const length: number = 10;
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(getRandomAlphanumeric(length));
    }
    expect(results.size).toBeGreaterThan(1);
  });
});