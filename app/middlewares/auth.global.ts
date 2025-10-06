export default defineNuxtRouteMiddleware(async to => {
	const isUserNavigatingToTheApp = to.path.startsWith('/app')
	if (!isUserNavigatingToTheApp) {
		return
	}

	const { data: loggedIn } = await useAuthClient().useSession(useFetch)
	if (!loggedIn.value) {
		return navigateTo('/auth/login')
	}
})