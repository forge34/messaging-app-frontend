import { useLocation } from "react-router-dom";

export function useActiveLink({
  link,
  exact = false,
}: {
  link: string;
  exact: boolean;
}) {
  const location = useLocation();
  let contains;
  if (!exact) {
    contains = location.pathname.includes(link);
  } else contains = location.pathname === "link";

  const selected = contains ? "selected" : "";

  return { selected, contains };
}
