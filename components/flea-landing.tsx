"use client";
import type { ReactNode } from "react";
import { ArrowUpRight, Check, MapPin, Leaf, Repeat2, UsersRound, Sparkles, Plus, Globe2, Package, Search } from "lucide-react";
import { publicPath } from "@/lib/public-path";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./flea-landing.css";

const MARKET = "https://sale.frents.ru/";
const REGISTER = "https://sale.frents.ru/moskva/login";
const products = [
  {name:"Арка для церемонии",price:"18 500 ₽",condition:"Отличное состояние",city:"Казань",type:"arch",alt:"Светлая свадебная арка с драпировкой и белыми цветами"},
  {name:"Тумба декоративная",price:"7 900 ₽",condition:"Как новая",city:"Екатеринбург",type:"plinth",alt:"Кремовая декоративная тумба с рельефной поверхностью"},
  {name:"Высокая ваза с декором",price:"2 400 ₽",condition:"Хорошее состояние",city:"Санкт-Петербург",type:"vase",alt:"Высокая керамическая ваза с цветами и ветвями"},
  {name:"Диван для фотозоны",price:"21 000 ₽",condition:"Отличное состояние",city:"Краснодар",type:"sofa",alt:"Светлый изогнутый диван букле в пространстве для мероприятий"},
];
function ProductPhoto({item,className=""}:{item:typeof products[number];className?:string}) {
  return <div className={`fl-photo fl-photo-${item.type} ${className}`} role="img" aria-label={item.alt} style={{backgroundImage:`url("${publicPath("/assets/frents-products-atlas.jpg")}")`}}/>;
}
function Actions({short=false}:{short?:boolean}) {return <div className="fl-actions"><a className="fl-button fl-primary" href={MARKET}>Посмотреть Барахолку <ArrowUpRight size={18}/></a><a className="fl-button fl-secondary" href={REGISTER}>{short?"Зарегистрироваться":"Зарегистрироваться на FRENTS"}</a></div>}
function Logo(){return <a className="fl-logo" href={publicPath("/")} aria-label="FRENTS — на главную"><img src={publicPath("/assets/frents-logo.svg")} alt="FRENTS" width="112" height="37"/></a>}
export default function FleaLanding({ children, heroExtra, intent, onIntentChange }: {
  children?: ReactNode;
  heroExtra?: ReactNode;
  intent: string;
  onIntentChange: (value: string) => void;
}) {
 const buying = intent === "buy";
 const heroBenefits = buying ? [
  ["Находите вещи под свой проект.", "Декор, мебель, реквизит и материалы для следующего события."],
  ["Выбирайте среди своих.", "Предложения от декораторов, флористов и прокатчиков."],
  ["Договаривайтесь напрямую.", "Обсудите с продавцом состояние вещи, оплату и получение."],
 ] : [
  ["Освободите место для новых идей.", "Предложите коллегам вещи, которые больше не используете."],
  ["Найдите свою аудиторию.", "Ваш декор увидят люди из индустрии событий."],
  ["Размещайте из любого региона.", "Барахолка открыта всем пользователям FRENTS."],
 ];
 return <div className="flea-page flea-integrated">
   <section className="wrap service-detail-start fl-internal-hero" aria-labelledby="fl-internal-title">
    <div className="detail-grid">
     <div className="detail-copy">
      <div className="detail-label"><span>03</span> Барахолка Frents</div>
      <Tabs value={intent} onValueChange={onIntentChange} className="intent-tabs">
       <TabsList aria-label="Ваша задача в Барахолке">
        <TabsTrigger value="sell">Хочу продать</TabsTrigger>
        <TabsTrigger value="buy">Ищу декор</TabsTrigger>
       </TabsList>
      </Tabs>
      <h1 id="fl-internal-title" className="fl-internal-title">{buying ? <>Найдите декор<br/>для следующей идеи.</> : <>Декор получает<br/>вторую жизнь.</>}</h1>
      <p className="detail-description">{buying ? "Находите декор, мебель и реквизит для новых проектов среди пользователей FRENTS. Возможно, нужная вещь уже ждёт вас здесь." : "Продавайте декор, мебель и реквизит, которые больше не нужны. Здесь их найдут люди из event-индустрии."}</p>
      <ul className="benefit-list">{heroBenefits.map(([title,text])=><li key={title}><span><Check size={15}/></span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ul>
      <div className="detail-actions"><a className="button button-dark" href={MARKET}>Посмотреть Барахолку <ArrowUpRight size={17}/></a><span>Размещение бесплатно до конца 2026 года</span></div>
      <a className="text-link fl-internal-register" href={REGISTER}>Зарегистрироваться на FRENTS <ArrowUpRight size={17}/></a>
     </div>
     <div className="product-preview preview-market fl-internal-preview">
      <div className="preview-caption"><span>FRENTS / БАРАХОЛКА</span><span>Пример интерфейса</span></div>
      <div className="app-window">
       <div className="app-bar"><span className="mini-brand">FRENTS <span>барахолка</span></span><span className="tiny-tag green">Бесплатные объявления</span></div>
       <div className="fl-market-demo">
        <div className="mock-search"><Search size={16}/> Декор для следующей идеи</div>
        <div className="fl-market-demo-grid">{[products[0],products[2]].map(item=><article className="fl-market-demo-card" key={item.type}><div className="fl-market-demo-photo"><ProductPhoto item={item}/></div><div className="fl-market-demo-info"><strong>{item.price}</strong><h2>{item.name}</h2><span><MapPin size={10}/>{item.city}</span></div></article>)}</div>
        <div className="market-note"><Globe2 size={16}/> Объявления из любого региона</div>
       </div>
      </div>
      <div className="preview-sticker"><span><Check size={17}/></span>{buying ? "Для вашей следующей идеи." : "Хорошие вещи продолжают работать."}</div>
     </div>
    </div>
   </section>
   {heroExtra}
   <section id="fl-community" className="fl-container fl-section"><div className="fl-section-heading"><div><span className="fl-eyebrow">СВОИ ВЕЩИ. СВОИ ЛЮДИ.</span><h2>Барахолка для всей<br/>event-индустрии</h2></div><p>Раздел открыт всем пользователям FRENTS.<br/>Для тех, кто создаёт события и знает<br className="fl-desktop-break"/> ценность хорошего декора.</p></div>
    <div className="fl-benefits"><article className="fl-benefit"><span className="fl-icon"><UsersRound size={23} strokeWidth={1.5}/></span><div><h3>Доступно всем</h3><p>Декораторы, прокатчики, флористы, производители — продавайте и ищите нужное, чем бы вы ни занимались в event-индустрии.</p></div><span className="fl-benefit-detail">Один аккаунт FRENTS — все возможности <ArrowUpRight size={15}/></span></article><article className="fl-benefit"><span className="fl-icon"><Sparkles size={23} strokeWidth={1.5}/></span><div><h3>Ничего лишнего</h3><p>Декор, мебель, реквизит, материалы, оборудование и другие вещи для мероприятий. Здесь понимают, что вы ищете.</p></div><span className="fl-benefit-detail">Всё, что пригодится в следующем проекте <ArrowUpRight size={15}/></span></article></div>
    <div className="fl-manifest"><a href={REGISTER}><span>01</span><strong>Регистрируйся</strong><ArrowUpRight size={20}/></a><a href={MARKET}><span>02</span><strong>Находи</strong><ArrowUpRight size={20}/></a><a href={REGISTER}><span>03</span><strong>Размещай</strong><ArrowUpRight size={20}/></a></div>
   </section>
   <section className="fl-container fl-section fl-catalog" id="fl-examples"><div className="fl-section-heading"><div><span className="fl-eyebrow">ДЛЯ ВАШЕЙ СЛЕДУЮЩЕЙ ИДЕИ</span><h2>Что можно найти<br/>в Барахолке</h2></div><a className="fl-text-link" href={MARKET}>Перейти в Барахолку <ArrowUpRight size={17}/></a></div>
    <div className="fl-product-grid">{products.map(item=><article className="fl-product" key={item.name}><div className="fl-product-image"><ProductPhoto item={item}/><span className="fl-product-condition"><span/>{item.condition}</span></div><div className="fl-product-body"><strong className="fl-price">{item.price}</strong><h3>{item.name}</h3><span className="fl-city"><MapPin size={12}/>{item.city}</span></div></article>)}</div>
    <div className="fl-catalog-note"><span>Примеры объявлений. Изображения и цены — для иллюстрации.</span><span><Globe2 size={13}/> Покупайте и продавайте из любого региона</span></div>
    <div className="fl-free-banner"><div className="fl-free-icon"><Repeat2 size={31} strokeWidth={1.5}/></div><div className="fl-free-copy"><span className="fl-eyebrow">БОЛЬШЕ МЕСТА ДЛЯ НОВОГО</span><h3>До конца 2026 года размещение<br className="fl-desktop-break"/> объявлений бесплатно</h3><p>Позже могут появиться ограничения по количеству активных объявлений.</p><Actions short/></div><div className="fl-free-number" aria-hidden="true"><span>0</span><small>₽ за размещение</small></div></div>
   </section>
   <section className="fl-container fl-section fl-how" id="fl-how"><div className="fl-section-heading"><div><span className="fl-eyebrow">ПРОСТО ДОГОВОРИТЬСЯ</span><h2>Как это работает</h2></div><p>От хорошей вещи до нового проекта —<br/>всего несколько шагов.</p></div><div className="fl-how-grid"><div className="fl-how-column"><div className="fl-how-title"><span className="fl-icon"><Package size={22} strokeWidth={1.5}/></span><h3>Если вы продаёте</h3><ArrowUpRight size={20}/></div><ol>{[["Создайте объявление","Добавьте фотографии, описание, состояние и цену вещи."],["Опубликуйте предложение","Укажите свой город — ваше объявление найдут пользователи из разных регионов."],["Получайте обращения","Отвечайте покупателям и договаривайтесь об оплате и передаче напрямую."]].map(([title,text],i)=><li key={title}><span className="fl-step">0{i+1}</span><div><h4>{title}</h4><p>{text}</p></div></li>)}</ol></div><div className="fl-how-column"><div className="fl-how-title"><span className="fl-icon"><Search size={22} strokeWidth={1.5}/></span><h3>Если вы ищете</h3><ArrowUpRight size={20}/></div><ol>{[["Откройте Барахолку","Посмотрите, что предлагают другие пользователи FRENTS."],["Найдите нужное","Выберите вещь под свою идею, бюджет и задачи проекта."],["Свяжитесь с продавцом","Уточните детали и договоритесь о покупке и удобном способе получения."]].map(([title,text],i)=><li key={title}><span className="fl-step">0{i+1}</span><div><h4>{title}</h4><p>{text}</p></div></li>)}</ol></div></div></section>
   {children}
   <section className="fl-container fl-shop-section"><div className="fl-shop"><div className="fl-shop-copy"><span className="fl-soon"><span/> Скоро на FRENTS</span><h2>Магазин<br/>нового декора</h2><p>Отдельный раздел с новыми изделиями от производителей и продавцов декора.</p><span className="fl-shop-note">Ещё больше возможностей для ваших идей <Plus size={15}/></span></div><div className="fl-shop-art" aria-hidden="true"><div className="fl-shop-orbit"/><div className="fl-shop-card fl-shop-card-one"><span>НОВАЯ КОЛЛЕКЦИЯ</span><img src={publicPath("/assets/catalog-vase.png")} alt="" loading="lazy"/><div>Вазы и детали <ArrowUpRight size={15}/></div></div><div className="fl-shop-card fl-shop-card-two"><span>ОТ ПРОИЗВОДИТЕЛЯ</span><img src={publicPath("/assets/catalog-chair.png")} alt="" loading="lazy"/><div>Мебель для событий <ArrowUpRight size={15}/></div></div><span className="fl-shop-floating"><Sparkles size={15}/> Новое. Ваше.</span></div></div></section>
   <section className="fl-container fl-final"><div className="fl-final-icon"><Leaf size={26} strokeWidth={1.4}/></div><span className="fl-eyebrow">НОВЫЙ ПРОЕКТ НАЧИНАЕТСЯ С НАХОДКИ</span><h2>Загляните в Барахолку FRENTS</h2><p>Возможно, нужная вещь для следующего проекта<br className="fl-desktop-break"/> уже ждёт вас там.</p><Actions/></section>
  <footer className="fl-footer"><div className="fl-container fl-footer-top"><div><Logo/><p>Для тех, кто создаёт события.</p></div><nav aria-label="Информация о FRENTS"><a href="https://jivo.chat/5faY8rLeKv">Клиентская поддержка</a><a href="https://frents.ru/moskva/about">Кто такие FRENTS</a><a href="https://frents.ru/moskva/residents">Резиденты FRENTS</a><a href="https://frents.ru/moskva/blog">Наш блог</a></nav></div><div className="fl-container fl-footer-bottom"><span>© 2026 FRENTS</span><a href="https://frents.ru/moskva/policy-privacy">Политика конфиденциальности</a><span>Хорошие вещи продолжают работать.</span></div></footer>
 </div>
}
