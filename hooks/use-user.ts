import { useQuery } from "@tanstack/react-query";

function useUser(id:string) {
  const fetchUser = async () => {
    const res = await fetch(
      "https://tarmeezacademy.com/api/v1/users/" + id
    );
    return res.json();
  };

  const {
    data,
    isFetching,
    isLoading
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  return { data,isFetching, isLoading };
}

export { useUser };
