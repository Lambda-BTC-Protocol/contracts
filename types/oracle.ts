export type Oracle = {
  getRawBlock: (blockNumber: number) => Promise<Uint8Array>;
};
