import { metricsJson } from '@/lib/monitoring/health';

describe('monitoring: metricsJson', () => {
  it('returns numeric fields', async () => {
    const m = await metricsJson();
    expect(typeof m.ts).toBe('number');
    expect(typeof m.uptime).toBe('number');
    expect(typeof m.rss).toBe('number');
  });
});
