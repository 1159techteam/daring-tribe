"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { displayUsername } from "@/lib/learn/display-name"
import { cn } from "@/lib/utils"

const itemClass =
  "flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-[#3E2C1C] outline-none hover:bg-[#F5F5F0] focus:bg-[#F5F5F0] data-[highlighted]:bg-[#F5F5F0]"

export function UserMenu({ className }: { className?: string }) {
  const { user, signOut } = useAuth()
  if (!user) return null

  const initial = displayUsername({
    name: (user.user_metadata?.name as string) || (user.user_metadata?.full_name as string),
    email: user.email,
  })
    .charAt(0)
    .toUpperCase()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            "rounded-full outline-none ring-offset-2 transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#D4AF37]",
            className
          )}
          aria-label="Account menu"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3E2C1C] text-sm font-bold text-[#D4AF37] ring-2 ring-[#D4AF37]/40">
            {initial}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[100] min-w-[11rem] overflow-hidden rounded-lg border border-[#3E2C1C]/10 bg-white p-1 shadow-[0_12px_40px_rgba(62,44,28,0.12)]"
          sideOffset={8}
          align="end"
        >
          <DropdownMenu.Item asChild className={itemClass}>
            <Link href="/profile">Profile</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild className={itemClass}>
            <Link href="/profile/edit">Edit profile</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-[#3E2C1C]/10" />
          <DropdownMenu.Item
            className={cn(itemClass, "text-[#6D5D56]")}
            onSelect={(e) => {
              e.preventDefault()
              void signOut()
            }}
          >
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
