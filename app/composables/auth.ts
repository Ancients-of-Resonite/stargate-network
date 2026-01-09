import { createAuthClient } from "better-auth/vue";
import { inferAdditionalFields } from "better-auth/client/plugins"

export const useAuthClient = () => {
  return createAuthClient({
    plugins: [
      inferAdditionalFields<typeof auth>()
    ],
  });
};

export const useAuthUser = async () => {
  const authClient = useAuthClient();

  return {
    user: (await authClient.useSession(useFetch)).data.value?.user,
  };
};
