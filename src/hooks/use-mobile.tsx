import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/** `undefined` até o primeiro efeito no cliente (SSR/hidratação); depois true/false. */
export function useIsMobileResolved() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

export function useIsMobile() {
  return !!useIsMobileResolved();
}
