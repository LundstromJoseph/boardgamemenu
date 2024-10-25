const USER_ID_STORE_KEY = 'USER_ID'

export const saveUserId = (userId: string) => {
	localStorage.setItem(USER_ID_STORE_KEY, userId)
}

export const getUserId = () => {
	return localStorage.getItem(USER_ID_STORE_KEY)
}

export const clearUserId = () => {
	localStorage.removeItem(USER_ID_STORE_KEY)
}
