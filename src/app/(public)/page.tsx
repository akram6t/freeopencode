"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  Code,
  Search,
  ExternalLink,
  Github,
  ArrowRight,
} from "lucide-react";

// Mock project data for the showcase
const featuredProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with shopping cart, payment processing, and admin dashboard.",
    thumbnail:
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    platforms: ["web"],
    technologies: ["react", "nextjs", "mongodb"],
    complexity: "intermediate",
    demoUrl: "https://demo-ecommerce.example.com",
    sourceUrl: "https://github.com/example/ecommerce",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A Kanban-style task management application with drag-and-drop interface and team collaboration features.",
    thumbnail:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    platforms: ["web", "mobile"],
    technologies: ["vue", "firebase", "tailwind"],
    complexity: "beginner",
    demoUrl: "https://task-app.example.com",
    sourceUrl: "https://github.com/example/task-app",
  },
  {
    id: 3,
    title: "AI Image Generator",
    description:
      "An application that uses machine learning to generate unique images based on text prompts.",
    thumbnail:
      "https://images.unsplash.com/photo-1655720035861-ba4755e7658a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    platforms: ["web"],
    technologies: ["python", "tensorflow", "react"],
    complexity: "advanced",
    demoUrl: "https://ai-image.example.com",
    sourceUrl: "https://github.com/example/ai-image",
  },
  {
    id: 4,
    title: "Budget Tracker",
    description:
      "A personal finance application to track expenses, set budgets, and visualize spending patterns.",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    platforms: ["web", "mobile"],
    technologies: ["react", "nodejs", "postgresql"],
    complexity: "intermediate",
    demoUrl: "https://budget.example.com",
    sourceUrl: "https://github.com/example/budget",
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description:
      "A dashboard to manage and analyze social media accounts and engagement metrics.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    platforms: ["web"],
    technologies: ["angular", "express", "chart.js"],
    complexity: "intermediate",
    demoUrl: "https://social-dashboard.example.com",
    sourceUrl: "https://github.com/example/social-dashboard",
  },
  {
    id: 6,
    title: "Weather App",
    description:
      "A weather forecasting application with location-based services and interactive maps.",
    thumbnail:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    platforms: ["web", "mobile"],
    technologies: ["react", "openweatherapi", "leaflet"],
    complexity: "beginner",
    demoUrl: "https://weather.example.com",
    sourceUrl: "https://github.com/example/weather",
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [complexityFilter, setComplexityFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation delay for content to appear
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Filter projects based on search query and complexity filter
  const filteredProjects = featuredProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesComplexity =
      complexityFilter === "all" || project.complexity === complexityFilter;

    return matchesSearch && matchesComplexity;
  });

  return (
    <div
      className={`space-y-16 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Open Source Projects for Everyone
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground">
              Discover, learn, and build with our collection of free and
              open-source projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/projects">
                  Browse Projects <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contribute">
                  Contribute <Code className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <p className="text-muted-foreground max-w-2xl">
                Explore our curated collection of high-quality open-source
                projects
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search projects..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select
                  value={complexityFilter}
                  onValueChange={setComplexityFilter}
                >
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
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
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-secondary/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between gap-4">
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
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No projects found matching your criteria.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setComplexityFilter("");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-background to-background/50 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Open Source?</h2>
            <p className="text-muted-foreground">
              Discover the benefits of open source development and how it can
              help you grow as a developer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Learn by Doing</h3>
              <p className="text-muted-foreground">
                Explore real-world projects and learn by examining how
                experienced developers solve problems.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Build Your Portfolio</h3>
              <p className="text-muted-foreground">
                Contribute to projects and build a portfolio that demonstrates
                your skills to potential employers.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Join a Community</h3>
              <p className="text-muted-foreground">
                Connect with like-minded developers, collaborate on projects,
                and receive valuable feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of developers and start contributing to open
              source projects today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/projects">Explore Projects</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://github.com/freeopencode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
