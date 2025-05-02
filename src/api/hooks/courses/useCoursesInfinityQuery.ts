import api from "@/api/api.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { IFindFilter, IFindResult } from "@/shared/types/findResult.type";
import { useInfiniteQuery } from "@tanstack/react-query";

const useCoursesInfiniteQuery = (filters?: Omit<IFindFilter, "page">, enabled?: boolean) => {
  return useInfiniteQuery({
    queryKey: ["courses", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<IFindResult<ICourse>>("/courses", {
        params: {
          ...filters,
          page: pageParam,
          limit: filters?.limit || 10,
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      // Проверяем, есть ли еще элементы для загрузки
      const loadedItemsCount = allPages.reduce((sum, page) => sum + page.entities.length, 0);
      const totalItems = lastPage.itemCount || 0;

      console.log(loadedItemsCount, totalItems)
      
      // Если загружено меньше, чем общее количество, возвращаем следующую страницу
      return loadedItemsCount < totalItems ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled,
    staleTime: 60 * 1000,
  });
};

export default useCoursesInfiniteQuery;
