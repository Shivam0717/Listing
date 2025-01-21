import React from "react";
import MuiPagination from "@mui/material/Pagination";
import {
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  GridPagination,
} from "@mui/x-data-grid";

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default CustomPagination;
