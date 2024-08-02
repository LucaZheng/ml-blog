import { ui, defaultLang, showDefaultLang, languages } from './ui'

export function getLangFromUrl(url: URL) {
	const urlPath = url.pathname
	for (const lang in languages) {
		if (urlPath.includes(`/${lang}/`)) {
			return lang
		}
	}
	return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key]
	}
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		const base = import.meta.env.BASE_URL
		return !showDefaultLang && l === defaultLang ? `${base}${path}` : `${base}/${l}${path}`
	}
}
