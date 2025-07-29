"use client";

import useGetProfileInfo from "@/features/user/hooks/useGetProfileInfo";
import { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { Calendar, Edit, Github, Globe, Linkedin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UserProfileUpdateForm from "@/features/user/components/UserProfileUpdateForm";

export default function ProfilePage() {
  const { data, isLoading: isProfileLoading } = useGetProfileInfo();
  const user = data?.user;
  const [editing, setEditing] = useState(false);

  if (isProfileLoading) return <p>Loading...</p>;
  if (!user) return <p>Please sign in to view your profile.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatarUrl ?? undefined} />
                <AvatarFallback className="text-2xl">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {user.name ?? "Unnamed"}
                </CardTitle>
                <CardDescription className="text-lg">
                  {user.email}
                </CardDescription>
                {user.emailVerified && (
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined{" "}
                    {formatDistanceToNow(new Date(user.emailVerified), {
                      addSuffix: true,
                    })}
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={() => setEditing(!editing)}
              variant={editing ? "outline" : "default"}
              size="sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              {editing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {editing ? (
            <UserProfileUpdateForm setEditing={setEditing} />
          ) : (
            <div className="space-y-4">
              {user.bio && <p className="text-gray-700">{user.bio}</p>}
              <div className="flex flex-wrap gap-4">
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    rel="noreferrer"
                  >
                    <Globe className="w-4 h-4 mr-1" />
                    Website
                  </a>
                )}
                {user.githubUrl && (
                  <a
                    href={user.githubUrl}
                    target="_blank"
                    className="flex items-center text-gray-700 hover:text-gray-900"
                    rel="noreferrer"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    GitHub
                  </a>
                )}
                {user.linkedinUrl && (
                  <a
                    href={user.linkedinUrl}
                    target="_blank"
                    className="flex items-center text-blue-700 hover:text-blue-900"
                    rel="noreferrer"
                  >
                    <Linkedin className="w-4 h-4 mr-1" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
