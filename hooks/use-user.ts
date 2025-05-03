import { userSchema } from "@/lib/schemas/user";
import { useQuery } from "@tanstack/react-query";

function useUser(id: string) {
  const fetchUser = async () => {
    const res = await fetch("https://tarmeezacademy.com/api/v1/users/" + id);
    const data = await res.json();
    const validationResult = userSchema.safeParse(data.data);
    if (validationResult.success) {
      return data;
    } else {
      throw new Error("Invalid user, please check the correct id");
    }
  };

  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  return { data, isFetching, isLoading, error };
}

export { useUser };
