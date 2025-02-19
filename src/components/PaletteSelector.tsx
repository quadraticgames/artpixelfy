import { CLASSIC_PALETTES, type Palette } from "@/lib/palettes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaletteSelectorProps {
  selectedPalette: string;
  onSelectPalette: (paletteId: string) => void;
}

export function PaletteSelector({
  selectedPalette,
  onSelectPalette,
}: PaletteSelectorProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-white">Color Palette</label>
      <div className="flex gap-3 items-start">
        <Select value={selectedPalette} onValueChange={onSelectPalette}>
          <SelectTrigger className="w-[200px] bg-white/10 border-0 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CLASSIC_PALETTES.map((palette) => (
              <SelectItem key={palette.id} value={palette.id}>
                <div className="flex items-center gap-2">
                  <span>{palette.name}</span>
                  {palette.id !== 'original' && (
                    <div className="flex gap-0.5">
                      {palette.colors.slice(0, 5).map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-xs text-white/60 flex-1">
          {CLASSIC_PALETTES.find(p => p.id === selectedPalette)?.description}
        </div>
      </div>
    </div>
  );
}
