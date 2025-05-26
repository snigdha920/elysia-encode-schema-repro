import { t } from "elysia/type-system";
import { getAddress } from "viem";

export const EthereumAddress = () =>
  t
    .Transform(t.String())
    .Decode((value) => {
      return getAddress(value);
    })
    .Encode((value) => {
      return value;
    });
