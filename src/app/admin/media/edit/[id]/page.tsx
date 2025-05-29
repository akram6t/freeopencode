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
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Loader2,
  FileImage,
  FileVideo,
  FileAudio,
  FileText,
  File,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Form schema
const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
  type: z.enum(["image", "video", "audio", "document", "other"]),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditMediaPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      type: "image",
      description: "",
    },
  });

  // Fetch media data
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Mock fetch for now
        // In a real app, this would be an API call like:
        // const response = await fetch(`/api/media/${params.id}`);
        // const data = await response.json();
        
        // Simulate API call with a timeout
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data based on ID
        const mediaId = Number(params.id);
        let mediaData;
        
        if (mediaId === 1) {
          mediaData = {
            id: 1,
            url: "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
            type: "image",
            description: "Project thumbnail",
          };
          setPreviewUrl("https://images.unsplash.com/photo-1682687982501-1e58ab814714");
        } else if (mediaId === 2) {
          mediaData = {
            id: 2,
            url: "https://example.com/videos/demo-video.mp4",
            type: "video",
            description: "Product demo video",
          };
        } else {
          mediaData = {
            id: mediaId,
            url: `https://example.com/media/item-${mediaId}.jpg`,
            type: mediaId % 2 === 0 ? "document" : "image",
            description: `Sample media item ${mediaId}`,
          };
          
          if (mediaId % 2 !== 0) {
            setPreviewUrl(`https://picsum.photos/id/${mediaId * 10}/800/600`);
          }
        }

        // Set form values
        form.reset({
          url: mediaData.url,
          type: mediaData.type as "image" | "video" | "audio" | "document" | "other",
          description: mediaData.description,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching media:", error);
        toast({
          title: "Error",
          description: "Failed to fetch media data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [params.id, form, toast]);

  // Handle URL input
  const handleUrlChange = (url: string) => {
    form.setValue("url", url);
    
    // Update preview for images
    if (url && form.getValues("type") === "image") {
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // Handle type change
  const handleTypeChange = (type: string) => {
    form.setValue("type", type as "image" | "video" | "audio" | "document" | "other");
    
    // Update preview for images
    if (type === "image" && form.getValues("url")) {
      setPreviewUrl(form.getValues("url"));
    } else {
      setPreviewUrl(null);
    }
  };

  // Get icon based on media type
  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="h-4 w-4" />;
      case "video":
        return <FileVideo className="h-4 w-4" />;
      case "audio":
        return <FileAudio className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      console.log("Form data:", data);
      
      // In a real application, this would be an API call to update the media
      // await fetch(`/api/media/${params.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Media updated",
        description: "Media has been successfully updated.",
      });

      router.push("/admin/media");
    } catch (error) {
      console.error("Error updating media:", error);
      toast({
        title: "Error",
        description: "Failed to update media. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div>
            <Skeleton className="h-[300px] w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Media</h1>
          <p className="text-muted-foreground">
            Update media information
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/media">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Media Library
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleUrlChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a direct URL to the media file
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTypeChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select media type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the type of media
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
                        placeholder="Enter a description for this media..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add a descriptive name or caption for this media
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Media
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/media")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Media Preview</h3>
                  <p className="text-sm text-muted-foreground">
                    Preview how your media will appear
                  </p>
                </div>

                <div className="min-h-[250px] rounded-md border bg-secondary/20 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full max-h-[250px] object-contain"
                      onError={() => setPreviewUrl(null)}
                    />
                  ) : (
                    <div className="text-center p-6">
                      {getMediaTypeIcon(form.watch("type"))}
                      <p className="text-sm text-muted-foreground mt-2">
                        {form.watch("type").charAt(0).toUpperCase() +
                          form.watch("type").slice(1)}{" "}
                        (No preview available)
                      </p>
                    </div>
                  )}
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium mb-2 text-sm">Media Information</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-mono">{params.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="capitalize">{form.watch("type")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Added:</span>
                      <span>
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}