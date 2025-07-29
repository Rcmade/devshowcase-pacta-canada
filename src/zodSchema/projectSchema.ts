import type { z } from "zod/v4";
import { literal, object, string, url } from "zod/v4";

export const addEditFormSchema = object({
  title: string().min(1, "Project title is required"),
  description: string().optional(),
  liveUrl: url("Please enter a valid URL").optional().or(literal("")),
  githubUrl: url("Please enter a valid URL").optional().or(literal("")),
  imageUrl: url("Please enter a valid URL").optional().or(literal("")),
  id: string().optional(),
});

export type AddEditFormSchemaT = z.infer<typeof addEditFormSchema>;

export const getProjectSchema = object({
  search: string().optional(),
});
