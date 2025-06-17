import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { t } from "elysia/type-system";
import { Address, getAddress } from "viem";

const app = new Elysia({
  aot: true,
  encodeSchema: true,
})
  .get("/", () => "Hello Elysia")
  .onAfterHandle((ctx) => {
    console.log("handled!");
  })
  .use(swagger())
  .listen(5555);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
