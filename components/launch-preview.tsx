import { ArrowRight, CalendarDays, Check, Clock3, PackageCheck, Store, Warehouse } from "lucide-react";
import { publicPath } from "@/lib/public-path";

export function LaunchPreview({ service }: { service: "inventory" | "marketplace" }) {
  const inventory = service === "inventory";
  return <div className={`product-preview launch-preview preview-${service}`}>
    <div className="preview-caption"><span>FRENTS / {inventory ? "СКЛАДСКОЙ УЧЁТ" : "МАРКЕТ"}</span><span>Концепция сервиса</span></div>
    <div className="app-window launch-window">
      <div className="app-bar"><span className="mini-brand">FRENTS</span><span className="tiny-tag"><Clock3 size={12}/> В разработке</span></div>
      {inventory ? <div className="inventory-demo">
        <div className="launch-window-title"><Warehouse size={20}/><h4>Что свободно на дату?</h4></div>
        <div className="inventory-date"><CalendarDays size={17}/><span>24 сентября · пример события</span></div>
        <div className="inventory-table" role="table" aria-label="Пример занятости декора">
          <div className="inventory-table-row inventory-table-head" role="row"><span role="columnheader">Предмет</span><span role="columnheader">Всего</span><span role="columnheader">Занято</span><span role="columnheader">Свободно</span></div>
          {[["Вазы", "24", "18", "6"], ["Подсвечники", "40", "12", "28"], ["Арки", "3", "2", "1"]].map(row => <div role="row" className="inventory-table-row" key={row[0]}>{row.map((value,i)=><span role="cell" key={i}>{value}</span>)}</div>)}
        </div>
        <div className="inventory-event"><span className="inventory-event-icon"><PackageCheck size={19}/></span><div><strong>Камерная свадьба</strong><span>Выдача 24 сентября · возврат 25 сентября</span></div></div>
        <div className="inventory-journey"><span>На складе</span><ArrowRight size={12}/><span>На событии</span><ArrowRight size={12}/><span>Возврат</span></div>
        <div className="inventory-audit"><Check size={15}/><span>Инвентаризация: наличие и состояние</span></div>
      </div> : <div className="marketplace-demo">
        <div className="launch-window-title"><Store size={20}/><h4>Поставщики для ваших идей</h4></div>
        <p className="marketplace-demo-description">Магазины и производители для индустрии событий</p>
        <div className="marketplace-categories">{["Материалы", "Ткани", "Цветы", "Расходники", "Декор", "Конструкции"].map(name=><span key={name}>{name}</span>)}</div>
        <div className="marketplace-products">
          {[{image:"catalog-vase",name:"Предметный декор",label:"От производителя"},{image:"catalog-chair",name:"Мебель для событий",label:"Коллекции для площадок"},{image:"catalog-candle",name:"Детали сервировки",label:"Магазины и бренды"}].map(product=><div key={product.image}><img src={publicPath(`/assets/${product.image}.png`)} alt={product.name} loading="lazy"/><strong>{product.name}</strong><span>{product.label}</span></div>)}
        </div>
        <div className="marketplace-vendor"><Store size={18}/><div><strong>Здесь может быть ваш магазин</strong><span>Ваш ассортимент. Ваша профессиональная аудитория.</span></div></div>
      </div>}
    </div>
    <p className="launch-preview-note">Показываем идею будущего сервиса. Запуск готовится.</p>
  </div>;
}

export function LaunchStoryboard({ service }: { service: "inventory" | "marketplace" }) {
  const steps = service === "inventory" ? [
    {title:"Планируйте занятость",caption:"До мероприятия",rows:["Дата события выбрана", "Свободное количество видно", "Реквизит зарезервирован"]},
    {title:"Следите за движением",caption:"Выдача и возврат",rows:["Состав выдачи зафиксирован", "Декор на мероприятии", "Возврат сверен с выдачей"]},
    {title:"Знайте реальные остатки",caption:"Между событиями",rows:["Наличие проверено", "Расхождения отмечены", "Расходники учтены"]},
  ] : [
    {title:"Представьте свой магазин",caption:"Профиль поставщика",rows:["Магазин или производство", "Ваша специализация", "Условия и контакты"]},
    {title:"Покажите ассортимент",caption:"Каталог товаров",rows:["Материалы и расходники", "Готовый декор", "Конструкции для событий"]},
    {title:"Найдите свою аудиторию",caption:"Профессионалы событий",rows:["Декораторы и флористы", "Студии и площадки", "Организаторы мероприятий"]},
  ];
  return <div className="screen-storyboard"><div className="storyboard-heading"><span>ГОТОВИМ К ЗАПУСКУ</span><span>Концепция сервиса</span></div><div className="storyboard-grid">{steps.map((step,i)=><div className="storyboard-card" key={step.title}><div className="screen-frame"><div className="screen-top"><span>{step.caption}</span><Clock3 size={13}/></div><div className="screen-checklist">{step.rows.map(row=><div key={row}><Check size={12}/><span>{row}</span></div>)}</div></div><div className="story-caption"><span>0{i+1}</span><strong>{step.title}</strong></div></div>)}</div></div>;
}
