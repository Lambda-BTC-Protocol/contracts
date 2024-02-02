import { LRC20Base } from "../standards/base/LRC20Base.ts";
import { ExecutionError } from "../types/execution-error.ts";
import { Ecosystem } from "../types/ecosystem.ts";

/**
 * Helper class for interacting with LRC20 tokens.
 */
export class TokenHelper {
  constructor(
    private contract: string,
    private ecosystem: Ecosystem,
  ) {}

  /**
   * Transfer tokens from the current contract to another wallet.
   * @param to the receiver
   * @param value the amount to transfer
   * @param check check the receiver's balance is the same as before + value
   */
  async transfer(to: string, value: bigint, check: boolean = false) {
    const token = await this.ecosystem.getContractObj<LRC20Base>(this.contract);
    if (!token) throw new ExecutionError(`Contract ${this.contract} not found`);

    if (check) {
      const beforeBalance = await this.balanceOf(to);
      await token.transfer([to, value]);
      const afterBalance = await this.balanceOf(to);
      if (afterBalance !== beforeBalance + value)
        throw new ExecutionError(
          `transfer: transfer failed; not the full amount received`,
        );
    } else {
      await token.transfer([to, value]);
    }
  }

  /**
   * Transfer tokens from a wallet to another wallet.
   * @param from the sender
   * @param to the receiver
   * @param value the amount to transfer
   * @param check check the receiver's balance is the same as before + value; *doesn't* check the sender's balance
   */
  async transferFrom(
    from: string,
    to: string,
    value: bigint,
    check: boolean = false,
  ) {
    const token = await this.ecosystem.getContractObj<LRC20Base>(this.contract);
    if (!token) throw new ExecutionError(`Contract ${this.contract} not found`);

    if (check) {
      const beforeBalance = await this.balanceOf(to);
      await token.transferFrom([from, to, value]);
      const afterBalance = await this.balanceOf(to);
      if (afterBalance !== beforeBalance + value)
        throw new ExecutionError(
          `transfer: transfer failed; not the full amount received`,
        );
    } else {
      await token.transferFrom([from, to, value]);
    }
  }

  async balanceOf(wallet: string) {
    const token = await this.ecosystem.getContractObj<LRC20Base>(this.contract);
    if (!token) throw new ExecutionError(`Contract ${this.contract} not found`);

    return token.balanceOf([wallet]);
  }
}
