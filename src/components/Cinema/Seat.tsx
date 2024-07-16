import SingleSeat from '@/assets/seat-single.svg?react'
import { cn } from '@/lib/util'
import { seat } from '@/types/seat'
import { useEffect, useState } from 'react'

interface Props {
  seat: seat
  toggleSeatStatus: () => void
}

export default function Seat({ seat, toggleSeatStatus }: Props) {
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
      className='relative flex min-h-[30px] min-w-[40px] items-center justify-center hover:cursor-pointer'
      onClick={toggleSelected}
    >
      <SingleSeat
        className={cn('h-[30px] w-[40px]', {
          'filter-white-custom-700': isSelected,
          'opacity-[0.05]': !isSelected
        })}
      />
      <span
        className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold', {
          'text-white-custom-700': seat.isSeat
        })}
      >
        {seat.name}
      </span>
    </div>
  )
}
