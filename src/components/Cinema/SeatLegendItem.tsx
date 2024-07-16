import SingleSeat from '@/assets/seat-single.svg?react'

export default function SeatLegendItem({ className, label }: { className: string; label: string }) {
  return (
    <div className='flex items-center gap-2'>
      <SingleSeat className={className} />
      <span className='text-md font-medium'>{label}</span>
    </div>
  )
}
