"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CalendarDays, Home, Leaf, LogOut, Settings, Trophy, Users, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:flex md:w-64 md:flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="font-semibold text-lg">EcoMate</span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <nav className="flex flex-1 flex-col gap-1">
          <NavItem href="/" icon={Home} isActive={pathname === "/"}>
            Dashboard
          </NavItem>
          <NavItem href="/log-activity" icon={BarChart3} isActive={pathname === "/log-activity"}>
            Log Activity
          </NavItem>
          <NavItem href="/offsets" icon={Leaf} isActive={pathname === "/offsets"}>
            Offsets
          </NavItem>
          <NavItem href="/challenges" icon={Zap} isActive={pathname === "/challenges"}>
            Challenges
          </NavItem>
          <NavItem href="/community" icon={Users} isActive={pathname === "/community"}>
            Community
          </NavItem>
          <NavItem href="/leaderboard" icon={Trophy} isActive={pathname === "/leaderboard"}>
            Leaderboard
          </NavItem>

          <div className="mt-4 text-xs font-medium text-muted-foreground">Other</div>

          <NavItem href="/calendar" icon={CalendarDays} isActive={pathname === "/calendar"}>
            Calendar
          </NavItem>
          <NavItem href="/settings" icon={Settings} isActive={pathname === "/settings"}>
            Settings
          </NavItem>
        </nav>

        <div className="mt-auto">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </div>
            </div>
            <ModeToggle />
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 mt-2">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
  children: React.ReactNode
}

function NavItem({ href, icon: Icon, isActive, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent text-accent-foreground" : "transparent",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  )
}
