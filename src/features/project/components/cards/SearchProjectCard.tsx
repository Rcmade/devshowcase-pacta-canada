/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/utils/stringUtils";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { UserGetSearchProjectResponse } from "../../hooks/useGetSearchProject";

interface SearchProjectCardsProps {
  project: UserGetSearchProjectResponse[number];
}
const SearchProjectCard = ({ project }: SearchProjectCardsProps) => {
  return (
    <Card key={project.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3 mb-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={project?.user?.image || undefined}
              alt={project?.user?.name || undefined}
            />
            <AvatarFallback className="text-xs">
              {getInitials(project?.user?.name || undefined)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">{project?.user?.name}</span>
        </div>
        <CardTitle className="text-lg">
          <Link
            href={`/projects/p/${project.id}`}
            className="text-blue-600"
          >
            {project.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {project.imageUrl && (
          <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {project?.createdAt && (
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(project?.createdAt), {
              addSuffix: true,
            })}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchProjectCard;
