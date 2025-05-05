import { useQuery } from "@tanstack/react-query";

function useCheckLogin() {
  const checkLogin = async () => {
    const res = await fetch("/api/check-login", {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  };

  const { data, refetch, isFetching, isLoading, error } = useQuery({
    queryKey: ["check-login"],
    queryFn: checkLogin,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  return { data, isFetching, isLoading, error, refetch };
}

export { useCheckLogin };
