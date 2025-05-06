import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeletePost(postId: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      try {
        const response = await axios.delete("/api/delete-post", {
          data: {
            id: postId,
            token,
          },
        });

        return response.data;
      } catch (error) {
        throw error;
      }
    },

    onError: (error) => {
      console.error("Delete post error:", error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
    },
  });
}
