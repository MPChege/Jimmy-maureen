import { NextResponse } from 'next/server'
import { saveRSVP } from '@/lib/neon'
import { Resend } from 'resend'

function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

function formatRsvpEmail(data: {
  name: string
  phone?: string
  guests: string
  attendance: string
  message?: string
}) {
  const attendanceEmoji =
    data.attendance === 'yes' ? '✅' : data.attendance === 'no' ? '❌' : '🤔'
  const attendanceLabel =
    data.attendance === 'yes'
      ? 'Coming!'
      : data.attendance === 'no'
        ? 'Not Coming'
        : 'Maybe'

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #1A0F0A; color: #F5E9D5; padding: 40px; border-radius: 16px; border: 1px solid rgba(212,175,55,0.2);">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="font-size: 48px; margin-bottom: 8px;">💌</div>
        <h1 style="font-family: serif; color: #D4AF37; font-size: 24px; margin: 0; font-weight: 300;">New RSVP Received</h1>
        <p style="color: rgba(245,233,213,0.4); font-size: 13px; margin-top: 4px;">Jimmi & Maureen — Introduction Ceremony</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.1); color: rgba(245,233,213,0.4); font-size: 12px; width: 120px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.1); color: #F5E9D5; font-size: 14px;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.1); color: rgba(245,233,213,0.4); font-size: 12px;">Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.1); color: #F5E9D5; font-size: 14px;">${data.phone || '—'}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.1); color: rgba(245,233,213,0.4); font-size: 12px;">Guests</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.1); color: #F5E9D5; font-size: 14px;">${data.guests}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.1); color: rgba(245,233,213,0.4); font-size: 12px;">Attendance</td>
          <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.1); color: #F5E9D5; font-size: 14px;">${attendanceEmoji} ${attendanceLabel}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: rgba(245,233,213,0.4); font-size: 12px; vertical-align: top;">Message</td>
          <td style="padding: 12px 0; color: rgba(245,233,213,0.6); font-size: 14px; font-style: italic;">${data.message || '—'}</td>
        </tr>
      </table>

      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(212,175,55,0.1); text-align: center;">
        <p style="color: rgba(245,233,213,0.2); font-size: 11px;">
          Sent from your wedding RSVP system
        </p>
      </div>
    </div>
  `
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.attendance) {
      return NextResponse.json(
        { error: 'Name and attendance are required' },
        { status: 400 }
      )
    }

    await saveRSVP(body)

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        await getResend()!.emails.send({
          from: 'RSVP <rsvp@resend.dev>',
          to: 'maumwangi2@gmail.com',
          subject: `💌 New RSVP from ${body.name}`,
          html: formatRsvpEmail(body),
        })
      } catch (emailErr) {
        console.error('Failed to send email:', emailErr)
      }
    }

    return NextResponse.json({ success: true, message: 'RSVP saved successfully' })
  } catch (error) {
    console.error('RSVP error:', error)
    return NextResponse.json(
      { error: 'Failed to process RSVP' },
      { status: 500 }
    )
  }
}
