"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddEditProjectForm from "@/features/project/components/form/AddEditProjectForm";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function NewProjectPage() {
  const user = useCurrentUser();


  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p>Please sign in to create a project.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Share Your Project</CardTitle>
          <CardDescription>
            Tell the community about your amazing project and get valuable
            feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddEditProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
