import { Elysia } from "elysia";
import { t } from "elysia/type-system";
import { Address, getAddress } from "viem";

const StringifiedBigInt = () =>
  t
    .Transform(t.String())
    .Decode((value) => BigInt(value))
    .Encode((value) => {
      return value.toString();
    });

const EthereumAddress = () =>
  t
    .Transform(t.String())
    .Decode((value) => {
      return getAddress(value);
    })
    .Encode((value) => {
      return value;
    });

const TOKENS = [
  {
    id: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" as Address,
    totalSupply: BigInt(1),
    internalId: "1",
  },
  {
    id: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" as Address,
    totalSupply: BigInt(2),
    internalId: "2",
  },
];

const app = new Elysia({
  aot: true,
  encodeSchema: true,
})
  .get("/", () => "Hello Elysia")
  .get(
    "/tokens",
    () => {
      return TOKENS;
    },
    {
      response: {
        // BROKEN: Intersect + more than 1 Transform does not work, error: "JSON.stringify cannot serialize BigInt."
        200: t.Array(
          t.Intersect([
            t.Object({
              id: EthereumAddress(),
              totalSupply: StringifiedBigInt(),
            }),
            t.Object({
              id: EthereumAddress(),
              internalId: t.String(),
            }),
          ])
        ),
      },
    }
  )
  .get(
    "/tokens2",
    () => {
      return TOKENS;
    },
    {
      response: {
        // WORKS: Intersect + only 1 transform type
        200: t.Array(
          t.Intersect([
            t.Object({
              id: t.String(),
              totalSupply: StringifiedBigInt(),
            }),
            t.Object({
              id: t.String(),
              internalId: t.String(),
            }),
          ])
        ),
      },
    }
  )
  .get(
    "/tokens3",
    () => {
      return TOKENS;
    },
    {
      response: {
        // WORKS: No Intersect + more than 1 transform type
        200: t.Array(
          t.Object({
            id: EthereumAddress(),
            totalSupply: StringifiedBigInt(),
          })
        ),
      },
    }
  )
  .get(
    "/bigint",
    () => {
      return BigInt(1);
    },
    {
      response: {
        // Simple Transform works
        200: StringifiedBigInt(),
      },
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
