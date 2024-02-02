import { Contract, ContractParams } from "./types/contract.ts";
import { z } from "zod";
import { argsParsing } from "./utils/args-parsing.ts";

export default class ReadAndStore implements Contract {
  activeOn = 828000;
  message = new Map<string, string>();

  store = ({ metadata, eventLogger, args }: ContractParams) => {
    const schema = z.tuple([z.string()]);
    const [valueToStore] = argsParsing(schema, args, "save");

    this.message.set(metadata.sender, valueToStore);

    eventLogger.log({
      type: "SAVE",
      message: `${valueToStore} stored for ${metadata.sender}`,
    });
  };

  async storeClassMethod({ metadata, eventLogger, args }: ContractParams) {
    const schema = z.tuple([z.string()]);
    const [valueToStore] = argsParsing(schema, args, "save");

    this.message.set(metadata.sender, valueToStore);

    eventLogger.log({
      type: "SAVE",
      message: `${valueToStore} stored for ${metadata.sender}`,
    });
  }

  read = (args: unknown[]) => {
    const schema = z.tuple([z.string()]);
    const [from] = argsParsing(schema, args, "read");
    return this.message.get(from) ?? "";
  };

  blockNumber = ({ metadata }: ContractParams) => {
    return metadata.blockNumber;
  };
}
