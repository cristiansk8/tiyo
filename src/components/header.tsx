"use client";
import Link from "next/link";
import SigninButton from "./auth/SigninButton";
import Image from "next/image";


const Header = () => {
    return (
        <header className="flex gap-4 p-4 bg-gradient-to-b sticky top-0 z-50 bg-white shadow-sm">
            {/* <Appbar /> */}
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Ritzi"
                        width={200}
                        height={50}
                        className={`transition-all duration-300 "h-12 w-auto" : "h-14 w-auto"}`}
                        priority
                    />
                </Link>
                <nav className="hidden space-x-6 md:flex items-center">
                    <a href="#features" className="text-gray-600 transition-colors hover:text-blue-600">
                        Features
                    </a>
                    <a href="#pricing" className="text-gray-600 transition-colors hover:text-blue-600">
                        Pricing
                    </a>
                    <a href="#cta" className="text-gray-600 transition-colors hover:text-blue-600">
                        FAQ
                    </a>
                    {/* <SigninButton>
                        Create Qr
                    </SigninButton> */}
                    <SigninButton
                        urlRedirec="/dashboard/user/profile"
                        className={"bg-blue-600 text-white hover:text-black"}
                    >
                        Create Qr
                    </SigninButton>
                </nav>
            </div>
        </header>
    );
}

export default Header;