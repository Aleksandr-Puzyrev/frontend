import api from "@/api/api.config";
import { IUser } from "@/shared/interfaces/user/User";
import { IFindFilter, IFindResult } from "@/shared/types/findResult.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useUsersQuery = (filters?: IFindFilter, enabled?: boolean) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () =>
      api.get<IFindResult<IUser>>("/users", {
        params: {
          search: filters?.search,
          page: filters?.page,
          limit: filters?.limit,
        },
      }),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
    enabled,
  });
};

export default useUsersQuery;
