"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Palette } from "lucide-react"

export default function ThemesPage() {
  const [selectedTheme, setSelectedTheme] = useState("modern")

  const themes = [
    {
      id: "modern",
      name: "Modern",
      description: "A clean, modern design with a focus on readability",
      preview: "/placeholder.svg?height=200&width=300",
      primaryColor: "#3b82f6",
    },
    {
      id: "classic",
      name: "Classic",
      description: "A traditional menu design with elegant typography",
      preview: "/placeholder.svg?height=200&width=300",
      primaryColor: "#10b981",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "A minimalist design with a focus on your menu items",
      preview: "/placeholder.svg?height=200&width=300",
      primaryColor: "#6366f1",
    },
    {
      id: "bold",
      name: "Bold",
      description: "A bold design with strong colors and typography",
      preview: "/placeholder.svg?height=200&width=300",
      primaryColor: "#ef4444",
    },
    {
      id: "elegant",
      name: "Elegant",
      description: "An elegant design with a sophisticated look",
      preview: "/placeholder.svg?height=200&width=300",
      primaryColor: "#8b5cf6",
    },
    {
      id: "rustic",
      name: "Rustic",
      description: "A rustic design with a warm, inviting feel",
      preview: "/placeholder.svg?height=200&width=300",
      primaryColor: "#d97706",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Theme Selection</h1>
        <Button className="gap-2">
          <Palette className="h-4 w-4" />
          Apply Theme
        </Button>
      </div>
      <p className="text-muted-foreground">
        Choose a theme for your digital menu. The selected theme will be applied to your public menu page.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all ${
              selectedTheme === theme.id ? "ring-2 ring-primary ring-offset-2" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedTheme(theme.id)}
          >
            <CardHeader className="relative p-0">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  src={theme.preview || "/placeholder.svg"}
                  alt={`${theme.name} theme preview`}
                  className="h-full w-full object-cover"
                />
                {selectedTheme === theme.id && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                {theme.name}
              </CardTitle>
              <CardDescription className="mt-2">{theme.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                variant={selectedTheme === theme.id ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedTheme(theme.id)}
              >
                {selectedTheme === theme.id ? "Selected" : "Select Theme"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
