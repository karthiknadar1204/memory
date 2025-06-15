import { signIn, signOut, auth } from "@/auth"
 
export default async function SignIn() {
  const session = await auth()
  
  if (session) {
    return (
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button 
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Sign out
        </button>
      </form>
    )
  }

  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button 
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Sign in with Google
      </button>
    </form>
  )
} 