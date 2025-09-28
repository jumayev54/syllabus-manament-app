"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "teacher" | "department_head" | "dean" | "rector"
  campus?: string
  department?: string
  createdAt: string
  password?: string // Added password field for admin user creation
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  createUser: (userData: Omit<User, "id" | "createdAt">) => Promise<boolean> // Added createUser function
  updateUser: (id: string, userData: Partial<User>) => Promise<boolean> // Added updateUser function
  deleteUser: (id: string) => Promise<boolean> // Added deleteUser function
  getAllUsers: () => User[] // Added getAllUsers function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@universitet.uz",
    name: "Tizim Administratori",
    role: "admin",
    password: "admin123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "o.usmonov@universitet.uz",
    name: "Dr. Oybek Usmonov",
    role: "teacher",
    department: "Kompyuter Fanlari",
    campus: "Asosiy Kampus",
    password: "teacher123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "n.karimova@universitet.uz",
    name: "Prof. Nilufar Karimova",
    role: "department_head",
    department: "Kompyuter Fanlari",
    campus: "Asosiy Kampus",
    password: "head123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    email: "a.toshmatov@universitet.uz",
    name: "Dr. Akmal Toshmatov",
    role: "dean",
    department: "Muhandislik",
    campus: "Asosiy Kampus",
    password: "dean123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    email: "m.rahimova@universitet.uz",
    name: "Prof. Malika Rahimova",
    role: "rector",
    campus: "Asosiy Kampus",
    password: "rector123",
    createdAt: new Date().toISOString(),
  },
]

let users = [...mockUsers] // Make users mutable for CRUD operations

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("university_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find((u) => u.email === email)

    if (foundUser && foundUser.password === password) {
      const userWithoutPassword = { ...foundUser }
      delete userWithoutPassword.password
      setUser(userWithoutPassword)
      localStorage.setItem("university_user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("university_user")
  }

  const createUser = async (userData: Omit<User, "id" | "createdAt">): Promise<boolean> => {
    try {
      const newUser: User = {
        ...userData,
        id: (users.length + 1).toString(),
        createdAt: new Date().toISOString(),
      }
      users.push(newUser)
      localStorage.setItem("university_users", JSON.stringify(users))
      return true
    } catch (error) {
      return false
    }
  }

  const updateUser = async (id: string, userData: Partial<User>): Promise<boolean> => {
    try {
      const userIndex = users.findIndex((u) => u.id === id)
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData }
        localStorage.setItem("university_users", JSON.stringify(users))
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      users = users.filter((u) => u.id !== id)
      localStorage.setItem("university_users", JSON.stringify(users))
      return true
    } catch (error) {
      return false
    }
  }

  const getAllUsers = (): User[] => {
    return users.map((user) => {
      const userWithoutPassword = { ...user }
      delete userWithoutPassword.password
      return userWithoutPassword
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        createUser,
        updateUser,
        deleteUser,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
