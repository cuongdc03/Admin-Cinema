<<<<<<< ⌬ Tabnine Instruct <<<<<<<
‌import SingleSeat from '@/assets/seat-single.svg?react'
‌import { cn } from '@/lib/util'
‌import { seat } from '@/types/seat'
‌import { isCurrentTimeWithOtherTimezoneGreaterThan } from '@/util/datetime'
‌import { useEffect, useState } from 'react'
‌
‌interface Props {
‌  seat: seat
‌  toggleSeatStatus: () => void
‌  isReadOnly: boolean
‌}
‌
‌export default function Seat({ seat, toggleSeatStatus, isReadOnly }: Props) {
​/**
​ * A React functional component that represents a single seat in a theater.
​ *
​ * @param seat - The seat object containing information about the seat's status and name.
​ * @param toggleSeatStatus - A function that toggles the seat's status when clicked.
​ *
​ * @returns A React element representing the seat.
​ */
​export default function Seat({ seat, toggleSeatStatus }: Props) {
  const [isSelected, setIsSelected] = useState<boolean>(seat.isSeat)

  const toggleSelected = () => {
    setIsSelected(!isSelected)
    toggleSeatStatus()
  }

  useEffect(() => {
    setIsSelected(seat.isSeat)
  }, [seat])

  return (
    <div
‌      className={cn('relative flex min-h-[30px] min-w-[40px] items-center justify-center', {
‌        'hover: cursor-default': isReadOnly,
‌        'hover: cursor-pointer': !isReadOnly
‌      })}
​      className='relative flex min-h-[30px] min-w-[40px] items-center justify-center hover:cursor-pointer'
      onClick={toggleSelected}
    >
      <SingleSeat
        className={cn('h-[30px] w-[40px]', {
‌          'filter-white-custom-700': (!isReadOnly && isSelected) || isReadOnly,
‌          'filter-dark-gray-custom': isReadOnly && seat.isSold,
‌          'filter-blue-custom':
‌            isReadOnly && !seat.isSold && seat.onHold && !isCurrentTimeWithOtherTimezoneGreaterThan(seat.onHold),
‌          'opacity-[0.05]': !isReadOnly && !isSelected
​          'filter-white-custom-700': isSelected,
​          'opacity-[0.05]': !isSelected
        })}
      />
‌      {(isReadOnly || (!isReadOnly && isSelected)) && (
‌        <span
‌          className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold', {
‌            'text-white-custom-700':
‌              isReadOnly && !seat.isSold && seat.onHold && !isCurrentTimeWithOtherTimezoneGreaterThan(seat.onHold),
‌            'text-blue-custom-700': (isReadOnly && seat.isSold) || (!isReadOnly && isSelected),
‌            'text-purple-custom-700': isReadOnly && !seat.isSold
‌          })}
‌        >
‌          {seat.name}
‌        </span>
‌      )}
​      <span
​        className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold', {
​          'text-white-custom-700': seat.isSeat
​        })}
​      >
​        {seat.name}
​      </span>
    </div>
  )
}
>>>>>>> ⌬ Tabnine Instruct >>>>>>>