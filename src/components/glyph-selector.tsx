"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";

export function GlyphSelector() {
  const [glyphs, setGlyphs] = useLocalStorage("glyph-display-type", "text");

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        Glyph Display Type
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuGroup>
            <DropdownMenuRadioGroup value={glyphs} onValueChange={setGlyphs}>
              <DropdownMenuRadioItem value="text">Raw Text</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="mw">MilkyWay Glyphs</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="pg">Pegasus Glyphs</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="un">Universe Glyphs</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
