import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type DropdownMenuDemoProps = {
  items: string[]
  value?: string
  onSelect?: (value: string) => void,
    disabled?: boolean
}

export function DropdownMenuDemo({ items, value, onSelect }: DropdownMenuDemoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full justify-between" variant="outline">{value || "Select an option"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem disabled={value === item} key={item} onSelect={() => onSelect?.(item)}>{item}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
