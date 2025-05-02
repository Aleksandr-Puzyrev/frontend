"use client";

import useCoursesInfiniteQuery from "@/api/hooks/courses/useCoursesInfinityQuery";
import LoadingNode from "@/components/LoadingNode";
import { Grid2 as Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import CourseCard from "./CourseCard";

const CoursesList = () => {
  const [search, setSearch] = useState<string>("");
  const deferredSearch = useDeferredValue(search);
  const loaderRef = useRef(null);
  const limit = 10;

  const {
    data: coursesData,
    isError,
    error,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useCoursesInfiniteQuery({
    search: deferredSearch || undefined,
    limit,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <Typography variant="h6" color="error">
        Ошибка загрузки данных {error?.message}
      </Typography>
    );
  }

  const allCourses = coursesData?.pages.flatMap((page) => page.entities) || [];

  return (
    <Stack spacing={2}>
      <TextField
        onChange={(e) => setSearch(e.target.value)}
        color="secondary"
        label="Найти"
        size="small"
      />

      <LoadingNode
        nodeSlot={!!allCourses.length ?
          <Grid container spacing={2}>
            {allCourses.map((course) => (
              <Grid size={{ xs: 12, md: 4, sm: 6 }} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid> : <Typography variant="h5">Нет курсов</Typography>
        }
        skeletonSlot={
          <Grid container spacing={2}>
            {[...Array(limit)].map((_, index) => (
              <Grid size={{ xs: 12, md: 4, sm: 6 }} key={index}>
                <Skeleton variant="rounded" width="100%" height={550} />
              </Grid>
            ))}
          </Grid>
        }
        isPending={isPending}
      />
      <div ref={loaderRef} style={{ height: "20px", marginTop: "20px" }}>
        {isFetchingNextPage && <Typography align="center">Загрузка курсов...</Typography>}
      </div>
      {!hasNextPage && allCourses.length > 0 && (
        <Typography align="center" sx={{ py: 3 }}>
          Вы просмотрели все курсы ({coursesData?.pages[0]?.itemCount || 0})
        </Typography>
      )}
    </Stack>
  );
};

export default CoursesList;
