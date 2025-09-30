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
    </div>
  </header>
  <slot />
  <div class="absolute bottom-1 left-1 right-1 text-center text-2xl text-foreground/50 pointer-events-none">Nou Ani Anquietas</div>
</template>
