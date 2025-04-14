import { Footprints } from "lucide-react"
import SigninButton from "./auth/SigninButton"

export function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-20 text-white" id="cta">
      <div className="container mx-auto px-4 text-center">
        <Footprints className="mx-auto mb-6 h-16 w-16" />
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Listo para empezar a vender?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200">
        ¡Descubre información valiosa e impulsa tus estrategias de marketing hoy mismo!
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <SigninButton
            urlRedirec="/dashboard/user/profile"
          >Empezar</SigninButton>
        </div>
      </div>
    </section>
  )
}