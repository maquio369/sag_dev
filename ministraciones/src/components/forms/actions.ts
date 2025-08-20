"use server";

export async function handleSubmit(formData: FormData): Promise<any> {
  let setError = "";
  var data;
  try {
    const username = formData.get("username");
    const password = formData.get("password");
    const idSistema = formData.get("id_sistema");
    
    if (!username || !password) {
      setError = "Por favor, ingrese usuario y contraseña";
    } else {
      console.log("Iniciando proceso de login para usuario:", username);
      
      // USAR LA API DE AUTENTICACIÓN (Puerto 3011) - CORREGIDO
      const apiHost = process.env.API_URL || "http://172.16.35.75:3011/";
      
      console.log(`🔐 Login API: ${apiHost}api/auth`);
      
      const response = await fetch(apiHost + "api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: username,
          contraseña: password,
          id_sistema: idSistema,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      data = await response.json();
      if (data && "token" in data && data.token === "") {
        setError = data.message;
      }
    }
  } catch (err: any) {
    console.log("Error autorizando inicio de sesión", err.message);
    setError = "Error de conexión con el servidor de autenticación";
  } finally {
    if (setError != "") {
      data = { message: setError, token: "" };
    }
    return data;
  }
}

export async function getMenuItems(idSistema: number = 0, idRol: number = 0) {
  let menuItems = [];
  try {
    // USAR LA API DE AUTENTICACIÓN para el menú (Puerto 3011)
    const apiHost = process.env.API_URL || "http://172.16.35.75:3011/";
    
    console.log(`📋 Menu API: ${apiHost}api/opciones/getmenu/${idSistema}/${idRol}`);
    
    const response = await fetch(
      apiHost + "api/opciones/getmenu/" + idSistema + "/" + idRol,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    if (response.ok) {
      menuItems = await response.json();
    } else {
      console.error("Error fetching menu items:", response.statusText);
      menuItems = [];
    }
  } catch (err: any) {
    console.error("Error fetching menu items:", err.message);
    menuItems = [];
  } finally {
    return menuItems;
  }
}

// Para datos generales, usar API de autenticación (Puerto 3011)
export async function get(request: string) {
  let r = [];
  try {
    const apiHost = process.env.API_URL || "http://172.16.35.75:3011/";
    console.log(`🔍 GET API: ${apiHost}${request}`);
    
    const response = await fetch(apiHost + request, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (response.ok) {
      r = await response.json();
    } else {
      console.error("Error fetching " + request + ":", response.statusText);
      r = [];
    }
  } catch (err: any) {
    console.error("Error fetching data" + request + ":", err.message);
    r = [];
  } finally {
    return r;
  }
}

// Para datos de tablas, usar API de datos (Puerto 3013)
export async function get2(request: string) {
  let r = [];
  try {
    const apiHost = process.env.API_URL2 || "http://172.16.35.75:3013/api";
    console.log(`📊 Data API: ${apiHost}${request}`);
    
    const response = await fetch(apiHost + request, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (response.ok) {
      r = await response.json();
    } else {
      console.error("Error fetching " + request + ":", response.statusText);
      r = [];
    }
  } catch (err: any) {
    console.error("Error fetching data" + request + ":", err.message);
    r = [];
  } finally {
    return r;
  }
}

export async function getAffected(request: string): Promise<number> {
  let r = -1;
  try {
    const apiHost = process.env.API_URL || "http://172.16.35.75:3011/";
    const response = await fetch(apiHost + request, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      r = await response.json();
    } else {
      console.error("Error fetching affected " + request + ":", response.statusText);
      r = -1;
    }
  } catch (err: any) {
    console.error("Error fetching affected " + request + ":", err.message);
    r = -1;
  } finally {
    return r;
  }
}

export async function post(request: string) {
  let r = [];
  try {
    const apiHost = process.env.API_URL || "http://172.16.35.75:3011/";
    const response = await fetch(apiHost + request, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      r = await response.json();
    } else {
      console.error("Error fetching " + request + ":", response.statusText);
      r = [];
    }
  } catch (err: any) {
    console.error("Error fetching data" + request + ":", err.message);
    r = [];
  } finally {
    return r;
  } 
}

export async function handleSubmitExample() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return;
}
