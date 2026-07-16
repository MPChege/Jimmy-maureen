import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.name || !body.attendance) {
      return NextResponse.json(
        { error: 'Name and attendance are required' },
        { status: 400 }
      )
    }

    const dataDir = path.join(process.cwd(), 'data')
    const rsvpsFile = path.join(dataDir, 'rsvps.json')

    // Create data directory if it doesn't exist
    try {
      await fs.mkdir(dataDir, { recursive: true })
    } catch (err) {
      // Ignore if exists
    }

    // Read existing RSVPs
    let rsvps = []
    try {
      const fileContents = await fs.readFile(rsvpsFile, 'utf8')
      rsvps = JSON.parse(fileContents)
    } catch (err) {
      // File might not exist yet, which is fine
    }

    // Add new RSVP with timestamp
    const newRsvp = {
      ...body,
      timestamp: new Date().toISOString(),
    }
    rsvps.push(newRsvp)

    // Save back to file
    await fs.writeFile(rsvpsFile, JSON.stringify(rsvps, null, 2))

    return NextResponse.json({ success: true, message: 'RSVP saved successfully' })
  } catch (error) {
    console.error('RSVP error:', error)
    return NextResponse.json(
      { error: 'Failed to process RSVP' },
      { status: 500 }
    )
  }
}
