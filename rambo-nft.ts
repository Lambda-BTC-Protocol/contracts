import { LRC721MetadataBase } from "./standards/base/LRC721MetadataBase.ts";
import { ContractParams } from "./types/contract.ts";
import { z } from "zod";
import { argsParsing } from "./utils/args-parsing.ts";
import { TokenHelper } from "./utils/token-helper.ts";

export default class RamboNft extends LRC721MetadataBase {
  private _uriMap = new Map<number, string>();

  constructor() {
    super("RAMBO NFTS", "RAMBOS", "");
  }

  protected async _mintLogic(params: ContractParams) {
    const { args, metadata, ecosystem } = params;
    const schema = z.tuple([z.string()]);
    const [uri] = argsParsing(schema, args, "mint");
    const rambo = new TokenHelper("dep:dmt:RAMBO", ecosystem);
    await rambo.transferFrom(metadata.sender, metadata.currentContract, 10000n);
    const tokenId = await super._mintLogic(params);
    this._uriMap.set(tokenId, uri);
    return tokenId;
  }

  tokenURI({ args }: ContractParams): string | undefined {
    const schema = z.tuple([z.number()]);
    const [tokenId] = argsParsing(schema, args, "tokenURI");
    return this._uriMap.get(tokenId);
  }
}
