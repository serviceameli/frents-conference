"use client";
import { publicPath, leadsEndpoint } from "@/lib/public-path";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown, Boxes, FolderOpen, Repeat2, UsersRound, Check, Gift, Plus, Smartphone, PackageCheck, CalendarDays, MapPin, Download, LoaderCircle, Sparkles, X, LockKeyhole } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AppShowcase, ScreenStoryboard } from "@/components/app-showcase";
import FleaLanding from "@/components/flea-landing";
import { services, type ServiceId } from "@/lib/services";

const icons = { rental: Boxes, projects: FolderOpen, market: Repeat2, specialists: UsersRound };
const ids = Object.keys(services) as ServiceId[];
const serviceLabels: Record<ServiceId, string> = {
  rental: "Прокат", projects: "Проекты", market: "Барахолка", specialists: "Команда",
};

function Logo({ light = false }: { light?: boolean }) {
  return <a href="#" aria-label="Frents — на главную" className={`brand ${light ? "brand-light" : ""}`}><img src={publicPath("/assets/frents-logo.svg")} alt="Frents" width="110" height="36" /></a>;
}

function ProductPreview({ service, intent }: { service: ServiceId; intent: string }) {
  return <div className={`product-preview preview-${service}`}>
    <div className="preview-caption"><span>FRENTS / {services[service].name}</span><span>Пример интерфейса</span></div>
    {service === "rental" && <div className="app-window rental-window">
      <div className="app-bar"><span className="mini-brand">FRENTS <span>business</span></span><span className="tiny-tag">Студия «Форма»</span></div>
      <div className="app-body"><div className="app-sidebar"><Boxes size={20}/><FolderOpen size={20}/><CalendarDays size={20}/><UsersRound size={20}/></div><div className="app-main"><div className="app-title"><h4>Заказы</h4><span className="mini-button">+ Новый заказ</span></div><div className="app-stat-row"><div><small>В работе</small><b>12 <span>заказов</span></b></div><div><small>Ближайшая выдача</small><b>18 <span>сентября</span></b></div></div><div className="order-row"><span className="order-icon"><PackageCheck size={20}/></span><div><strong>Камерная свадьба</strong><small>18 сентября · 24 предмета</small></div><span className="status">Подтверждён</span></div><div className="order-row"><span className="order-icon"><Boxes size={20}/></span><div><strong>Ужин в саду</strong><small>21 сентября · 36 предметов</small></div><span className="status neutral">Новый</span></div><div className="catalog-strip"><img src={publicPath("/assets/hero-tablescape.webp")} alt="Коллекция декора с хромированными вазами" loading="lazy"/><div><strong>Ваша коллекция. Ваш бренд.</strong><small>Личный сайт + общий каталог Frents</small></div><ArrowUpRight size={18}/></div></div></div>
    </div>}
    {service === "projects" && <div className="app-window project-window"><div className="app-bar"><span className="mini-brand">FRENTS <span>workspace</span></span><span className="private-label"><LockKeyhole size={12}/> Только для вас</span></div><div className="project-cover"><img src={publicPath("/assets/hero-tablescape.webp")} alt="Флористика и сервировка для камерной свадьбы" loading="lazy"/><span>Мой проект</span></div><div className="project-content"><div className="app-title"><h4>Камерная свадьба</h4><span className="tiny-tag">18 сентября</span></div><p>Реквизит для монтажа</p>{[["Ваза хромированная", "6 шт.", true],["Подсвечник высокий", "12 шт.", true],["Текстиль лайм", "4 шт.", false]].map(([name, count, done])=><div className="packing-row" key={String(name)}><span className={done ? "packing-check done" : "packing-check"}>{done && <Check size={12}/>}</span><span>{name}</span><small>{count}</small><span className={`status ${!done ? "neutral" : ""}`}>{done ? "Свой склад" : "Найти"}</span></div>)}</div></div>}
    {service === "specialists" && <div className="app-window specialist-window"><div className="app-bar"><span className="mini-brand">FRENTS <span>специалисты</span></span><span className="tiny-tag">Знакомьтесь по работам</span></div><div className="specialist-content"><div className="profile-top"><div className="profile-avatar"><img src={publicPath("/assets/hero-tablescape.webp")} alt="Флористическое портфолио" loading="lazy"/></div><div><small>Флористика и декор</small><h4>Студия «Форма»</h4><p><MapPin size={12}/> Москва</p></div></div><p className="profile-about">Создаём атмосферу события через цветы, фактуры и внимание к деталям.</p><div className="portfolio-title"><strong>Портфолио</strong><span>Услуги и цены <ArrowUpRight size={13}/></span></div><img className="portfolio-image" src={publicPath("/assets/hero-tablescape.webp")} alt="Пример работы: современная сервировка с белыми каллами" loading="lazy"/><div className="profile-footer"><span>Оформление событий</span><span className="mini-button">Написать <ArrowUpRight size={12}/></span></div></div></div>}
    <div className="preview-sticker"><span><Check size={17}/></span>{service === "rental" ? "Всё под рукой. Даже с телефона." : service === "projects" ? "Меньше списков. Больше ясности." : service === "market" ? "Хорошие вещи продолжают работать." : "Те, кто понимает вашу задачу."}</div>
  </div>;
}

export default function ConferenceLanding({ initialService = "rental" }: { initialService?: ServiceId }) {
  const [active, setActive] = useState<ServiceId>(initialService);
  const [intents, setIntents] = useState<Record<string,string>>({ market:"sell", specialists:"team" });
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<ServiceId[]>([initialService]);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [submittedServices, setSubmittedServices] = useState<ServiceId[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pendingServiceScroll = useRef(false);
  const startedAt = useRef(Date.now());

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const s = params.get("service");
    if(s && ids.includes(s as ServiceId)){
      let scrollFrame = 0;
      const frame = requestAnimationFrame(() => {
        pendingServiceScroll.current = true;
        setActive(s as ServiceId); setSelected([s as ServiceId]);
        scrollFrame = requestAnimationFrame(scrollToService);
      });
      return () => { cancelAnimationFrame(frame); cancelAnimationFrame(scrollFrame); };
    }
  },[]);

  useEffect(()=>{
    type Context = {registerTool:(tool:{name:string;description:string;inputSchema:object;annotations:object;execute:(input:unknown)=>Promise<unknown>}, options:{signal:AbortSignal})=>void|Promise<void>};
    const context=(document as Document & {modelContext?:Context}).modelContext;
    if(!context?.registerTool) return;
    const lifecycle=new AbortController();
    Promise.resolve(context.registerTool({
      name:"start_frents_bonus_request",
      description:"Open the Frents conference contact form with the requested service selected. Does not submit contact details or consent.",
      inputSchema:{type:"object",properties:{service:{type:"string",enum:ids}},required:["service"],additionalProperties:false},
      annotations:{readOnlyHint:false,untrustedContentHint:false},
      async execute(input:unknown){
        const service=(input as {service?:unknown})?.service;
        if(typeof service!=="string" || !ids.includes(service as ServiceId)) throw new Error("Unknown Frents service");
        chooseService(service); openForm(service as ServiceId);
        await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
        return {status:"form_open",service,submitted:false};
      }
    },{signal:lifecycle.signal})).catch(()=>{});
    return ()=>lifecycle.abort();
  },[]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => document.documentElement.style.setProperty("--header-height", `${header.getBoundingClientRect().height}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pendingServiceScroll.current) return;
    const frame = requestAnimationFrame(scrollToService);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  function scrollToService() {
    pendingServiceScroll.current = false;
    const detail = detailRef.current;
    if (!detail) return;
    const content = detail.querySelector<HTMLElement>("[data-slot=tabs-content][data-state=active]") || detail;
    const top = window.scrollY + content.getBoundingClientRect().top - (headerRef.current?.getBoundingClientRect().height || 104) - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
  }

  function chooseService(value: string, navigate = false) {
    if (!ids.includes(value as ServiceId)) return;
    const next = value as ServiceId;
    if (navigate) pendingServiceScroll.current = true;
    setActive(next);
    setMenuOpen(false);
    const url = new URL(window.location.href);
    url.pathname = publicPath("/");
    url.searchParams.set("service", next);
    if (navigate) url.hash = "service-details";
    window.history.replaceState(null, "", url);
    if (navigate && next === active) requestAnimationFrame(scrollToService);
  }
  function openForm(service?: ServiceId) {
    setSelected([service || active]); setSent(false); setError(""); setConsent(false); setRequestId(crypto.randomUUID()); setFormOpen(true); startedAt.current = Date.now();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if(!selected.length){setError("Выберите хотя бы одно направление.");return;}
    if(!consent){setError("Подтвердите согласие на обработку данных.");return;}
    setSending(true);
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await fetch(leadsEndpoint, {method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId,name,contact,services:selected,intents,consent,source:params.get("source") || "conference",utm:Object.fromEntries(["utm_source","utm_medium","utm_campaign","utm_content","utm_term"].map(k=>[k,params.get(k)||""])),website:new FormData(event.currentTarget).get("website"),elapsed:Date.now()-startedAt.current})});
      const result = await response.json() as { error?: string };
      if(!response.ok) throw new Error(result.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
      setSubmittedServices([...selected]); setSent(true);
    } catch(e) {setError(e instanceof Error ? e.message : "Нет соединения. Проверьте интернет и попробуйте ещё раз.");}
    finally {setSending(false);}
  }
  useEffect(() => {
    document.title = active === "market" ? "Барахолка FRENTS — декор получает вторую жизнь" : "Frents — больше творчества, меньше рутины";
  }, [active]);

  const current=services[active];
  const alternate=active==="market"&&intents.market==="buy" || active==="specialists"&&intents.specialists==="provider";
  const benefits=alternate && current.alternate ? current.alternate.benefits : current.benefits;

  const marketQuestions = [
    ["Кто может пользоваться Барахолкой?", "Все пользователи FRENTS: декораторы, прокатчики, флористы, производители и другие участники event-индустрии. Подойдёт ваш существующий аккаунт FRENTS."],
    ["Барахолка бесплатна только для участников конференции?", "Нет. До конца 2026 года размещение объявлений бесплатно для всех пользователей FRENTS. Позже могут появиться ограничения по количеству активных объявлений. Участникам конференции доступен дополнительный гид по продаже и покупке декора."],
    ["Можно размещать объявления из любого региона?", "Да. Укажите город, в котором находится вещь. Покупатели из других регионов тоже могут связаться с вами. Способ передачи или доставки вы согласуете друг с другом."],
    ["Как купить понравившуюся вещь?", "Откройте объявление в Барахолке и свяжитесь с продавцом. Уточните состояние, комплектацию, цену и договоритесь об оплате и получении напрямую."],
    ["Что произойдёт после заявки на бонус?", "Сразу после отправки можно скачать выбранные материалы, в том числе гид по продаже и покупке декора. Команда FRENTS свяжется с вами по указанному контакту по выбранным направлениям."],
  ];
  const conferenceSection = active === "market" ? <section className="wrap market-conference" id="conference"><div className="detail-bonus"><span className="bonus-small-icon"><Gift size={21}/></span><div><strong>На конференции — с приятным дополнением</strong><p>Гид по первому объявлению: фотографии, описание, цена и вопросы покупателю.</p></div><button className="text-link" onClick={()=>openForm("market")}>Забрать гид <ArrowRight size={17}/></button></div></section> : (<section className="conference-section wrap" id="conference"><div className="conference-panel"><div className="conference-copy"><span className="eyebrow"><Gift size={15}/> ДЛЯ УЧАСТНИКОВ КОНФЕРЕНЦИИ</span><h2>Ваш бонус<br/>для хорошего старта.</h2><p>Полезные материалы и особые условия для участников конференции. Выберите одно или несколько направлений.</p><button className="button button-dark" onClick={()=>openForm()}>Забрать свой бонус <ArrowUpRight size={18}/></button><span className="conference-micro">Одна короткая форма. Можно выбрать несколько сервисов.</span></div><div className="conference-ticket"><div className="ticket-top"><span className="mini-brand">FRENTS</span><span>ДЛЯ СВОИХ</span></div><div className="ticket-main"><span className="ticket-label">ВАШЕ ПРИГЛАШЕНИЕ</span><h3>Больше<br/>возможностей.</h3><div className="ticket-benefits"><p><Check size={15}/> Личный разбор задач проката</p><p><Check size={15}/> Ранний доступ для декораторов</p><p><Check size={15}/> Гид по продаже и покупке декора</p><p><Check size={15}/> Чек-лист для команды и портфолио</p></div></div><div className="ticket-bottom"><span>СОЗДАВАТЬ ЛЕГЧЕ ВМЕСТЕ</span><ArrowUpRight size={29}/></div></div></div></section>);
  const faqSection = (<section className="faq-section wrap" id="faq"><div><span className="eyebrow">ЕЩЁ ПАРА ДЕТАЛЕЙ</span><h2>{active === "market" ? "Ещё вопросы?" : <>Вы могли<br/>об этом подумать.</>}</h2></div><Accordion type="single" collapsible className="faq-list">{(active === "market" ? marketQuestions : [["Можно пользоваться только одним сервисом?","Да. Начните с той задачи, которая актуальна сейчас: прокат, свои проекты, барахолка или специалисты. Интерес к остальным можно отметить позже."],["Я декоратор и ничего не сдаю в аренду. Мне подходит?","Да. Направление «Проекты и свой склад» задумано для работы со своим реквизитом. Вы оставляете заявку на ранний доступ — публиковать вещи для аренды не нужно."],["Барахолка бесплатна только для участников?","Нет. До конца 2026 года размещение объявлений бесплатно для всех пользователей. Бонус участника — полезный гид по продаже и покупке декора."],["Что произойдёт после заявки?","Сразу после отправки можно скачать материалы по выбранным направлениям. Команда Frents свяжется с вами по указанному контакту, чтобы рассказать о сервисе и условиях подключения."],["Сколько стоят сервисы?","До конца 2026 года размещение на барахолке бесплатно. Для студий аренды есть разные тарифы: подберём вариант под ваши задачи. Условия новых направлений обсудим при знакомстве."]]).map(([q,a],i)=><AccordionItem value={String(i)} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></section>);

  return <>
    <a className="skip-link" href={active === "market" ? "#service-details" : "#services"}>Перейти к сервисам</a>
    <Tabs value={active} onValueChange={value=>chooseService(value, true)} className="page-service-tabs">
    <header ref={headerRef} className="site-header"><div className="header-inner"><Logo/><span className="header-divider"/><span className="header-context">Для тех, кто создаёт события</span><nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Основная навигация"><a href={active === "market" ? publicPath("/#services") : "#services"} onClick={()=>setMenuOpen(false)}>Возможности</a><a href={publicPath("/?service=market#service-details")} onClick={event=>{event.preventDefault();chooseService("market",true)}} aria-current={active === "market" ? "page" : undefined}>Барахолка</a><a href="#conference" onClick={()=>setMenuOpen(false)}>Бонусы конференции</a><a href="#app" onClick={()=>setMenuOpen(false)}>Приложение</a></nav><button className="header-cta" onClick={()=>openForm()}>Забрать бонус <Gift size={16}/></button><button className="menu-button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <span/>}</button></div>
      <div className="service-dock"><div className="service-dock-inner">
        <span className="service-dock-label">Выберите своё</span>
        <TabsList className="service-switcher" aria-label="Переключить сервис">
          {ids.map(id => { const Icon = icons[id]; return <TabsTrigger key={id} value={id} className="service-switch" aria-label={services[id].shortName} onClick={()=>{if(active===id)chooseService(id,true)}}><Icon size={17}/><span>{serviceLabels[id]}</span></TabsTrigger>; })}
        </TabsList>
        <a className="dock-app-link" href="#app"><Smartphone size={16}/> Есть приложение <ArrowUpRight size={13}/></a>
      </div></div>
    </header>
    <main>
      {active === "market" ? <div ref={detailRef} id="service-details" className="market-detail-start"><TabsContent value="market" className="market-service-content"><FleaLanding><AppShowcase/>{conferenceSection}{faqSection}</FleaLanding></TabsContent></div> : <>
      <section className="hero wrap">
        <div className="hero-copy"><div className="eyebrow"><span className="conference-mark"><Sparkles size={13}/></span> ВСТРЕЧАЕМСЯ НА КОНФЕРЕНЦИИ</div><h1>Больше творчества.<br/><span>Меньше рутины.</span></h1><p className="hero-description">Прокат, свой склад, барахолка и специалисты. Четыре сервиса Frents — выберите то, что нужно вам.</p><div className="hero-actions"><a className="button button-dark" href="#services">Смотреть сервисы <ArrowDown size={18}/></a><button className="text-link" onClick={()=>openForm()}>Мне за бонусом <ArrowUpRight size={17}/></button></div><div className="hero-note"><Gift size={16}/><span>Особые условия для участников конференции</span></div><a className="hero-app-link" href="#app"><Smartphone size={16}/><span>И в своём приложении — iOS и Android</span><ArrowUpRight size={14}/></a></div>
        <div className="hero-visual"><img className="hero-photo" src={publicPath("/assets/hero-tablescape.webp")} alt="Современная сервировка: белые каллы, хромированные вазы и зелёный текстиль" width="1536" height="1024" fetchPriority="high"/><div className="image-label"><span>КРАСОТА — В ДЕТАЛЯХ.</span><span>Порядок — во Frents.</span></div><div className="hero-float"><div className="hero-float-icon"><Check size={19}/></div><div><strong>Всё сложилось.</strong><span>И проект, и команда, и декор.</span></div></div><div className="visual-index">F / 01</div></div>
      </section>
      <div className="audience-bar wrap"><span>ОДНА ПЛАТФОРМА. ВАШ КРУГ.</span><div><span>Декораторы</span><Plus size={13}/><span>Студии аренды</span><Plus size={13}/><span>Флористы</span><Plus size={13}/><span>Команды событий</span></div></div>
      <section className="services-section wrap" id="services"><div className="section-heading"><div><div className="eyebrow">ПОД ВАШУ ЗАДАЧУ</div><h2>Чем Frents поможет вам?</h2></div><p>Выберите сервис — и сразу к делу.</p></div>
        <div className="service-tabs"><div className="service-grid" role="group" aria-label="Выберите задачу">{ids.map((id,index)=>{const s=services[id];const Icon=icons[id];return <button type="button" key={id} className={`service-card card-${id}`} data-state={active===id ? "active" : "inactive"} aria-pressed={active===id} onClick={()=>chooseService(id,true)}><span className="service-card-top"><span className="service-icon"><Icon size={23} strokeWidth={1.6}/></span><span className="service-number">0{index+1}</span></span><span className="service-audience">{s.audience}</span><span className="service-title">{s.cardTitle}</span><span className="service-summary">{s.cardDescription}</span><span className="service-card-bottom"><span>{s.tag}</span><span className="service-arrow"><ArrowUpRight size={20}/></span></span></button>})}</div>
          <div ref={detailRef} id="service-details" className="service-detail-start">
          {ids.filter(id=>id!=="market").map(id=><TabsContent value={id} key={id} className="service-content"><div className="detail-grid"><div className="detail-copy"><div className="detail-label"><span>0{ids.indexOf(id)+1}</span> {services[id].name}</div>{id==="specialists"&&<Tabs value={intents[id]} onValueChange={v=>setIntents({...intents,[id]:v})} className="intent-tabs"><TabsList aria-label="Ваша задача"><TabsTrigger value={"team"}>{"Ищу команду"}</TabsTrigger><TabsTrigger value={"provider"}>{"Предлагаю услуги"}</TabsTrigger></TabsList></Tabs>}<h3>{alternate && current.alternate ? current.alternate.title : services[id].title}</h3><p className="detail-description">{alternate && current.alternate ? current.alternate.description : services[id].description}</p><ul className="benefit-list">{benefits.map((b,i)=><li key={i}><span><Check size={15}/></span><div><strong>{b[0]}</strong><p>{b[1]}</p></div></li>)}</ul><div className="detail-actions"><button className="button button-dark" onClick={()=>openForm(id)}>{id==="specialists"&&intents.specialists==="provider" ? "Получить чек-лист профиля" : services[id].cta}<ArrowUpRight size={17}/></button><span>{services[id].footnote}</span></div></div><ProductPreview service={id} intent={intents[id]}/></div><div className="detail-bonus"><span className="bonus-small-icon"><Gift size={21}/></span><div><strong>На конференции — с приятным дополнением</strong><p>{alternate && current.alternate ? current.alternate.bonus : services[id].bonus}</p></div><button className="text-link" onClick={()=>openForm(id)}>Это для меня <ArrowRight size={17}/></button></div><Accordion type="single" collapsible className="service-extra" key={`extra-${id}`}><AccordionItem value="screens"><AccordionTrigger><span className="mobile-extra-label">Все возможности и ещё 3 экрана</span><span className="desktop-extra-label">Ещё 3 экрана: как это работает</span></AccordionTrigger><AccordionContent><ul className="expanded-benefits">{benefits.map(([title,text])=><li key={title}><strong>{title}</strong><p>{text}</p></li>)}</ul><ScreenStoryboard service={id}/></AccordionContent></AccordionItem></Accordion></TabsContent>)}
          </div>
        </div>
      </section>
      <AppShowcase/><section className="ecosystem wrap"><span className="eyebrow">ОТ ЗАМЫСЛА ДО МОНТАЖА</span><h2>Ваши идеи. Ваши люди.<br/><span>Всё в одном кругу.</span></h2><div className="ecosystem-steps">{[{i:FolderOpen,t:"Соберите проект",d:"Начните с идеи и своего реквизита."},{i:Boxes,t:"Найдите недостающее",d:"В аренде или на барахолке."},{i:UsersRound,t:"Пригласите своих",d:"Специалистов, близких вам по стилю."},{i:Sparkles,t:"Создавайте",d:"Когда за кулисами всё в порядке."}].map((s,i)=><div key={i} className="ecosystem-step"><div><s.i size={22} strokeWidth={1.5}/><span>0{i+1}</span></div><h4>{s.t}</h4><p>{s.d}</p></div>)}</div></section>
      {conferenceSection}
      {faqSection}
      </>}
    </main>
    {active !== "market" && <footer className="site-footer"><div className="wrap footer-top"><Logo light/><p>Хорошие события начинаются<br/>с хороших связей.</p><a href="https://frents.ru" target="_blank" rel="noreferrer">Перейти на frents.ru <ArrowUpRight size={16}/></a><a href="#services">Выбрать сервис <ArrowUpRight size={16}/></a></div><div className="wrap footer-bottom"><span>© 2026 FRENTS</span><a href="https://frents.ru/moskva/policy-privacy" target="_blank" rel="noreferrer">Политика конфиденциальности</a><span>Для тех, кто создаёт.</span></div></footer>}
    <div className="mobile-bonus"><span className="mobile-current-service"><small>0{ids.indexOf(active)+1} / 04</small><strong>{current.shortName}</strong></span><button onClick={()=>openForm(active)}>Забрать бонус <Gift size={16}/></button></div>
    </Tabs>
    <Dialog open={formOpen} onOpenChange={v=>{if(!sending)setFormOpen(v)}}><DialogContent className="lead-dialog" showCloseButton={false}><DialogClose className="dialog-close" disabled={sending} aria-label="Закрыть форму"><X size={21}/></DialogClose>{sent ? <div className="success-state"><span className="success-icon"><Check size={29}/></span><span className="eyebrow">РАДЫ ЗНАКОМСТВУ</span><DialogTitle>Всё начинается<br/>с хороших связей.</DialogTitle><DialogDescription>Заявка получена. Мы свяжемся с вами по указанному контакту. А полезные материалы уже здесь:</DialogDescription><div className="download-list">{submittedServices.map(id=><a key={id} href={publicPath(`/bonuses/${id}.html`)} target="_blank" rel="noreferrer"><span>{services[id].download}</span><Download size={19}/></a>)}</div><button className="button button-dark" onClick={()=>setFormOpen(false)}>Продолжить знакомство <ArrowRight size={17}/></button></div> : <><span className="form-eyebrow"><Gift size={18}/> БОНУС УЧАСТНИКА</span><DialogTitle>Давайте создадим<br/>что-то хорошее.</DialogTitle><DialogDescription>Отметьте интересные направления. Пришлём материалы и расскажем, с чего начать.</DialogDescription><form onSubmit={submit} className="lead-form"><fieldset><legend>Что вам интересно?</legend><div className="form-services">{ids.map(id=><label className={`interest-chip ${selected.includes(id) ? "selected" : ""}`} key={id}><Checkbox checked={selected.includes(id)} onCheckedChange={checked=>setSelected(checked ? [...selected,id] : selected.filter(s=>s!==id))}/><span>{services[id].shortName}</span></label>)}</div></fieldset><label className="field-label" htmlFor="lead-name">Как к вам обращаться <span>необязательно</span></label><input id="lead-name" name="name" autoComplete="name" maxLength={80} placeholder="Ваше имя" value={name} onChange={e=>setName(e.target.value)}/><label className="field-label" htmlFor="lead-contact">Telegram, телефон или email</label><input id="lead-contact" name="contact" autoComplete="off" required minLength={5} maxLength={120} placeholder="@username, +7… или email" value={contact} onChange={e=>setContact(e.target.value)}/><div className="honeypot" aria-hidden="true"><label>Ваш сайт<input name="website" tabIndex={-1} autoComplete="off"/></label></div><label className="consent-label"><Checkbox checked={consent} onCheckedChange={v=>setConsent(v===true)} aria-label="Согласие на обработку персональных данных"/><span>Даю <a href="https://frents.ru/moskva/personal-data-consent" target="_blank" rel="noreferrer">согласие на обработку персональных данных</a> для связи по заявке и принимаю <a href="https://frents.ru/moskva/policy-privacy" target="_blank" rel="noreferrer">политику конфиденциальности</a>.</span></label>{error&&<p className="form-error" role="alert">{error}</p>}<button type="submit" className="button button-dark submit-button" disabled={sending}>{sending ? <><LoaderCircle className="spin" size={18}/> Отправляем…</> : <>Получить бонус и подробности <ArrowUpRight size={18}/></>}</button><p className="form-note">Свяжемся только по выбранным направлениям.</p></form></>}</DialogContent></Dialog>
  </>;
}
