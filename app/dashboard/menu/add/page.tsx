"use client"

import type React from "react"
import type { FormEvent } from "react";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, LoaderCircle, Sparkles, Upload } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { generateImage } from "@/lib/generateImage"
import Variants from "@/components/Variants"

interface Variant {
  name: string;
  price: number;
}

interface MenuItem {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  image: string | null;
  variants: Variant[];
}

export default function AddMenuItemPage() {
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [category, setCategory] = useState("");
  const [titleEnError, setTitleEnError] = useState(false);
  const [titleArError, setTitleArError] = useState(false);
  const [descriptionEnError, setDescriptionEnError] = useState(false);
  const [descriptionArError, setDescriptionArError] = useState(false);
  const [categoryError, setCategoryError] = useState(false)
  const [generateLoading, setGenerateLoading] = useState(false);
  const [variantsError, setVariantsError] = useState(false);

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

  const generate = async () => {
    setGenerateLoading(true);
    setImagePreview(null);
    setTitleEnError(false);
    setDescriptionEnError(false);

    if (titleEn.length < 5) {
      setTitleEnError(true);
      setGenerateLoading(false);
      return;
    }

    if (descriptionEn.length < 15) {
      setDescriptionEnError(true);
      setGenerateLoading(false);
      return;
    }

    try {
      const image = await generateImage(titleEn, descriptionEn);
      setImagePreview(image);
    } catch (error) {
      console.error("Error generating image:", error);
      setGenerateLoading(false);
    }
  };

  const submitMenuItem = (e: FormEvent) => {
    e.preventDefault();

    setTitleEnError(false);
    setTitleArError(false);
    setDescriptionEnError(false);
    setDescriptionArError(false);
    setVariantsError(false);

    if (titleEn.length < 5) {
      setTitleEnError(true);
    }

    if (titleAr.length < 5) {
      setTitleArError(true);
    }

    if (descriptionEn.length < 15) {
      setDescriptionEnError(true);
    }

    if (descriptionAr.length < 15) {
      setDescriptionArError(true);
    }

    if (!category) {
      setCategoryError(true);
    }

    const invalidVariants = variants.some(
      (variant) => !variant.name.trim() || variant.price <= 0
    );

    if (invalidVariants) {
      setVariantsError(true);
    }

    if (titleEnError || titleArError || descriptionEnError || descriptionArError || categoryError || variantsError) {
      return;
    }

    const menuItem: MenuItem = {
      titleEn,
      titleAr,
      descriptionEn,
      descriptionAr,
      category,
      variants,
      image: imagePreview,
    };

    console.log("Menu Item Submitted:", menuItem);
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/menu">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.addMenuItem")}</h1>
      </div>
      <Card className="">
        <CardHeader className="p-6 md:p-4">
          <CardTitle>{t("menu.menuItemDetails")}</CardTitle>
          <CardDescription>{t("menu.addMenuItemDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="titleEn">{t("addItem.titleEn")}</Label>
              <Input
                id="titleEn"
                placeholder={t("addItem.titlePlaceholder")}
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
              {titleEnError && <p className="mt-2 text-xs text-red-600">
                The title must be at least 5 characters long.
              </p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleAr">{t("addItem.titleAr")}</Label>
              <Input
                id="titleAr"
                placeholder={t("addItem.titlePlaceholder")}
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
              />
              {titleArError && <p className="mt-2 text-xs text-red-600">
                The title must be at least 5 characters long.
              </p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="descriptionEn">{t("addItem.descEn")}</Label>
            <Textarea
              id="descriptionEn"
              placeholder={t("addItem.descPlaceholder")}
              className="min-h-[100px]"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
            />
            {descriptionEnError && <p className="mt-2 text-xs text-red-600">
              The description must be at least 15 characters long.
            </p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="descriptionAr">{t("addItem.descAr")}</Label>
            <Textarea
              id="descriptionAr"
              placeholder={t("addItem.descPlaceholder")}
              className="min-h-[100px]"
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
            />
            {descriptionArError && <p className="mt-2 text-xs text-red-600">
              The description must be at least 15 characters long.
            </p>}
          </div>
          <div className="space-y-2">
            <Variants setVariants={setVariants} />
            {variantsError && (
              <p className="mt-2 text-xs text-red-600">
                Each variant must have a name and a price greater than 0.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">{t("addItem.category")}</Label>
            <Select onValueChange={(value) => {setCategory(value); setCategoryError(false)}}>
              <SelectTrigger>
                <SelectValue placeholder={t("addItem.categoryPlaceholder")} />
              </SelectTrigger>
              <SelectContent id="category">
                <SelectItem value="main">Main Course</SelectItem>
                <SelectItem value="starters">Starters</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
              </SelectContent>
            </Select>
            {categoryError && <p className="mt-2 text-xs text-red-600">
              The category must be selected.
            </p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">{t("menu.image")}</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-32 w-32 overflow-hidden rounded-md border">
                {generateLoading && <div className="absolute w-full h-full bg-muted flex items-center justify-center">
                  <LoaderCircle className="animate-spin	text-muted-foreground" />
                </div>}
                {imagePreview ? (
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" onLoad={() => setGenerateLoading(false)} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Upload an image of your menu item. Recommended size: 500x500px.
                  </p>
                </div>
                <div className="relative my-4 lg:my-0 lg:mx-4">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-sm text-muted-foreground w-fit h-fit rounded-full z-10 p-2">OR</span>
                  <span className="absolute w-full h-[1px] bg-gray-300 lg:w-[1px] lg:h-full"></span>
                </div>
                <div className="flex-1">
                    {!titleEnError && !descriptionEnError && <p className="text text-muted-foreground">
                      Generate an Image using Title and description.
                    </p>}
                  <Button onClick={generate} className="btn-grad w-full transition-all rounded-md" disabled={generateLoading}>
                    {
                      generateLoading && <span className="flex items-center gap-2"><LoaderCircle className="animate-spin text-muted" />Generating... </span>
                    }
                      {!generateLoading && <span className="flex items-center gap-2"><Sparkles /> Generate Image using AI</span>}
                  </Button>
                  {titleEnError && <p className="mt-2 text-xs text-red-600">
                    The title must be at least 5 characters long.
                  </p>}
                  {descriptionEnError && <p className="mt-2 text-xs text-red-600">
                    The description must be at least 15 characters long.
                  </p>}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/dashboard/menu">
            <Button variant="outline" className="rounded-md">{t("common.cancel")}</Button>
          </Link>
          <Button onClick={submitMenuItem} className="rounded-md">{t("common.save")}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
