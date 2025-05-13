import { usersArraySchema } from "@/lib/validations/users";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseUsersProps {
  page?: number;
  pageSize?: number;
}

function useUsers({ page = 1, pageSize = 10 }: UseUsersProps = {}) {
  const fetchUsers = async () => {
    let url = `https://tarmeezacademy.com/api/v1/users?limit=${pageSize}&page=${page}`;

    const response = await axios.get(url);
    const data = response.data;

    const validationResult = usersArraySchema.safeParse(data.data);
    if (!validationResult.success) {
      throw new Error(
        "Invalid data structure from API, please try again later."
      );
    }

    return {
      data: data.data,
      meta: {
        pagination: {
          page: data.meta.current_page,
          pageSize: pageSize,
          pageCount: data.meta.last_page,
          total: data.meta.total,
        },
      },
    };
  };

  const { data, isLoading, isError, error, refetch, isPending, isRefetching } =
    useQuery({
      queryKey: ["users", page, pageSize],
      queryFn: fetchUsers,
      refetchOnWindowFocus: false,
    });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isPending,
    isRefetching,
    currentPage: page,
    pageSize,
    totalPages: data?.meta.pagination.pageCount || 0,
    totalItems: data?.meta.pagination.total || 0,
  };
}

export { useUsers };
