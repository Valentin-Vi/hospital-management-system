"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/@models/components/ui/button"
import { Calendar } from "@/@models/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/@models/components/ui/popover"

export type Calendar22Props = {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  disablePastDates?: boolean
}

export function Calendar22({
  date,
  setDate,
  disablePastDates = false,
}: Calendar22Props) {
  const [open, setOpen] = React.useState(false)
  const today = React.useMemo(() => {
    if (!disablePastDates) return null
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
  }, [disablePastDates])

  const disablePastMatcher = React.useMemo(() => {
    if (!disablePastDates || !today) return undefined
    return (selectedDay: Date) => {
      const normalizedDay = new Date(selectedDay)
      normalizedDay.setHours(0, 0, 0, 0)
      return normalizedDay <= today
    }
  }, [disablePastDates, today])

  const startMonth = React.useMemo(() => {
    if (!disablePastDates || !today) return undefined
    const firstDayOfMonth = new Date(today)
    firstDayOfMonth.setDate(1)
    return firstDayOfMonth
  }, [disablePastDates, today])

  const endMonth = React.useMemo(() => {
    if (!disablePastDates || !today) return undefined
    const future = new Date(today)
    future.setFullYear(future.getFullYear() + 20, 11, 1)
    return future
  }, [disablePastDates, today])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-48 justify-between font-normal"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          disabled={disablePastMatcher}
          hidden={disablePastMatcher}
          startMonth={startMonth}
          endMonth={endMonth}
          onSelect={(date) => {
            setDate(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
