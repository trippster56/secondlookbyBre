"use client";

import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Month grid behind the date picker. react-day-picker supplies the keyboard
 * handling, focus management and roles; every colour here is a brand token.
 *
 * Deliberately not built on `Button`: the site's button language is a pill,
 * and a calendar needs a square cell. The nav arrows and day cells use the
 * classes below instead of a `tone`.
 */
const navButtonClasses =
  "inline-flex size-(--cell-size) items-center justify-center rounded-md text-ink " +
  "transition-colors hover:bg-lilac hover:text-plum " +
  "focus-visible:outline-none " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-40";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("bg-white p-1 [--cell-size:2.5rem]", className)}
      classNames={{
        // Seven cells wide, stated rather than measured: left to size itself,
        // the grid follows its caption, and the popup jumps a few pixels
        // wider on "September" than on "May".
        root: cn("w-[calc(var(--cell-size)*7)]", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-2", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(navButtonClasses, defaultClassNames.button_previous),
        button_next: cn(navButtonClasses, defaultClassNames.button_next),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size) text-sm font-medium text-plum",
          defaultClassNames.month_caption,
        ),
        caption_label: cn("select-none", defaultClassNames.caption_label),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 text-xs font-medium text-ink-quiet select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        day: cn(
          "group/day relative aspect-square w-full p-0 text-center",
          defaultClassNames.day,
        ),
        outside: cn("text-ink-quiet", defaultClassNames.outside),
        disabled: cn("text-ink-quiet opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          const Icon =
            orientation === "left"
              ? ChevronLeftIcon
              : orientation === "right"
                ? ChevronRightIcon
                : ChevronDownIcon;

          return <Icon className={cn("size-4", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  // react-day-picker moves focus by marking a day focused rather than calling
  // focus() itself, so the cell has to do it.
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-today={modifiers.today || undefined}
      data-selected={modifiers.selected || undefined}
      data-outside={modifiers.outside || undefined}
      className={cn(
        "flex size-full items-center justify-center rounded-md text-sm text-plum transition-colors",
        "hover:bg-lilac focus-visible:outline-none",
        // Days spilling in from the neighbouring months are still pickable,
        // but they read as context rather than as part of this month.
        "data-[outside=true]:text-ink-quiet",
        // Today is the brand pink. A pink *label* would be #ffc2c2 on white —
        // the colour, and unreadable — so it is the fill instead.
        "data-[today=true]:bg-lilac data-[today=true]:font-semibold",
        "data-[selected=true]:bg-plum data-[selected=true]:text-on-plum",
        "data-[selected=true]:hover:bg-plum-hover data-[selected=true]:hover:text-on-plum",
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
