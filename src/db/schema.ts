import { genUniqeId } from "@/lib/helpers";
import { sql } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";

/**
 * Users table - Authentication and profile management
 */
export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .unique()
      .$default(() => genUniqeId(16)),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique(),
    profile: text("profile"),
    role: text("role", { enum: ["user", "admin"] }).default("user"),
    googleId: text("google_id"),
    isVerified: integer("is_verified", { mode: "boolean" }).default(false),
    password: text("password"),
    verifyToken: text("verify_token"),
    verifyTokenExpiry: text("verify_token_expiry"),
    forgotPasswordToken: text("forgot_password_token"),
    forgotPasswordTokenExpiry: text("forgot_password_token_expiry"),
    createdAt: text("created_at").$default(() => sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").$default(() => sql`CURRENT_TIMESTAMP`),
  },
  (users) => ({
    uniqueEmail: uniqueIndex("users_email_idx").on(users.email),
    uniqueUserId: uniqueIndex("users_user_id_idx").on(users.userId),
  }),
);

/**
 * Projects table - Core entity for project showcase
 */
export const projects = sqliteTable(
  "projects",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    title: text("title").notNull(),
    description: text("description"),
    metadata: text("metadata"),
    status: text("status", { enum: ["draft", "published"] }).default("draft"),
    sourceUrl: text("source_url"),
    demoUrl: text("demo_url"),
    thumbnail: text("thumbnail"),
    screenshots: text("screenshots", { mode: "json" }), // JSON string
    platforms: text("platforms", { mode: "json" }), // JSON string
    languages: text("languages", { mode: "json" }), // JSON string
    technologyTypes: text("technology_types", { mode: "json" }), // JSON string ex. frontend, backend
    technologies: text("technologies", { mode: "json" }), // JSON string
    tags: text("tags", { mode: "json" }), // JSON string
    complexity: text("complexity", {
      enum: ["beginner", "intermediate", "advanced"],
    }).default("beginner"),
    views: integer("views").default(0),
    createdAt: text("created_at").$default(() => sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").$default(() => sql`CURRENT_TIMESTAMP`),
  },
  (projects) => ({
    userIndex: index("projects_user_id_idx").on(projects.userId),
    viewsIndex: index("projects_views_idx").on(projects.views),
    titleSearchIndex: index("projects_title_idx").on(projects.title),
  }),
);

/**
 * Likes table - Many-to-many relationship between users and projects
 */
export const likes = sqliteTable(
  "likes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    projectId: integer("project_id")
      .references(() => projects.id)
      .notNull(),
    createdAt: text("created_at").$default(() => sql`CURRENT_TIMESTAMP`),
  },
  (likes) => ({
    userProjectIndex: uniqueIndex("likes_user_project_idx").on(
      likes.userId,
      likes.projectId,
    ),
    projectIndex: index("likes_project_id_idx").on(likes.projectId),
  }),
);

/**
 * Comments table - Interaction tracking
 */
export const comments = sqliteTable(
  "comments",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    projectId: integer("project_id")
      .references(() => projects.id)
      .notNull(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    content: text("content").notNull(),
    createdAt: integer("created_at").$default(() => Date.now()),
  },
  (comments) => ({
    projectIndex: index("comments_project_id_idx").on(comments.projectId),
    userIndex: index("comments_user_id_idx").on(comments.userId),
  }),
);

/**
 * Media Table -> Storing Media link
 */
export const media = sqliteTable("media", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  type: text("type", {
    enum: ["image", "video", "audio", "document", "other"],
  }).default("image"),
  description: text("description"),
  createdAt: integer("created_at").$default(() => Date.now()),
});
