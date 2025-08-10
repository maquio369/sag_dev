import { getCookie } from "./utils/util";

const protectedPages = ["/home", "/admin", "/contactos", "/humanos", "/sistemas", "/usuarios", "/test"];

export default function middleware(req: any, res: any) {

  try {
    let ck = getCookie("__next_hmr_refreshacc__", req.cookies.toString());
  } finally {
  }
  if (protectedPages.find((p) => p === req.nextUrl.pathname)) {
    //console.log("middleWARE", req.nextUrl.pathname);
    let token = getCookie("__next_hmr_refreshacc__", req.cookies.toString());
    if (!token) {
      console.log("access not found, redirecting to login");
      return Response.redirect(new URL("/login", req.url));
    } else {
      //console.log("access token found");
    }
  }
}

