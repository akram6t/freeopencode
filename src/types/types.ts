export type Role = 'user' | 'admin';

export interface User {
  id: number;
  userId: string;
  fullName: string;
  email: string;
  profile?: string | null;
  role: Role;
  googleId?: string | null;
  isVerified?: boolean;
  password?: string | null;
  verifyToken?: string | null;
  verifyTokenExpiry?: string | null;
  forgotPasswordToken?: string | null;
  forgotPasswordTokenExpiry?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type NewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUser = Partial<NewUser>;

export type ProjectStatus = 'draft' | 'published';
export type ComplexityType = 'beginner' | 'intermediate' | 'advanced';

export interface Project {
  id: number;
  userId: string;
  title: string;
  description: string;
  metadata?: string;
  status: ProjectStatus;
  sourceUrl?: string;
  demoUrl?: string;
  thumbnail: string;
  screenshots?: string[];
  platforms: string[];
  languages: string[];
  technologyTypes: string[];
  technologies: string[];
  tags?: string[];
  complexity: ComplexityType;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Like {
  id: number;
  projectId: number;
  userId: number;
  createdAt: number;
}

export interface Comment {
  id: number;
  projectId: number;
  userId: number;
  content: string;
  createdAt: number;
}