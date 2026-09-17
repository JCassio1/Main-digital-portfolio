'use client'

import Lanyard from '@/components/Lanyard'
import { useEffect, useState } from 'react'

const PORTRAIT_SRC = '/joselson-badge-picture.png'
const NAME = 'Joselson Dias'
const TITLE = 'Software Engineer @ Your Company'

const CANVAS_WIDTH = 640
const CANVAS_HEIGHT = 896

function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  font: (px: number) => string,
  startPx: number,
  maxWidth: number
): number {
  let px = startPx
  ctx.font = font(px)
  while (px > 14 && ctx.measureText(text).width > maxWidth) {
    px -= 1
    ctx.font = font(px)
  }
  return px
}

function useBadgeFrontImage(photoSrc: string, name: string, title: string): string | null {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return

      const canvas = document.createElement('canvas')
      canvas.width = CANVAS_WIDTH
      canvas.height = CANVAS_HEIGHT
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Cover-fit the portrait, anchored to the bottom (matches the original avatar crop)
      const scale = Math.max(CANVAS_WIDTH / img.width, CANVAS_HEIGHT / img.height)
      const drawWidth = img.width * scale
      const drawHeight = img.height * scale
      const dx = (CANVAS_WIDTH - drawWidth) / 2
      const dy = CANVAS_HEIGHT - drawHeight
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight)

      // Frosted info bar with name + role, echoing the previous card's overlay
      const barHeight = 168
      const barX = 28
      const barY = CANVAS_HEIGHT - barHeight - 28
      const barWidth = CANVAS_WIDTH - barX * 2
      const radius = 20

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(barX + radius, barY)
      ctx.arcTo(barX + barWidth, barY, barX + barWidth, barY + barHeight, radius)
      ctx.arcTo(barX + barWidth, barY + barHeight, barX, barY + barHeight, radius)
      ctx.arcTo(barX, barY + barHeight, barX, barY, radius)
      ctx.arcTo(barX, barY, barX + barWidth, barY, radius)
      ctx.closePath()
      ctx.fillStyle = 'rgba(10, 10, 10, 0.6)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.restore()

      const maxTextWidth = barWidth - 48
      ctx.textAlign = 'center'

      const nameFont = (px: number) => `700 ${px}px system-ui, -apple-system, sans-serif`
      const namePx = fitFontSize(ctx, name, nameFont, 40, maxTextWidth)
      ctx.font = nameFont(namePx)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
      ctx.fillText(name, CANVAS_WIDTH / 2, barY + 66)

      const titleFont = (px: number) => `500 ${px}px system-ui, -apple-system, sans-serif`
      const titlePx = fitFontSize(ctx, title, titleFont, 26, maxTextWidth)
      ctx.font = titleFont(titlePx)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      ctx.fillText(title, CANVAS_WIDTH / 2, barY + 112)

      setDataUrl(canvas.toDataURL('image/png'))
    }
    img.src = photoSrc

    return () => {
      cancelled = true
    }
  }, [photoSrc, name, title])

  return dataUrl
}

export default function DraggableLanyard() {
  const frontImage = useBadgeFrontImage(PORTRAIT_SRC, NAME, TITLE)

  return (
    <div className='relative mx-auto -mt-10 h-[2200px] w-full max-w-[60rem] overflow-visible'>
      <Lanyard
        className='h-[1400px] justify-start items-start'
        frontImage={frontImage}
        backImage={frontImage}
        imageFit='cover'
      />
    </div>
  )
}
