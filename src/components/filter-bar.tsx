'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function FilterBar() {
    const [language, setLanguage] = useState<string>('')
    const [technology, setTechnology] = useState<string>('')
    const [complexity, setComplexity] = useState<string>('')

    const handleFilter = () => {
        // This would typically update the projects list based on the selected filters
        console.log('Filtering with:', { language, technology, complexity })
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Select onValueChange={setLanguage}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={setTechnology}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Technology" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="node">Node.js</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={setComplexity}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Complexity" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={handleFilter}>Apply Filters</Button>
        </div>
    )
}

