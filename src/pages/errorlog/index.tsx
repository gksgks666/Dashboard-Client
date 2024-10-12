import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useGetError } from "@/hooks";
import Header from "@/components/Header";
import DataGridCustomToolbar from "@/components/DataGridCustomToolbar";
import DataGridCustomPagination from "@/components/DataGridCustomPagination";
import ModalFabButton from "./ModalFabButton";
import DatePicker from "@/components/DatePicker/DatePicker";
import { PaginationModel } from "@/types/Common";
import { ErrorLogList } from "@/types/API";

const ErrorLog: React.FC = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 20,
  });
  const { data, isLoading } = useGetError({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    search,
    startDate,
    endDate,
  });

  const handlesetpaginationModel = (params: PaginationModel) => {
    setPaginationModel((prev) =>
      prev.pageSize !== params.pageSize
        ? {
            ...prev,
            page: 0,
            pageSize: params.pageSize,
          }
        : {
            ...prev,
            page: params.page,
          },
    );
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 200 /* flex: 1, */ },
    { field: "userId", headerName: "User ID", width: 200 /* flex: 1 */ },
    { field: "domain", headerName: "domain", width: 100 /* flex: 1 */ },
    {
      field: "stackTrace",
      headerName: "errorMessage",
      width: 300 /* flex: 1 */,
    },
    { field: "createdAt", headerName: "CreatedAt", width: 140 /* flex: 1 */ },
    {
      field: "readmore",
      headerName: "Readmore",
      width: 140,
      /* flex: 1, */
      renderCell: (params: GridRenderCellParams<ErrorLogList>) => (
        <ModalFabButton data={params.row} />
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem" width="1080px">
      <Header title="ERRORLOG" subtitle="" />
      <DatePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Box
        height="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={(data && data.dataArray) || []}
          columns={columns}
          rowCount={(data && data.rowCount) || 0}
          pageSizeOptions={[20, 50, 100]}
          paginationMode="server"
          hideFooterSelectedRowCount
          slots={{
            pagination: DataGridCustomPagination,
            //toolbar: DataGridCustomPagination,
            toolbar: DataGridCustomToolbar,
          }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          autoHeight
          paginationModel={paginationModel}
          onPaginationModelChange={handlesetpaginationModel}
        />
      </Box>
    </Box>
  );
};

export default ErrorLog;
