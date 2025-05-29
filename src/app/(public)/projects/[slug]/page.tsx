"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Github,
  ExternalLink,
  Eye,
  Code,
  Share2,
  BookOpen,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

// Mock projects data for demo purposes
const mockProjects = [
  {
    id: 1,
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with shopping cart, payment processing, and admin dashboard. This project demonstrates modern web development practices with a focus on user experience and performance.",
    longDescription: `
      <p>This e-commerce platform is built with modern web technologies to provide a comprehensive solution for online stores. It includes key features such as:</p>

      <ul>
        <li>User authentication and profile management</li>
        <li>Product catalog with categories, filters, and search functionality</li>
        <li>Shopping cart and wishlist management</li>
        <li>Secure checkout with multiple payment options</li>
        <li>Order tracking and history</li>
        <li>Admin dashboard for inventory and order management</li>
        <li>Analytics and reporting tools</li>
        <li>Mobile-responsive design</li>
      </ul>

      <p>The frontend is built with React and Next.js, providing a fast and responsive user interface. The backend uses Node.js with Express, connected to a MongoDB database for flexible data storage.</p>

      <p>The payment processing system integrates with Stripe to handle secure transactions, and the platform includes comprehensive error handling and security measures to protect user data.</p>

      <h3>Getting Started</h3>

      <p>To set up this project locally, follow these steps:</p>

      <ol>
        <li>Clone the repository from GitHub</li>
        <li>Install dependencies using npm or yarn</li>
        <li>Set up environment variables for database connection and API keys</li>
        <li>Run the development server</li>
        <li>Access the application at localhost:3000</li>
      </ol>

      <p>Detailed setup instructions are available in the README file in the repository.</p>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Homepage with featured products",
      },
      {
        url: "https://images.unsplash.com/photo-1556741533-974f8e62a92d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Product details page",
      },
      {
        url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Shopping cart interface",
      },
      {
        url: "https://images.unsplash.com/photo-1556742049-0a8d311a86e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Admin dashboard",
      },
    ],
    platforms: ["web"],
    languages: ["javascript", "typescript"],
    technologies: ["react", "nextjs", "mongodb", "tailwind", "stripe"],
    technologyTypes: ["frontend", "backend", "database"],
    complexity: "intermediate",
    demoUrl: "https://demo-ecommerce.example.com",
    sourceUrl: "https://github.com/example/ecommerce",
    status: "published",
    views: 1240,
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-09-22T14:45:00Z",
    comments: 24,
  },
  {
    id: 2,
    slug: "task-management-app",
    title: "Task Management App",
    description:
      "A Kanban-style task management application with drag-and-drop interface and team collaboration features.",
    longDescription: `
      <p>This task management application helps teams organize and track their work using a Kanban-style board system. The app is designed for simplicity and ease of use while providing powerful project management capabilities.</p>

      <p>Key features include:</p>
      <ul>
        <li>Multiple project boards with customizable columns</li>
        <li>Intuitive drag-and-drop interface for task management</li>
        <li>Task creation with descriptions, due dates, labels, and assignees</li>
        <li>Team collaboration with comments and activity tracking</li>
        <li>File attachments and integrations with cloud storage</li>
        <li>Notifications and reminders for upcoming deadlines</li>
        <li>Reporting and progress tracking</li>
      </ul>

      <p>The application is built with Vue.js for the frontend to create a responsive and interactive UI. Firebase is used for the backend, providing real-time updates, authentication, and data storage. The styling is implemented with Tailwind CSS for a clean and modern look.</p>

      <h3>Implementation Details</h3>

      <p>The application uses Vuex for state management, allowing for consistent data flow throughout the application. Firebase Firestore provides real-time synchronization so that changes made by one user immediately appear for all team members.</p>

      <p>The drag-and-drop functionality is implemented using Vue.Draggable, which provides a smooth user experience while maintaining data integrity. Authentication is handled through Firebase Authentication, supporting email/password login as well as OAuth providers.</p>

      <h3>Deployment</h3>

      <p>The application is deployed using Firebase Hosting for fast, secure hosting with global CDN distribution. Continuous integration and deployment are set up through GitHub Actions to automate the build and release process.</p>
    `,
    thumbnail:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1484480549072-d23a90b27dde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Project dashboard",
      },
      {
        url: "https://images.unsplash.com/photo-1484507175567-a114f764f78b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Kanban board view",
      },
      {
        url: "https://images.unsplash.com/photo-1484497995352-c189a152981e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        caption: "Task details popup",
      },
    ],
    platforms: ["web", "mobile"],
    languages: ["javascript", "typescript"],
    technologies: ["vue", "firebase", "tailwind"],
    technologyTypes: ["frontend", "backend", "database"],
    complexity: "beginner",
    demoUrl: "https://task-app.example.com",
    sourceUrl: "https://github.com/example/task-app",
    status: "published",
    views: 890,
    createdAt: "2023-08-10T08:45:00Z",
    updatedAt: "2023-10-05T11:20:00Z",
    comments: 12,
  },
];

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  // In a real app, you would fetch the project data from an API
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Simulate API call with a timeout
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Find project by slug
        const foundProject = mockProjects.find((p) => p.slug === p.slug);

        if (foundProject) {
          setProject(foundProject);
        } else {
          // Project not found, redirect to projects page
          router.push("/projects");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.slug, router]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get complexity badge color
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "beginner":
        return "border-green-500/50 text-green-500";
      case "intermediate":
        return "border-yellow-500/50 text-yellow-500";
      case "advanced":
        return "border-red-500/50 text-red-500";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />

            <div className="flex flex-wrap gap-2 mt-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>

            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>

          <div>
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/projects">Browse Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/projects" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            {project.title}
          </h1>

          <p className="text-muted-foreground mb-6">{project.description}</p>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.platforms.map((platform: string) => (
              <Badge
                key={`platform-${platform}`}
                variant="secondary"
                className="capitalize"
              >
                {platform}
              </Badge>
            ))}

            <Badge
              variant="outline"
              className={`capitalize ${getComplexityColor(project.complexity)}`}
            >
              {project.complexity}
            </Badge>

            {project.languages.map((language: string) => (
              <Badge
                key={`lang-${language}`}
                variant="outline"
                className="capitalize"
              >
                {language}
              </Badge>
            ))}
          </div>

          {/* Project Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {project.views} views
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Updated {formatDate(project.updatedAt)}
            </div>
            <div className="flex items-center">
              <MessageSquare className="mr-1 h-4 w-4" />
              {project.comments} comments
            </div>
          </div>

          {/* Project Screenshot Slider */}
          <div className="mb-8">
            <div className="relative rounded-lg overflow-hidden bg-black/5 aspect-video">
              {project.screenshots && project.screenshots.length > 0 ? (
                <>
                  <img
                    src={project.screenshots[currentScreenshot].url}
                    alt={
                      project.screenshots[currentScreenshot].caption ||
                      project.title
                    }
                    className="w-full h-full object-contain"
                  />

                  {project.screenshots.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={() =>
                          setCurrentScreenshot((prev) =>
                            prev === 0
                              ? project.screenshots.length - 1
                              : prev - 1,
                          )
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={() =>
                          setCurrentScreenshot((prev) =>
                            prev === project.screenshots.length - 1
                              ? 0
                              : prev + 1,
                          )
                        }
                      >
                        <ChevronLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    </>
                  )}

                  {/* Caption */}
                  {project.screenshots[currentScreenshot].caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 text-sm text-center">
                      {project.screenshots[currentScreenshot].caption}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    No screenshots available
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {project.screenshots && project.screenshots.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {project.screenshots.map((screenshot: any, index: number) => (
                  <button
                    key={index}
                    className={`relative rounded-md overflow-hidden border-2 h-16 w-24 flex-shrink-0 transition-all ${currentScreenshot === index ? "border-primary" : "border-transparent hover:border-primary/50"}`}
                    onClick={() => setCurrentScreenshot(index)}
                  >
                    <img
                      src={screenshot.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Content Tabs */}
          <Tabs
            defaultValue="overview"
            className="mt-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div
                className="prose dark:prose-invert max-w-none prose-img:rounded-lg prose-headings:scroll-m-20"
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
              />
            </TabsContent>

            <TabsContent value="installation" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Installation Instructions</h3>
                <p>Follow these steps to set up the project locally:</p>
                <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto">
                  <code>{`# Clone the repository
git clone ${project.sourceUrl}.git
cd ${project.slug}

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env.local

# Start the development server
npm run dev
# or
yarn dev`}</code>
                </pre>
                <p>
                  Make sure you have Node.js (version 14 or higher) and npm/yarn
                  installed on your machine.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="documentation" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Documentation</h3>
                <p>
                  For detailed documentation, please refer to the README file in
                  the repository or visit the project wiki.
                </p>
                <p>The project is structured as follows:</p>
                <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto">
                  <code>{`${project.slug}/
├── public/          # Static assets
├── src/             # Source code
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── styles/      # CSS styles
│   ├── utils/       # Utility functions
│   └── ...
├── tests/           # Test files
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation`}</code>
                </pre>
                <p>
                  For more information or if you have questions, please open an
                  issue on GitHub.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button className="w-full" asChild>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </a>
                </Button>
              </div>

              <Separator />

              {/* Share Button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                      }
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Project
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy link to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Technologies</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Technology Types
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologyTypes.map((type: string) => (
                      <Badge
                        key={`type-${type}`}
                        variant="outline"
                        className="capitalize"
                      >
                        {type.replace("-", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <Badge
                        key={`tech-${tech}`}
                        className="capitalize bg-primary/10 text-primary hover:bg-primary/20 border-none"
                      >
                        {tech.replace("-", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Projects */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Related Projects</h3>

              <div className="space-y-4">
                {mockProjects
                  .filter((p) => p.id !== project.id)
                  .slice(0, 2)
                  .map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      href={`/projects/${relatedProject.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3 items-start">
                        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={relatedProject.thumbnail}
                            alt={relatedProject.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            {relatedProject.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedProject.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/projects">Browse All Projects</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
