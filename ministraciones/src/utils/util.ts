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

/**Ejemplo de uso
 * document.cookie = `mnu2=${await ofuscadAwait(JSON.stringify(jsonOptions), true, true)}; `;
 */
export async function ofuscadAwait(
  cad: string,
  encode: boolean,
  zippear: boolean
) {
  //const [encodedStr,setEncodedStr]= useState("");
  let encodedStr = "*";
  let encoded = "";
  if (encode) {
    encoded = Buffer.from(cad).toString("base64").split("").reverse().join("");
    if (zippear===true) {
      await zip64(encodedStr).then((txtZip) => {
        encodedStr = String(txtZip);
        console.log(encodedStr);        
        return encodedStr;
      });
    }
  } else {
    encoded = Buffer.from(cad.split("").reverse().join(""), "base64").toString(
      "utf-8"
    );
    if (zippear) {
      await unzip64(encodedStr).then((txtUnZip) => {
        encodedStr = String(txtUnZip);
        return encodedStr;
      });
    }
  }
  return encodedStr;
}

/**Ejemplos zip64 / unzip64 
 * 
  zip64(ofuscad(JSON.stringify(jsonOptions), true)).then(
    (txtZip) => {
      document.cookie = `mnuZIP=${txtZip}; `;
    }
  );

  zip64(ofuscad(JSON.stringify(jsonOptions), true)).then(
    (txtZip) => {
      unzip64(String(txtZip)).then((txtUnZip) => {
        document.cookie = `mnuUnZIP=${txtUnZip}; `;
      });
    }
  );
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
