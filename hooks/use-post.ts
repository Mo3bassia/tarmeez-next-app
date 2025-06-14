import { postSchema } from "@/lib/validations/post";
import { useQuery } from "@tanstack/react-query";

function usePost(id: string) {
  const fetchUser = async () => {
    const res = await fetch("https://tarmeezacademy.com/api/v1/posts/" + id);
    const data = await res.json();
    const validationResult = postSchema.safeParse(data.data);
    if (validationResult.success) {
      return data;
    } else {
      throw new Error("Invalid post, please check the correct id");
    }
  };

  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: fetchUser,
    refetchInterval: 60 * 1000,
  });

  return { data, isFetching, isLoading, error };
}

export { usePost };
