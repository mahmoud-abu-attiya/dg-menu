"use client"

import { QRCodeSVG } from "qrcode.react"

interface QRCodeProps {
  value: string
  size?: number
  fgColor?: string
  bgColor?: string
  level?: "L" | "M" | "Q" | "H"
  includeMargin?: boolean
}

export function QRCode({
  value,
  size = 200,
  fgColor = "#000000",
  bgColor = "#FFFFFF",
  level = "H",
  includeMargin = false,
}: QRCodeProps) {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      fgColor={fgColor}
      bgColor={bgColor}
      level={level}
      includeMargin={includeMargin}
    />
  )
}
