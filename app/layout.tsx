import type { Metadata } from "next";
import "./globals.css";
import "./compact.css";
export const metadata: Metadata = {
 title:"Frents — больше творчества, меньше рутины",
 description:"Четыре сервиса для декораторов и студий аренды: прокат, проекты и свой склад, барахолка и специалисты. Бонусы для участников конференции.",
 icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"},
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="ru"><body>{children}</body></html>}
