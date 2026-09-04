/**
 * auth.js — Helper centralizado para fetch con JWT.
 *
 * Uso: igual que fetch(), pero detecta automáticamente mensajes de
 * token inválido/expirado, muestra el toast y cierra sesión.
 *
 * Ejemplo:
 *   const res = await apiFetch("/mis_citas");
 *   const data = await res.json();
 */

const TOKEN_ERROR_MSGS = [
  "Sesion inválida o expirada, cierra session y vuelve a ingresar.",
  "No autorizado",
  "Algo fallo."
];

// Error especial que los catch de cada página deben ignorar silenciosamente
class TokenError extends Error {
  constructor() { super("TOKEN_INVALID"); this.name = "TokenError"; }
}

async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  // Inyectar Authorization + Content-Type automáticamente
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": "Bearer " + token } : {}),
    ...(options.headers || {})
  };

  const res = await fetch(url, { ...options, headers });

  // Clonar para poder leer el body sin consumirlo
  const clone = res.clone();

  try {
    const data = await clone.json();

    if (data && TOKEN_ERROR_MSGS.includes(data.msg)) {
      showToast(data.msg, "error");
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/login";
      }, 2000);
      throw new TokenError();
    }
  } catch (e) {
    // Propagar solo el TokenError — el resto (body no-JSON, etc.) se ignora
    if (e instanceof TokenError) throw e;
  }

  return res;
}
