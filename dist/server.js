import {
  app_default
} from "./chunk-3WYCBHRI.js";
import "./chunk-3ELUDX6E.js";
import "./chunk-ACAHUFZF.js";
import "./chunk-S6FTO6YJ.js";
import "./chunk-ITN5NGGE.js";
import "./chunk-6UASTSLU.js";
import "./chunk-LUUPSJO3.js";
import "./chunk-XAYQWH6J.js";
import "./chunk-WKSFBFGG.js";
import "./chunk-KAZ5R2EK.js";
import "./chunk-DJBOWZLI.js";
import "./chunk-U2CGDLX4.js";
import "./chunk-462JVGUF.js";
import "./chunk-OB4NNRSQ.js";
import "./chunk-COFLIZFR.js";
import "./chunk-W7L6N5X7.js";
import "./chunk-3EAPRASJ.js";
import "./chunk-SD3U7ZLC.js";
import {
  prisma
} from "./chunk-T4KIXJWJ.js";
import "./chunk-U7TOEICV.js";
import "./chunk-QKUZOFXZ.js";
import "./chunk-UP5KOSGM.js";
import "./chunk-MLKGABMK.js";

// src/server.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("connect successfully");
    app_default.listen(PORT, () => {
      console.log(`Better Auth app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
