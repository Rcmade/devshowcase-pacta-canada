/* eslint-disable @next/next/no-img-element */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInitials } from "@/lib/utils/stringUtils";
import { formatDistanceToNow } from "date-fns";
import { Calendar, ExternalLink, Github, MessageSquare } from "lucide-react";
import Link from "next/link";
import { UserGetPersonalProjectResponse } from "../../hooks/useGetPersonalProjects";

interface PersonalProjectCardsProps {
  project: UserGetPersonalProjectResponse[number];
}
const PersonalProjectCards = ({ project }: PersonalProjectCardsProps) => {
  return (
    <Card
      key={project.id}
      className="group hover:shadow-lg transition-all duration-300 bg-white border-0 shadow-sm"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={project.profiles.avatarUrl ?? ""}
              alt={project.profiles.name ?? ""}
            />
            <AvatarFallback>
              {getInitials(project?.profiles?.name || undefined)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {project.profiles.name || "Unknown"}
            </p>
            <p className="text-xs text-gray-500 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {project.createdAt
                ? formatDistanceToNow(new Date(project.createdAt), {
                    addSuffix: true,
                  })
                : "Unknown"}
            </p>
          </div>
        </div>

        <CardTitle className="text-lg text-blue-600 transition-colors">
          <Link href={`/projects/p/${project.id}`}>{project.title}</Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        {project.imageUrl && (
          <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {project.description}
        </p>

        {(project.technologies || []).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {(project.technologies || []).slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {(project.technologies || []).length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{(project.technologies || []).length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={`/projects/p/${project.id}`}
              className="flex items-center space-x-1"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{project.commentsCount}</span>
            </Link>
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {project.githubUrl && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="ghost" size="sm" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PersonalProjectCards;
