// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	namespace svelte.JSX {
		interface HTMLAttributes<T> {
			onoutsideClicked: () => void
			onvisible: () => void
		}
	}
}

export {}
