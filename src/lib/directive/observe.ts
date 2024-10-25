import { browser } from '$app/environment'

const observer = browser
	? new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.dispatchEvent(new CustomEvent<void>('visible'))
				}
			})
	  })
	: undefined

export function observe(node: HTMLElement) {
	observer?.observe(node)
}
