import { notFound } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Code, ExternalLink } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

interface Project {
  id: number;
  title: string;
  description: string;
  sourceUrl: string;
  demoUrl: string;
  thumbnail: string;
  screenshots: string[];
  platforms: string[];
  languages: string[];
  technologies: string[];
  tags: string[];
  complexity: string;
  views: number;
}

async function getProject(id: string): Promise<Project | undefined> {
  // This would be replaced with an actual API call or database query
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, product management, and payment integration.",
      sourceUrl: "https://picsum.photos/600/300",
      demoUrl: "https://picsum.photos/600/300",
      thumbnail: "https://picsum.photos/800/400",
      screenshots: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      platforms: ["Web", "Mobile"],
      languages: ["JavaScript", "TypeScript"],
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      tags: ["e-commerce", "full-stack", "payment-integration"],
      complexity: "intermediate",
      views: 1500,
    },
    // Add more projects here...
  ];

  const project = projects.find(p => p.id === parseInt(id));
  if (!project) notFound();
  return project;
}

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage(){
  const project = await getProject('1');

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{project.title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <Eye className="w-4 h-4 mr-1" />
            {project.views} views
          </div>
        </CardHeader>
        <CardContent>
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={600}
            height={200}
            className="w-full h-auto object-cover rounded-lg mb-6"
          />
          <p className="text-lg mb-6">{project.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {project.languages.map((lang) => (
                  <Badge key={lang}>{lang}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {project.platforms.map((platform) => (
                  <Badge key={platform} variant="outline">{platform}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Screenshots</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((screenshot, index) => (
                <Image
                  key={index}
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href={project.sourceUrl}>
                <Code className="w-4 h-4 mr-2" />
                View Source
              </Link>
            </Button>
            <Button asChild>
              <Link href={project.demoUrl}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                Back to Projects
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}