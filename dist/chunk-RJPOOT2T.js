import {
  auth
} from "./chunk-SD3U7ZLC.js";
import {
  prisma
} from "./chunk-T4KIXJWJ.js";

// src/middleware/authMiddleware.ts
var userRole = /* @__PURE__ */ ((userRole2) => {
  userRole2["STUDENT"] = "STUDENT";
  userRole2["TUTOR"] = "TUTOR";
  userRole2["ADMIN"] = "ADMIN";
  return userRole2;
})(userRole || {});
var authMiddleware = (...roles) => {
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
var authMiddleware_default = authMiddleware;

export {
  userRole,
  authMiddleware_default
};
