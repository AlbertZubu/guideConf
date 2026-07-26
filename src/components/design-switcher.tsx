import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DESIGN_SYSTEMS, type DesignKey } from "@/hooks/use-design-system";

export function DesignSwitcher({
  value,
  onChange,
}: {
  value: DesignKey;
  onChange: (key: DesignKey) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v as DesignKey)}
      spacing={0}
      className="bg-muted border-border flex-wrap justify-start rounded-full border p-0.5"
      aria-label="Design system"
    >
      {DESIGN_SYSTEMS.map((d) => (
        <ToggleGroupItem
          key={d.key}
          value={d.key}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-full! px-3 text-[12.5px] font-semibold whitespace-nowrap"
        >
          {d.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
