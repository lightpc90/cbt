import { NextResponse } from "next/server";

export async function POST(req) {
    const response = NextResponse.json(
        { success: true, message: "Successfully logged out" },
    );

    // Clear the token cookie by setting it with a past expiration date
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0), // Expire immediately
        path: '/',
    });

    return response;
}
