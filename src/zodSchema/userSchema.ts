import type { z } from "zod/v4";
import { literal, object, string, url } from "zod/v4";

export const profileUpdateSchema = object({
  fullName: string().min(1, "Full name is required"),
  bio: string().max(500).optional(),
  website: url().max(255).optional().or(literal("")),
  githubUrl: url().max(255).optional().or(literal("")),
  linkedinUrl: url().max(255).optional().or(literal("")),
  avatarUrl: url().max(255).optional().or(literal("")),
});

export type ProfileUpdateSchemaT = z.infer<typeof profileUpdateSchema>;
