import { t as tElysia } from "elysia/type-system";
import { EthereumAddress } from "./ethereum-address";
import { StringifiedBigInt } from "./bigint";

// Extend TypeBox types with module augmentation
declare module "@sinclair/typebox" {
  interface JavaScriptTypeBuilder {
    EthereumAddress: typeof EthereumAddress;
    StringifiedBigInt: typeof StringifiedBigInt;
  }
}

// Extend the Type system with custom validators
export const t = Object.assign({}, tElysia);

t.EthereumAddress = EthereumAddress;
t.StringifiedBigInt = StringifiedBigInt;
