import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const formData = await request.formData();

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
      "https://tarmeezacademy.com/api/v1/posts",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
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
