import { ImageResponse } from 'next/og'

export const alt = 'Sondhani DDC Lab Report System'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" stroke="none" style={{ width: 80, height: 80, marginBottom: 16 }}>
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
        <div style={{ fontWeight: 'bold', letterSpacing: '-0.05em' }}>Sondhani DDC</div>
        <div style={{ fontSize: 32, color: 'gray', marginTop: 12 }}>Diagnostic & Clinical Laboratory</div>
      </div>
    ),
    {
      ...size,
    }
  )
}
