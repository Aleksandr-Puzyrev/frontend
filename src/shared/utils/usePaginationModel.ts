import { useState } from "react";

const usePaginationModel = () => {
  return useState({
    pageSize: 10,
    page: 0,
  });
};

export default usePaginationModel;
