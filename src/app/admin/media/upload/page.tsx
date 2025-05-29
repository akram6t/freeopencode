"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
  Upload,
  FileImage,
  FileVideo,
  FileAudio,
  FileText,
  File,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Form schema
const formSchema = z.object({
  file: z.any().refine((file) => file?.length > 0, {
    message: "Media file is required.",
  }),
  url: z.string().url().optional(),
  type: z.enum(["image", "video", "audio", "document", "other"]),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function UploadMediaPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadType, setUploadType] = useState<"file" | "url">("file");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "image",
      description: "",
      url: "",
    },
  });

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      form.setValue("file", files);
      
      // Auto-detect file type
      const fileType = files[0].type;
      let mediaType: "image" | "video" | "audio" | "document" | "other" = "other";
      
      if (fileType.startsWith("image/")) {
        mediaType = "image";
      } else if (fileType.startsWith("video/")) {
        mediaType = "video";
      } else if (fileType.startsWith("audio/")) {
        mediaType = "audio";
      } else if (
        fileType === "application/pdf" ||
        fileType.includes("document") ||
        fileType.includes("text/")
      ) {
        mediaType = "document";
      }
      
      form.setValue("type", mediaType);
      
      // Generate preview for images
      if (mediaType === "image") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        const event = new Event("change", { bubbles: true });
        fileInputRef.current.dispatchEvent(event);
      }
    }
  };

  // Handle URL input
  const handleUrlChange = (url: string) => {
    form.setValue("url", url);
    
    // Auto-detect media type from URL extension
    if (url) {
      const lowercaseUrl = url.toLowerCase();
      let mediaType: "image" | "video" | "audio" | "document" | "other" = "other";
      
      if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/.test(lowercaseUrl)) {
        mediaType = "image";
        setPreviewUrl(url);
      } else if (/\.(mp4|webm|ogg|mov|avi)$/.test(lowercaseUrl)) {
        mediaType = "video";
        setPreviewUrl(null);
      } else if (/\.(mp3|wav|ogg|flac)$/.test(lowercaseUrl)) {
        mediaType = "audio";
        setPreviewUrl(null);
      } else if (/\.(pdf|doc|docx|txt|rtf|xls|xlsx|ppt|pptx)$/.test(lowercaseUrl)) {
        mediaType = "document";
        setPreviewUrl(null);
      } else {
        setPreviewUrl(null);
      }
      
      form.setValue("type", mediaType);
    } else {
      setPreviewUrl(null);
    }
  };

  // Clear preview and form values
  const clearMedia = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    form.setValue("file", undefined);
    form.setValue("url", "");
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
      
      // In a real application, this would be an API call to upload the file
      // For file upload: create FormData and send to API
      // For URL: send URL directly to API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Media uploaded",
        description: "Media has been successfully uploaded.",
      });

      router.push("/admin/media");
    } catch (error) {
      console.error("Error uploading media:", error);
      toast({
        title: "Error",
        description: "Failed to upload media. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Media</h1>
          <p className="text-muted-foreground">
            Add new media to your library
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
              <div className="space-y-4">
                <div className="flex rounded-md overflow-hidden border">
                  <Button
                    type="button"
                    variant={uploadType === "file" ? "default" : "outline"}
                    className={`flex-1 rounded-none ${
                      uploadType === "file" ? "bg-primary" : "bg-background"
                    }`}
                    onClick={() => setUploadType("file")}
                  >
                    Upload File
                  </Button>
                  <Button
                    type="button"
                    variant={uploadType === "url" ? "default" : "outline"}
                    className={`flex-1 rounded-none ${
                      uploadType === "url" ? "bg-primary" : "bg-background"
                    }`}
                    onClick={() => setUploadType("url")}
                  >
                    From URL
                  </Button>
                </div>

                {uploadType === "file" ? (
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Upload File</FormLabel>
                        <FormControl>
                          <div
                            className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer ${
                              dragActive
                                ? "border-primary bg-primary/5"
                                : "border-input"
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <input
                              type="file"
                              className="hidden"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                              {...rest}
                            />
                            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-sm text-center font-medium">
                              Drag and drop a file here, or click to select
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 text-center">
                              Supports images, videos, audio, documents, and more
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
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
                )}

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Media Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
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
                        Select the type of media you are uploading
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
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Upload Media
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    clearMedia();
                  }}
                >
                  Reset
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

                <div className="relative min-h-[250px] rounded-md border bg-secondary/20 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full max-h-[250px] object-contain"
                        onError={() => setPreviewUrl(null)}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8"
                              onClick={clearMedia}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Clear preview</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      {getMediaTypeIcon(form.watch("type"))}
                      <p className="text-sm text-muted-foreground mt-2">
                        {form.watch("file") || form.watch("url")
                          ? `${
                              form.watch("type").charAt(0).toUpperCase() +
                              form.watch("type").slice(1)
                            } (No preview available)`
                          : "No media selected"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="rounded-md bg-muted p-4 text-sm">
                  <h4 className="font-medium mb-2">Upload Tips</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Maximum file size: 10MB</li>
                    <li>Supported image formats: JPG, PNG, GIF, WebP</li>
                    <li>Supported video formats: MP4, WebM</li>
                    <li>Supported audio formats: MP3, WAV</li>
                    <li>For best results, use high-quality images</li>
                    <li>
                      Add descriptive names to make media easier to find later
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}