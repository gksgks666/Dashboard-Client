export const getErrorMessage = (status: number | null) => {
  switch (status) {
    case 400:
      return {
        title: "잘못된 요청입니다.",
        content:
          "요청한 데이터가 올바르지 않습니다. 입력 내용을 확인해 주세요.",
        enContent: "This is an invalid request",
      };
    case 401:
      return {
        title: "잘못된 인증 정보입니다.",
        content: "잘못된 인증 정보입니다. 재로그인 해주세요.",
        enContent: "Invalid authentication information",
      };
    case 403:
      return {
        title: "접근 권한이 없습니다.",
        content: "이 페이지에 접근할 권한이 없습니다.",
        enContent: "You do not have access",
      };
    case 404:
      return {
        title: "페이지를 찾을 수 없습니다.",
        content: "요청하신 페이지가 존재하지 않습니다.",
        enContent: "Page not found",
      };
    case 408:
      return {
        title: "요청 시간이 초과되었습니다.",
        content: "요청 시간이 초과되었습니다. 다시 시도해 주세요.",
        enContent: "Request timed out",
      };
    case 500:
      return {
        title: "현재 네트워크 상태가 좋지 않아 서비스가 원활하지 않습니다.",
        content: "잠시 후 다시 시도해 주세요.",
        enContent: "Please try again in a few minutes",
      };
    case 502:
      return {
        title: "잘못된 게이트웨이입니다.",
        content: "서버가 잘못된 응답을 받았습니다. 잠시 후 다시 시도해 주세요.",
        enContent: "Please try again in a few minutes",
      };
    case 503:
      return {
        title: "서비스를 이용할 수 없습니다.",
        content: "현재 서비스가 사용 불가능합니다. 잠시 후 다시 시도해 주세요.",
        enContent: "Please try again in a few minutes",
      };
    case 504:
      return {
        title: "게이트웨이 시간이 초과되었습니다.",
        content: "서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.",
        enContent: "Response timeout",
      };
    default:
      return {
        title: "현재 네트워크 상태가 좋지 않아 서비스가 원활하지 않습니다.",
        content: "새로고침을 하시거나 잠시 후 다시 이용해 주시기 바랍니다.",
        enContent: "Please try again in a few minutes",
      };
  }
};
