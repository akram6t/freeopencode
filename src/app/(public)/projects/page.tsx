import { ProjectGrid } from '@/components/project-grid'
import { FilterBar } from '@/components/filter-bar'
import { Project } from '@/types/types';

async function getProjects(): Promise<Project[]> {
  // This would be replaced with an actual API call or database query
return [
    {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with user authentication, product management, and payment integration.",
        sourceUrl: "https://github.com/example/e-commerce",
        demoUrl: "https://demo-ecommerce.example.com",
        thumbnail: "https://picsum.photos/300/200",
        languages: ["JavaScript", "TypeScript"],
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        complexity: "intermediate",
        views: 1500,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 1
    },
    {
        id: 2,
        title: "Weather App",
        description: "A simple weather application that fetches and displays current weather data for any location.",
        sourceUrl: "https://github.com/example/weather-app",
        demoUrl: "https://weather-app.example.com",
        thumbnail: "https://picsum.photos/301/200",
        languages: ["JavaScript"],
        technologies: ["React", "OpenWeatherMap API"],
        complexity: "beginner",
        views: 800,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 1
    },
    {
        id: 3,
        title: "Weather App",
        description: "A simple weather application that fetches and displays current weather data for any location.",
        sourceUrl: "https://github.com/example/weather-app",
        demoUrl: "https://weather-app.example.com",
        thumbnail: "https://picsum.photos/300/201",
        languages: ["JavaScript"],
        technologies: ["React", "OpenWeatherMap API"],
        complexity: "beginner",
        views: 800,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 1
    },
    // Add more dummy projects here...
];
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Project Showcase</h1>
      <FilterBar />
      <ProjectGrid projects={projects} />
    </div>
  )
}

