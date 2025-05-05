export async function GET(request) {
  const cookies = request.headers.get("cookie");
  let userData = null;

  if (cookies) {
    const cookieArray = cookies.split(";");

    cookieArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key === "userData") {
        userData = value;
      }
    });
  }

  if (userData) {
    return new Response(
      JSON.stringify({
        message: "User is logged in",
        userData: JSON.parse(userData),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(JSON.stringify({ message: "User is not logged in" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
