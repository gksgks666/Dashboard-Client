import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress size={70} />
    </Box>
  );
};

export default Loading;

//<Typography position="absolute">{99}%</Typography>
//     <Typography position="absolute">잠시만 기다려 주세요.</Typography>
