import { ImageResponse } from 'next/og'

// Composed from the existing design tokens rather than a static asset —
// no 1200x630 brand image exists in the repo, and generating it here keeps
// it in sync with the palette and adds no dependency.
export const runtime = 'edge'

export const alt =
  'The Automation Agency — business process automation for UK SMEs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#131210'
const CREAM = '#f4ede0'
const LIME = '#c8f04a'
const MUTED = '#b7b0a2'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: INK,
          padding: '72px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 26,
            fontWeight: 700,
            color: CREAM,
            letterSpacing: '-0.01em',
          }}
        >
          The Automation Agency
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              color: CREAM,
              maxWidth: 980,
            }}
          >
            Stop doing work a&nbsp;<span style={{ color: LIME }}>machine can do.</span>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              color: MUTED,
              letterSpacing: '-0.01em',
            }}
          >
            Business process automation for UK SMEs. Fixed prices, agreed before we start.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `2px solid rgba(244,237,224,0.16)`,
            paddingTop: 28,
            fontSize: 26,
            color: MUTED,
          }}
        >
          <div style={{ display: 'flex' }}>automation-agency.co.uk</div>
          <div style={{ display: 'flex', color: CREAM, fontWeight: 700 }}>
            Chesterfield, Derbyshire · 01246 923041
          </div>
        </div>
      </div>
    ),
    size
  )
}
