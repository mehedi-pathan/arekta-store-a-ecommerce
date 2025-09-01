"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import bcrypt from "bcryptjs"
import { Mail, Lock, Save, Camera, Shield } from "lucide-react"
import Image from "next/image"

interface UserInterface {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "super_admin"
  avatar?: string
  lastLogin: string
  createdAt: string
}

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSession = localStorage.getItem("currentUser")
      if (userSession) {
        const user = JSON.parse(userSession)
        setCurrentUser(user)
        setFormData({
          name: user.name,
          email: user.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      } else {
        router.push("/login")
      }
      setIsLoading(false)
    }
  }, [router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      if (typeof window !== "undefined") {
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const updatedUsers = users.map((user: UserInterface) =>
          user.id === currentUser?.id ? { ...user, name: formData.name, email: formData.email } : user,
        )

        localStorage.setItem("users", JSON.stringify(updatedUsers))

        const updatedCurrentUser = { ...currentUser!, name: formData.name, email: formData.email }
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser))
        setCurrentUser(updatedCurrentUser)

        toast({
          title: "Success",
          description: "Profile updated successfully!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    try {
      if (typeof window !== "undefined") {
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userIndex = users.findIndex((user: UserInterface) => user.id === currentUser?.id)

        if (userIndex !== -1 && await bcrypt.compare(formData.currentPassword, users[userIndex].password)) {
          const hashedNewPassword = await bcrypt.hash(formData.newPassword, 12)
          users[userIndex].password = hashedNewPassword
          localStorage.setItem("users", JSON.stringify(users))

          setFormData({
            ...formData,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          })

          toast({
            title: "Success",
            description: "Password changed successfully!",
          })
        } else {
          toast({
            title: "Error",
            description: "Current password is incorrect",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your profile and account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-block mb-4">
                {currentUser.avatar ? (
                  <Image
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={currentUser.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full border-4 border-blue-100"
                  />
                ) : (
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200">
                    <Mail className="h-12 w-12 text-blue-600" />
                  </div>
                )}
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  onClick={() => toast({ title: "Coming Soon", description: "Avatar upload feature coming soon!" })}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{currentUser.name}</h3>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
              {currentUser.role === "super_admin" && (
                <div className="flex items-center justify-center mt-2">
                  <Shield className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600 font-medium">Super Admin</span>
                </div>
              )}
              <div className="mt-4 text-xs text-gray-500">
                <p>Member since: {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                <p>Last login: {new Date(currentUser.lastLogin).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Change Password
              </CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
                  {isSaving ? (
                    "Changing..."
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Account Information
              </CardTitle>
              <CardDescription>Your account details and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium text-gray-700">Account ID</span>
                  <span className="text-sm text-gray-500">{currentUser.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium text-gray-700">Account Type</span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      currentUser.role === "super_admin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {currentUser.role === "super_admin" ? "Super Admin" : "Regular User"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium text-gray-700">Account Status</span>
                  <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800">Active</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-700">Member Since</span>
                  <span className="text-sm text-gray-500">{new Date(currentUser.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
