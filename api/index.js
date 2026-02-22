var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// api/index.ts
import "dotenv/config";

// src/app.ts
import express6 from "express";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id    String @id @default(uuid())\n  email String @unique\n\n  name   String?\n  role   Role       @default(STUDENT)\n  image  String?\n  status UserStatus @default(ACTIVE)\n\n  tutorProfile TutorProfile?\n  bookings     Booking[]     @relation("StudentBookings")\n  reviews      Review[]\n\n  sessions      Session[]\n  accounts      Account[]\n  emailVerified Boolean   @default(false)\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n}\n\nmodel TutorProfile {\n  id         Int    @id @default(autoincrement())\n  bio        String\n  hourlyRate Float\n\n  user   User   @relation(fields: [userId], references: [id])\n  userId String @unique\n\n  status TutorStatus @default(AVAILABLE)\n\n  categories   TutorCategory[]\n  bookings     Booking[]           @relation("TutorBookings")\n  reviews      Review[]\n  availability TutorAvailability[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Category {\n  id   Int    @id @default(autoincrement())\n  name String @unique\n\n  tutors TutorCategory[]\n}\n\nmodel TutorCategory {\n  tutorProfile   TutorProfile @relation(fields: [tutorProfileId], references: [id])\n  tutorProfileId Int\n\n  category   Category @relation(fields: [categoryId], references: [id])\n  categoryId Int\n\n  @@id([tutorProfileId, categoryId])\n}\n\nmodel TutorAvailability {\n  id        Int          @id @default(autoincrement())\n  tutorId   Int\n  tutor     TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n  dayOfWeek Int\n  startTime String\n  endTime   String\n  createdAt DateTime     @default(now())\n\n  @@unique([tutorId, dayOfWeek])\n}\n\nmodel Booking {\n  id Int @id @default(autoincrement())\n\n  student   User   @relation("StudentBookings", fields: [studentId], references: [id])\n  studentId String\n\n  tutor   TutorProfile @relation("TutorBookings", fields: [tutorId], references: [id])\n  tutorId Int\n\n  scheduledAt DateTime\n  status      BookingStatus @default(PENDING)\n  review      Review?\n  createdAt   DateTime      @default(now())\n}\n\nmodel Review {\n  id Int @id @default(autoincrement())\n\n  rating  Int\n  comment String?\n\n  student   User   @relation(fields: [studentId], references: [id])\n  studentId String\n\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id])\n  tutorId Int\n\n  booking   Booking @relation(fields: [bookingId], references: [id])\n  bookingId Int     @unique\n\n  createdAt DateTime @default(now())\n}\n\nmodel Session {\n  id String @id @default(uuid())\n\n  expiresAt DateTime\n  token     String   @unique\n\n  ipAddress String?\n  userAgent String?\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Account {\n  id         String @id @default(uuid())\n  providerId String\n  accountId  String\n\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  password              String?\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n}\n\nmodel Verification {\n  id         String   @id @default(uuid())\n  identifier String\n  value      String\n  expiresAt  DateTime\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum Role {\n  STUDENT\n  TUTOR\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  BANNED\n}\n\nenum BookingStatus {\n  PENDING\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nenum TutorStatus {\n  AVAILABLE\n  BUSY\n  OFFLINE\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"image","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"StudentBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"bio","kind":"scalar","type":"String"},{"name":"hourlyRate","kind":"scalar","type":"Float"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"userId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"TutorStatus"},{"name":"categories","kind":"object","type":"TutorCategory","relationName":"TutorCategoryToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"TutorBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"},{"name":"availability","kind":"object","type":"TutorAvailability","relationName":"TutorAvailabilityToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"},{"name":"tutors","kind":"object","type":"TutorCategory","relationName":"CategoryToTutorCategory"}],"dbName":null},"TutorCategory":{"fields":[{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorCategoryToTutorProfile"},{"name":"tutorProfileId","kind":"scalar","type":"Int"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToTutorCategory"},{"name":"categoryId","kind":"scalar","type":"Int"}],"dbName":null},"TutorAvailability":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"tutorId","kind":"scalar","type":"Int"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"TutorAvailabilityToTutorProfile"},{"name":"dayOfWeek","kind":"scalar","type":"Int"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"student","kind":"object","type":"User","relationName":"StudentBookings"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"TutorBookings"},{"name":"tutorId","kind":"scalar","type":"Int"},{"name":"scheduledAt","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"tutorId","kind":"scalar","type":"Int"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"bookingId","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"password","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TutorAvailabilityScalarFieldEnum: () => TutorAvailabilityScalarFieldEnum,
  TutorCategoryScalarFieldEnum: () => TutorCategoryScalarFieldEnum,
  TutorProfileScalarFieldEnum: () => TutorProfileScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  TutorProfile: "TutorProfile",
  Category: "Category",
  TutorCategory: "TutorCategory",
  TutorAvailability: "TutorAvailability",
  Booking: "Booking",
  Review: "Review",
  Session: "Session",
  Account: "Account",
  Verification: "Verification"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  email: "email",
  name: "name",
  role: "role",
  image: "image",
  status: "status",
  emailVerified: "emailVerified",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TutorProfileScalarFieldEnum = {
  id: "id",
  bio: "bio",
  hourlyRate: "hourlyRate",
  userId: "userId",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name"
};
var TutorCategoryScalarFieldEnum = {
  tutorProfileId: "tutorProfileId",
  categoryId: "categoryId"
};
var TutorAvailabilityScalarFieldEnum = {
  id: "id",
  tutorId: "tutorId",
  dayOfWeek: "dayOfWeek",
  startTime: "startTime",
  endTime: "endTime",
  createdAt: "createdAt"
};
var BookingScalarFieldEnum = {
  id: "id",
  studentId: "studentId",
  tutorId: "tutorId",
  scheduledAt: "scheduledAt",
  status: "status",
  createdAt: "createdAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  studentId: "studentId",
  tutorId: "tutorId",
  bookingId: "bookingId",
  createdAt: "createdAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var AccountScalarFieldEnum = {
  id: "id",
  providerId: "providerId",
  accountId: "accountId",
  userId: "userId",
  password: "password",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessType: "offline"
    }
  }
});

// src/app.ts
import cors from "cors";

// src/modules/admin/admin.route.ts
import express from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      tutorProfile: {
        select: {
          id: true,
          bio: true,
          hourlyRate: true,
          status: true,
          categories: { include: { category: true } }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateUserStatus = async (userId, status) => {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true
    }
  });
};
var getAllBookings = async () => {
  return prisma.booking.findMany({
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutor: {
        include: {
          user: true,
          categories: { include: { category: true } }
        }
      }
    },
    orderBy: { scheduledAt: "desc" }
  });
};
var getAllCategoriesAdmin = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { tutors: true } }
    }
  });
};
var createCategory = async (name) => {
  return prisma.category.create({
    data: { name }
  });
};
var updateCategory = async (id, name) => {
  return prisma.category.update({
    where: { id },
    data: { name }
  });
};
var deleteCategory = async (id) => {
  await prisma.tutorCategory.deleteMany({ where: { categoryId: id } });
  return prisma.category.delete({
    where: { id }
  });
};
var adminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res, next) => {
  try {
    const result = await adminService.getAllUsers();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var updateUserStatus2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["ACTIVE", "BANNED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "status must be ACTIVE or BANNED"
      });
    }
    const result = await adminService.updateUserStatus(id, status);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getAllBookings2 = async (req, res, next) => {
  try {
    const result = await adminService.getAllBookings();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getCategories = async (req, res, next) => {
  try {
    const result = await adminService.getAllCategoriesAdmin();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var createCategory2 = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.body, "body");
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "name is required"
      });
    }
    const result = await adminService.createCategory(name.trim());
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var updateCategory2 = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "name is required"
      });
    }
    const result = await adminService.updateCategory(id, name.trim());
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var deleteCategory2 = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await adminService.deleteCategory(id);
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};
var adminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2,
  getAllBookings: getAllBookings2,
  getCategories,
  createCategory: createCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/middleware/auth.ts
var middleware = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { status: true }
      });
      if (dbUser?.status === "BANNED") {
        return res.status(403).json({ message: "Account is suspended" });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden Access" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = middleware;

// src/modules/admin/admin.route.ts
var router = express.Router();
router.get("/users", auth_default("ADMIN" /* ADMIN */), adminController.getAllUsers);
router.patch(
  "/users/:id",
  auth_default("ADMIN" /* ADMIN */),
  adminController.updateUserStatus
);
router.get("/bookings", adminController.getAllBookings);
router.get("/categories", adminController.getCategories);
router.post(
  "/categories",
  auth_default("ADMIN" /* ADMIN */),
  adminController.createCategory
);
router.patch(
  "/categories/:id",
  auth_default("ADMIN" /* ADMIN */),
  adminController.updateCategory
);
router.delete(
  "/categories/:id",
  auth_default("ADMIN" /* ADMIN */),
  adminController.deleteCategory
);
var adminRouter = router;

// src/modules/booking/booking.route.ts
import express2 from "express";

// src/modules/booking/booking.service.ts
var createBooking = async (studentId, data) => {
  return prisma.booking.create({
    data: {
      studentId,
      tutorId: data.tutorId,
      scheduledAt: data.scheduledAt,
      status: "PENDING"
    },
    include: {
      tutor: {
        include: {
          user: true,
          categories: { include: { category: true } }
        }
      },
      student: { select: { id: true, name: true, email: true } }
    }
  });
};
var getBookingsByUser = async (userId, role) => {
  if (role === "TUTOR") {
    const profile = await prisma.tutorProfile.findUnique({
      where: { userId },
      select: { id: true }
    });
    if (!profile) return [];
    return prisma.booking.findMany({
      where: { tutorId: profile.id },
      include: {
        student: { select: { id: true, name: true, email: true } },
        tutor: {
          include: {
            user: true,
            categories: { include: { category: true } }
          }
        }
      },
      orderBy: { scheduledAt: "desc" }
    });
  }
  return prisma.booking.findMany({
    where: { studentId: userId },
    include: {
      tutor: {
        include: {
          user: true,
          categories: { include: { category: true } }
        }
      },
      student: { select: { id: true, name: true, email: true } }
    },
    orderBy: { scheduledAt: "desc" }
  });
};
var getBookingById = async (id, userId, role) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      tutor: {
        include: {
          user: true,
          categories: { include: { category: true } }
        }
      },
      student: { select: { id: true, name: true, email: true } }
    }
  });
  if (!booking) return null;
  if (role === "ADMIN") return booking;
  if (role === "TUTOR") {
    const profile = await prisma.tutorProfile.findUnique({
      where: { userId },
      select: { id: true }
    });
    if (profile?.id === booking.tutorId) return booking;
  }
  if (booking.studentId === userId) return booking;
  return null;
};
var updateBookingStatus = async (id, status, userId, role) => {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return null;
  if (role === "TUTOR") {
    const profile = await prisma.tutorProfile.findUnique({
      where: { userId },
      select: { id: true }
    });
    if (profile?.id !== booking.tutorId) return null;
  } else if (role !== "ADMIN" && booking.studentId !== userId) {
    return null;
  }
  return prisma.booking.update({
    where: { id },
    data: { status },
    include: {
      tutor: { include: { user: true } },
      student: { select: { id: true, name: true, email: true } }
    }
  });
};
var getBookingsByTutorId = async (tutorId) => {
  return prisma.booking.findMany({
    where: { tutorId: Number(tutorId) },
    include: {
      student: true,
      tutor: true
    },
    orderBy: { createdAt: "desc" }
  });
};
var bookingService = {
  createBooking,
  getBookingsByUser,
  getBookingById,
  getBookingsByTutorId,
  updateBookingStatus
};

// src/modules/booking/booking.controller.ts
var createBooking2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { tutorId, scheduledAt } = req.body;
    if (!tutorId || !scheduledAt) {
      return res.status(400).json({
        success: false,
        message: "tutorId and scheduledAt are required"
      });
    }
    const result = await bookingService.createBooking(user.id, {
      tutorId: Number(tutorId),
      scheduledAt: new Date(scheduledAt)
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getBookings = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const result = await bookingService.getBookingsByUser(user.id, user.role);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getBookingById2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const id = Number(req.params.id);
    const result = await bookingService.getBookingById(id, user.id, user.role);
    if (!result) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getMyBookings = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const tutorId = req.user.id;
    const bookings = await bookingService.getBookingsByTutorId(tutorId);
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};
var updateBookingStatus2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const id = Number(req.params.id);
    const { status } = req.body;
    if (!["CONFIRMED", "COMPLETED", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "status must be CONFIRMED, COMPLETED, or CANCELLED"
      });
    }
    const result = await bookingService.updateBookingStatus(
      id,
      status,
      user.id,
      user.role
    );
    if (!result) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var bookingController = {
  createBooking: createBooking2,
  getBookings,
  getMyBookings,
  getBookingById: getBookingById2,
  updateBookingStatus: updateBookingStatus2
};

// src/modules/booking/booking.route.ts
var router2 = express2.Router();
router2.post("/", auth_default("STUDENT" /* STUDENT */), bookingController.createBooking);
router2.get(
  "/tutor/me",
  auth_default("TUTOR" /* TUTOR */, "STUDENT" /* STUDENT */),
  bookingController.getBookings
);
router2.get(
  "/:id",
  auth_default("TUTOR" /* TUTOR */, "STUDENT" /* STUDENT */),
  bookingController.getBookingById
);
router2.patch(
  "/:id/status",
  auth_default("TUTOR" /* TUTOR */),
  bookingController.updateBookingStatus
);
var bookingRouter = router2;

// src/modules/review/review.route.ts
import express3 from "express";

// src/modules/review/review.service.ts
var createReview = async (studentId, data) => {
  if (data.rating < 1 || data.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  if (!data.bookingId) {
    throw new Error("Booking ID is required to submit a review");
  }
  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.studentId !== studentId) {
    throw new Error("You are not allowed to review this booking");
  }
  if (booking.tutorId !== data.tutorId) {
    throw new Error("Tutor mismatch for this booking");
  }
  if (booking.status !== "COMPLETED") {
    throw new Error("Only completed bookings can be reviewed");
  }
  const existingReview = await prisma.review.findFirst({
    where: {
      bookingId: data.bookingId
    }
  });
  if (existingReview) {
    throw new Error("You have already reviewed this booking");
  }
  const review = await prisma.review.create({
    data: {
      studentId,
      tutorId: data.tutorId,
      bookingId: data.bookingId,
      rating: data.rating,
      comment: data.comment ?? null
    },
    include: {
      student: {
        select: {
          id: true,
          name: true
        }
      },
      tutor: {
        include: {
          user: true
        }
      }
    }
  });
  return review;
};
var getReviewsForTutor = async (userId) => {
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }
  return prisma.review.findMany({
    where: { tutorId: tutorProfile.id },
    include: {
      student: {
        select: { id: true, name: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var reviewService = {
  createReview,
  getReviewsForTutor
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { tutorId, bookingId, rating, comment } = req.body;
    if (!tutorId || rating == null) {
      return res.status(400).json({
        success: false,
        message: "tutorId and rating are required"
      });
    }
    const input = {
      tutorId: Number(tutorId),
      rating: Number(rating)
    };
    if (bookingId != null) input.bookingId = Number(bookingId);
    if (comment != null) input.comment = comment;
    const result = await reviewService.createReview(user.id, input);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create review";
    if (message.includes("already reviewed") || message.includes("Invalid or incomplete")) {
      return res.status(400).json({ success: false, message });
    }
    next(error);
  }
};
var getMyReviews = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const reviews = await reviewService.getReviewsForTutor(user.id);
    res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};
var reviewController = {
  createReview: createReview2,
  getMyReviews
};

// src/modules/review/review.route.ts
var router3 = express3.Router();
router3.post("/", auth_default("STUDENT" /* STUDENT */), reviewController.createReview);
router3.get("/", auth_default("TUTOR" /* TUTOR */), reviewController.getMyReviews);
var reviewRouter = router3;

// src/modules/tutors/tutor.route.ts
import express4 from "express";

// src/modules/tutors/tutors.service.ts
var createTutorProfile = async (userId, data) => {
  const categoryIds = [...new Set(data.categoryIds ?? [])];
  return prisma.$transaction(async (tx) => {
    const existing = await tx.tutorProfile.findUnique({
      where: { userId }
    });
    if (existing) {
      throw new Error("Your profile already exists");
    }
    const profile = await tx.tutorProfile.create({
      data: {
        userId,
        bio: data.bio,
        hourlyRate: data.hourlyRate,
        status: data.status
      }
    });
    if (categoryIds.length) {
      await tx.tutorCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          tutorProfileId: profile.id,
          categoryId
        })),
        skipDuplicates: true
      });
    }
    return tx.tutorProfile.findUnique({
      where: { id: profile.id },
      include: {
        user: true,
        categories: { include: { category: true } }
      }
    });
  });
};
var getAllTutors = async (filters) => {
  const where = {};
  if (filters?.categoryId) {
    where.categories = {
      some: { categoryId: filters.categoryId }
    };
  }
  if (filters?.maxPrice) {
    where.hourlyRate = { lte: filters.maxPrice };
  }
  const tutors = await prisma.tutorProfile.findMany({
    where,
    include: {
      user: true,
      categories: { include: { category: true } },
      reviews: true,
      availability: true
    }
  });
  if (filters?.minRating) {
    return tutors.filter((t) => {
      if (!t.reviews.length) return false;
      const avg = t.reviews.reduce((s, r) => s + r.rating, 0) / t.reviews.length;
      return avg >= filters.minRating;
    });
  }
  return tutors;
};
var getTutorById = async (tutorId) => {
  return prisma.tutorProfile.findUnique({
    where: { id: tutorId },
    include: {
      user: true,
      categories: { include: { category: true } },
      reviews: { include: { student: true } }
    }
  });
};
var getAllTutorProfiles = async () => {
  const profiles = await prisma.tutorProfile.findMany({
    include: {
      user: true,
      // যাতে email access করতে পারো
      categories: { include: { category: true } }
    }
  });
  return profiles.map((profile) => ({
    id: profile.id,
    bio: profile.bio,
    hourlyRateCents: profile.hourlyRate,
    status: profile.status,
    categoryIds: profile.categories.map((c) => c.category.id),
    user: {
      id: profile.user.id,
      email: profile.user.email,
      name: profile.user.name
    }
  }));
};
var getTutorByUserId = async (userId) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    include: {
      categories: {
        include: {
          category: true
        }
      }
    }
  });
  if (!profile) return null;
  return {
    id: profile.id,
    bio: profile.bio,
    hourlyRateCents: profile.hourlyRate,
    status: profile.status,
    categoryIds: profile.categories.map((c) => c.category.id)
  };
};
var updateTutorProfile = async (userId, data) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    select: { id: true }
  });
  if (!profile) throw new Error("Profile not found");
  const categoryIds = [...new Set(data.categoryIds ?? [])];
  return prisma.$transaction(async (tx) => {
    if (data.categoryIds) {
      await tx.tutorCategory.deleteMany({
        where: { tutorProfileId: profile.id }
      });
      if (categoryIds.length) {
        await tx.tutorCategory.createMany({
          data: categoryIds.map((categoryId) => ({
            tutorProfileId: profile.id,
            categoryId
          })),
          skipDuplicates: true
        });
      }
    }
    return tx.tutorProfile.update({
      where: { id: profile.id },
      data: {
        ...data.bio && { bio: data.bio },
        ...data.hourlyRate && { hourlyRate: data.hourlyRate },
        ...data.status && { status: data.status }
      },
      include: {
        user: true,
        categories: { include: { category: true } },
        availability: true
      }
    });
  });
};
var setAvailability = async (userId, slots) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    select: { id: true }
  });
  if (!profile) throw new Error("Profile not found");
  return prisma.$transaction(async (tx) => {
    await tx.tutorAvailability.deleteMany({
      where: { tutorId: profile.id }
    });
    if (slots.length) {
      await tx.tutorAvailability.createMany({
        data: slots.map((s) => ({
          tutorId: profile.id,
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime
        }))
      });
    }
    return tx.tutorAvailability.findMany({
      where: { tutorId: profile.id },
      orderBy: { dayOfWeek: "asc" }
    });
  });
};
var tutorsService = {
  createTutorProfile,
  getAllTutors,
  getTutorById,
  getTutorByUserId,
  getAllTutorProfiles,
  updateTutorProfile,
  setAvailability
};

// src/modules/tutors/tutors.controller.ts
var createTutorProfile2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const body = req.body;
    const categoryIds = Array.isArray(body.categoryIds) ? body.categoryIds.map(Number) : [];
    const result = await tutorsService.createTutorProfile(user.id, {
      bio: body.bio,
      hourlyRate: body.hourlyRate,
      status: body.status,
      categoryIds
    });
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllTutors2 = async (req, res, next) => {
  try {
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : void 0;
    const minRating = req.query.minRating ? Number(req.query.minRating) : void 0;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : void 0;
    const filters = {};
    if (categoryId != null) filters.categoryId = categoryId;
    if (minRating != null) filters.minRating = minRating;
    if (maxPrice != null) filters.maxPrice = maxPrice;
    const result = await tutorsService.getAllTutors(filters);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getTutorProfileById = async (req, res, next) => {
  try {
    const tutorId = Number(req.params.id);
    if (Number.isNaN(tutorId)) {
      return res.status(400).json({ message: "Invalid tutor id" });
    }
    const result = await tutorsService.getTutorById(tutorId);
    if (!result) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};
var getAllTutorProfilesController = async (req, res, next) => {
  try {
    const profiles = await tutorsService.getAllTutorProfiles();
    res.status(200).json({ success: true, data: profiles });
  } catch (err) {
    next(err);
  }
};
var getMyTutorProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const userId = req.user.id;
    const result = await tutorsService.getTutorByUserId(userId);
    if (!result) {
      return res.status(200).json({ success: true, data: null });
    }
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateTutorProfile2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const body = req.body;
    const categoryIds = Array.isArray(body.categoryIds) ? body.categoryIds.map(Number) : void 0;
    const result = await tutorsService.updateTutorProfile(user.id, {
      bio: body.bio,
      hourlyRate: body.hourlyRate,
      status: body.status,
      categoryIds
    });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var setAvailability2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const slots = req.body.slots;
    if (!Array.isArray(slots)) {
      return res.status(400).json({
        success: false,
        message: "slots array is required"
      });
    }
    const result = await tutorsService.setAvailability(user.id, slots);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var tutorsController = {
  createTutorProfile: createTutorProfile2,
  getAllTutors: getAllTutors2,
  getAllTutorProfilesController,
  getTutorProfileById,
  getMyTutorProfile,
  updateTutorProfile: updateTutorProfile2,
  setAvailability: setAvailability2
};

// src/modules/tutors/tutor.route.ts
var router4 = express4.Router();
router4.post(
  "/",
  auth_default("TUTOR" /* TUTOR */),
  tutorsController.createTutorProfile
);
router4.get("/", tutorsController.getAllTutors);
router4.get(
  "/me",
  auth_default("TUTOR" /* TUTOR */),
  tutorsController.getAllTutorProfilesController
);
router4.get("/:id", auth_default(), tutorsController.getTutorProfileById);
router4.put(
  "/profile",
  auth_default("TUTOR" /* TUTOR */),
  tutorsController.updateTutorProfile
);
router4.put(
  "/availability",
  auth_default("TUTOR" /* TUTOR */),
  tutorsController.setAvailability
);
var tutorRouter = router4;

// src/modules/user/user.route.ts
import express5 from "express";

// src/modules/user/user.service.ts
var getAllUsers3 = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true
    }
  });
};
var updateUserProfile = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true
    }
  });
};
var getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true
    }
  });
};
var userService = {
  getAllUsers: getAllUsers3,
  updateUserProfile,
  getUserById
};

// src/modules/user/user.controller.ts
var getAllUsersController = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
var updateUserProfileController = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { name, email } = req.body;
    if (email && typeof email !== "string") {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
    if (name && typeof name !== "string") {
      return res.status(400).json({ success: false, message: "Invalid name format" });
    }
    const updatedUser = await userService.updateUserProfile(userId, {
      name,
      email
    });
    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};
var getLoggedInUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
var userController = {
  getAllUsersController,
  updateUserProfileController,
  getLoggedInUserController
};

// src/modules/user/user.route.ts
var router5 = express5.Router();
router5.get("/", userController.getAllUsersController);
router5.get("/me", auth_default(), userController.getLoggedInUserController);
router5.patch(
  "/update",
  auth_default(),
  userController.updateUserProfileController
);
var userRouter = router5;

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found!",
    path: req.originalUrl,
    date: Date()
  });
}

// src/middleware/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Something went wrong";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing fields!";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your creditials!";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach database server";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/app.ts
var app = express6();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express6.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/user", userRouter);
app.use("/api/tutor", tutorRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("SkillBridge API running");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// api/index.ts
var index_default = app_default;
export {
  index_default as default
};
