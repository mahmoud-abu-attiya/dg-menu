"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Plus, Trash2, Utensils } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function MenuPage() {
  const { t } = useLanguage()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<{
    titleEN: string
    titleAR: string
    descriptionEN: string
    descriptionAR: string
    image: File | null
  }>({
    titleEN: "",
    titleAR: "",
    descriptionEN: "",
    descriptionAR: "",
    image: null,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      setFormData({ ...formData, image: file })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData)
    setIsPopupOpen(false)
  }

  // Sample menu data
  const menuItems = [
    {
      id: 1,
      title: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      image: "/images/food-1.png",
      category: "Main Course",
    },
    {
      id: 2,
      title: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
      price: 8.99,
      image: "/images/food-2.png",
      category: "Starters",
    },
    {
      id: 3,
      title: "Chocolate Cake",
      description: "Rich chocolate cake with a molten center",
      price: 6.99,
      image: "/images/food-3.png",
      category: "Desserts",
    },
    {
      id: 4,
      title: "Iced Coffee",
      description: "Cold brewed coffee served over ice",
      price: 4.99,
      image: "/images/food-1.png",
      category: "Beverages",
    },
  ]

  const categories = [
    { id: "All", label: t("menu.all") },
    { id: "Main Course", label: t("menu.mainCourse") },
    { id: "Starters", label: t("menu.starters") },
    { id: "Desserts", label: t("menu.desserts") },
    { id: "Beverages", label: t("menu.beverages") },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex md:items-center md:justify-between flex-col md:flex-row gap-4">
        <div className="flex gap-4 items-center">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.menuManagement")}</h1>
        </div>
        {/* <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.menuManagement")}</h1> */}
        <div className="flex gap-4">
          <Link href="/dashboard/menu/add">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t("dashboard.addMenuItem")}
            </Button>
          </Link>
          <Button onClick={() => setIsPopupOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            {t("dashboard.addCategory")}
          </Button>
        </div>
      </div>
      {/* Popup for adding a new category */}
      {isPopupOpen && (
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogContent className="max-h-[calc(100vh-1rem)] overflow-auto">
            <DialogHeader>
              <DialogTitle>{t("dashboard.addCategory")}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium">{t("menu.image")}</label>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded-md" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">{t("addItem.titleEn")}</label>
                <Input
                  name="titleEN"
                  value={formData.titleEN}
                  onChange={handleInputChange}
                  placeholder={t("addItem.titleEn")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">{t("addItem.titleAr")}</label>
                <Input
                  name="titleAR"
                  value={formData.titleAR}
                  onChange={handleInputChange}
                  placeholder={t("addItem.titleAr")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">{t("addItem.descEn")}</label>
                <Textarea
                  name="descEn"
                  value={formData.descriptionEN}
                  onChange={handleInputChange}
                  placeholder={t("addItem.descEn")}
                // className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">{t("addItem.descAr")}</label>
                <Textarea
                  name="descAr"
                  value={formData.descriptionAR}
                  onChange={handleInputChange}
                  placeholder={t("addItem.descAr")}
                // className="w-full border rounded-md p-2"
                />
              </div>
              <Button onClick={handleSubmit} className="mt-4">
                {t("common.save")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {/* Existing content */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input placeholder={t("menu.searchMenuItems")} className="pl-10" />
          <Utensils className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      <Tabs defaultValue="All" className="">
        <TabsList className="mb-4 max-w-full overflow-auto justify-normal">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {menuItems
                .filter((item) => category.id === "All" || item.category === category.id)
                .map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                      <div className="h-16 w-16 rounded-md bg-muted overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                      <div className="space-y-1">
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between">
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground">
                          {t(`menu.${item.category.toLowerCase().replace(" ", "")}`)}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit className="h-4 w-4" />
                        {t("common.edit")}
                      </Button>
                      <Button variant="destructive" size="sm" className="gap-1">
                        <Trash2 className="h-4 w-4" />
                        {t("common.delete")}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
