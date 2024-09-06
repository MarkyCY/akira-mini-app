"use client"
import React from "react"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export default function Settings() {

    const [value, setValue] = React.useState("")

    return (
        <div className="flex flex-col space-y-3 items-center justify-center h-screen">
            <svg className="w-[100px] h-[100px] text-neutral-100 dark:text-white animate-pulse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
            </svg>

            <InputOTP maxLength={4} className="place-content-center" pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={value} onChange={(value) => setValue(value)}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    )
}
