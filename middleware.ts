import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   const url = request.nextUrl;
   const lang = url.searchParams.get("lang"); // Get the 'lang' query parameter

   // Supported languages
   const supportedLanguages = ["en", "ar"];
   const defaultLanguage = "en";

   // If 'lang' is missing or not supported, redirect to the default language
   if (!lang || !supportedLanguages.includes(lang)) {
      url.searchParams.set("lang", defaultLanguage); // Set default language
      return NextResponse.redirect(url); // Redirect to the updated URL
   }

   // Allow the request to proceed if 'lang' is valid
   return NextResponse.next();
}
export const config = { matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$.*\\webp).*)" ]};