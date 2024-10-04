import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box sx={{ margin: "40px" }}>
      <Typography variant="h2" fontWeight="bold" sx={{ mb: "5px" }}>
        404 Not Found
      </Typography>
      <Typography variant="h4">페이지를 찾을 수 없습니다.</Typography>
    </Box>
  );
};

export default NotFound;
