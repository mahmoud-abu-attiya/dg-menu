"use client"

import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useLanguage } from "@/contexts/language-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { direction } = useLanguage()

  return (
    <div dir={direction}>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  )
}
