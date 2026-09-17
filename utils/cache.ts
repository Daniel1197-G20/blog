export interface CacheOptions {
  ttl?: number;
}

export const cache = {
  get: <T>(_key: string): T | null => null,
  set: <T>(_key: string, _value: T, _options?: CacheOptions): void => {},
  remove: (_key: string): void => {},
  clear: (): void => {},
};
