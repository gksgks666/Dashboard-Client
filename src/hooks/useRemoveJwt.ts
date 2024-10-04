import { useEffect, useRef } from "react";
import { persistor } from "@/rtk";

export const useRemoveJwt = () => {
  const closingWindow = useRef(false);
  const baseUrl = import.meta.env.VITE_BASE_URL as string;

  const toDoWhenClosing = async () => {
    localStorage.removeItem("accessToken");
    await persistor.purge();
    // React Query의 useUserLogout 훅에서 로그아웃을 수행하는 대신 sendBeacon을 사용
    const url = `${baseUrl}/user/logout`; // 실제 로그아웃 엔드포인트 URL로 변경하세요.
    //const data = JSON.stringify({ userId });
    //const blob = new Blob([data], { type: "application/json" });
    navigator.sendBeacon(url);
  };

  useEffect(() => {
    const handleFocus = () => {
      closingWindow.current = false;
    };

    const handleBlur = () => {
      closingWindow.current = true;
      if (!document.hidden) {
        // 창이 최소화되는 경우
        closingWindow.current = false;
      }
    };

    const handleResize = () => {
      closingWindow.current = false;
    };

    const handleMouseLeave = () => {
      closingWindow.current = true;
    };

    const handleMouseEnter = () => {
      closingWindow.current = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key || e.keyCode;
      if (key === "Meta" || key === 91 || key === "Alt" || key === 18) {
        closingWindow.current = false; // ALT+TAB 및 Windows 키에 대한 단축키
      }
      if (
        e.key === "F5" ||
        key === 116 ||
        (e.ctrlKey && (e.key === "r" || key === 82))
      ) {
        closingWindow.current = false; // F5 및 CTRL+F5 및 CTRL+R에 대한 단축키
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        (target.tagName === "INPUT" &&
          (target as HTMLInputElement).type === "submit") ||
        target.tagName === "FORM"
      ) {
        closingWindow.current = false;
      }
    };

    const handleBeforeUnload = () => {
      if (closingWindow.current) {
        toDoWhenClosing();
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};
