"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function AddMenuItemPage() {
  const { t } = useLanguage()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/menu">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.addMenuItem")}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("menu.menuItemDetails")}</CardTitle>
          <CardDescription>{t("menu.addMenuItemDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">{t("addItem.titleEn")}</Label>
              <Input id="title" placeholder={t("addItem.titlePlaceholder")} />
            </div>
            <div className="space-y-2">
            <Label htmlFor="title">{t("addItem.titleAr")}</Label>
            <Input id="title" placeholder={t("addItem.titlePlaceholder")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{t("addItem.descEn")}</Label>
            <Textarea id="description" placeholder={t("addItem.descPlaceholder")} className="min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{t("addItem.descAr")}</Label>
            <Textarea id="description" placeholder={t("addItem.descPlaceholder")} className="min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">{t("addItem.price")}</Label>
            <Input id="price" type="number" step="0.01" placeholder={t("addItem.pricePlaceholder")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">{t("addItem.category")}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("addItem.categoryPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Course</SelectItem>
                <SelectItem value="starters">Starters</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">{t("menu.image")}</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-32 w-32 overflow-hidden rounded-md border">
                {imagePreview ? (
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                <p className="mt-2 text-xs text-muted-foreground">
                  Upload an image of your menu item. Recommended size: 500x500px.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/dashboard/menu">
            <Button variant="outline">{t("common.cancel")}</Button>
          </Link>
          <Button>{t("common.save")}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
