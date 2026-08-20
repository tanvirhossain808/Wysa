import { useAuth } from "@clerk/react";
import api from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = await getToken();
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
};
