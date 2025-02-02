"use client"

import { useState } from "react"
// import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"     //CardFooter
import { Alert, AlertDescription } from "@/components/ui/alert"

import { loginStore } from "@/app/_store/login"

export default function LoginPage() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    const router = useRouter();
    const { loginRequest } = loginStore()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            console.log("Login attempted with:", { username:name, password:password })
            const {success, message, user} = await loginRequest({ username:name, password:password })
            if (!success) {
                setError(message)
            }
            else{
                console.log("Login successful with", user, "! Redirecting to notes page.")
                router.push("/notes")
            }
        //   setError("Login functionality not implemented yet")
        } catch (err) {
        setError("An error occurred. Please try again.")
        console.error("Login error:", err)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                )}
                <Button type="submit" className="w-full">
                Log In
                </Button>
            </form>
            </CardContent>
            {/* <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                Register here
                </Link>
            </p>
            </CardFooter> */}
        </Card>
        </div>
    )
    }

