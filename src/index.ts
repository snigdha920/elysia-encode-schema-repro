import { Elysia } from "elysia";
import { t } from "./types/typebox";

const TOKENS = [
  {
    id: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    totalSupply: BigInt(1),
    internalId: "1",
  },
  {
    id: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
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
    "/bigint",
    () => {
      return BigInt(1);
    },
    {
      200: t.StringifiedBigInt(),
    }
  )
  .get(
    "/tokens",
    () => {
      return TOKENS;
    },
    {
      200: t.Array(
        t.Intersect([
          t.Object({
            id: t.EthereumAddress(),
            totalSupply: t.StringifiedBigInt(),
          }),
          t.Object({
            id: t.EthereumAddress(),
            internalId: t.String(),
          }),
        ])
      ),
    }
  )

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
