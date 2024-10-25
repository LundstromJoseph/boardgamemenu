// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		onoutsideClicked?: () => void
		onvisible?: () => void
	}
}
