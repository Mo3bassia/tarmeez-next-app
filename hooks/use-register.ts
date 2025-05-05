import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post("/api/register", formData, {
        withCredentials: true,
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Register error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-login"] });
    },
  });
}
