import { commentsRoutes } from "@/features/comments/server/routes";
import { projectRoute } from "@/features/project/server/routes";
import { userRoutes } from "@/features/user/server/routes";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/main");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/projects", projectRoute)
  .route("/user", userRoutes)
  .route("/comments", commentsRoutes);
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
