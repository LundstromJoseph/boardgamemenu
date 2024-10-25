export const simpleState =
	<T>(initialValue: T) =>
	() => {
		let state = $state<T>(initialValue)
		return {
			get: () => state,
			set: (value: T) => (state = value)
		}
	}
