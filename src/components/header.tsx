import Image from "next/image";

export function Header() {
  return (
    <div className="p-2 h-16 flex items-center bg-slate-400 dark:bg-neutral-900">
      <div className="flex-1 flex gap-2 items-center">
        <Image width={30} height={30} src="/images/AoR_Chevron2.png" alt="aor-logo" />
        <p className="text-xl">Ancients of Resonite</p>
      </div>
    </div>
  );
}
