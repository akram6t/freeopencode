'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Project } from "@/types/types"
import { getPlatforms, getProgrammingLanguages, getTechnologies, getTechnologyTypes } from "@/data"
import { createProjectSchema } from "@/lib/zod"
import { useState } from "react"
import { MultiSelect } from "@/components/ui/multi-select"

type ProjectFormValues = z.infer<typeof createProjectSchema>

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: ProjectFormValues) => void;
  isLoading?: boolean;
}

export function ProjectForm({ initialData, onSubmit, isLoading }: ProjectFormProps) {
  const platforms = getPlatforms()
  const languages = getProgrammingLanguages()
  const technologies = getTechnologies()
  const technologyTypes = getTechnologyTypes()

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "draft",
      sourceUrl: initialData?.sourceUrl || "",
      demoUrl: initialData?.demoUrl || "",
      thumbnail: initialData?.thumbnail || "",
      platforms: initialData?.platforms || [],
      languages: initialData?.languages || [],
      technologies: initialData?.technologies || [],
      technologyTypes: initialData?.technologyTypes || [],
      tags: initialData?.tags || [],
      complexity: initialData?.complexity || "beginner",
      metadata: initialData?.metadata || ""
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Project description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Single Platform select */}
        {/* <FormField
          control={form.control}
          name="platforms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platforms</FormLabel>
              <Select
                value={field.value[0] || ""}
                onValueChange={(value) => field.onChange([...field.value, value])}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platforms" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.id.toString()} value={platform.name as string}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Platforms multi select */}
        <FormField
          control={form.control}
          name="platforms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platforms</FormLabel>
              <FormControl>
                <MultiSelect
                  options={platforms.map(p => ({
                    label: p.name,
                    value: p.name
                  }))}
                  value={field.value.map(v => ({
                    label: v,
                    value: v
                  }))}
                  onChange={(selected) => {
                    field.onChange(selected.map(s => s.value))
                  }}
                  placeholder="Select platforms"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Languages multi select */}
        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <MultiSelect
                  options={languages.map(l => ({
                    label: l.name,
                    value: l.name
                  }))}
                  value={field.value.map(v => ({
                    label: v,
                    value: v
                  }))}
                  onChange={(selected) => {
                    field.onChange(selected.map(s => s.value))
                  }}
                  placeholder="Select programming languages"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TechnologyTypes multi select */}
        <FormField
          control={form.control}
          name="technologyTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technology Types</FormLabel>
              <FormControl>
                <MultiSelect
                  options={technologyTypes.map(tt => ({
                    label: tt.name,
                    value: tt.name
                  }))}
                  value={field.value.map(v => ({
                    label: v,
                    value: v
                  }))}
                  onChange={(selected) => {
                    field.onChange(selected.map(s => s.value))
                  }}
                  placeholder="Select technology types"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Technologies multi select */}
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <MultiSelect
                  options={technologies.map(t => ({
                    label: t.name,
                    value: t.name
                  }))}
                  value={field.value.map(v => ({
                    label: v,
                    value: v
                  }))}
                  onChange={(selected) => {
                    field.onChange(selected.map(s => s.value))
                  }}
                  placeholder="Select technologies"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </form>
    </Form>
  )
}