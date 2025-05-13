import axios from "axios";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    const userDataCookie = cookieStore.get("userData");
    if (!userDataCookie) {
      return new Response(
        JSON.stringify({ message: "Unauthorized - No auth token found" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const userData = JSON.parse(userDataCookie.value);
    const token = userData.token;

    const response = await axios.post(
      "https://tarmeezacademy.com/api/v1/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    };

    const cookie = `userData=; ${Object.entries(cookieOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ")}`;

    return new Response(JSON.stringify(response.data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie,
      },
    });
  } catch (err) {
    const errorData = err.response?.data || { message: "Unknown error" };
    const errorStatus = err.response?.status || 500;

    return new Response(JSON.stringify(errorData), {
      status: errorStatus,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
