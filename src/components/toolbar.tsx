import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesignSwitcher } from "./design-switcher";
import type { DesignKey } from "@/hooks/use-design-system";

export function Toolbar({
  design,
  onDesignChange,
}: {
  design: DesignKey;
  onDesignChange: (key: DesignKey) => void;
}) {
  return (
    <div className="no-print bg-background/85 border-border sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b px-5 py-3 backdrop-blur-md">
      <div className="text-muted-foreground min-w-0 text-[13px] leading-snug">
        Aperçu du template — chaque carte ci-dessous correspond à une page A4 paysage à l'impression. Photos
        Wikimedia Commons à titre d'exemple : à remplacer par vos visuels avant diffusion.
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <DesignSwitcher value={design} onChange={onDesignChange} />
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="size-3.5" />
          Imprimer / PDF
        </Button>
      </div>
    </div>
  );
}
