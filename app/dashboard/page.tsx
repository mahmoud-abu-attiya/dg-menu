"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, QrCode, Utensils, ArrowUpRight, Users, Plus } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-3xl font-bold tracking-tight">{t("common.dashboard")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/menu/preview">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden md:inline-block">
              {t("dashboard.previewMenu")}
              </span>
            </Button>
          </Link>
          <Link href="/dashboard/menu/add">
            <Button className="gap-2 ">
                <Plus className="h-4 w-4" />
                <span className="hidden md:inline-block">
                  {t("dashboard.addMenuItem")}
                </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-8 border-primary p-4 md:p-6 flex flex-col gap-2 md:gap-4">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-sm font-medium md:text-xl">{t("dashboard.totalMenuItems")}</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card className="border-l-8 border-primary p-4 md:p-6 flex flex-col gap-2 md:gap-4">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-sm font-medium md:text-xl">{t("dashboard.menuViews")}</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+22% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-8 border-primary p-4 md:p-6 flex flex-col gap-2 md:gap-4">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-sm font-medium md:text-xl">{t("dashboard.qrCodeScans")}</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-l-8 border-primary p-4 md:p-6 flex flex-col gap-2 md:gap-4">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-sm font-medium md:text-xl">{t("dashboard.activeTheme")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">{t("themes.modern")}</div>
            <p className="text-xs text-muted-foreground">Last updated 3 days ago</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t("dashboard.recentMenuItems")}</CardTitle>
            <CardDescription>{t("dashboard.recentMenuItemsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Margherita Pizza", price: "$12.99", category: t("menu.mainCourse"), image: "/food.webp"},
                { name: "Caesar Salad", price: "$8.99", category: t("menu.starters"), image: "/food.webp" },
                { name: "Chocolate Cake", price: "$6.99", category: t("menu.desserts"), image: "/food.webp" },
                { name: "Iced Coffee", price: "$4.99", category: t("menu.beverages"), image: "/food.webp" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md bg-muted overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{item.price}</p>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t("dashboard.quickActions")}</CardTitle>
            <CardDescription>{t("dashboard.quickActionsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/dashboard/qr-code">
              <Button variant="outline" className="w-full justify-start gap-2">
                <QrCode className="h-4 w-4" />
                {t("dashboard.generateQrCode")}
              </Button>
            </Link>
            <Link href="/dashboard/themes">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Utensils className="h-4 w-4" />
                {t("dashboard.changeMenuTheme")}
              </Button>
            </Link>
            <Link href="/dashboard/menu">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Utensils className="h-4 w-4" />
                {t("dashboard.manageMenuItems")}
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Utensils className="h-4 w-4" />
                {t("dashboard.restaurantSettings")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
