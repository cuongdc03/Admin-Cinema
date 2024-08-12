import SingleSeat from '@/assets/seat-single.svg?react'
import { cn } from '@/lib/util'
import { seat } from '@/types/seat'
import { isCurrentTimeWithOtherTimezoneGreaterThan } from '@/util/datetime'
import { useEffect, useState } from 'react'

interface Props {
  seat: seat
  toggleSeatStatus: () => void
  isReadOnly: boolean
}

export default function Seat({ seat, toggleSeatStatus, isReadOnly }: Props) {
  const [isSelected, setIsSelected] = useState<boolean>(seat.isSeat)

  const toggleSelected = () => {
    if (!isReadOnly) {
      setIsSelected(!isSelected)
      toggleSeatStatus()
    }
  }

  useEffect(() => {
    setIsSelected(seat.isSeat)
  }, [seat])

  return (
    <div
      className={cn('relative flex min-h-[30px] min-w-[40px] items-center justify-center', {
        'hover:cursor-default': isReadOnly,
        'hover:cursor-pointer': !isReadOnly,
        'opacity-0': isReadOnly && !seat.isSeat
      })}
      onClick={toggleSelected}
    >
      <SingleSeat
        className={cn('h-[30px] w-[40px]', {
          'filter-white-custom-700': (!isReadOnly && isSelected) || isReadOnly,
          'filter-dark-gray-custom': isReadOnly && seat.isSold,
          'filter-blue-custom':
            isReadOnly && !seat.isSold && seat.onHold && !isCurrentTimeWithOtherTimezoneGreaterThan(seat.onHold),
          'opacity-[0.05]': !isReadOnly && !isSelected
        })}
      />
      {(isReadOnly || isSelected) && (
        <span
          className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold', {
            'text-purple-custom-700': isReadOnly && !seat.isSold,
            'text-white-custom-700':
              isReadOnly && (seat.isSold || (seat.onHold && !isCurrentTimeWithOtherTimezoneGreaterThan(seat.onHold)))
          })}
        >
          {seat.name}
        </span>
      )}
    </div>
  )
}
