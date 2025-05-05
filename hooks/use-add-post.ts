import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAddPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post("/api/add-post", formData, {
        withCredentials: true,
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
    },
  });
}
