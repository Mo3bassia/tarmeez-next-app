import { postsArraySchema } from "@/lib/validations/posts";
import { useInfiniteQuery } from "@tanstack/react-query";
import Error from "next/error";

function usePosts() {
  const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(
      "https://tarmeezacademy.com/api/v1/posts?limit=15&page=" + pageParam
    );

    const data = await res.json();
    const validationResult = postsArraySchema.safeParse(data.data);
    if (validationResult.success) {
      return data;
    } else {
      throw new Error(
        "Invalid data structure from API, please try again later."
      );
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["Posts"],
    queryFn: fetchPosts,
    refetchInterval: 60 * 1000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.meta.current_page + 1;
    },
  });

  return {
    data,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
  };
}

export { usePosts };
