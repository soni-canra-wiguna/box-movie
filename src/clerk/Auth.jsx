import { SignIn, SignUp } from "@clerk/clerk-react"

export function Sign() {
  return (
    <div className="fixed top-0 z-[999] flex h-screen w-full items-center justify-center bg-white">
      <SignIn className="shadow-2xl" path="/sign-in" />
    </div>
  )
}

export function Up() {
  return (
    <div className="fixed top-0 z-[999] flex h-screen w-full items-center justify-center bg-white">
      <SignUp className="shadow-2xl" routing="path" path="/sign-up" />
    </div>
  )
}
