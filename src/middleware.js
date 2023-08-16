import { NextResponse , NextRequest } from 'next/server'
 


export async function middleware(request) {

    const path = request.nextUrl.pathname

    const public_path = path == '/login' || path == '/signup'

    const home_path = path =='/'

    const token = request.cookies.get('Token')?.value || ''

    if ((public_path && token)|| (home_path && token)){
        const url = request.nextUrl.clone()
        url.pathname = '/profile'
        return NextResponse.redirect(url)
    }

    if ((!public_path && !token)|| (home_path && !token)){
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }


}
 

export const config = {
  matcher: ['/','/login','/signup','/profile','/connection'],
}