'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { Project } from "@/types/types"

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.id}`}>
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="mb-5 w-full object-cover rounded-t-lg"
                    />
                    <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{project.description.slice(0, 100)}...</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.languages.map((lang) => (
                            <Badge key={lang} variant="secondary">{lang}</Badge>
                        ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="w-4 h-4 mr-1" />
                        {project.views} views
                    </div>
                </CardContent>
                {/* <CardFooter className="flex justify-between"> */}
                {/* <Button variant="outline" size="sm" asChild>
                    <Link href={project.sourceUrl}>
                        <Code className="w-4 h-4 mr-2" />
                        Source
                    </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                    <Link href={project.demoUrl}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                    </Link>
                </Button> */}
                {/* <Button variant="outline" size="sm" asChild> */}
                {/* <Link href={`/projects/${project.id}`}> */}
                {/* View Details */}
                {/* </Link> */}
                {/* </Button> */}
                {/* </CardFooter> */}
            </Card>
        </Link>
    )

};