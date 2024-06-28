import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export async function middleware(req) {
  console.log("request cookies object: ", req.cookies)

  async function isVerified(token) {

    try {
      const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
      const { payload } = await jwtVerify(token, secret)
      return { success: true, data: payload }
    }
    catch (error) {
      console.log("catch error: ", error)
      return { success: false, error }
    }
  }

  const token = req.cookies.get('token')?.value

  console.log('token retrieved: ', token)

  if (!token) {
    console.log('no token found')
    return NextResponse.redirect(new URL('/', req.url))
  }

  const verify = await isVerified(token)


  if (verify.success === false) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Extract user details from the route
  const url = new URL(req.url);
  const pathname = url.pathname;
  const pathParts = pathname.split('/');
  console.log("path parts: ", pathParts)

  if (pathParts.length >= 3 && (pathParts[1] === 'admin' || pathParts[1] === 'examiner')) {
    console.log("inside path checked...")
    const userIdentifier = pathParts[2];
    const [firstname, lastname] = userIdentifier.split('_');
    const userId = pathParts[3];

    // Check if route details match the JWT data
    const userData = verify.data;

    if (userData.firstname !== firstname || userData.lastname !== lastname || userData._id !== userId) {
      console.log("failed inside user data check...")
      console.log("route details do not match user details");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  else {
    console.log("failed inside else statement...")
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next()


}

export const config = {
  matcher: ['/admin/:path*', '/examiner/:path*']
}