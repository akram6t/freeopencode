'use client'

import { useParams, useRouter } from "next/navigation"
import { ProjectForm } from "@/app/admin/projects/project-form";
import { Project } from "@/types/types"
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";
import { db } from "@/db/drizzle";

export default function ProjectCreatePage() {
  const params = useParams()
  const router = useRouter()

  const handleSubmit = async (data: Partial<Project>) => {
    console.log(data);
    
    try {
        // Create project
      router.push("/admin/projects")
    } catch (error) {
      console.error(error)
    }
  }

  const addsampledata = () => {
    // db.insert('')
  }

  return (
    <AdminPageWrapper
      navTitle="Create Project"
      actionButtonName={"genrate"}
      onActionButtonClick={addsampledata}
      breadcrumpItems={[
        { name: "Dashboard", href: "/admin" },
        { name: "Projects", href: "/admin/projects" },
        { name: "Create" },
      ]}>
      <ProjectForm
        initialData={undefined}
        onSubmit={handleSubmit}
      />
    </AdminPageWrapper>
  )
}