import { LRC20Base } from "./standards/base/LRC20Base.ts";
import { Contract, ContractParams } from "./types/contract.ts";
import { ExecutionError } from "./types/execution-error.ts";

export default class DmtEven extends LRC20Base implements Contract {
  _blocksMinted = new Set<number>();

  constructor() {
    super("DMT-EVEN", "DMT-EVEN", 4, "0x0", 833000);
  }

  protected async mintLogic({
    metadata,
    eventLogger,
    oracle,
  }: ContractParams): Promise<void> {
    if (this._blocksMinted.has(metadata.blockNumber))
      throw new ExecutionError("mint: Block already minted");
    const block = await oracle.getRawBlock(metadata.blockNumber);
    const evenNumbers = block.filter((x) => x % 2 === 0).length;

    const amount = BigInt(evenNumbers * 1_0000);
    this._internalMint(metadata.sender, amount, eventLogger);

    this._blocksMinted.add(metadata.blockNumber);
  }
}
