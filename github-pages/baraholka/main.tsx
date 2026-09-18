import { createRoot } from "react-dom/client";
import "../../app/globals.css";
import "../../app/compact.css";
import ConferenceLanding from "../../components/conference-landing";
const root = document.getElementById("root");
if (!root) throw new Error("Missing page root");
createRoot(root).render(<ConferenceLanding initialService="market"/>);
