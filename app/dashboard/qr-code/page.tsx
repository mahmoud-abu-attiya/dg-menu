"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Share } from "lucide-react"
import { QRCode } from "@/components/qr-code"
import { useLanguage } from "@/contexts/language-context"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function QRCodePage() {
  const { t } = useLanguage()
  const [menuUrl, setMenuUrl] = useState("https://menumaster.app/r/example-restaurant")
  const [qrSize, setQrSize] = useState(200)
  const [qrColor, setQrColor] = useState("#000000")
  const [qrBgColor, setQrBgColor] = useState("#ffffff")

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-3xl font-bold tracking-tight">{t("qrCode.qrCodeGenerator")}</h1>
        </div>
        {/* <h1 className="text-3xl font-bold tracking-tight">{t("qrCode.qrCodeGenerator")}</h1> */}
      </div>
      <p className="text-muted-foreground">{t("qrCode.qrCodeDesc")}</p>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("qrCode.qrCodeSettings")}</CardTitle>
            <CardDescription>{t("qrCode.qrCodeSettingsDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="menu-url">{t("qrCode.menuUrl")}</Label>
              <Input
                id="menu-url"
                value={menuUrl}
                onChange={(e) => setMenuUrl(e.target.value)}
                placeholder="https://menumaster.app/r/your-restaurant"
              />
              <p className="text-xs text-muted-foreground">{t("qrCode.menuUrlDesc")}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qr-size">{t("qrCode.qrCodeSize")}</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="qr-size"
                  type="range"
                  min="100"
                  max="400"
                  step="10"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number.parseInt(e.target.value))}
                />
                <span className="w-12 text-right">{qrSize}px</span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="qr-color">{t("qrCode.qrCodeColor")}</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: qrColor }}></div>
                  <Input
                    id="qr-color"
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="h-10 w-full"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qr-bg-color">{t("qrCode.backgroundColor")}</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: qrBgColor }}></div>
                  <Input
                    id="qr-bg-color"
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="h-10 w-full"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("qrCode.qrCodePreview")}</CardTitle>
            <CardDescription>{t("qrCode.qrCodePreviewDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-lg border p-4">
              <QRCode value={menuUrl} size={qrSize} fgColor={qrColor} bgColor={qrBgColor} level="H" includeMargin />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="gap-2">
              <Share className="h-4 w-4" />
              {t("common.share")}
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              {t("common.download")}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("qrCode.printOptions")}</CardTitle>
          <CardDescription>{t("qrCode.printOptionsDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">{t("qrCode.tableTent")}</TabsTrigger>
              <TabsTrigger value="poster">{t("qrCode.poster")}</TabsTrigger>
              <TabsTrigger value="sticker">{t("qrCode.sticker")}</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <div className="flex items-center gap-6">
                <div className="h-48 w-32 rounded-md bg-muted flex items-center justify-center">
                  <QRCode value={menuUrl} size={100} fgColor={qrColor} bgColor={qrBgColor} level="H" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{t("qrCode.tableTent")}</h3>
                  <p className="text-sm text-muted-foreground">{t("qrCode.tableTentDesc")}</p>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    {t("qrCode.downloadPdf")}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="poster">
              <div className="flex items-center gap-6">
                <div className="h-48 w-36 rounded-md bg-muted flex items-center justify-center">
                  <QRCode value={menuUrl} size={100} fgColor={qrColor} bgColor={qrBgColor} level="H" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{t("qrCode.poster")}</h3>
                  <p className="text-sm text-muted-foreground">{t("qrCode.posterDesc")}</p>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    {t("qrCode.downloadPdf")}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="sticker">
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                  <QRCode value={menuUrl} size={80} fgColor={qrColor} bgColor={qrBgColor} level="H" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{t("qrCode.sticker")}</h3>
                  <p className="text-sm text-muted-foreground">{t("qrCode.stickerDesc")}</p>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    {t("qrCode.downloadPdf")}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
