"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import bcrypt from "bcryptjs"
import { safeGetFromLocalStorage, safeSetToLocalStorage, safeRemoveFromLocalStorage } from "@/utils/localStorage"

interface UserSession {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "super_admin"
  avatar?: string
  lastLogin: string
}

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Get users from localStorage
  const getUsers = (): UserSession[] => {
    return safeGetFromLocalStorage<UserSession[]>("users", [])
  }

  // Save users to localStorage
  const saveUsers = (users: UserSession[]) => {
    safeSetToLocalStorage("users", users)
  }

  // Set current user in localStorage and cookies
  const setCurrentUser = (user: UserSession) => {
    if (typeof window !== "undefined") {
      const userSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        lastLogin: new Date().toISOString(),
      }
      safeSetToLocalStorage("currentUser", userSession)

      // Set cookie for server-side access
      document.cookie = `user-session=${JSON.stringify(userSession)}; path=/; max-age=86400` // 24 hours
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const users = getUsers()
      const user = users.find((u) => u.email === loginData.email)

      if (user && await bcrypt.compare(loginData.password, user.password)) {
        // Update last login
        const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u))
        saveUsers(updatedUsers)

        // Set current user session
        setCurrentUser({ ...user, lastLogin: new Date().toISOString() })

        toast({
          title: "Success",
          description: `Welcome back, ${user.name}!`,
        })

        // Redirect based on role
        if (user.role === "super_admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const users = getUsers()

      // Check if user already exists
      if (users.find((u) => u.email === registerData.email)) {
        toast({
          title: "Error",
          description: "User with this email already exists",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Create new user with hashed password
      const hashedPassword = await bcrypt.hash(registerData.password, 12)
      const newUser: UserSession = {
        id: Date.now().toString(),
        name: registerData.name,
        email: registerData.email,
        password: hashedPassword,
        role: registerData.email === "admin@arekta.store" ? "super_admin" : "user",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(registerData.name)}&background=3b82f6&color=fff`,
      }

      users.push(newUser)
      saveUsers(users)
      setCurrentUser(newUser)

      toast({
        title: "Success",
        description: `Account created successfully! Welcome, ${newUser.name}!`,
      })

      // Redirect based on role
      if (newUser.role === "super_admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    // For demo purposes, create a Google user
    const googleUser: UserSession = {
      id: Date.now().toString(),
      name: "Google User",
      email: "user@gmail.com",
      password: "",
      role: "user",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      avatar: "https://ui-avatars.com/api/?name=Google+User&background=4285f4&color=fff",
    }

    const users = getUsers()
    const existingUser = users.find((u) => u.email === googleUser.email)

    if (existingUser) {
      setCurrentUser(existingUser)
    } else {
      users.push(googleUser)
      saveUsers(users)
      setCurrentUser(googleUser)
    }

    toast({
      title: "Success",
      description: "Signed in with Google successfully!",
    })

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Arekta.store</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Register
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <Button variant="outline" className="w-full bg-transparent" onClick={handleGoogleSignIn}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>
            </div>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                  {registerData.email === "admin@arekta.store" && (
                    <p className="text-xs text-blue-600">🔐 Super Admin account detected</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password (min 6 characters)"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Demo: Use <strong>admin@arekta.store</strong> for Super Admin access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
