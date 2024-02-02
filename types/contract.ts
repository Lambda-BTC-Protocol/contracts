import { Metadata } from "./metadata.ts";
import { EventLogger } from "./event-logger.ts";
import { Ecosystem } from "./ecosystem.ts";

export type ContractParams = {
  metadata: Metadata;
  ecosystem: Ecosystem;
  eventLogger: EventLogger;
  args: Array<unknown>;
};

export interface Contract {
  activeOn: number;
}
