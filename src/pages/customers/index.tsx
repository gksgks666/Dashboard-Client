import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomerList } from "@/hooks";
import Header from "@/components/Header";
import { DataGrid, GridRenderCellParams, GridColDef } from "@mui/x-data-grid";
import DataGridCustomPagination from "@/components/DataGridCustomPagination";
import DataGridCustomToolbar from "@/components/DataGridCustomToolbar";
import ButtonAndSelect from "./ButtonAndSelect";
import { useTypedSelector } from "@/hooks";
import { PaginationModel } from "@/types/Common";
import { CustomerList } from "@/types/API";

const Customers: React.FC = () => {
  const theme = useTheme();
  const userRole = useTypedSelector((state) => state.user.role);
  const [rowData, setRowData] = useState<CustomerList[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 20,
  });
  const { data, isLoading } = useGetCustomerList({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    search,
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
  useEffect(() => {
    if (data) {
      setRowData(data.dataArray);
    }
  }, []);

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    /* {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    }, */
    {
      field: "accoutstatus",
      headerName: "AccountStatus",
      flex: 0.5,
      renderCell: (param: GridRenderCellParams<CustomerList>) => {
        return param.row.accountstatus === true ? "활성화" : "비활성화";
      },
    },
    {
      field: "none",
      headerName: "AccountStatusChange",
      flex: 0.5,
      renderCell: (param: GridRenderCellParams<CustomerList>) => {
        return (
          <ButtonAndSelect
            data={param.row}
            roleNo={userRole}
            setRowData={setRowData}
          />
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Customers Access Levels" subtitle="" />
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

export default Customers;

/* .MuiDataGridPro-root .MuiDataGrid-virtualScroller ::-webkit-scrollbar {
  width: 6px !important;
}
.MuiDataGridPro-root .MuiDataGrid-virtualScroller ::-webkit-scrollbar-track {
  background: #f1f1f1 !important;
}
.MuiDataGridPro-root .MuiDataGrid-virtualScroller ::-webkit-scrollbar-thumb {
  background: #CCCCCC !important;
  border-radius: 5px !important;
}
.MuiDataGridPro-root .MuiDataGrid-virtualScroller ::-webkit-scrollbar-thumb:hover {
  background: #C1C1C1 !important;
}
const DataGridPro = styled(MuiDataGridPro)(()=>({
  "& ::-webkit-scrollbar": {
    width: "6px",
    minWidth: "unset"
  },
  "& ::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "& ::-webkit-scrollbar-thumb": {
    background: "#CCCCCC",
    borderRadius: "5px",
  },
  "& ::-webkit-scrollbar-thumb:hover": {
    background: "#C1C1C1",
  },
})); */
