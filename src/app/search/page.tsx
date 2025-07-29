"use client";

import { Input } from "@/components/ui/input";
import SearchProjectCard from "@/features/project/components/cards/SearchProjectCard";
import useGetSearchProject from "@/features/project/hooks/useGetSearchProject";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { FolderOpen, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const { updateSearchParams } = useUpdateSearchParams();
  const { data: projects, isLoading } = useGetSearchProject();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DevShowcase
          </span>
        </h1>
        <p className="text-gray-600 mb-6">
          Discover amazing projects and talented developers
        </p>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              updateSearchParams({ search: value });
            }}
            placeholder="Search for projects, users ..."
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : (projects || []).length === 0 && query.trim() ? (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(projects || []).map((project) => (
            <SearchProjectCard project={project} key={project?.id} />
          ))}
        </div>
      )}

      {!query.trim() && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Start searching
          </h3>
          <p className="text-gray-600">
            Enter a search term to find projects and developers
          </p>
        </div>
      )}
    </div>
  );
}
