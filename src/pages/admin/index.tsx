import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUserList } from "@/hooks";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Header from "@/components/Header";
import CustomColumnMenu from "@/components/DataGridCustomColumnMenu";
import ButtonAndSelect from "./ButtonAndSelect";
import DataGridCustomPagination from "@/components/DataGridCustomPagination";
import DataGridCustomToolbar from "@/components/DataGridCustomToolbar";
import { useTypedSelector } from "@/hooks";
import { UserList } from "@/types/API";
import { PaginationModel } from "@/types/Common";

const Admin: React.FC = () => {
  const theme = useTheme();
  const userRole = useTypedSelector((state) => state.user.role);
  const [rowData, setRowData] = useState<UserList[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 20,
  });

  const { data, isLoading } = useGetUserList({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    search,
  });

  const handlesetpaginationModel = (params: PaginationModel): void => {
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

  const addColumn = (arr: UserList[], role: string): UserList[] => {
    return arr.map((e) => {
      let isDisabled = true;
      if (role === "0") isDisabled = false;
      else if (role === "1" && e.role !== "0") isDisabled = false;
      return { ...e, isDisabled };
    });
  };

  useEffect(() => {
    if (data) {
      setRowData(addColumn(data.dataArray, userRole));
    }
  }, [data]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 140 /* flex: 0.5 */ },
    { field: "email", headerName: "Email", width: 200 /* flex: 1 */ },
    {
      field: "role",
      headerName: "Role",
      width: 140,
      /* flex: 0.5, */
      renderCell: (params: GridRenderCellParams<UserList>) => {
        return params.value === "0"
          ? "SuperAdmin"
          : params.value === "1"
            ? "Admin"
            : params.value === "2"
              ? "User"
              : "Null";
      },
    },
    {
      headerName: "Select",
      field: "select",
      width: 200,
      /* flex: 0.5, */
      renderCell: (params: GridRenderCellParams<UserList>) => (
        <ButtonAndSelect data={params.row} setRowData={setRowData} />
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem" width="680px">
      <Header title="Dashboard Access Levels" subtitle="" />
      <Box
        mt="40px"
        height="75vh"
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
          /* "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            width: "0.4em",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          }, */
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={rowData}
          rowCount={(data && data.rowCount) || 0}
          columns={columns}
          pageSizeOptions={[20, 50, 100]}
          paginationMode="server"
          hideFooterSelectedRowCount
          slots={{
            //pagination: DataGridCustomPagination,
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

export default Admin;
