import type { Metadata } from "next";
import ConferenceLanding from "@/components/conference-landing";
export const metadata: Metadata = {
 title:"Барахолка FRENTS — декор получает вторую жизнь",
 description:"Продавайте и находите декор, мебель и реквизит для мероприятий среди пользователей FRENTS. Любой регион. Размещение бесплатно до конца 2026 года.",
};
export default function Page(){return <ConferenceLanding initialService="market"/>}
