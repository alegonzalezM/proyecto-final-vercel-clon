
//no funciona => no lo uso
export async function getToken() {
  try {
    const response = await fetch("https://dev-of0bu4sktk8zxf2z.us.auth0.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: "MyukS6kJt6m5F0oWmynoRHtqnQPsRtU1",
        client_secret: "mG1PwcZGh-rEC7qTdcDj87vWcF7YMcrKjkoiwCPrTdSklWcDxgBtaRc55CJ0awsQ",
        audience: "https://miApi/",
        grant_type: "client_credentials"
      })
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Token obtenido correctamente");
    return data.access_token;
  } catch (error) {
    console.error("❌ Error al obtener el token:", error.message);
    return null;
  }
}

