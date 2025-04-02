import { endpoint } from "../utils/sec";

export async function loginApi(credentials) {
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  };

  try {
    let response = await fetch(`${endpoint.auth}/login`, options);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
