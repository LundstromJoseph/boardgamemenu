export const validUserId = (userId: string) => {
	if (userId.length > 300) {
		return false
	}
	const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/
	return regex.test(userId)
}
