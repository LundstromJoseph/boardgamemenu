export function clickOutside(node: HTMLElement) {
	const handle = (event: MouseEvent | TouchEvent) => {
		if (!node) {
			return
		}
		if (node.contains(event.target as Element)) {
			return
		}
		if (event.defaultPrevented) {
			return
		}
		node.dispatchEvent(new CustomEvent<HTMLElement>('outsideClicked', { detail: node }))
		event.preventDefault()
		event.stopImmediatePropagation()
	}

	document.addEventListener('touchstart', handle, true)
	document.addEventListener('mousedown', handle, true)

	return {
		destroy() {
			document.removeEventListener('touchstart', handle, true)
			document.removeEventListener('mousedown', handle, true)
		}
	}
}
