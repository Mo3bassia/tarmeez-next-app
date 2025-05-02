import { useInfiniteQuery } from "@tanstack/react-query";

function usePosts() {
  const fetchProjects = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(
      "https://tarmeezacademy.com/api/v1/posts?limit=15&page=" + pageParam
    );
    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.meta.current_page+1
    },
  });

  return { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading };
}

export { usePosts };
