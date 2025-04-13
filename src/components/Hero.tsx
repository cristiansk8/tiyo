import Image from "next/image"
import SigninButton from "./auth/SigninButton"

export function Hero() {
    return (
        <section className="w-full bg-gradient-to-b from-blue-500 to-blue-600">
<div className="container mx-auto px-4 py-20 text-center text-white">
  <div className="mx-auto max-w-2xl">
    {/* Contenedor flex para centrar la imagen */}
    <div className="flex justify-center">
      <Image
        src="/logo-texto.png"
        alt="tiyo"
        width={500}
        height={100}
        className="transition-all duration-300 h-50 w-auto"
        priority
      />
    </div>
    <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
      Vende nuestro catalogo al por mayor o detal
    </h1>
    <p className="mx-auto mb-8 text-lg text-gray-200 md:max-w-xl">
      Emprende, crece, vive 
    </p>
    <div className="w-full max-w-sm mx-auto justify-around flex flex-row items-center">
      <SigninButton urlRedirec="/dashboard/user/profile">
        Empezar
      </SigninButton>
    </div>
  </div>
</div>
        </section>
    )
}