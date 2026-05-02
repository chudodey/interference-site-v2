import type { ReactNode } from 'react';

export interface Layer {
  number: string;
  title: string;
  description: ReactNode;
}

export interface ProgramItem {
  time: string;
  title: string;
  description: ReactNode;
}

export interface ContextItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface HistoryItem {
  date: string;
  event: ReactNode;
}

export interface TeamMember {
  name: ReactNode;
  role: string;
  description: ReactNode;
}

export interface Partner {
  name: string;
  note?: string;
  href?: string;
  logo?: string;
}

export interface Organizer {
  name: string;
  shortName: string;
  href?: string;
  logo?: string;
}

export const showDescription =
  '«Интерференция реальностей» — нейроспектакль-импровизация и живой эксперимент научного искусства, в котором зритель становится соавтором происходящего. Действие создаётся в реальном времени и не повторяется.';

export const showLead =
  'Нейротехнологии считывают внутренние состояния участников — внимание, уровень возбуждения, нейрофизиологические паттерны — и вплетают их в развитие действия. Сценография, звук и поведение актёров откликаются на эти изменения, формируя замкнутый контур обратной связи между залом и сценой.';

export const showQuestion =
  'Может ли коллективное состояние зрителей влиять на ход событий? Мы взяли вопросы, которые ставит квантовая физика и феноменология сознания, и перенесли их в театральное пространство. Не для того, чтобы доказать, — для того, чтобы пережить.';

export const layers: Layer[] = [
  {
    number: '01',
    title: 'Физический слой',
    description: (
      <>
        Тела, звук и движение в пространстве{' '}
        <a
          href="https://www.icc40.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          ИКЦ
        </a>
        . Без физического присутствия не существует ни события, ни его восприятия.
      </>
    ),
  },
  {
    number: '02',
    title: 'Внутренний слой',
    description:
      'Внутренние состояния участников: паттерны внимания, уровень возбуждения, нейрофизиологические реакции. ЭЭГ регистрирует ритмы мозга — альфа, бета, гамма — каждый из которых отражает своё состояние: расслабление, концентрацию, вовлечённость. Считываются в реальном времени и становятся сценическим материалом.',
  },
  {
    number: '03',
    title: 'Воображаемый слой',
    description:
      'То, что возникает между участниками, когда физическое и внутреннее накладываются друг на друга. Интерференция — не метафора, а механизм.',
  },
];

export const conceptQuote = {
  text: 'Коллективное внимание и синхронизация — это ресурс. Спектакль создаёт пространство, в котором участники исследуют, как формируется их общий опыт.',
  source: (
    <>
      Из концепции проекта /{' '}
      <a
        href="https://odadream.art/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-primary hover:underline"
      >
        ODA.dream
      </a>{' '}
      / 2026
    </>
  ),
};

export const programTimeline: ProgramItem[] = [
  {
    time: '~18:30',
    title: 'Открытие пространства',
    description: 'Вход зрителей, знакомство с нейрогарнитурами, короткая вводная беседа.',
  },
  {
    time: '~19:00',
    title: 'Премьера',
    description: 'Начало спектакля-импровизации. Зрители надевают нейроинтерфейсы.',
  },
  {
    time: '~19:45',
    title: 'Интерактивный акт',
    description: 'Коллективное состояние зала начинает влиять на сценографию и звук.',
  },
  {
    time: '~20:30',
    title: 'Финал и обсуждение',
    description: 'Завершение спектакля, демонтаж оборудования, разговор с авторами.',
  },
];

export const contextItems: ContextItem[] = [
  {
    id: 'everett',
    title: 'Эверетт, Менский и множественность реальностей',
    content: (
      <>
        Спектакль вдохновлён многомировой интерпретацией{' '}
        <a
          href="https://ru.wikipedia.org/wiki/%D0%AD%D0%B2%D0%B5%D1%80%D0%B5%D1%82%D1%82,_%D0%A5%D1%8C%D1%8E"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Хью Эверетта III
        </a>{' '}
        (1957) и работами{' '}
        <a
          href="https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9,_%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB_%D0%91%D0%BE%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%B8%D1%87"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Михаила Менского
        </a>{' '}
        о сознании и квантовых измерениях. В квантовой механике акт наблюдения изменяет систему. Мы
        переносим этот вопрос в театр: меняет ли присутствие зрителя то, что происходит на сцене?
      </>
    ),
  },
  {
    id: 'stanislavsky',
    title: 'Театральная линия: Станиславский и Евреинов',
    content: (
      <>
        <a
          href="https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D0%B0%D0%BD%D0%B8%D1%81%D0%BB%D0%B0%D0%B2%D1%81%D0%BA%D0%B8%D0%B9,_%D0%9A%D0%BE%D0%BD%D1%81%D1%82%D0%B0%D0%BD%D1%82%D0%B8%D0%BD_%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B5%D0%B2%D0%B8%D1%87"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Константин Станиславский
        </a>{' '}
        искал подлинное переживание актёра, которое делает воплощение убедительным.{' '}
        <a
          href="https://ru.wikipedia.org/wiki/%D0%95%D0%B2%D1%80%D0%B5%D0%B8%D0%BD%D0%BE%D0%B2,_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D0%B8%D1%87"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Николай Евреинов
        </a>{' '}
        рассматривал зрителя как участника, который достраивает реальность в своём восприятии.
        Спектакль соединяет эти две линии: актёр и зритель участвуют в создании события наравне.
      </>
    ),
  },
  {
    id: 'neiry',
    title: 'Технологический партнёр: Neiry',
    content: (
      <>
        Группа компаний{' '}
        <a
          href="https://neiry.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Neiry
        </a>{' '}
        — технологический партнёр спектакля. Нейрогарнитуры{' '}
        <a
          href="https://neiry.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Neiry Headband Pro
        </a>{' '}
        считывают электрическую активность мозга через кожу головы, регистрируя ритмы: от медленной
        дельты (1–4 Гц) до быстрой гаммы (30–100 Гц). Эти данные в реальном времени передаются в
        медиасистему спектакля и влияют на сценографию, звук и поведение актёров.
      </>
    ),
  },
  {
    id: 'history',
    title: 'История проекта: от истоков к премьере',
    content: (
      <>
        2025 — зарождение идеи, первые лаборатории{' '}
        <a
          href="https://odadream.art/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          ODA.dream
        </a>
        . Осень 2025 — сотрудничество с ИТБ при{' '}
        <a
          href="https://www.icc40.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          ИКЦ
        </a>
        , Калуга. Зима 2026 — интеграция нейроинтерфейсов{' '}
        <a
          href="https://neiry.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Neiry
        </a>
        . Апрель 2026 — открытие сайта, старт регистрации. 16 мая 2026 — премьера на XIV{' '}
        <a
          href="https://t-fest.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Циолковском Фесте
        </a>
        .
      </>
    ),
  },
  {
    id: 'now',
    title: 'Зачем это сейчас',
    content:
      'Спектакль предлагает рассматривать коллективное внимание и синхронизацию как ресурс. Не утверждение — опыт. Не ответ — вопрос.',
  },
];

export const projectHistory: HistoryItem[] = [
  { date: '2025', event: 'Зарождение идеи, первые лаборатории ODA.dream' },
  { date: 'Осень 2025', event: 'Сотрудничество с ИТБ при ИКЦ, Калуга' },
  { date: 'Зима 2026', event: 'Интеграция нейроинтерфейсов Neiry' },
  { date: 'Апрель 2026', event: 'Открытие сайта, старт регистрации' },
  { date: '16 мая 2026', event: 'Премьера / XIV Циолковский Фест, ИКЦ, 19:00' },
];

export const faqItems: ContextItem[] = [
  {
    id: 'what-is',
    title: 'Что такое нейроспектакль?',
    content:
      'Это спектакль, в котором нейротехнологии считывают состояние зрителей — внимание, возбуждение, нейрофизиологические паттерны — и передают их в медиасистему. Электроэнцефалограмма фиксирует ритмы мозга: от медленной дельты (1–4 Гц) до быстрой гаммы (30–100 Гц). Каждый ритм отражает своё состояние — расслабление, концентрацию, вовлечённость. Эти данные в реальном времени управляют сценографией, звуком и поведением актёров.',
  },
  {
    id: 'knowledge',
    title: 'Нужно ли что-то знать заранее?',
    content:
      'Нет. Никакой специальной подготовки не требуется. Приходите такими, какие вы есть — спектакль строится на вашем живом присутствии, а не на знаниях.',
  },
  {
    id: 'headsets',
    title: 'Как работают нейрогарнитуры?',
    content: (
      <>
        Мы используем{' '}
        <a
          href="https://neiry.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Neiry Headband Pro
        </a>{' '}
        — портативные ЭЭГ-устройства. Электроды касаются кожи головы и считывают электрическую
        активность мозга. Это безинвазивно, безопасно и не вызывает дискомфорта.
      </>
    ),
  },
  {
    id: 'safety',
    title: 'Это безопасно?',
    content:
      'Да. ЭЭГ — это пассивное считывание электрической активности, которую мозг сам излучает. Устройства ничего не передают в мозг, а только принимают сигнал. Это та же технология, что используется в медицине десятилетиями.',
  },
  {
    id: 'duration',
    title: 'Сколько длится спектакль?',
    content:
      'Примерно 60–70 минут без антракта. Начало в 19:00, рекомендуем приходить к 18:30 — будет короткая вводная беседа и знакомство с оборудованием.',
  },
  {
    id: 'children',
    title: 'Можно ли прийти с детьми?',
    content:
      'Возрастное ограничение — 12+. Спектакль рассчитан на внимательного взрослого зрителя, готового к непредсказуемому опыту. Детям младше 12 лет может быть сложно удерживать фокус в течение всего действия.',
  },
  {
    id: 'late',
    title: 'Что делать, если я опоздал?',
    content:
      'Опоздавших, к сожалению, не получится пустить в зал — вход в середине действия разрушает общее поле внимания, которое формируется в первые минуты. Пожалуйста, приходите заранее.',
  },
  {
    id: 'cancel',
    title: 'Как отменить регистрацию?',
    content: (
      <>
        Отменить регистрацию можно через письмо подтверждения от{' '}
        <a
          href="https://tsiolkovskiy-fest-event.timepad.ru/event/3937269/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          Timepad
        </a>{' '}
        или написав нам на почту. Это важно — места ограничены форматом эксперимента, и мы хотим,
        чтобы каждое кресло было занято.
      </>
    ),
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'ODA.dream',
    role: 'Авторы идеи',
    description:
      'Ольга и Далер Арабовы. Художественное объединение, работающее на стыке науки, технологий и перформанса.',
  },
  {
    name: 'Ксения Голыжбина',
    role: 'Автор идеи, хореограф-постановщик',
    description: '',
  },
  {
    name: 'Анна Сенатова',
    role: 'Художественный руководитель фестиваля, продюсер спектакля',
    description: '',
  },
  {
    name: 'Танцовщики ИТБ',
    role: 'Авторы идеи, исполнители',
    description: (
      <>
        Инновационный Театр Балета при{' '}
        <a
          href="https://www.icc40.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline"
        >
          ИКЦ
        </a>
        , Калуга — тела, через которые проходит вся система.
      </>
    ),
  },
  {
    name: 'Александр Шестернин',
    role: 'Композитор / live-set',
    description: '',
  },
  {
    name: 'Аркадий Лаврентьев',
    role: 'Художник по свету',
    description: '',
  },
];

export const performers = 'Танцовщики Инновационного Театра Балета, зрители с нейрогарнитурами';

export const venueInfo = {
  name: (
    <>
      <a
        href="https://www.icc40.ru/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-primary hover:underline"
      >
        ИКЦ
      </a>{' '}
      — Инновационный культурный центр
    </>
  ),
  address: 'Калуга, ул. Октябрьская, 17а',
  festival: (
    <>
      XIV Фестиваль Современного Искусства «
      <a
        href="https://t-fest.online/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-primary hover:underline"
      >
        Циолковский Фест
      </a>
      »
    </>
  ),
  festivalDates: '16–23 мая 2026',
  artisticDirector: 'Анна Сенатова',
  coordinator: 'Дарья Казаку',
};

export const partners: Partner[] = [
  {
    name: 'Neiry',
    note: 'технологический партнёр — лидер в области разработки и применения нейротехнологий',
    href: 'https://neiry.ru',
    logo: '/partners/NEIRY.svg',
  },
  {
    name: 'ТСХР',
    note: 'Творческий союз художников России',
    href: 'https://tcxp.ru/',
    logo: '/partners/TSHR.svg',
  },
];

export const organizers: Organizer[] = [
  {
    name: 'Министерство культуры и туризма Калужской области',
    shortName: 'Минкульт КО',
    href: 'https://vk.com/min_kult_ko',
    logo: '/partners/MINKULT_KO.svg',
  },
  {
    name: 'Инновационный культурный центр и Инновационный театр балета',
    shortName: 'ИКЦ и ИТБ',
    href: 'https://www.icc40.ru/',
    logo: '/partners/IKC.svg',
  },
  {
    name: 'Тема этого года — «Горизонты»',
    shortName: 'XIV Фестиваль современного искусства «Циолковский Фест»',
    href: 'https://t-fest.online/',
    logo: '/partners/TSIALKOV.svg',
  },
  {
    name: 'Творческий дуэт Ольги и Далера Арабовых',
    shortName: 'ODA.dream',
    href: 'https://odadream.art/',
    logo: '/partners/ODA.svg',
  },
];
