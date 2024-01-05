import { NextResponse } from 'next/server'
import  parseJwt  from '@/utils/auth'
// This function checks the user's role
async function  getUserRole(req) {
  const jwt = req.cookies.get('jwt')
  if (!jwt) {
    return {}
  }
  const userData = await parseJwt(jwt.value) // You'd need to implement parseJwt
  return await userData.role
}

export default async function middleware(req) {
  const role = await getUserRole(req)
  if (req.nextUrl.pathname.startsWith('/admin/dashboard') && role !== 'admin') {
    // If the user is not an admin, redirect them to the home page (or wherever you'd like)
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl).href, {
      status: 302,
    })

  }
  if (req.nextUrl.pathname.startsWith('/customer') && role !== 'customer') {
    // If the user is not an admin, redirect them to the home page (or wherever you'd like)
    return NextResponse.redirect(new URL('/?openLogin=true', req.nextUrl).href, {
      status: 302,
    })

  }
  if ((req.nextUrl.pathname.startsWith('/handicraft/dashboard') || req.nextUrl.pathname.startsWith('/handicraft/profile') ) && role !== 'handicraft') {
    // If the user is not an admin, redirect them to the home page (or wherever you'd like)
    return NextResponse.redirect(new URL('/?openLogin=true', req.nextUrl).href, {
      status: 302,
    })

  }
}

/* export const config = {
  matcher: '/admin/dashboard/:path*',
} */
