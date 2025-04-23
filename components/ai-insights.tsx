"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, RefreshCw, TrendingUp, Zap } from "lucide-react"
import { generateAnalyticsInsights } from "@/app/actions/ai-insights"
import { useLanguage } from "@/contexts/language-context"
import { Skeleton } from "@/components/ui/skeleton"

type AnalyticsData = {
  menuViews: number[]
  itemViews: number[]
  qrScans: number[]
  topItems: { name: string; views: number }[]
  categoryDistribution: { name: string; value: number }[]
  deviceData: { name: string; value: number }[]
}

type InsightsResponse = {
  summary: string
  trends: string[]
  recommendations: string[]
}

interface AIInsightsProps {
  analyticsData: AnalyticsData
}

export function AIInsights({ analyticsData }: AIInsightsProps) {
  const { t } = useLanguage()
  const [insights, setInsights] = useState<InsightsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInsights = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await generateAnalyticsInsights(analyticsData)
      setInsights(response)
    } catch (err) {
      setError("Failed to generate insights. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle>{t("analytics.aiInsights")}</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={fetchInsights} disabled={loading} className="gap-2">
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                {t("analytics.generatingInsights")}
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4" />
                {insights ? t("analytics.refreshInsights") : t("analytics.generateInsights")}
              </>
            )}
          </Button>
        </div>
        <CardDescription>{t("analytics.aiInsightsDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <div className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</div>}

        {!insights && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Lightbulb className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="mb-2 text-lg font-medium">{t("analytics.noInsightsYet")}</p>
            <p className="text-sm text-muted-foreground">{t("analytics.clickGenerateToStart")}</p>
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
        )}

        {insights && !loading && (
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="summary" className="flex-1">
                {t("analytics.summary")}
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex-1">
                {t("analytics.trends")}
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex-1">
                {t("analytics.recommendations")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p>{insights.summary}</p>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <ul className="space-y-3">
                {insights.trends.map((trend, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p>{trend}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <ul className="space-y-3">
                {insights.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p>{recommendation}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
