import axios from "axios";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const response = await axios.post(
      "https://tarmeezacademy.com/api/v1/posts",
      formData,
      {
        headers: {
          Authorization: `Bearer ${formData.get("token")}`,
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
