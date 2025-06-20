export function getCookie(cname: string, documentcookie: string): any {
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

export function ofuscad(cad: string, encode: boolean): string {
  let encoded = "";
  if (encode) {
    encoded = Buffer.from(cad).toString("base64").split("").reverse().join("");
  } else {
    encoded = Buffer.from(cad.split("").reverse().join(""), "base64").toString(
      "utf-8"
    );
  }
  return encoded;
}
