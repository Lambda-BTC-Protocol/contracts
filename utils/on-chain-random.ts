import { Metadata } from "../types/metadata.ts";
import { SeedableRandom } from "./seedable-random.ts";

export function onChainRandom(metadata: Metadata) {
  return new SeedableRandom(metadata.timestamp);
}
