import { Elysia } from "elysia";
import { t } from "elysia/type-system";

export const StringifiedBigInt = () =>
  t
    .Transform(t.String())
    .Decode((value) => BigInt(value))
    .Encode((value) => {
      return value.toString();
    });

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
      200: StringifiedBigInt(), // Expected: "1", received: response is not an Object. (evaluating '"charCodeAt"in response')
    }
  )
  .get(
    "/bigint2",
    () => {
      return {
        bigint: BigInt(1),
      };
    },
    {
      200: t.Object({
        bigint: StringifiedBigInt(), // Expected: {bigint: "1"}, received: JSON.stringify cannot serialize BigInt.
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
