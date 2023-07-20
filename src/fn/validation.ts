export const validUserId = (userId: string) => {
	const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/
	return regex.test(userId)
}
