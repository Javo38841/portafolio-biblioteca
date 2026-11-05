// Textos compartidos de la interfaz (menú, footer, componentes) en los 3 idiomas.
// El contenido largo de cada página vive en su propio archivo (p. ej. home.ts).
import { withBase } from '../data/site';

export const languages = {
  es: { label: 'Español', short: 'ES', htmlLang: 'es-CL', ogLocale: 'es_CL' },
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  pt: { label: 'Português', short: 'PT', htmlLang: 'pt-BR', ogLocale: 'pt_BR' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';
export const langs = Object.keys(languages) as Lang[];

export function getLang(locale: string | undefined): Lang {
  return locale && locale in languages ? (locale as Lang) : defaultLang;
}

/** Ruta dentro del sitio para un idioma: '/proyectos/lms' → '/en/proyectos/lms'. Incluye el `base`. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return withBase(lang === defaultLang ? clean : `/${lang}${clean === '/' ? '/' : clean}`);
}

/** Quita el prefijo de idioma (y el `base`) de un pathname: '/en/proyectos/lms' → '/proyectos/lms'. */
export function stripLang(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let p = base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
  const first = p.split('/')[1];
  if (first && first !== defaultLang && first in languages) p = p.slice(first.length + 1) || '/';
  return p;
}

// Páginas que ya existen en todos los idiomas. Las demás solo están en español por ahora.
const translatedPages = ['/'];
export function isTranslated(path: string): boolean {
  return translatedPages.includes(path.replace(/\/$/, '') || '/');
}

export const ui = {
  es: {
    'site.role': 'Desarrollador de Software',
    'nav.label': 'Principal',
    'nav.about': 'Sobre mí',
    'nav.projects': 'Proyectos',
    'nav.teach': 'Enseño',
    'nav.books': 'Libros',
    'nav.contact': 'Contacto',
    'nav.cv': 'CV (PDF)',
    'lang.label': 'Idioma',
    'lang.onlyEs': 'Esta página está disponible solo en español por ahora',
    'footer.elsewhere': 'En otros sitios',
    'footer.rights': 'Todos los derechos reservados sobre los proyectos y contenidos mostrados.',
    'footer.top': 'Volver arriba',
    'email.copy': 'Copiar email',
    'email.copied': 'Email copiado ✓',
    'email.clickToCopy': 'Click para copiar',
    'section.chapter': 'Capítulo',
    'shelf.pickCover': 'Saca un libro para ver su portada',
    'shelf.card': 'Ficha de lectura',
    'shelf.pickCard': 'Saca un libro del estante para ver su ficha.',
    'shelf.title': 'Título',
    'shelf.author': 'Autor',
    'shelf.applied': 'Dónde lo aplico',
    'shelf.coverOf': 'Portada de {title}',
    'shelf.by': ', de {author}',
    'crate.artists': 'artistas',
    'crate.prev': 'Ver artistas anteriores',
    'crate.next': 'Ver más artistas',
    'crate.spotify': '{name} en Spotify (se abre en otra pestaña)',
  },
  en: {
    'site.role': 'Software Developer',
    'nav.label': 'Main',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.teach': 'Teaching',
    'nav.books': 'Books',
    'nav.contact': 'Contact',
    'nav.cv': 'Résumé (PDF)',
    'lang.label': 'Language',
    'lang.onlyEs': 'This page is only available in Spanish for now',
    'footer.elsewhere': 'Elsewhere',
    'footer.rights': 'All rights reserved for the projects and content shown.',
    'footer.top': 'Back to top',
    'email.copy': 'Copy email',
    'email.copied': 'Email copied ✓',
    'email.clickToCopy': 'Click to copy',
    'section.chapter': 'Chapter',
    'shelf.pickCover': 'Pull out a book to see its cover',
    'shelf.card': 'Library card',
    'shelf.pickCard': 'Pull a book off the shelf to see its card.',
    'shelf.title': 'Title',
    'shelf.author': 'Author',
    'shelf.applied': 'Where I apply it',
    'shelf.coverOf': 'Cover of {title}',
    'shelf.by': ', by {author}',
    'crate.artists': 'artists',
    'crate.prev': 'See previous artists',
    'crate.next': 'See more artists',
    'crate.spotify': '{name} on Spotify (opens in a new tab)',
  },
  pt: {
    'site.role': 'Desenvolvedor de Software',
    'nav.label': 'Principal',
    'nav.about': 'Sobre mim',
    'nav.projects': 'Projetos',
    'nav.teach': 'Ensino',
    'nav.books': 'Livros',
    'nav.contact': 'Contato',
    'nav.cv': 'Currículo (PDF)',
    'lang.label': 'Idioma',
    'lang.onlyEs': 'Por enquanto esta página está disponível apenas em espanhol',
    'footer.elsewhere': 'Em outros lugares',
    'footer.rights': 'Todos os direitos reservados sobre os projetos e conteúdos exibidos.',
    'footer.top': 'Voltar ao topo',
    'email.copy': 'Copiar e-mail',
    'email.copied': 'E-mail copiado ✓',
    'email.clickToCopy': 'Clique para copiar',
    'section.chapter': 'Capítulo',
    'shelf.pickCover': 'Tire um livro para ver a capa',
    'shelf.card': 'Ficha de leitura',
    'shelf.pickCard': 'Tire um livro da estante para ver a ficha.',
    'shelf.title': 'Título',
    'shelf.author': 'Autor',
    'shelf.applied': 'Onde eu aplico',
    'shelf.coverOf': 'Capa de {title}',
    'shelf.by': ', de {author}',
    'crate.artists': 'artistas',
    'crate.prev': 'Ver artistas anteriores',
    'crate.next': 'Ver mais artistas',
    'crate.spotify': '{name} no Spotify (abre em outra aba)',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];

export function useTranslations(lang: Lang) {
  return (key: UiKey, vars: Record<string, string> = {}) =>
    Object.entries(vars).reduce<string>((s, [k, v]) => s.replace(`{${k}}`, v), ui[lang][key] ?? ui[defaultLang][key]);
}
