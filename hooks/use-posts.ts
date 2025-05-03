import { postsArraySchema } from "@/lib/schemas/posts";
import { useInfiniteQuery } from "@tanstack/react-query";

function usePosts() {
  const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(
      "https://tarmeezacademy.com/api/v1/posts?limit=15&page=" + pageParam
    );

    const data = await res.json();
    const validationResult = postsArraySchema.safeParse(data.data);
    if (validationResult.success) {
      console.log("Data is valid:", validationResult.data);
      return data;
    } else {
      console.log(data.data.map((post) => post.image));
      console.error("Validation error:", validationResult.error);
      throw new Error("Invalid data structure from API");
    }
    return data;
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
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.meta.current_page + 1;
    },
  });

  return { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading };
}

export { usePosts };
