import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useEditPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.put("/api/edit-post", credentials, {
        withCredentials: true,
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Edit post error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
    },
  });
}
