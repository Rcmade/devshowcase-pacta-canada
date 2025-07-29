import { currentUser } from "@/action/currentUser";
import { db } from "@/lib/db";
import { comments, profiles, projects, users } from "@/lib/db/schema";
import { addEditFormSchema, getProjectSchema } from "@/zodSchema/projectSchema";
import { zValidator } from "@hono/zod-validator";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { Hono } from "hono";

export const projectRoute = new Hono()
  .post("/", zValidator("json", addEditFormSchema), async (c) => {
    const body = c.req.valid("json");
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { id, title, description, githubUrl, liveUrl, imageUrl } = body;

    const technologies: string[] = [];

    if (id) {
      const updated = await db
        .update(projects)
        .set({
          title,
          description,
          githubUrl: githubUrl || null,
          liveUrl: liveUrl || null,
          imageUrl: imageUrl || null,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, id))
        .returning();

      if (updated.length === 0) {
        return c.json({ error: "Project not found" }, 404);
      }

      return c.json({ message: "Project updated", project: updated[0] });
    } else {
      const [newProject] = await db
        .insert(projects)
        .values({
          userId,
          title,
          description,
          githubUrl: githubUrl || null,
          liveUrl: liveUrl || null,
          imageUrl: imageUrl || null,
          technologies,
        })
        .returning();

      return c.json({ message: "Project created", project: newProject }, 201);
    }
  })
  .get("/me", zValidator("query", getProjectSchema), async (c) => {
    try {
      const user = await currentUser();
      const userId = user?.id;

      if (!userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const query = c.req.valid("query");
      const search = query?.search?.trim() || "";

      const whereCondition = and(
        eq(projects.userId, userId),
        search ? ilike(projects.title, `%${search}%`) : undefined
      );

      const data = await db
        .select({
          id: projects.id,
          title: projects.title,
          description: projects.description,
          liveUrl: projects.liveUrl,
          githubUrl: projects.githubUrl,
          imageUrl: projects.imageUrl,
          technologies: projects.technologies,
          createdAt: projects.createdAt,
          profiles: {
            name: users.name,
            avatarUrl: profiles.avatarUrl,
          },
          commentsCount: count(comments.id),
        })
        .from(projects)
        .leftJoin(profiles, eq(projects.userId, profiles.userId))
        .leftJoin(users, eq(projects.userId, users.id))
        .leftJoin(comments, eq(comments.projectId, projects.id))
        .where(whereCondition)
        .groupBy(projects.id, users.name, profiles.avatarUrl)
        .orderBy(desc(projects.createdAt));

      const projectsWithCount = data.map((project) => ({
        ...project,
        _count: {
          comments: Number(project.commentsCount || 0),
        },
      }));

      return c.json(projectsWithCount);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return c.json({ error: "Failed to load projects" }, 500);
    }
  })

  .get("/search", async (c) => {
    try {
      const search = c.req.query("search")?.trim() || "";

      const data = await db
        .select({
          id: projects.id,
          title: projects.title,
          description: projects.description,
          liveUrl: projects.liveUrl,
          githubUrl: projects.githubUrl,
          imageUrl: projects.imageUrl,
          technologies: projects.technologies,
          createdAt: projects.createdAt,
          user: {
            id: users.id,
            name: users.name,
            email: users.email,
            image: users.image,
          },
          commentsCount: count(comments.id),
        })
        .from(projects)
        .leftJoin(users, eq(projects.userId, users.id))
        .leftJoin(comments, eq(comments.projectId, projects.id))
        .where(
          search
            ? or(
                ilike(projects.title, `%${search}%`),
                ilike(users.name, `%${search}%`)
              )
            : undefined
        )
        .groupBy(
          projects.id,
          users.id // required to group when selecting user fields
        )
        .orderBy(desc(projects.createdAt));

      const projectsWithCount = data.map((project) => ({
        ...project,
        _count: {
          comments: Number(project.commentsCount || 0),
        },
      }));

      return c.json(projectsWithCount);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return c.json({ error: "Failed to load projects" }, 500);
    }
  })
  .get("/p/:projectId", async (c) => {
    const projectId = c.req.param("projectId");

    const project = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        liveUrl: projects.liveUrl,
        githubUrl: projects.githubUrl,
        imageUrl: projects.imageUrl,
        createdAt: projects.createdAt,
        userId: projects.userId,
        user: {
          fullName: users.name,
          avatarUrl: users.image,
        },
      })
      .from(projects)
      .leftJoin(users, eq(projects.userId, users.id))
      .where(eq(projects.id, projectId))
      .limit(1)
      .then((res) => res[0]);

    if (!project) return c.json({ error: "Project not found" }, 404);
    return c.json(project);
  })
  .delete("/:projectId", async (c) => {
    const user = await currentUser();
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    // const { id } = c.req.valid("param");
    const projectId = c.req.param("projectId");

    const project = await db.query.projects.findFirst({
      where: (p, { eq }) => eq(p.id, projectId),
    });

    if (!project) return c.json({ error: "Project not found" }, 404);
    if (project.userId !== user.id) return c.json({ error: "Forbidden" }, 403);

    await db.delete(projects).where(eq(projects.id, projectId));

    return c.json({ success: true, message: "Project deleted successfully" });
  });
