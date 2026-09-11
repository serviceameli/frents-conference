import { createRoot } from "react-dom/client";
import Home from "../app/page";
import "../app/globals.css";
import "../app/compact.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing page root");
createRoot(root).render(<Home />);
