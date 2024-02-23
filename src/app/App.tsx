import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./Navigation";

export function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}
