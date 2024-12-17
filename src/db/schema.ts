import { genUniqeId } from '@/lib/helpers';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

/**
 * Users table for authentication and profile management
 * Consolidates user authentication and profile information
 */

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  userId: text('user_id').unique().notNull().$default(() => genUniqeId(12)),
  email: text('email').notNull().unique(),
  role: text('role').$type<"user" | "admin">().default('user'),

  // Consolidated authentication methods
  authProviders: text('auth_providers'), // JSON string to store multiple auth methods

  // Profile information
  profile: text('profile'), // JSON string to store flexible profile data

  // Authentication and security fields
  password: text('password'), // Hashed password
  verifyToken: text('verify_token'),
  verifyTokenExpiry: integer('verify_token_expiry'),
  isVerified: integer('is_verified').notNull().default(0),
  forgotPasswordToken: text('forgot_password_token'),
  forgotPasswordTokenExpiry: integer('forgot_password_token_expiry'),

  // Timestamps
  createdAt: text('created_at').$default(() => new Date().toISOString()),
  updatedAt: text('updated_at').$default(() => new Date().toISOString())
});

/**
 * Projects table - Core entity for project showcase
 * Combines author and project details
 */
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),

  // Author information (embedded instead of separate table)
  authorName: text('author_name').notNull(),
  authorEmail: text('author_email'),
  authorBio: text('author_bio'),
  authorWebsite: text('author_website'), // JSON string for social links

  // Project details
  sourceUrl: text('source_url').notNull(),
  demoUrl: text('demo_url'),
  thumbnail: text('thumbnail'),
  screenshorts: text('screenshots'), // JSON string for screenshots images

  // Technology and tags (using JSON for flexibility)
  technologies: text('technologies'), // JSON array of technology names
  tags: text('tags'), // JSON array of tags

  // Engagement metrics
  views: integer('views').default(0),
  // likesCount: integer('likes_count'),

  // Timestamps
  createdAt: text('created_at').$default(() => new Date().toISOString()),
  updatedAt: text('updated_at')
});

/**
 * Comments table - Simplified interaction tracking
 */
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: integer('project_id').references(() => projects.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at').$default(() => Date.now())
});

export const likes = sqliteTable('likes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => users.userId),
  projectId: integer('project_id').references(() => projects.id)
});

/**
 * Technology and Platform tracking (optional, can be managed via JSON in projects table)
 */
// export const technologies = sqliteTable('technologies', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull().unique(),
//   category: text('category'), // Frontend, Backend, Database, etc.
//   icon: text('icon')
// });