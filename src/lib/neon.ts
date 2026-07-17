import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function getRSVPs() {
  return sql`SELECT * FROM rsvps ORDER BY timestamp DESC`
}

export async function saveRSVP(data: {
  name: string
  phone?: string
  guests: string
  attendance: string
  message?: string
}) {
  return sql`
    INSERT INTO rsvps (name, phone, guests, attendance, message)
    VALUES (${data.name}, ${data.phone || ''}, ${Number(data.guests || 1)}, ${data.attendance}, ${data.message || ''})
    RETURNING *
  `
}

export { sql }
