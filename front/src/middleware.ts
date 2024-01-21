import { withAuth } from "next-auth/middleware"

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const beforeLoginShowPages: string[] = ["/login", "/signup"];
      if (!beforeLoginShowPages.includes(req.nextUrl.pathname) && token === null) {
        return false
      }
      return true
    },
  },
})