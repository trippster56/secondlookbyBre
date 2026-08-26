"use client";

import { useState } from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { format, parse, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const labelClasses =
  "block text-[11px] tracking-[0.22em] uppercase text-ink-quiet mb-2";

const controlClasses =
  "w-full px-4 py-3 bg-shell border border-rule rounded-[4px] text-ink " +
  "text-base placeholder:text-ink-quiet transition-colors " +
  "focus:border-outline";

/** The same box as `controlClasses`, on a control that opens a popup rather
 *  than taking a caret. Both rely on the site-wide `:focus-visible` ring from
 *  globals.css, so a mouse click never flashes a ring. */
const triggerClasses =
  "flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-base " +
  "bg-shell border border-rule rounded-[4px] text-ink transition-colors " +
  "focus-visible:border-outline";

interface FieldProps {
  name: string;
  label: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Label + control pair for the inquiry form. Base UI's Field wires the
 * label to its control, so ids never have to be kept in sync by hand.
 */
function Field({
  name,
  label,
  className,
  children,
}: FieldProps & { children: React.ReactNode }) {
  return (
    <FieldPrimitive.Root name={name} className={className}>
      <FieldPrimitive.Label className={labelClasses}>
        {label}
      </FieldPrimitive.Label>
      {children}
    </FieldPrimitive.Root>
  );
}

type ControlProps = Omit<FieldPrimitive.Control.Props, "render">;

function FieldInput({ className, ...props }: ControlProps) {
  return (
    <FieldPrimitive.Control
      className={cn(controlClasses, className)}
      {...props}
    />
  );
}

function FieldTextarea({
  className,
  ...props
}: ControlProps & { rows?: number }) {
  return (
    <FieldPrimitive.Control
      render={<textarea />}
      className={cn(controlClasses, "resize-none", className)}
      {...props}
    />
  );
}

interface FieldOption {
  value: string;
  label: string;
}

/**
 * Select built on Base UI rather than a native `<select>`: the OS menu ignores
 * the site's type and palette entirely, and on iOS it becomes a full-height
 * wheel. `h-auto!` beats the shadcn trigger's `data-[size]:h-8`, which is a
 * variant and so outranks a plain height class.
 */
function FieldSelect({
  options,
  placeholder,
  value,
  onValueChange,
  className,
}: {
  options: FieldOption[];
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}) {
  return (
    <Select
      items={options}
      value={value === "" ? null : value}
      onValueChange={(next) => onValueChange(next ?? "")}
    >
      <SelectTrigger className={cn(triggerClasses, "h-auto!", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="p-1">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="py-2.5 pl-3 text-base"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const VALUE_FORMAT = "yyyy-MM-dd";

/**
 * Date picker built on react-day-picker in a popover — the replacement for
 * `<input type="date">`, whose mm/dd/yyyy segments and system calendar can't
 * be styled at all.
 *
 * The value stays the `yyyy-MM-dd` string the API and the notification email
 * already expect; only what the trigger shows is formatted for reading.
 */
function FieldDatePicker({
  value,
  onValueChange,
  placeholder = "SELECT A DATE",
  className,
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = value
    ? parse(value, VALUE_FORMAT, new Date())
    : undefined;
  // Enquiries are about events still to come, so the past is closed off.
  const today = startOfDay(new Date());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(triggerClasses, className)}
        render={<FieldPrimitive.Control render={<button type="button" />} />}
      >
        <span className={cn(!selected && "text-ink-quiet")}>
          {selected ? format(selected, "MMMM d, yyyy") : placeholder}
        </span>
        <CalendarIcon className="size-5 shrink-0 text-plum" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? today}
          startMonth={today}
          disabled={{ before: today }}
          onSelect={(date) => {
            onValueChange(date ? format(date, VALUE_FORMAT) : "");
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export {
  Field,
  FieldInput,
  FieldTextarea,
  FieldSelect,
  FieldDatePicker,
  type FieldOption,
};
