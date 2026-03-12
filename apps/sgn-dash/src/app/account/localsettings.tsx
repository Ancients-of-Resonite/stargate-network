"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "usehooks-ts";

export default function LocalSettings() {
  const [blurHidden, setBlur] = useLocalStorage<boolean>("blur-hidden", false, { initializeWithValue: false });
  const [glyphs, setGlyphs] = useLocalStorage<string>("glyph-display-type", "text", { initializeWithValue: false });

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gate Display Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup className="w-full">
            <FieldLabel htmlFor="switch-hidden">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Blur Hidden Addresses</FieldTitle>
                  <FieldDescription>
                    Blur the gate addresses of hidden stargates
                  </FieldDescription>
                </FieldContent>
                <Switch id="switch-hidden" checked={blurHidden} onCheckedChange={setBlur} />
              </Field>
            </FieldLabel>
          </FieldGroup>
          <Separator className="my-4" />
          <RadioGroup orientation="vertical" defaultValue={glyphs} onValueChange={setGlyphs}>
            <FieldLabel htmlFor="text">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Text</FieldTitle>
                  <FieldDescription>
                    Just the raw ass text
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="text" id="text" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="mw">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>MilkyWay Glyphs</FieldTitle>
                  <FieldDescription>Display glyphs with the MilkyWay symbols.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="mw" id="mw" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="pg">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Pegasus Glyphs</FieldTitle>
                  <FieldDescription>
                    Display glyphs with the Pegasus symbols.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="pg" id="pg" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="uni">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Universe Glyphs</FieldTitle>
                  <FieldDescription>
                    Display glyphs with the Universe symbols.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="uni" id="uni" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
