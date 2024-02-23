import { Home, NotFound } from "pages";
import { Route, Routes } from "react-router-dom";

export const ROUTES = {
  Root: "/",
  NotFound: "*",
};

export function Navigation() {
  return (
    <Routes>
      <Route path={ROUTES.Root} element={<Home />} />
      <Route path={ROUTES.NotFound} element={<NotFound />} />
    </Routes>
  );
}
