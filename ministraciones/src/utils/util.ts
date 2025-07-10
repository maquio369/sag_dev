import * as zlib from "zlib";

//let encodedStr = "*";

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
export function setCookie(cname: string, cvalue: string | null) {
  if (cvalue === null) {
    document.cookie =
      cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  } else {
    document.cookie =
      cname + "=" + cvalue + ";" + process.env.JWT_EXPIRATION + ";path=/";
  }
}
export function ofuscad(cad: string, encode: boolean): string {
  let encoded = "";
  if (encode) {
    encoded = Buffer.from(cad.toString()).toString("base64").split("").reverse().join("");
  } else {
    encoded = Buffer.from(cad.split("").reverse().join(""), "base64").toString(
      "utf-8"
    );
  }
  return encoded;
}

/**Ejemplo de uso
 * document.cookie = `mnus=${await ofuscadAwait(JSON.stringify(jsonOptions), true, true)}; `;
 */
export async function ofuscadAwait(
  cad: string,
  encode: boolean,
  zippear: boolean
) {
  let encodedStr = "*";
  let encoded = "";
  if (encode) {
    encoded = Buffer.from(cad).toString("base64").split("").reverse().join("");
    if (zippear === true) {
      encodedStr = String(await zip64(encoded));
      //console.log("encodedStr: ", encodedStr);
      return encodedStr;
    } else {
      return encoded;
    }
  } else {
    //decoding
    if (zippear) {
      const txtUnZip = await unzip64(cad);
      //console.log("txtUnZip: ", txtUnZip);
      encodedStr = Buffer.from(
        String(txtUnZip).split("").reverse().join(""),
        "base64"
      ).toString("utf-8");
      return encodedStr;
    } else {
      encodedStr = Buffer.from(
        cad.split("").reverse().join(""),
        "base64"
      ).toString("utf-8");
      return encodedStr;
    }
  }
}

/**Ejemplos zip64 / unzip64
 * encodedStr = String(await zip64(encoded));
 * const txtUnZip = await unzip64(cad);
 */
export function zip64(str: string) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(str, "utf8");
    zlib.gzip(buffer, (err, compressed) => {
      if (err) return reject(err);
      resolve(compressed.toString("base64"));
    });
  });
}

export function unzip64(str64zip: string) {
  return new Promise((resolve, reject) => {
    const compressedBuffer = Buffer.from(str64zip, "base64");
    zlib.gunzip(compressedBuffer, (err, decompressedBuffer) => {
      if (err) return reject(err);
      resolve(decompressedBuffer.toString());
    });
  });
}

export function aOracion(cadena: string) {
  const frase = cadena.replace(/_/g, ' ').toLowerCase();
  return frase.charAt(0).toUpperCase() + frase.slice(1);
}