export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { data: session } = await useAuthClient().useSession(useFetch)

  if (!session.value?.user.tags.includes('admin')) {
    return navigateTo("/")
  }
})
