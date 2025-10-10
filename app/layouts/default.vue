<script setup lang="ts">
import { useStorage } from "@vueuse/core";
const glyph_display = useStorage("glyph_display", "text");

const { user } = await useAuthUser();

const logout = async () => {
    const auth = useAuthClient();
    await auth.signOut();
    reloadNuxtApp();
};
</script>

<template>
    <header class="p-4 h-16 bg-sidebar flex items-center justify-between">
        <div class="flex gap-4 items-center">
            <img
                src="/images/AoR_Chevron2.png"
                alt="Stargate Network Logo"
                width="45"
                height="45"
            />
            <h1 class="text-2xl font-bold">Stargate Network</h1>
        </div>

        <div class="flex gap-4 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                        <Icon name="tabler:dots" size="24" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled v-if="user"
                        >My Account</DropdownMenuItem
                    >
                    <DropdownMenuItem v-if="!user" as="a" href="/auth/login"
                        >Login</DropdownMenuItem
                    >
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Glyph Appearance
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup v-model="glyph_display">
                                <DropdownMenuRadioItem value="text"
                                    >Text</DropdownMenuRadioItem
                                >
                                <DropdownMenuRadioItem value="mw"
                                    >Milky Way</DropdownMenuRadioItem
                                >
                                <DropdownMenuRadioItem value="pg"
                                    >Pegasus</DropdownMenuRadioItem
                                >
                                <DropdownMenuRadioItem value="un"
                                    >Universe</DropdownMenuRadioItem
                                ></DropdownMenuRadioGroup
                            >
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator v-if="user" />
                    <DropdownMenuItem
                        v-if="user"
                        variant="destructive"
                        @click="logout"
                        >Logout</DropdownMenuItem
                    >
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
    <slot />
    <div
        class="absolute bottom-1 left-1 right-1 text-center text-3xl text-foreground/50 pointer-events-none font-ancient"
    >
        NOU ANI ANQUIETAS
    </div>
</template>

<style>
body {
    background: url("/images/background.png") no-repeat center center fixed;
    background-size: cover;
}
</style>
