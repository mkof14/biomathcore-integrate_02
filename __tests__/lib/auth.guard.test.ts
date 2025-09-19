import { assertAuth } from '@/lib/auth/guard';
describe('assertAuth', () => {
  it('ok', () => { expect(() => assertAuth({ user: { email: 'demo@biomathcore.local' } })).not.toThrow(); });
  it('deny', () => { expect(() => assertAuth(null as any)).toThrow('UNAUTHORIZED'); });
});
