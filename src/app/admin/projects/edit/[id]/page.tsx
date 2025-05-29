"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Form schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  status: z.enum(["draft", "published"]),
  sourceUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  demoUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  thumbnail: z.string().optional(),
  platforms: z
    .array(z.string())
    .min(1, { message: "Select at least one platform." }),
  languages: z
    .array(z.string())
    .min(1, { message: "Select at least one language." }),
  technologyTypes: z
    .array(z.string())
    .min(1, { message: "Select at least one technology type." }),
  technologies: z
    .array(z.string())
    .min(1, { message: "Select at least one technology." }),
  tags: z.array(z.string()),
  complexity: z.enum(["beginner", "intermediate", "advanced"]),
});

type FormValues = z.infer<typeof formSchema>;

// Platform options
const platformOptions = [
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Desktop", value: "desktop" },
  { label: "Backend", value: "backend" },
  { label: "API", value: "api" },
];

// Language options
const languageOptions = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
  { label: "PHP", value: "php" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "Ruby", value: "ruby" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
];

// Technology type options
const technologyTypeOptions = [
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Database", value: "database" },
  { label: "DevOps", value: "devops" },
  { label: "Mobile", value: "mobile" },
  { label: "Desktop", value: "desktop" },
  { label: "AI/ML", value: "ai-ml" },
  { label: "Blockchain", value: "blockchain" },
];

// Technology options
const technologyOptions = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "Vue.js", value: "vuejs" },
  { label: "Angular", value: "angular" },
  { label: "Node.js", value: "nodejs" },
  { label: "Express", value: "express" },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "Laravel", value: "laravel" },
  { label: "Spring Boot", value: "spring-boot" },
  { label: "ASP.NET Core", value: "aspnet-core" },
  { label: "MongoDB", value: "mongodb" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MySQL", value: "mysql" },
  { label: "Redis", value: "redis" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "AWS", value: "aws" },
  { label: "Azure", value: "azure" },
  { label: "Google Cloud", value: "gcp" },
  { label: "TensorFlow", value: "tensorflow" },
  { label: "PyTorch", value: "pytorch" },
];

export default function EditProjectPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [screenshotInput, setScreenshotInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "draft",
      sourceUrl: "",
      demoUrl: "",
      thumbnail: "",
      platforms: [],
      languages: [],
      technologyTypes: [],
      technologies: [],
      tags: [],
      complexity: "beginner",
    },
  });

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Mock fetch for now
        // In a real app, this would be an API call like:
        // const response = await fetch(`/api/projects/${params.id}`);
        // const data = await response.json();
        
        // Simulate API call with a timeout
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data
        const projectData = {
          id: params.id,
          title: "Sample Project",
          description: "This is a sample project description for demonstration purposes.",
          status: "published",
          sourceUrl: "https://github.com/username/repo",
          demoUrl: "https://demo-project.com",
          thumbnail: "https://via.placeholder.com/300",
          platforms: ["web", "mobile"],
          languages: ["javascript", "typescript"],
          technologyTypes: ["frontend", "backend"],
          technologies: ["react", "nextjs", "nodejs"],
          tags: ["sample", "demo", "project"],
          complexity: "intermediate",
          screenshots: [
            "https://via.placeholder.com/800x600?text=Screenshot+1",
            "https://via.placeholder.com/800x600?text=Screenshot+2"
          ]
        };

        // Set form values
        form.reset({
          title: projectData.title,
          description: projectData.description,
          status: projectData.status as "draft" | "published",
          sourceUrl: projectData.sourceUrl,
          demoUrl: projectData.demoUrl,
          thumbnail: projectData.thumbnail,
          platforms: projectData.platforms,
          languages: projectData.languages,
          technologyTypes: projectData.technologyTypes,
          technologies: projectData.technologies,
          tags: projectData.tags,
          complexity: projectData.complexity as "beginner" | "intermediate" | "advanced",
        });

        // Set screenshots and tags
        setScreenshots(projectData.screenshots);
        setTags(projectData.tags);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        toast({
          title: "Error",
          description: "Failed to fetch project data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id, form, toast]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const finalData = {
        ...data,
        screenshots,
        tags: tags,
      };

      console.log("Form data:", finalData);
      // In a real app, this would be an API call like:
      // await fetch(`/api/projects/${params.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(finalData),
      // });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Project updated",
        description: `${data.title} has been successfully updated.`,
      });

      router.push("/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addScreenshot = () => {
    if (screenshotInput.trim() && !screenshots.includes(screenshotInput)) {
      setScreenshots([...screenshots, screenshotInput]);
      setScreenshotInput("");
    }
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      const newTags = [...tags, tagInput];
      setTags(newTags);
      form.setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
        <Separator />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="space-y-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground">
            Update project information
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Project" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a descriptive title for your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A detailed description of your project..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a comprehensive description of your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Draft projects are only visible to admins.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complexity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complexity</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select complexity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The skill level required for this project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="sourceUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source Code URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username/repo"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Link to the source code repository.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="demoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demo URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://my-project-demo.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Link to a live demo of the project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL for the main project thumbnail image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Screenshots</FormLabel>
                <div className="flex mt-2 gap-2">
                  <Input
                    placeholder="https://example.com/screenshot.jpg"
                    value={screenshotInput}
                    onChange={(e) => setScreenshotInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addScreenshot())
                    }
                  />
                  <Button type="button" onClick={addScreenshot}>
                    Add
                  </Button>
                </div>
                <FormDescription className="mt-1">
                  Add URLs for screenshots of your project.
                </FormDescription>

                {screenshots.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-secondary/50 rounded-md p-2"
                      >
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-12 h-12 object-cover rounded-md"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://via.placeholder.com/150")
                          }
                        />
                        <div className="flex-1 text-sm truncate">
                          {screenshot}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeScreenshot(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <FormField
                control={form.control}
                name="platforms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platforms</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={platformOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select platforms"
                      />
                    </FormControl>
                    <FormDescription>
                      Select all platforms this project is built for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Programming Languages</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={languageOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select languages"
                      />
                    </FormControl>
                    <FormDescription>
                      Select all programming languages used in this project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technologyTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technology Types</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={technologyTypeOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select technology types"
                      />
                    </FormControl>
                    <FormDescription>
                      Select the types of technologies used in this project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={technologyOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select technologies"
                      />
                    </FormControl>
                    <FormDescription>
                      Select all specific technologies and frameworks used.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Tags</FormLabel>
                <div className="flex mt-2 gap-2">
                  <Input
                    placeholder="Enter a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <FormDescription className="mt-1">
                  Add relevant tags to help users find your project.
                </FormDescription>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="pl-2 pr-1 py-1 flex items-center gap-1"
                      >
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTag(index)}
                          className="h-4 w-4 p-0 hover:bg-transparent"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {form.formState.errors.tags && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.tags.message}
                </p>
              )}

              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className="rounded-full bg-primary/10 p-2 inline-flex">
                      <Plus className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium text-sm">
                      Need Additional Fields?
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Contact the development team to request additional fields.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Project
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/projects")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}