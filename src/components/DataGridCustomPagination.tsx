import MuiPagination from "@mui/material/Pagination";
import {
  //gridPageCountSelector,
  GridPagination,
  //useGridApiContext,
  //useGridSelector,
  //gridPaginationModelSelector,
} from "@mui/x-data-grid";

const DataGridCustomPagination = (props: any) => {
  return <GridPagination ActionsComponent={CustomPagination} {...props} />;
};

const CustomPagination = (props: any) => {
  //const apiRef = useGridApiContext();
  //const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);

  //mui에서 제공하는 함수가 아닌 count를 직접계산
  const count = Math.ceil(props.count / props.rowsPerPage);

  return (
    <MuiPagination
      color="primary"
      className={props.className}
      count={count}
      siblingCount={1}
      boundaryCount={2}
      page={props.page + 1}
      onChange={(event, newPage) => {
        props.onPageChange(event, newPage - 1);
      }}
    />
  );
};

export default DataGridCustomPagination;
