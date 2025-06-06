
const signedInPages = ["/admin2", "/test"];

export default function middleware(req: any, res: any) {

  try {
    let ck = getCookie("access_token", req.cookies.toString());
  } finally {
  }
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    console.log("middleWARE", req.nextUrl.pathname);
    let token = getCookie("access_token", req.cookies.toString());
    if (!token) {
      console.log("access_token not found, redirecting to login");
      return Response.redirect(new URL("/login", req.url));
    } else {
      console.log("access token found");
    }
  }
}

function getCookie(cname: string, documentcookie: string): string {
  let name = cname + "=";
  let ca = documentcookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
