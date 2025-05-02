import api from "@/api/api.config";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ProfileData } from "../../../shared/interfaces/user/User";

const useSessionQuery = (enabled?: boolean) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => api.get<ProfileData>("/users/profile"),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
    enabled,
  });
};

export default useSessionQuery;
