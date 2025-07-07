import jwt from "jsonwebtoken"
import { query } from "./db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "customer" | "admin"
}

// export async function hashPassword(password: string): Promise<string> {
//   return bcrypt.hash(password, 12)
// }

// export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
//   try {
//     if (!password || !hashedPassword) {
//       return false;
//     }
//     return await bcrypt.compare(password, hashedPassword);
//   } catch (error) {
//     return false;
//   }
// }

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      id: decoded.id,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      role: decoded.role,
    }
  } catch {
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const result = await query("SELECT id, email, first_name, last_name, role FROM users WHERE id = $1", [id])

    if (result.rows.length === 0) return null

    const user = result.rows[0]
    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
    }
  } catch {
    return null
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await query("SELECT * FROM users WHERE email = $1", [email])
    return result.rows[0] || null
  } catch {
    return null
  }
}
