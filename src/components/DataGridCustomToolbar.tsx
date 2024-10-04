import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment, Box } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { Dispatcher } from "@/types/Common";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    searchInput: string;
    setSearchInput: Dispatcher<string>;
    setSearch: Dispatcher<string>;
  }
}

interface CustomToolbarProps {
  searchInput: string;
  setSearchInput: Dispatcher<string>;
  setSearch: Dispatcher<string>;
}

const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
}: CustomToolbarProps) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
          <TextField
            label="Search..."
            sx={{ mb: "0.5rem", width: "15rem" }}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setSearch(searchInput);
                      setSearchInput("");
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
