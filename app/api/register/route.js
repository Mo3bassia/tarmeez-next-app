import axios from "axios";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const response = await axios.post(
      "https://tarmeezacademy.com/api/v1/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    };

    const cookie = `userData=${JSON.stringify(response.data)}; ${Object.entries(
      cookieOptions
    )
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
