"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { useRouter } from 'next/navigation';
import WebApp from '@twa-dev/sdk';
import { WebAppInitData } from '@/lib/WebApp';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const LoginPage: React.FC = () => {

    const [initData, setInitData] = useState<WebAppInitData | null>(null);

    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [mesg, setMsg] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setInitData(WebApp.initDataUnsafe as WebAppInitData);
        }
    }, []);

    const handleChange = (value: string) => {
        const isNumeric = /^\d+$/.test(value);

        if (isNumeric || value === '') {
            setPassword(value);
        }
    }

    const handleComplete = async (value: string) => {
        setIsDisabled(true);
        if (initData && initData.user?.username) {
            const result = await login(initData.user?.username, value)
            setMsg(result.message);

            if (result.success) {
                router.push('/');
            } else {
                setIsDisabled(false);
                setPassword('');
            }
        }
    }

    return (
        <div className="fixed flex flex-col space-y-3 inset-x-0 bottom-12 items-center justify-center h-screen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[150px] h-[150px] pb-5 text-neutral-100 dark:text-white">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm.002 7a2 2 0 0 0 -1.995 1.85l-.005 .15l.005 .15a2 2 0 0 0 .995 1.581v1.769l.007 .117a1 1 0 0 0 1.993 -.117l.001 -1.768a2 2 0 0 0 -1.001 -3.732z" />
            </svg>

            <InputOTP maxLength={4} inputMode='numeric' className="place-content-center" pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={password} onComplete={handleComplete} onChange={handleChange} disabled={isDisabled}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
            <p className='dark:text-white'>{mesg}</p>
        </div>
    )
};

export default LoginPage;
