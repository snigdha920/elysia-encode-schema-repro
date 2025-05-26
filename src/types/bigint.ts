import { t } from "elysia/type-system";

export const StringifiedBigInt = () =>
  t
    .Transform(t.String())
    .Decode((value) => BigInt(value))
    .Encode((value) => {
      return value.toString();
    });
