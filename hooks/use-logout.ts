import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-login"] });
      toast("Logout successful", {
        description: "You have logged out successfully.",
      });
    },
  });
}
