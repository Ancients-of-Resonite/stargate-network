await Bun.build({
  entrypoints: [
    "./src/main.ts"
  ],
  outdir: "./build",
  format: "cjs",
  target: "bun"
})

export {}
