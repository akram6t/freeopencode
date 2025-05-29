"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  Github,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Import mock projects data
import { mockProjects } from "@/data/mockProjects";

// Extract filter options from the projects data
const platforms = Array.from(
  new Set(mockProjects.flatMap((project) => project.platforms)),
);
const languages = Array.from(
  new Set(mockProjects.flatMap((project) => project.languages)),
);
const technologies = Array.from(
  new Set(mockProjects.flatMap((project) => project.technologies)),
);
const technologyTypes = Array.from(
  new Set(mockProjects.flatMap((project) => project.technologyTypes)),
);
const complexityLevels = ["beginner", "intermediate", "advanced"];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Filter states
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTechTypes, setSelectedTechTypes] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    [],
  );
  const [selectedComplexity, setSelectedComplexity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const itemsPerPage = 6;

  // Update isMobile state based on window size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Apply filters and search to projects
  const filteredProjects = mockProjects.filter((project) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Platform filter
    const matchesPlatform =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.some((platform) =>
        project.platforms.includes(platform),
      );

    // Language filter
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((language) =>
        project.languages.includes(language),
      );

    // Technology type filter
    const matchesTechType =
      selectedTechTypes.length === 0 ||
      selectedTechTypes.some((type) => project.technologyTypes.includes(type));

    // Technology filter
    const matchesTechnology =
      selectedTechnologies.length === 0 ||
      selectedTechnologies.some((tech) => project.technologies.includes(tech));

    // Complexity filter
    const matchesComplexity =
      selectedComplexity === "all" || project.complexity === selectedComplexity;

    return (
      matchesSearch &&
      matchesPlatform &&
      matchesLanguage &&
      matchesTechType &&
      matchesTechnology &&
      matchesComplexity
    );
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.id - a.id; // Newer projects have higher IDs in our mock data
      case "oldest":
        return a.id - b.id;
      case "most-viewed":
        return b.views - a.views;
      case "least-viewed":
        return a.views - b.views;
      case "a-z":
        return a.title.localeCompare(b.title);
      case "z-a":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProjects.slice(indexOfFirstItem, indexOfLastItem);

  // Toggle filter selection
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform],
    );
    setCurrentPage(1);
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language],
    );
    setCurrentPage(1);
  };

  const toggleTechType = (type: string) => {
    setSelectedTechTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
    setCurrentPage(1);
  };

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedLanguages([]);
    setSelectedTechTypes([]);
    setSelectedTechnologies([]);
    setSelectedComplexity("all");
    setSearchQuery("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // Render filter content based on device (mobile/desktop)
  const renderFilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Platforms</h3>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center">
              <Checkbox
                id={`platform-${platform}`}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={() => togglePlatform(platform)}
              />
              <Label
                htmlFor={`platform-${platform}`}
                className="ml-2 capitalize cursor-pointer"
              >
                {platform}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Programming Languages</h3>
        <div className="space-y-2">
          {languages.map((language) => (
            <div key={language} className="flex items-center">
              <Checkbox
                id={`language-${language}`}
                checked={selectedLanguages.includes(language)}
                onCheckedChange={() => toggleLanguage(language)}
              />
              <Label
                htmlFor={`language-${language}`}
                className="ml-2 capitalize cursor-pointer"
              >
                {language}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Technology Types</h3>
        <div className="space-y-2">
          {technologyTypes.map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox
                id={`tech-type-${type}`}
                checked={selectedTechTypes.includes(type)}
                onCheckedChange={() => toggleTechType(type)}
              />
              <Label
                htmlFor={`tech-type-${type}`}
                className="ml-2 capitalize cursor-pointer"
              >
                {type.replace("-", " ")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Technologies</h3>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
          {technologies.map((tech) => (
            <div key={tech} className="flex items-center">
              <Checkbox
                id={`tech-${tech}`}
                checked={selectedTechnologies.includes(tech)}
                onCheckedChange={() => toggleTechnology(tech)}
              />
              <Label
                htmlFor={`tech-${tech}`}
                className="ml-2 capitalize cursor-pointer"
              >
                {tech.replace("-", " ")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Complexity</h3>
        <Select
          value={selectedComplexity}
          onValueChange={(value) => {
            setSelectedComplexity(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any level</SelectItem>
            {complexityLevels.map((level) => (
              <SelectItem key={level} value={level} className="capitalize">
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // Filter count for badge
  const activeFilterCount = [
    selectedPlatforms.length,
    selectedLanguages.length,
    selectedTechTypes.length,
    selectedTechnologies.length,
    selectedComplexity ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Projects</h1>
        <p className="text-muted-foreground">
          Explore our collection of open-source projects
        </p>
      </div>

      {/* Search and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block w-64 sticky top-24 self-start">
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Filters</h2>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {renderFilterContent()}
            </ScrollArea>
          </div>
        </div>

        {/* Mobile Filter Drawer/Sheet */}
        {isMobile ? (
          <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="md:hidden w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Refine your project search
                </DrawerDescription>
              </DrawerHeader>
              <ScrollArea className="p-4 max-h-[70vh]">
                {renderFilterContent()}
              </ScrollArea>
              <DrawerFooter className="pt-2">
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
                <DrawerClose asChild>
                  <Button>Apply Filters</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your project search</SheetDescription>
              </SheetHeader>
              <ScrollArea className="my-4 h-[calc(100vh-180px)]">
                {renderFilterContent()}
              </ScrollArea>
              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Clear All Filters
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="w-full sm:w-auto">Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                  <SelectItem value="least-viewed">Least Viewed</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applied Filters */}
          {activeFilterCount > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                {selectedPlatforms.map((platform) => (
                  <Badge
                    key={`badge-platform-${platform}`}
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    {platform}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePlatform(platform)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                  </Badge>
                ))}
                {selectedLanguages.map((language) => (
                  <Badge
                    key={`badge-language-${language}`}
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    {language}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleLanguage(language)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                  </Badge>
                ))}
                {selectedTechTypes.map((type) => (
                  <Badge
                    key={`badge-type-${type}`}
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    {type.replace("-", " ")}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleTechType(type)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                  </Badge>
                ))}
                {selectedTechnologies.map((tech) => (
                  <Badge
                    key={`badge-tech-${tech}`}
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    {tech.replace("-", " ")}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleTechnology(tech)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                  </Badge>
                ))}
                {selectedComplexity && (
                  <Badge
                    key="badge-complexity"
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center gap-1"
                  >
                    {selectedComplexity}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedComplexity("")}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/50"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block h-48 overflow-hidden relative"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap">
                    {project.platforms.map((platform) => (
                      <Badge
                        key={platform}
                        variant="secondary"
                        className="bg-background/80 backdrop-blur-sm"
                      >
                        {platform}
                      </Badge>
                    ))}
                    <Badge
                      variant="outline"
                      className={`
                        capitalize backdrop-blur-sm
                        ${project.complexity === "beginner" ? "border-green-500/50 text-green-500" : ""}
                        ${project.complexity === "intermediate" ? "border-yellow-500/50 text-yellow-500" : ""}
                        ${project.complexity === "advanced" ? "border-red-500/50 text-red-500" : ""}
                      `}
                    >
                      {project.complexity}
                    </Badge>
                  </div>
                </Link>
                <CardContent className="p-6 flex-grow">
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-secondary/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="bg-secondary/50">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between gap-4 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" /> Source
                    </a>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/projects/${project.slug}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {currentItems.length === 0 && (
            <div className="text-center py-12 border rounded-lg bg-card/50">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredProjects.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      aria-disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis where pages are skipped
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <PaginationItem key={`ellipsis-${page}`}>
                            <span className="px-4 py-2">...</span>
                          </PaginationItem>
                        );
                      }

                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                      aria-disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
