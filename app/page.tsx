"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, QrCode, Star, Utensils, Palette, Instagram, Linkedin, Facebook, MapPin, MessageSquareText } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function Home() {
  const { t, tArray, direction } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col" dir={direction}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{t("common.menuMaster")}</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium">
              {t("common.features")}
            </Link>
            <Link href="#pricing" className="text-sm font-medium">
              {t("common.pricing")}
            </Link>
            <Link href="#testimonials" className="text-sm font-medium">
              {t("common.testimonials")}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                {t("common.login")}
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">{t("common.register")}</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* hero */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {t("home.heroTitle")}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">{t("home.heroDescription")}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5">
                      {t("common.getStarted")}
                      <ArrowRight className="h-4 w-4 rtl-rotate-180" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline">
                      {t("common.viewDemo")}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl md:h-[500px]">
                  <Image
                    src="/placeholder.svg"
                    alt="Digital Menu Preview"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* features */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.featuresTitle")}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("home.featuresDescription")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-2xl bg-mesh border border-primary p-6 shadow-md">
                <div className="rounded-full bg-muted/20 p-3">
                  <Utensils className="h-6 w-6 text-muted" />
                </div>
                <h3 className="text-xl font-bold text-white">{t("home.menuManagement")}</h3>
                <p className="text-center text-muted">{t("home.menuManagementDesc")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-2xl bg-mesh border border-primary p-6 shadow-md">
                <div className="rounded-full bg-muted/20 p-3">
                  <Palette className="h-6 w-6 text-muted" />
                </div>
                <h3 className="text-xl font-bold text-white">{t("home.themeSelection")}</h3>
                <p className="text-center text-muted">{t("home.themeSelectionDesc")}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-2xl bg-mesh border border-primary p-6 shadow-md">
                <div className="rounded-full bg-muted/20 p-3">
                  <QrCode className="h-6 w-6 text-muted" />
                </div>
                <h3 className="text-xl font-bold text-white">{t("home.qrCodeGeneration")}</h3>
                <p className="text-center text-muted">{t("home.qrCodeGenerationDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("home.howItWorksTitle")}</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    {t("home.howItWorksDesc")}
                  </p>
                </div>
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-medium">{t("home.step1Title")}</h3>
                      <p className="text-muted-foreground">{t("home.step1Desc")}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-medium">{t("home.step2Title")}</h3>
                      <p className="text-muted-foreground">{t("home.step2Desc")}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-medium">{t("home.step3Title")}</h3>
                      <p className="text-muted-foreground">{t("home.step3Desc")}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-muted/50">
                  <Image
                    src="/placeholder.svg"
                    alt="QR Code Demo"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.testimonialsTitle")}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("home.testimonialsDesc")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card className="overflow-hidden shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src="/avatar-1.png" alt="Sarah Johnson" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">Bistro Bella</p>
                    </div>
                  </div>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 border-l-2 pl-4">
                    <p className="text-muted-foreground">
                      &quot;MenuMaster has transformed how we present our menu to customers. The QR code solution is elegant
                      and our customers love the digital experience.&quot;
                    </p>
                  </blockquote>
                </CardContent>
              </Card>
              <Card className="overflow-hidden shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src="/avatar-1.png" alt="Michael Rodriguez" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Michael Rodriguez</h3>
                      <p className="text-sm text-muted-foreground">Coastal Cuisine</p>
                    </div>
                  </div>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="mt-4 border-l-2 pl-4">
                    <p className="text-muted-foreground">
                      &quot;We&apos;ve saved so much time and money by switching to digital menus. Updating prices and adding
                      seasonal items is now a breeze!&quot;
                    </p>
                  </blockquote>
                </CardContent>
              </Card>
              <Card className="overflow-hidden shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src="/avatar-1.png" alt="Emily Chen" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Emily Chen</h3>
                      <p className="text-sm text-muted-foreground">Fusion Flavors</p>
                    </div>
                  </div>
                  <div className="mt-4 flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <blockquote className="mt-4 border-l-2 pl-4">
                    <p className="text-muted-foreground">
                      &quot;The theme options are fantastic and really helped us create a menu that matches our restaurant&apos;s
                      aesthetic. Highly recommend!&quot;
                    </p>
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* questions */}
        <section id="questions" className="w-full py-12 md:py-24 lg:py-32 bg-[src('/aboutus-bg.jpg')] bg-cover bg-center">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h4 className="text-muted-foreground text-xl">{t("home.faqSubTitle")}</h4>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.faqTitle")}</h2>
              </div>
            </div>
            <Accordion type="single" collapsible className="space-y-4 md:space-y-6 py-12">
              {tArray("questions").map((question: { question: string; answer: string }, index: number) => (
                <AccordionItem key={index} value={`item-${index + 2}`} className="bg-muted border rounded-xl shadow-sm px-4">
                  <AccordionTrigger className="hover:no-underline text-start text-xl">{question.question}</AccordionTrigger>
                  <AccordionContent className="text-lg">{question.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        {/* pricing */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.pricingTitle")}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("home.pricingDesc")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
              <Card className="flex flex-col shadow-md rounded-2xl bg-mesh">
                <CardContent className="flex flex-1 flex-col p-6 z-10 text-white">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">{t("home.starterPlan")}</h3>
                    <p className="text-muted">{t("home.starterDesc")}</p>
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="text-muted">/month</span>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {[
                      t("pricing.starterFeature1"),
                      t("pricing.starterFeature2"),
                      t("pricing.starterFeature3"),
                      t("pricing.starterFeature4"),
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button className="w-full rounded-xl bg-muted text-primary hover:bg-secondary hover:scale-105 transition">{t("common.getStarted")}</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col shadow-md rounded-2xl bg-mesh">
                <CardContent className="flex flex-1 flex-col p-6 z-10 text-white">
                  <div className="space-y-2">
                    <div className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-primary">
                      {t("home.popular")}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{t("home.professionalPlan")}</h3>
                    <p className="text-muted">{t("home.professionalDesc")}</p>
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-muted">/month</span>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {[
                      t("pricing.professionalFeature1"),
                      t("pricing.professionalFeature2"),
                      t("pricing.professionalFeature3"),
                      t("pricing.professionalFeature4"),
                      t("pricing.professionalFeature5"),
                      t("pricing.professionalFeature6"),
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button className="w-full rounded-xl bg-muted text-primary hover:bg-secondary hover:scale-105 transition">{t("common.getStarted")}</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="flex flex-col shadow-md rounded-2xl bg-mesh">
                <CardContent className="flex flex-1 flex-col p-6 z-10 text-white">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">{t("home.enterprisePlan")}</h3>
                    <p className="text-muted">{t("home.enterpriseDesc")}</p>
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted">/month</span>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {[
                      t("pricing.enterpriseFeature1"),
                      t("pricing.enterpriseFeature2"),
                      t("pricing.enterpriseFeature3"),
                      t("pricing.enterpriseFeature4"),
                      t("pricing.enterpriseFeature5"),
                      t("pricing.enterpriseFeature6"),
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button className="w-full rounded-xl bg-muted text-primary hover:bg-secondary hover:scale-105 transition">{t("home.contactSales")}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* contact */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-[src('/aboutus-bg.jpg')] bg-cover bg-center">
          <div className="container grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="space-y-2 lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.contactTitle")}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.contactSubTitle")}
              </p>
            </div>
            <div className="grid gap-4 grid-cols-2 lg:col-span-3">
              <Card className="bg-mesh text-white border-primary p-2 sm:p-4 md:p-6 shadow-md">
                <div className=" flex flex-row items-center gap-2 md:gap-4">
                  <div className="rounded-full bg-muted/20 p-1.5 md:p-3 text-sm md:text-lg">
                    <MessageSquareText />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="uppercase md:text-xl text-white font-bold">{t("contacts.whatsappTitle")}</h6>
                    <Link href={t("contacts.whatsappUrl")} className="underline text-sm md:text-base">+123 456 789</Link>
                  </div>
                </div>
                <Button className="text-primary bg-white hover:bg-secondary w-full mt-4 md:mt-6">{t("home.contactBtn")}</Button>
              </Card>
              <Card className="bg-mesh text-white border-primary p-2 sm:p-4 md:p-6 shadow-md">
                <div className=" flex flex-row items-center gap-2 md:gap-4">
                  <div className="rounded-full bg-muted/20 p-1.5 md:p-3 text-sm md:text-lg">
                    <Instagram />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="uppercase md:text-xl text-white font-bold">{t("contacts.instagramTitle")}</h6>
                    <Link href={t("contacts.instagramUrl")} className="underline text-sm md:text-base">@menu_master_dg</Link>
                  </div>
                </div>
                <Button className="text-primary bg-white hover:bg-secondary w-full mt-4 md:mt-6">{t("home.contactBtn")}</Button>
              </Card>
              <Card className="bg-mesh text-white border-primary p-2 sm:p-4 md:p-6 shadow-md">
                <div className=" flex flex-row items-center gap-2 md:gap-4">
                  <div className="rounded-full bg-muted/20 p-1.5 md:p-3 text-sm md:text-lg">
                    <MapPin />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="uppercase md:text-xl text-white font-bold">{t("contacts.locationTitle")}</h6>
                    <Link href={t("contacts.locationUrl")} className="underline text-sm md:text-base">Desoq, kafr El-sheakh</Link>
                  </div>
                </div>
                <Button className="text-primary bg-white hover:bg-secondary w-full mt-4 md:mt-6">{t("home.contactBtn")}</Button>
              </Card>
              <Card className="bg-mesh text-white border-primary p-2 sm:p-4 md:p-6 shadow-md">
                <div className=" flex flex-row items-center gap-2 md:gap-4">
                  <div className="rounded-full bg-muted/20 p-1.5 md:p-3 text-sm md:text-lg">
                    <Linkedin />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="uppercase md:text-xl text-white font-bold">{t("contacts.linkedinTitle")}</h6>
                    <Link href={t("contacts.linkedinUrl")} className="underline text-sm md:text-base">Menu Master DG</Link>
                  </div>
                </div>
                <Button className="text-primary bg-white hover:bg-secondary w-full mt-4 md:mt-6">{t("home.contactBtn")}</Button>
              </Card>
              <Card className="bg-mesh text-white border-primary p-2 sm:p-4 md:p-6 shadow-md">
                <div className=" flex flex-row items-center gap-2 md:gap-4">
                  <div className="rounded-full bg-muted/20 p-1.5 md:p-3 text-sm md:text-lg">
                    <Facebook />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="uppercase md:text-xl text-white font-bold">{t("contacts.facebookTitle")}</h6>
                    <Link href={t("contacts.facebookUrl")} className="underline text-sm md:text-base">Menu Master DG</Link>
                  </div>
                </div>
                <Button className="text-primary bg-white hover:bg-secondary w-full mt-4 md:mt-6">{t("home.contactBtn")}</Button>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{t("common.menuMaster")}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2023 {t("common.menuMaster")}. {t("home.footerRights")}
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium">
              {t("home.terms")}
            </Link>
            <Link href="#" className="text-sm font-medium">
              {t("home.privacy")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
