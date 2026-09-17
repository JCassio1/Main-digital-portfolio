import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          background: 'linear-gradient(135deg, #0f172a 0%, #111827 100%)',
          color: '#e2e8f0',
          fontFamily: 'Geist, Geist Sans, Arial, sans-serif'
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#22d3ee',
            marginBottom: 18,
            letterSpacing: 2
          }}
        >
          JD
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
            marginBottom: 20
          }}
        >
          Joselson Dias Portfolio
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.9,
            maxWidth: 900
          }}
        >
          Creative developer projects, design, and digital craft.
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
