"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Search,
  Filter,
  FileImage,
  FileVideo,
  FileAudio,
  FileText,
  File,
  Trash2,
  Edit,
  Eye,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Media types from schema
const mediaTypes = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "document", label: "Document" },
  { value: "other", label: "Other" },
];

// Mock data for media items
const mockMediaItems = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
    type: "image",
    description: "Project thumbnail",
    createdAt: "2023-08-15T14:23:45Z",
  },
  {
    id: 2,
    url: "https://example.com/videos/demo-video.mp4",
    type: "video",
    description: "Product demo video",
    createdAt: "2023-08-14T10:12:32Z",
  },
  {
    id: 3,
    url: "https://example.com/audio/podcast-episode.mp3",
    type: "audio",
    description: "Podcast episode about coding",
    createdAt: "2023-08-12T08:45:19Z",
  },
  {
    id: 4,
    url: "https://example.com/documents/user-guide.pdf",
    type: "document",
    description: "User guide PDF",
    createdAt: "2023-08-10T15:30:00Z",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1682687982107-14e566669a69",
    type: "image",
    description: "Project screenshot",
    createdAt: "2023-08-09T11:20:45Z",
  },
  {
    id: 6,
    url: "https://example.com/other/custom-font.ttf",
    type: "other",
    description: "Custom font file",
    createdAt: "2023-08-08T09:15:32Z",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1682687982093-4e444240e154",
    type: "image",
    description: "Blog post header",
    createdAt: "2023-08-07T16:42:10Z",
  },
  {
    id: 8,
    url: "https://example.com/videos/tutorial.mp4",
    type: "video",
    description: "Tutorial video",
    createdAt: "2023-08-06T13:25:48Z",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1682687981922-7eeb57df45f6",
    type: "image",
    description: "Team photo",
    createdAt: "2023-08-05T10:18:27Z",
  },
  {
    id: 10,
    url: "https://example.com/documents/technical-spec.docx",
    type: "document",
    description: "Technical specification",
    createdAt: "2023-08-04T08:05:14Z",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1682687981674-0927add186f0",
    type: "image",
    description: "Product image",
    createdAt: "2023-08-03T14:32:51Z",
  },
  {
    id: 12,
    url: "https://example.com/audio/interview.mp3",
    type: "audio",
    description: "Developer interview",
    createdAt: "2023-08-02T11:47:23Z",
  },
];

export default function MediaPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination settings
  const itemsPerPage = 10;
  const totalItems = mockMediaItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Filter and search media items
  const filteredMedia = mockMediaItems
    .filter((media) => {
      // Apply type filter
      if (typeFilter && media.type !== typeFilter) return false;

      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          media.description.toLowerCase().includes(query) ||
          media.url.toLowerCase().includes(query)
        );
      }

      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  // Get current page items
  const currentItems = filteredMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset to first page when filters change
  const handleFilterChange = (type: string) => {
    setTypeFilter(type);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Handle media deletion
  const handleDeleteMedia = async () => {
    if (!mediaToDelete) return;

    setIsDeleting(true);

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Media deleted",
        description: "The media item has been successfully deleted.",
      });

      // For this mock, we're not actually removing from the array
      // In a real app, this would be handled by refetching data or updating state

      setMediaToDelete(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the media item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Get the appropriate icon for media type
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

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">
            Manage your media files and assets
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/media/upload">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Media
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search media..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="flex w-full sm:w-auto items-center gap-2">
          <Select value={typeFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All media types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>All media types</SelectItem>
              {mediaTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Media Assets</CardTitle>
          <CardDescription>{filteredMedia.length} items found</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Type</TableHead>
                  <TableHead className="w-[250px]">Preview</TableHead>
                  <TableHead className="w-[300px]">Description</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="w-[150px]">Created At</TableHead>
                  <TableHead className="w-[100px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((media) => (
                    <TableRow key={media.id}>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          {getMediaTypeIcon(media.type)}
                          <span className="capitalize">{media.type}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="relative h-16 w-32 overflow-hidden rounded-md border">
                          {media.type === "image" ? (
                            <img
                              src={media.url}
                              alt={media.description}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://via.placeholder.com/150";
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-secondary/50">
                              {getMediaTypeIcon(media.type)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {media.description}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <span className="text-xs text-muted-foreground">
                          {media.url}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(media.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Open menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-more-horizontal"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => window.open(media.url, "_blank")}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/admin/media/edit/${media.id}`)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setMediaToDelete(media.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No media items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">
            Showing {currentItems.length} of {filteredMedia.length} items
          </div>
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
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
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
                        <PaginationEllipsis />
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
        </CardFooter>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={mediaToDelete !== null}
        onOpenChange={(open) => !open && setMediaToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              media file from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMedia}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
