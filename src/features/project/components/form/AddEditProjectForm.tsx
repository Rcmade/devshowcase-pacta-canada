"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddEditProjectDialogT } from "../../hooks/useAddEditProjectDialog";
import useAddEditProjectForm from "../../hooks/useAddEditProjectForm";

interface AddEditProjectForm {
  data?: AddEditProjectDialogT
}
const AddEditProjectForm = ({}:AddEditProjectForm) => {
  const { form, onSubmit, isLoading } = useAddEditProjectForm({});

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="My Awesome Project"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Describe what your project does, the problem it solves, and what makes it special..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="liveUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live Demo URL</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="url"
                    placeholder="https://myproject.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Repository</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="url"
                    placeholder="https://github.com/username/project"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Image URL</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  type="url"
                  placeholder="https://example.com/project-screenshot.jpg"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add a screenshot or image that showcases your project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? " Submit..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddEditProjectForm;
