import api from "@/api/api.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { IFindFilter, IFindResult } from "@/shared/types/findResult.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useCoursesQuery = (filters?: IFindFilter, enabled?: boolean) => {
  return useQuery({
    queryKey: ["courses", filters],
    queryFn: () =>
      api.get<IFindResult<ICourse>>("/courses", {
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

export default useCoursesQuery;
