import { currentUser } from "@/action/currentUser";
import { db } from "@/lib/db";
import { comments, users } from "@/lib/db/schema";
import { commentSchema } from "@/zodSchema/commentSchema";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

export const commentsRoutes = new Hono()
  .get("/p/:projectId", async (c) => {
    const projectId = c.req.param("projectId");
    const commentList = await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        user: {
          fullName: users.name,
          avatarUrl: users.image,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.projectId, projectId))
      .orderBy(comments.createdAt);

    return c.json(commentList);
  })
  .post(
    "/p/:projectId",
    zValidator("json", commentSchema),
    async (c) => {
      const user = await currentUser();
      if (!user || !user?.id) return c.json({ error: "Unauthorized" }, 401);

      const projectId = c.req.param("projectId");
      const body = c.req.valid("json");

      await db.insert(comments).values({
        projectId,
        content: body.content,
        userId: user.id,
      });

      return c.json({ success: true, message: "Comment Added" });
    }
  );
