import { createRoot } from "react-dom/client";
import "../../app/globals.css";
import FleaLanding from "../../components/flea-landing";
const root = document.getElementById("root");
if (!root) throw new Error("Missing page root");
createRoot(root).render(<FleaLanding/>);
