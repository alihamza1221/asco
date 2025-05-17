// This file contains mock authentication functions that can be easily replaced with real API calls

// Types
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
}

export interface AuthResult {
  success: boolean
  message?: string
  user?: User
  token?: string
}

// Mock user database
const MOCK_USERS: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock authentication functions
export async function signIn(email: string, password: string): Promise<AuthResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, any email with a password will work
  // In a real implementation, you would validate credentials against your backend
  const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (user && password) {
    // Store user in localStorage for demo purposes
    // In a real app, you would store a JWT token or session ID
    localStorage.setItem("ecomate_user", JSON.stringify(user))
    localStorage.setItem("ecomate_token", "mock-jwt-token")

    return {
      success: true,
      user,
      token: "mock-jwt-token",
    }
  }

  return {
    success: false,
    message: "Invalid email or password",
  }
}

export async function signUp(userData: {
  firstName: string
  lastName: string
  email: string
  password: string
}): Promise<AuthResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Check if user already exists
  const existingUser = MOCK_USERS.find((u) => u.email.toLowerCase() === userData.email.toLowerCase())

  if (existingUser) {
    return {
      success: false,
      message: "Email already in use",
    }
  }

  // In a real implementation, you would create a new user in your database
  const newUser: User = {
    id: `${MOCK_USERS.length + 1}`,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  }

  // Add user to mock database
  MOCK_USERS.push(newUser)

  return {
    success: true,
    user: newUser,
  }
}

export async function signOut(): Promise<void> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Clear local storage
  localStorage.removeItem("ecomate_user")
  localStorage.removeItem("ecomate_token")
}

export async function getCurrentUser(): Promise<User | null> {
  // In a real app, you would validate the token with your backend
  const userJson = localStorage.getItem("ecomate_user")

  if (!userJson) {
    return null
  }

  try {
    return JSON.parse(userJson) as User
  } catch (error) {
    console.error("Error parsing user data:", error)
    return null
  }
}

export async function resetPassword(email: string): Promise<AuthResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user exists
  const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (!user) {
    // For security reasons, don't reveal if the email exists or not
    return {
      success: true,
      message: "If your email is registered, you will receive a password reset link",
    }
  }

  // In a real implementation, you would send an email with a reset link
  return {
    success: true,
    message: "Password reset link sent to your email",
  }
}

export async function confirmPasswordReset(token: string, newPassword: string): Promise<AuthResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real implementation, you would validate the token and update the password
  // For demo purposes, any token will work
  if (token && newPassword) {
    return {
      success: true,
      message: "Password reset successful",
    }
  }

  return {
    success: false,
    message: "Invalid or expired token",
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const token = localStorage.getItem("ecomate_token")
  return !!token
}
