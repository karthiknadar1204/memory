'use server'

import { db } from '@/configs/db'
import { usersTable } from '@/configs/schema'
import { eq } from 'drizzle-orm'

export async function updateUserDetails(userData) {
  try {
    const { email, name, image, accessToken, refreshToken } = userData

    // Check if user exists
    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email)
    })

    if (existingUser) {
      // Update existing user
      await db.update(usersTable)
        .set({
          name,
          image,
          accessToken,
          refreshToken,
          updatedAt: new Date()
        })
        .where(eq(usersTable.email, email))
    } else {
      // Create new user
      await db.insert(usersTable).values({
        name,
        email,
        image,
        accessToken,
        refreshToken,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating user details:', error)
    return { success: false, error: error.message }
  }
} 