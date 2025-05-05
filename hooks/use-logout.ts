import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post("/api/logout", credentials);
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
