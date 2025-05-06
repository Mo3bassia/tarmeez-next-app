import axios from "axios";

export async function DELETE(request) {
  try {
    const body = await request.json();

    const response = await axios.delete(
      `https://tarmeezacademy.com/api/v1/posts/${body.id}`,
      {
        headers: {
          Authorization: `Bearer ${body.token}`,
          "Content-Type": "application/json",
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
