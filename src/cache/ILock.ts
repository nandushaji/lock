export interface ILock {
  aquire(key: string, expiryInSeconds: number): Promise<void>;
  release(key: string): Promise<void>;
}
