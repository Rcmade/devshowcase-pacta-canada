"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useAddCommentForm from "../../hooks/useAddCommentForm";

const AddCommentForm = () => {
  const { form, onSubmit, isLoading } = useAddCommentForm({});

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave a comment</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Share your thoughts about this project..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button spinner={isLoading} type="submit" disabled={isLoading}>
            {isLoading ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddCommentForm;
