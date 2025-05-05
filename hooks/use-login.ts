import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post("/api/login", credentials, {
        withCredentials: true,
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-login"] });
    },
  });
}
