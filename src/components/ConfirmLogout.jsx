import { SignOutButton } from "@clerk/clerk-react"

export const ConfirmLogout = ({ closeModalLoggingOut }) => {
  return (
    <>
      <div className="fixed left-1/2 top-1/2 z-[52] flex aspect-[16/10] w-full max-w-xs -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center space-y-8 rounded-md border border-gray-400/30 bg-black">
        <h1 className="text-md font-medium">
          Are you sure you want to log out?
        </h1>
        <div className="flex space-x-8">
          <button
            className="rounded-md border border-gray-400/30 px-3 py-2 hover:border-teal-400/30 hover:bg-teal-600/30"
            onClick={closeModalLoggingOut}
          >
            back
          </button>
          <SignOutButton
            onClick={closeModalLoggingOut}
            className={`rounded-md border border-gray-400/30 bg-red-600 px-3 py-2 hover:border-black hover:bg-red-700 group-hover:text-black`}
          >
            Yes, log out
          </SignOutButton>
        </div>
      </div>
      <div
        onClick={closeModalLoggingOut}
        className="fixed inset-0 z-[51] h-full w-full overflow-hidden bg-black/30"
      ></div>
    </>
  )
}
