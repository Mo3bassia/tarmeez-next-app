import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAddComent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post("/api/add-comment", formData, {
        withCredentials: true,
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}
