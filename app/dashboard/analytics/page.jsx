"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { BarChart, LineChart, DonutChart } from "@/components/ui/chart";
import {
   ArrowUpRight,
   CalendarIcon,
   Download,
   Eye,
   QrCode,
   RefreshCw,
   Utensils,
} from "lucide-react";
import { format, subDays } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useLanguage } from "@/contexts/language-context";
import { AIInsights } from "@/components/ai-insights";
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AnalyticsPage() {
   const { t, language } = useLanguage();
   const dateLocale = language === "ar" ? ar : enUS;
   const router = useRouter();

   // const [dateRange, setDateRange] = useState<{ from: Date, to: Date }>({
   //   from: subDays(new Date(), 30),
   //   to: new Date(),
   // })
   const [dateRange, setDateRange] = useState({
      from: subDays(new Date(), 30),
      to: new Date(),
   });

   const [selectedCategory, setSelectedCategory] = useState("all");

   // Mock data for analytics
   const overviewData = {
      totalMenuViews: 2458,
      totalItemViews: 8976,
      totalQrScans: 1243,
      averageViewTime: "2m 34s",
      conversionRate: "23.5%",
      topViewedItem: "Margherita Pizza",
   };

   // Mock data for charts
   const dailyViewsData = [
      { name: "May 1", menuViews: 120, itemViews: 350, qrScans: 45 },
      { name: "May 2", menuViews: 132, itemViews: 380, qrScans: 48 },
      { name: "May 3", menuViews: 141, itemViews: 390, qrScans: 52 },
      { name: "May 4", menuViews: 154, itemViews: 400, qrScans: 55 },
      { name: "May 5", menuViews: 162, itemViews: 420, qrScans: 59 },
      { name: "May 6", menuViews: 170, itemViews: 450, qrScans: 62 },
      { name: "May 7", menuViews: 160, itemViews: 430, qrScans: 58 },
      { name: "May 8", menuViews: 175, itemViews: 470, qrScans: 64 },
      { name: "May 9", menuViews: 190, itemViews: 500, qrScans: 70 },
      { name: "May 10", menuViews: 205, itemViews: 520, qrScans: 75 },
      { name: "May 11", menuViews: 220, itemViews: 550, qrScans: 80 },
      { name: "May 12", menuViews: 210, itemViews: 530, qrScans: 76 },
      { name: "May 13", menuViews: 215, itemViews: 540, qrScans: 78 },
      { name: "May 14", menuViews: 230, itemViews: 560, qrScans: 82 },
   ];

   const categoryViewsData = [
      { name: "Main Course", value: 45 },
      { name: "Starters", value: 20 },
      { name: "Desserts", value: 15 },
      { name: "Beverages", value: 20 },
   ];

   const topItemsData = [
      { name: "Margherita Pizza", views: 456 },
      { name: "Caesar Salad", views: 372 },
      { name: "Chocolate Cake", views: 298 },
      { name: "Iced Coffee", views: 245 },
      { name: "Garlic Bread", views: 213 },
   ];

   const deviceData = [
      { name: "Mobile", value: 68 },
      { name: "Tablet", value: 17 },
      { name: "Desktop", value: 15 },
   ];

   const hourlyTrafficData = [
      { name: "12am", value: 5 },
      { name: "1am", value: 3 },
      { name: "2am", value: 2 },
      { name: "3am", value: 1 },
      { name: "4am", value: 1 },
      { name: "5am", value: 2 },
      { name: "6am", value: 4 },
      { name: "7am", value: 8 },
      { name: "8am", value: 15 },
      { name: "9am", value: 25 },
      { name: "10am", value: 35 },
      { name: "11am", value: 45 },
      { name: "12pm", value: 60 },
      { name: "1pm", value: 75 },
      { name: "2pm", value: 70 },
      { name: "3pm", value: 55 },
      { name: "4pm", value: 45 },
      { name: "5pm", value: 50 },
      { name: "6pm", value: 65 },
      { name: "7pm", value: 80 },
      { name: "8pm", value: 85 },
      { name: "9pm", value: 70 },
      { name: "10pm", value: 45 },
      { name: "11pm", value: 25 },
   ];

   // Prepare data for AI insights
   const prepareAnalyticsData = () => {
      return {
         menuViews: dailyViewsData.map((item) => item.menuViews),
         itemViews: dailyViewsData.map((item) => item.itemViews),
         qrScans: dailyViewsData.map((item) => item.qrScans),
         topItems: topItemsData,
         categoryDistribution: categoryViewsData,
         deviceData: deviceData,
      };
   };

   const formatDateRange = () => {
      return `${format(dateRange.from, "MMM d, yyyy", {
         locale: dateLocale,
      })} - ${format(dateRange.to, "MMM d, yyyy", { locale: dateLocale })}`;
   };

   return (
      <div className="flex flex-col gap-6 p-6">
         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4 items-center">
               <SidebarTrigger className="-ml-1" />
               <h1 className="text-3xl font-bold tracking-tight">
                  {t("dashboard.analytics")}
               </h1>
            </div>
            {/* <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.analytics")}</h1> */}
            <div className="flex items-center gap-2 flex-wrap">
               <Popover>
                  <PopoverTrigger asChild>
                     <Button variant="outline" className="gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {formatDateRange()}
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                     <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={(range) => range && setDateRange(range)}
                        numberOfMonths={2}
                        locale={dateLocale}
                     />
                  </PopoverContent>
               </Popover>
               <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Categories</SelectItem>
                     <SelectItem value="main">Main Course</SelectItem>
                     <SelectItem value="starters">Starters</SelectItem>
                     <SelectItem value="desserts">Desserts</SelectItem>
                     <SelectItem value="beverages">Beverages</SelectItem>
                  </SelectContent>
               </Select>
               <Button variant="outline" size="icon" onClick={() => router.reload()}>
                  <RefreshCw className="h-4 w-4" />
               </Button>
               <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
               </Button>
            </div>
         </div>

         {/* Overview Cards */}
         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                     {t("analytics.totalMenuViews")}
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {overviewData.totalMenuViews.toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                     <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                     <span className="text-emerald-500">+12.5%</span>
                     <span className="ml-1">vs. previous period</span>
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                     {t("analytics.totalItemViews")}
                  </CardTitle>
                  <Utensils className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {overviewData.totalItemViews.toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                     <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                     <span className="text-emerald-500">+8.2%</span>
                     <span className="ml-1">vs. previous period</span>
                  </div>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                     {t("analytics.totalQrScans")}
                  </CardTitle>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {overviewData.totalQrScans.toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                     <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                     <span className="text-emerald-500">+15.3%</span>
                     <span className="ml-1">vs. previous period</span>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Detailed Analytics Tabs */}
         <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
               <TabsTrigger value="overview">
                  {t("analytics.overview")}
               </TabsTrigger>
               <TabsTrigger value="menu-items">
                  {t("analytics.menuItems")}
               </TabsTrigger>
               <TabsTrigger value="traffic">
                  {t("analytics.traffic")}
               </TabsTrigger>
               <TabsTrigger value="devices">
                  {t("analytics.devices")}
               </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>{t("analytics.viewsOverTime")}</CardTitle>
                     <CardDescription>
                        {t("analytics.viewsOverTimeDesc")}
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] p-0 pt-0 md:p-6">
                     <LineChart
                        data={dailyViewsData}
                        categories={["menuViews", "itemViews", "qrScans"]}
                        index="name"
                        colors={["violet", "pink", "cyan"]}
                        valueFormatter={(value) => `${value.toLocaleString()}`}
                        yAxisWidth={60}
                        showLegend={true}
                        showAnimation={true}
                     />
                  </CardContent>
               </Card>

               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="col-span-1">
                     <CardHeader>
                        <CardTitle>
                           {t("analytics.categoryDistribution")}
                        </CardTitle>
                        <CardDescription>
                           {t("analytics.categoryDistributionDesc")}
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="h-[300px]">
                        <DonutChart
                           data={categoryViewsData}
                           category="value"
                           index="name"
                           colors={["fuchsia", "lime", "violet", "cyan"]}
                           valueFormatter={(value) => `${value}%`}
                           showAnimation={true}
                           showTooltip={true}
                        />
                     </CardContent>
                  </Card>

                  <Card className="col-span-2">
                     <CardHeader>
                        <CardTitle>{t("analytics.topItems")}</CardTitle>
                        <CardDescription>
                           {t("analytics.topItemsDesc")}
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="h-[300px]">
                        <BarChart
                           data={topItemsData}
                           categories={["views"]}
                           index="name"
                           colors={["red"]}
                           valueFormatter={(value) =>
                              `${value.toLocaleString()} views`
                           }
                           layout="vertical"
                           showLegend={false}
                           showAnimation={true}
                        />
                     </CardContent>
                  </Card>
               </div>
               <AIInsights analyticsData={prepareAnalyticsData()} />
            </TabsContent>

            {/* Menu Items Tab */}
            <TabsContent value="menu-items" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>{t("analytics.itemViewsComparison")}</CardTitle>
                     <CardDescription>
                        {t("analytics.itemViewsComparisonDesc")}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="h-[400px]">
                        <BarChart
                           data={topItemsData}
                           categories={["views"]}
                           index="name"
                           colors={["amber"]}
                           valueFormatter={(value) =>
                              `${value.toLocaleString()} views`
                           }
                           showLegend={false}
                           showAnimation={true}
                        />
                     </div>
                  </CardContent>
               </Card>

               <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                     <CardHeader>
                        <CardTitle>
                           {t("analytics.categoryPerformance")}
                        </CardTitle>
                        <CardDescription>
                           {t("analytics.categoryPerformanceDesc")}
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="h-[300px]">
                           <DonutChart
                              data={categoryViewsData}
                              category="value"
                              index="name"
                              colors={["red", "lime", "violet", "cyan"]}
                              valueFormatter={(value) => `${value}%`}
                              showAnimation={true}
                              showTooltip={true}
                           />
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>{t("analytics.itemEngagement")}</CardTitle>
                        <CardDescription>
                           {t("analytics.itemEngagementDesc")}
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           {topItemsData.map((item, index) => (
                              <div
                                 key={index}
                                 className="flex items-center justify-between"
                              >
                                 <div className="flex items-center gap-2">
                                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                                    <span className="font-medium">
                                       {item.name}
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <span>
                                       {item.views.toLocaleString()} views
                                    </span>
                                    <div className="h-2 w-24 rounded-full bg-muted">
                                       <div
                                          className="h-full rounded-full bg-primary"
                                          style={{
                                             width: `${
                                                (item.views /
                                                   topItemsData[0].views) *
                                                100
                                             }%`,
                                          }}
                                       ></div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            {/* Traffic Tab */}
            <TabsContent value="traffic" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>{t("analytics.hourlyTraffic")}</CardTitle>
                     <CardDescription>
                        {t("analytics.hourlyTrafficDesc")}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="h-[400px]">
                        <BarChart
                           data={hourlyTrafficData}
                           categories={["value"]}
                           index="name"
                           colors={["emerald"]}
                           valueFormatter={(value) => `${value}%`}
                           showLegend={false}
                           showAnimation={true}
                        />
                     </div>
                  </CardContent>
               </Card>

               <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                     <CardHeader>
                        <CardTitle>{t("analytics.trafficSources")}</CardTitle>
                        <CardDescription>
                           {t("analytics.trafficSourcesDesc")}
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="h-[300px]">
                           <DonutChart
                              data={[
                                 { name: "QR Code Scans", value: 65 },
                                 { name: "Direct URL", value: 20 },
                                 { name: "Social Media", value: 10 },
                                 { name: "Other", value: 5 },
                              ]}
                              category="value"
                              index="name"
                              colors={["red", "lime", "violet", "cyan"]}
                              valueFormatter={(value) => `${value}%`}
                              showAnimation={true}
                              showTooltip={true}
                           />
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>
                           {t("analytics.weekdayDistribution")}
                        </CardTitle>
                        <CardDescription>
                           {t("analytics.weekdayDistributionDesc")}
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="h-[300px]">
                           <BarChart
                              data={[
                                 { name: "Monday", value: 12 },
                                 { name: "Tuesday", value: 10 },
                                 { name: "Wednesday", value: 14 },
                                 { name: "Thursday", value: 15 },
                                 { name: "Friday", value: 18 },
                                 { name: "Saturday", value: 20 },
                                 { name: "Sunday", value: 11 },
                              ]}
                              categories={["value"]}
                              index="name"
                              colors={["blue"]}
                              valueFormatter={(value) => `${value}%`}
                              showLegend={false}
                              showAnimation={true}
                           />
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            {/* Devices Tab */}
            <TabsContent value="devices" className="space-y-4">
               <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                     <CardHeader>
                        <CardTitle>
                           {t("analytics.deviceDistribution")}
                        </CardTitle>
                        <CardDescription>
                           {t("analytics.deviceDistributionDesc")}
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="h-[300px]">
                           <DonutChart
                              data={deviceData}
                              category="value"
                              index="name"
                              colors={["red", "lime", "violet"]}
                              valueFormatter={(value) => `${value}%`}
                              showAnimation={true}
                              showTooltip={true}
                           />
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>{t("analytics.browserUsage")}</CardTitle>
                        <CardDescription>
                           {t("analytics.browserUsageDesc")}
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="h-[300px]">
                           <BarChart
                              data={[
                                 { name: "Chrome", value: 45 },
                                 { name: "Safari", value: 30 },
                                 { name: "Firefox", value: 12 },
                                 { name: "Edge", value: 8 },
                                 { name: "Other", value: 5 },
                              ]}
                              categories={["value"]}
                              index="name"
                              colors={["blue"]}
                              valueFormatter={(value) => `${value}%`}
                              layout="vertical"
                              showLegend={false}
                              showAnimation={true}
                           />
                        </div>
                     </CardContent>
                  </Card>
               </div>

               <Card>
                  <CardHeader>
                     <CardTitle>{t("analytics.screenSizes")}</CardTitle>
                     <CardDescription>
                        {t("analytics.screenSizesDesc")}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="h-[300px]">
                        <BarChart
                           data={[
                              { name: "< 576px", value: 35 },
                              { name: "576-768px", value: 25 },
                              { name: "768-992px", value: 15 },
                              { name: "992-1200px", value: 15 },
                              { name: "> 1200px", value: 10 },
                           ]}
                           categories={["value"]}
                           index="name"
                           colors={["fuchsia"]}
                           valueFormatter={(value) => `${value}%`}
                           showLegend={false}
                           showAnimation={true}
                        />
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
}
