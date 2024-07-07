import { getToken } from 'next-auth/jwt';
import {
  NextRequest,
  NextResponse,
} from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const authToken = await getToken({req: request})
    const loggedInUserNotAccessiblePaths = 
    request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'

    if(
      loggedInUserNotAccessiblePaths
    ){
      if(authToken){
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
    else{
      if(!authToken){
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }

    const loggedInUserNotAuthorizedPaths =
    request.nextUrl.pathname === '/admin' 

    if(
      request.nextUrl.pathname.startsWith('/admin')
    ){
      if(authToken){
        const is_mod = authToken.is_staff
        if(is_mod === false){
          return NextResponse.redirect(new URL('/', request.url))
        }
        else{
          return NextResponse.next()
        }
      }
      else{
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login','/register', 
  //all routes under /user
  '/user/:path*',
  '/admin/:path*',
]
}