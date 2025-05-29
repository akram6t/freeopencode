"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  GridIcon,
  ListIcon,
  RefreshCw,
} from "lucide-react";

// Mock data - in a real application this would come from your API
const mockProjects = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  userId: Math.floor(Math.random() * 10) + 1,
  title: `Project ${i + 1}`,
  description: `This is a description for project ${i + 1}. It showcases various technologies and features.`,
  status: i % 3 === 0 ? "draft" : "published",
  sourceUrl: `https://github.com/user/project-${i + 1}`,
  demoUrl: `https://project-${i + 1}.example.com`,
  thumbnail: `https://picsum.photos/seed/project-${i + 1}/300/200`,
  platforms: ["web", "mobile", i % 2 === 0 ? "desktop" : ""].filter(Boolean),
  languages: [
    "JavaScript",
    "TypeScript",
    i % 3 === 0 ? "Python" : "",
    i % 4 === 0 ? "Rust" : "",
  ].filter(Boolean),
  technologyTypes: [
    i % 2 === 0 ? "frontend" : "backend",
    i % 5 === 0 ? "fullstack" : "",
  ].filter(Boolean),
  technologies: [
    "React",
    "Next.js",
    i % 3 === 0 ? "Node.js" : "",
    i % 4 === 0 ? "Express" : "",
  ].filter(Boolean),
  tags: [`tag-${(i % 5) + 1}`, `tag-${(i % 3) + 6}`],
  complexity:
    i % 3 === 0 ? "beginner" : i % 3 === 1 ? "intermediate" : "advanced",
  views: Math.floor(Math.random() * 1000),
  createdAt: new Date(
    Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000,
  ).toISOString(),
}));

export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pagination state
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 12;

  // View mode state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [complexity, setComplexity] = useState(
    searchParams.get("complexity") || "",
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

  // Filter projects based on search term and filters
  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = status === "" || project.status === status;
    const matchesComplexity =
      complexity === "" || project.complexity === complexity;

    return matchesSearch && matchesStatus && matchesComplexity;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "most-viewed":
        return b.views - a.views;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProjects.length / pageSize);
  const paginatedProjects = sortedProjects.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // Update search params
  const updateSearchParams = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    router.push(`?${newParams.toString()}`);
  };

  // Handle search
  const handleSearch = () => {
    updateSearchParams({ search: searchTerm || null, page: "1" });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatus("");
    setComplexity("");
    setSortBy("newest");
    router.push("/admin/projects");
  };

  // Complexity badge variant
  const getComplexityVariant = (complexity: string) => {
    switch (complexity) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "destructive";
      default:
        return "default";
    }
  };

  // Status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage all projects on the platform
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2 w-full sm:max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} variant="secondary">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex rounded-md border overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-none border-0"
                onClick={() => setViewMode("grid")}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-none border-0"
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>

            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value);
                updateSearchParams({ sort: value, page: "1" });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most-viewed">Most Viewed</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    setStatus("");
                    updateSearchParams({ status: null, page: "1" });
                  }}
                >
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setStatus("published");
                    updateSearchParams({ status: "published", page: "1" });
                  }}
                >
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setStatus("draft");
                    updateSearchParams({ status: "draft", page: "1" });
                  }}
                >
                  Draft
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Filter by Complexity</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    setComplexity("");
                    updateSearchParams({ complexity: null, page: "1" });
                  }}
                >
                  All Levels
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setComplexity("beginner");
                    updateSearchParams({ complexity: "beginner", page: "1" });
                  }}
                >
                  Beginner
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setComplexity("intermediate");
                    updateSearchParams({
                      complexity: "intermediate",
                      page: "1",
                    });
                  }}
                >
                  Intermediate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setComplexity("advanced");
                    updateSearchParams({ complexity: "advanced", page: "1" });
                  }}
                >
                  Advanced
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={resetFilters}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {filteredProjects.length} projects found
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={getStatusVariant(project.status)}>
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-1">
                    {project.title}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/projects/${project.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Project
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-2">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>👁️ {project.views} views</span>
                  <Badge variant={getComplexityVariant(project.complexity)}>
                    {project.complexity.charAt(0).toUpperCase() +
                      project.complexity.slice(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          {paginatedProjects.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {paginatedProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusVariant(project.status)}>
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/projects/${project.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/projects/edit/${project.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Project
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex gap-4">
                      <span>👁️ {project.views} views</span>
                      <span>
                        Created:{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Badge variant={getComplexityVariant(project.complexity)}>
                      {project.complexity.charAt(0).toUpperCase() +
                        project.complexity.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {paginatedProjects.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      )}

      {filteredProjects.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{(page - 1) * pageSize + 1}</strong> to{" "}
            <strong>
              {Math.min(page * pageSize, filteredProjects.length)}
            </strong>{" "}
            of <strong>{filteredProjects.length}</strong> projects
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${page - 1}${searchTerm ? `&search=${searchTerm}` : ""}${status ? `&status=${status}` : ""}${complexity ? `&complexity=${complexity}` : ""}${sortBy ? `&sort=${sortBy}` : ""}`}
                  aria-disabled={page <= 1}
                  tabIndex={page <= 1 ? -1 : undefined}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;

                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`?page=${pageNum}${searchTerm ? `&search=${searchTerm}` : ""}${status ? `&status=${status}` : ""}${complexity ? `&complexity=${complexity}` : ""}${sortBy ? `&sort=${sortBy}` : ""}`}
                      isActive={pageNum === page}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && page < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href={`?page=${page + 1}${searchTerm ? `&search=${searchTerm}` : ""}${status ? `&status=${status}` : ""}${complexity ? `&complexity=${complexity}` : ""}${sortBy ? `&sort=${sortBy}` : ""}`}
                  aria-disabled={page >= totalPages}
                  tabIndex={page >= totalPages ? -1 : undefined}
                  className={
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
