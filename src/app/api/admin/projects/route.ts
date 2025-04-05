import { createProjectSchema } from '@/lib/zod';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = (page - 1) * limit;

        const allProjects = await db.select().from(projects).limit(limit).offset(offset);

        return NextResponse.json(allProjects, { status: 200 });
    } catch (error) {
        console.error(error);
        console.log(error);
        
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const validatedData = createProjectSchema.parse(body);

        const newProject = await db.insert(projects).values({
            ...validatedData,
            // screenshots: JSON.stringify(validatedData.screenshots || []),
            platforms: JSON.stringify(validatedData.platforms),
            languages: JSON.stringify(validatedData.languages),
            technologyTypes: JSON.stringify(validatedData.technologyTypes),
            technologies: JSON.stringify(validatedData.technologies),
            tags: JSON.stringify(validatedData.tags || []),
            userId: 1 // TODO: Get from auth session
        }).returning();

        return NextResponse.json(newProject[0], { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 400 });
    }
};

export const PUT = async (req: Request) => {
    try {
        const body = await req.json();
        const { id, ...validatedData } = createProjectSchema.parse(body);

        const updatedProject = await db.update(projects)
            .set({
                ...validatedData,
                screenshots: JSON.stringify(validatedData.screenshots || []),
                platforms: JSON.stringify(validatedData.platforms),
                languages: JSON.stringify(validatedData.languages),
                technologyTypes: JSON.stringify(validatedData.technologyTypes),
                technologies: JSON.stringify(validatedData.technologies),
                tags: JSON.stringify(validatedData.tags || []),
                updatedAt: new Date().toISOString()
            })
            .where(eq(projects.id, id!))
            .returning();

        if (!updatedProject.length) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(updatedProject[0], { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 400 });
    }
};

export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        await db.delete(projects).where(eq(projects.id, parseInt(id)));

        return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 400 });
    }
};