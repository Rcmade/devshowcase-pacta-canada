/* eslint-disable @next/next/no-img-element */
"use client";

import SignInButton from "@/components/buttons/SignInButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AddCommentForm from "@/features/comments/components/form/AddCommentForm";
import useGetCommentsByProjectId from "@/features/comments/hooks/useGetCommentsByProjectId";
import { useAddEditProjectDialog } from "@/features/project/hooks/useAddEditProjectDialog";
import useDeleteProject from "@/features/project/hooks/useDeleteProject";
import useGetProjectById from "@/features/project/hooks/useGetProjectById";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getInitials } from "@/lib/utils/stringUtils";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  Edit,
  ExternalLink,
  Github,
  MessageSquare,
  Trash2,
} from "lucide-react";

export default function ProjectPage() {
  const user = useCurrentUser();

  const { data: project, isLoading: isProjectLoading } = useGetProjectById();

  const { data: comments, isLoading: isCommentsLoading } =
    useGetCommentsByProjectId();

  const { onOpen } = useAddEditProjectDialog();

  const { handleDelete } = useDeleteProject();

  if (isCommentsLoading || isProjectLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-6" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600">
          The project you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  const isOwner = user?.id === project.userId;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={project?.user?.avatarUrl || undefined}
                    alt={project?.user?.fullName || undefined}
                  />
                  <AvatarFallback>
                    {getInitials(project.user?.fullName || "Unknown")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {project?.user?.fullName}
                  </p>
                  {project.createdAt && (
                    <p className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(new Date(project.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  )}
                </div>
              </div>

              <CardTitle className="text-3xl mb-4">{project.title}</CardTitle>
            </div>

            {isOwner && (
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    onOpen({
                      data: project,
                      type: "edit",
                    });
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleDelete({
                      id: project?.id,
                      title: project?.title,
                    })
                  }
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {project.imageUrl && (
            <div className="w-full h-64 md:h-96 bg-gray-100 rounded-lg mb-6 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {project.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About this project</h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Comments ({(comments || []).length})</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {user ? (
            <div className="mb-6">
              <AddCommentForm />
            </div>
          ) : (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 mb-2">Sign in to leave a comment</p>
              <SignInButton />
            </div>
          )}

          <div className="space-y-4">
            {(comments || []).length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              (comments || []).map((comment, index) => (
                <div key={comment.id}>
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment?.user?.avatarUrl || undefined}
                        alt={comment?.user?.fullName || undefined}
                      />
                      <AvatarFallback>
                        {getInitials(comment?.user?.fullName || undefined)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">
                          {comment?.user?.fullName}
                        </span>
                        {comment.createdAt && (
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                  {index < (comments || []).length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
