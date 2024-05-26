import { useTheme, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Breakpoint } from "@mui/system";

type Query = "up" | "down" | "between" | "only";

export function useResponsive(
  query: Query,
  start: Breakpoint,
  end?: Breakpoint
): boolean {
  const theme: Theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));
  const mediaDown = useMediaQuery(theme.breakpoints.down(start));
  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  let result: boolean;

  switch (query) {
    case "up":
      result = mediaUp;
      break;
    case "down":
      result = mediaDown;
      break;
    case "only":
      result = mediaOnly;
      break;
    default:
      result = false;
  }

  return result;
}
