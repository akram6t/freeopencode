"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw 
} from "lucide-react";

// Mock data - in a real application this would come from your API
const mockUsers = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  userId: `user_${Math.random().toString(36).substring(7)}`,
  fullName: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 10 === 0 ? "admin" : "user",
  isVerified: i % 3 === 0,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
}));

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Pagination state
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 10;
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [role, setRole] = useState(searchParams.get("role") || "");
  const [verified, setVerified] = useState(searchParams.get("verified") || "");
  
  // Filter users based on search term and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = role === "" || user.role === role;
    
    const matchesVerified = verified === "" || 
      (verified === "verified" && user.isVerified) ||
      (verified === "unverified" && !user.isVerified);
    
    return matchesSearch && matchesRole && matchesVerified;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);
  
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
    setRole("");
    setVerified("");
    router.push("/admin/users");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/users/create">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 w-full sm:max-w-sm">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
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
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {
                setRole("");
                updateSearchParams({ role: null, page: "1" });
              }}>
                All Roles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setRole("admin");
                updateSearchParams({ role: "admin", page: "1" });
              }}>
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setRole("user");
                updateSearchParams({ role: "user", page: "1" });
              }}>
                User
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>Filter by Verification</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {
                setVerified("");
                updateSearchParams({ verified: null, page: "1" });
              }}>
                All Users
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setVerified("verified");
                updateSearchParams({ verified: "verified", page: "1" });
              }}>
                Verified
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setVerified("unverified");
                updateSearchParams({ verified: "unverified", page: "1" });
              }}>
                Unverified
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" onClick={resetFilters}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-xs text-muted-foreground">ID: {user.userId}</div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "destructive" : "default"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isVerified ? "success" : "secondary"}>
                    {user.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}/edit`}>
                          Edit User
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {paginatedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{(page - 1) * pageSize + 1}</strong> to{" "}
            <strong>{Math.min(page * pageSize, filteredUsers.length)}</strong> of{" "}
            <strong>{filteredUsers.length}</strong> users
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href={`?page=${page - 1}${searchTerm ? `&search=${searchTerm}` : ""}${role ? `&role=${role}` : ""}${verified ? `&verified=${verified}` : ""}`}
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
                      href={`?page=${pageNum}${searchTerm ? `&search=${searchTerm}` : ""}${role ? `&role=${role}` : ""}${verified ? `&verified=${verified}` : ""}`}
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
                  href={`?page=${page + 1}${searchTerm ? `&search=${searchTerm}` : ""}${role ? `&role=${role}` : ""}${verified ? `&verified=${verified}` : ""}`}
                  aria-disabled={page >= totalPages}
                  tabIndex={page >= totalPages ? -1 : undefined}
                  className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}