import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from './CustomPagination'; // Make sure this path is correct

const CustomDataGrid = ({ rows, columns, paginationModel, setPaginationModel }) => {
   return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      paginationModel={paginationModel}
      onPaginationModelChange={(model) => setPaginationModel(model)}
      pagination
      getRowClassName={(params) => {
        return params.row.id === "Total" ? "total-row" : "yellow-row";
      }}
      slots={{
        pagination: CustomPagination,
      }}
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          fontWeight: "bold",
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#40f720",
          color: "black", 
          fontWeight: "bold",
          fontSize: "30px",
        },
        "& .MuiDataGrid-columnHeader[data-field='id'], & .MuiDataGrid-columnHeader[data-field='Brand'], & .MuiDataGrid-columnHeader[data-field='OB']": {
          backgroundColor: "#40f720", 
          color: "black", 
        },
        "& .MuiDataGrid-columnHeader[data-field='DESP'], & .MuiDataGrid-columnHeader[data-field='CB'], & .MuiDataGrid-columnHeader[data-field='actions']": {
          backgroundColor: "#40f720", 
          color: "black", 
        },
        "& .total-row": {
          backgroundColor: "orange !important", 
          fontWeight: "bold",
          fontSize: "30px",
        },
        "& .yellow-row": {
          backgroundColor: "yellow !important",
          fontWeight: "bold",
          fontSize: "24px",
        },
      }}
    />
  );
};

export default CustomDataGrid;