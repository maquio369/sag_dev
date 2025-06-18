"use server";

export async function handleSubmit(formData: FormData): Promise<any> {
  let setError = "";
  var data;
  try {
    const username = formData.get("username");
    const password = formData.get("password");
    if (!username || !password) {
      setError = "Por favor, ingrese usuario y contraseña";
    } else {
      console.log("Iniciando proceso de login para usuario:", username);
      var apiHost =
        process.env.API_URL !== undefined ? process.env.API_URL : "";
      //console.log(apiHost);

      const response = await fetch(apiHost + "api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: username,
          clave: password,
        }),
      });
      // console.log(response.headers.get("set-cookie")?.substring(13));

      data = await response.json();
      if (data && "token" in data && data.token === "") {
        setError = data.message; //console.log(data.message);
      }
    }
  } catch (err: any) {
    console.log("Error autorizando inicio de sesión", err.message);
    setError = "Error autorizando inicio de sesión";
  } finally {
    if (setError != "") {
      data = { message: setError, token: "" };
    }
    return data;
  }
}

export async function getMenuItems(idSistema: number = 2, idRol: number = 1) {
  let menuItems = [];
  try {
    var apiHost = process.env.API_URL !== undefined ? process.env.API_URL : "";
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
    //return JSON.stringify(menuItems);
  }
}

export async function handleSubmitExample() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return;
}
