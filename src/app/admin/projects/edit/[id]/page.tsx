'use client'

import { useParams, useRouter } from "next/navigation"
import { ProjectForm } from "@/app/admin/projects/project-form";
import { Project } from "@/types/types"
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";

export default function ProjectFormPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id;

  const handleSubmit = async (data: Partial<Project>) => {
    try {
      
        // Update project
      
      router.push("/admin/projects")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AdminPageWrapper
      navTitle="Edit Project"
      actionButtonName="Save Changes"
      onActionButtonClick={() => {}}
      breadcrumpItems={[
        { name: "Dashboard", href: "/admin" },
        { name: "Projects", href: "/admin/projects" },
        { name: projectId as string },
      ]}>
      <ProjectForm
        initialData={{

        }}
        onSubmit={handleSubmit}
      />
    </AdminPageWrapper>
  )
}