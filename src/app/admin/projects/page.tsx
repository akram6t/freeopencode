'use client'

import { useState } from "react"
import { ProjectTable } from "./project-table"
import { useRouter } from "next/navigation"
import { Project } from "@/types/types";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper"

export default function ProjectsPage() {
    const router = useRouter()
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            userId: "user123",
            title: "E-commerce Platform",
            description: "A full-stack e-commerce solution with user authentication, product management, and payment integration.",
            status: "published",
            sourceUrl: "https://github.com/example/e-commerce",
            demoUrl: "https://demo-ecommerce.example.com",
            thumbnail: "https://picsum.photos/seed/1/300/200",
            screenshots: [
                "https://picsum.photos/seed/11/800/600",
                "https://picsum.photos/seed/12/800/600",
                "https://picsum.photos/seed/13/800/600"
            ],
            platforms: ["Web", "Mobile"],
            languages: ["TypeScript", "JavaScript"],
            technologyTypes: ["Frontend", "Backend"],
            technologies: ["React", "Node.js", "MongoDB"],
            tags: ["e-commerce", "full-stack", "payment"],
            complexity: "intermediate",
            views: 1500,
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-03-10T15:30:00Z"
        },
        {
            id: 2,
            userId: "user456",
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates and team features.",
            status: "draft",
            sourceUrl: "https://github.com/example/task-app",
            demoUrl: "https://task-app-demo.example.com",
            thumbnail: "https://picsum.photos/seed/2/300/200",
            screenshots: [
                "https://picsum.photos/seed/21/800/600",
                "https://picsum.photos/seed/22/800/600"
            ],
            platforms: ["Web"],
            languages: ["JavaScript"],
            technologyTypes: ["Frontend"],
            technologies: ["Vue.js", "Firebase"],
            tags: ["productivity", "real-time", "collaboration"],
            complexity: "beginner",
            views: 850,
            createdAt: "2024-02-20T09:15:00Z",
            updatedAt: "2024-03-15T11:20:00Z"
        },
        {
            id: 3,
            userId: "user789",
            title: "AI Image Generator",
            description: "An advanced AI-powered image generation tool using deep learning models.",
            status: "published",
            sourceUrl: "https://github.com/example/ai-image-gen",
            demoUrl: "https://ai-image-gen.example.com",
            thumbnail: "https://picsum.photos/seed/3/300/200",
            screenshots: [
                "https://picsum.photos/seed/31/800/600",
                "https://picsum.photos/seed/32/800/600",
                "https://picsum.photos/seed/33/800/600"
            ],
            platforms: ["Web", "Desktop"],
            languages: ["Python", "TypeScript"],
            technologyTypes: ["AI/ML", "Frontend"],
            technologies: ["TensorFlow", "React", "FastAPI"],
            tags: ["ai", "machine-learning", "image-processing"],
            complexity: "advanced",
            views: 2300,
            createdAt: "2024-03-01T14:20:00Z",
            updatedAt: "2024-03-18T16:45:00Z"
        },
    ])

    const handleCreate = () => {
        router.push("/admin/projects/create")
    }

    const handleEdit = (project: Project) => {
        router.push(`/admin/projects/${project.id}/edit`)
    }

    const handleDelete = async (projectId: number) => {
        // Implementation
    }

    return (
        <AdminPageWrapper
            actionButtonName="Add Project"
            onActionButtonClick={handleCreate}
            navTitle="Projects"
            breadcrumpItems={[
                { name: "Dashboard", href: "/admin" },
                { name: "Projects" }
            ]}
        >
            <div className="h-10" />
            <ProjectTable
                projects={projects}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />


        </AdminPageWrapper>

    )
}