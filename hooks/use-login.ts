import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

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
      toast.error("Login failed: " + error.message, {
        description: "Please check your credentials and try again.",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-login"] });
      toast("Login successful", {
        description: "You have logged in successfully.",
      });
    },
  });
}
