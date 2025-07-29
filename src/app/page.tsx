"use client";

import { Button } from "@/components/ui/button";
import PersonalProjectCards from "@/features/project/components/cards/PersonalProjectCards";
import useGetPersonalProjects from "@/features/project/hooks/useGetPersonalProjects";
import Link from "next/link";

export default function Home() {
  const { data: projects, isLoading } = useGetPersonalProjects();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border p-6 animate-pulse"
            >
              <div className="h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
      </div>

      {(projects || []).length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🚀</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No projects yet
          </h3>
          <p className="text-gray-600 mb-6">
            Be the first to share your amazing project!
          </p>
          <Button asChild>
            <Link href="/projects/new">Share Your Project</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(projects || []).map((project) => (
            <PersonalProjectCards project={project} key={project?.id} />
          ))}
        </div>
      )}
    </div>
  );
}
