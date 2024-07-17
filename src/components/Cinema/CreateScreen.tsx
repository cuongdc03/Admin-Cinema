import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { schema } from '@/util/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Input from '@/components/Input/Input'
import ImgScreen from '@/assets/img-screen.png'
import { useEffect, useRef, useState } from 'react'
import SeatLegendItem from './SeatLegendItem'
import { adjustSeatNameToMatrix, changeStatusOfSeat, createSeatMatrix } from '@/util/createMatrix'
import { SCREEN_SIZE } from '@/components/Cinema/constants'
import { SeatRow } from '@/types/seat'
import Seat from './Seat'
import IconEditAll from '@/assets/ic-edit-all.svg?react'
import IconHideAll from '@/assets/ic-hide-all.svg?react'
import { useNavigate, useParams } from 'react-router-dom'
import { ScreenBodyType } from '@/types/screen'
import { createScreen } from '@/apis/screen'
import { toast } from 'react-toastify'
import { path } from '@/router/path'

const createScreenSchema = schema.pick(['name', 'size'])

const CreateScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createScreenSchema)
  })

  const tableRef = useRef<HTMLTableElement | null>(null)
  const [tableWidth, setTableWidth] = useState('auto')
  const [seatMatrix, setSeatMatrix] = useState<SeatRow[]>([])
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const params = useParams()
  const navigate = useNavigate()

  const changeSeatMatrixBySize = (sizeName: string) => {
    const sizeObj = SCREEN_SIZE.find((size) => size.name === sizeName)
    if (sizeObj) {
      setSeatMatrix(adjustSeatNameToMatrix(createSeatMatrix(sizeObj.rows, sizeObj.cols)))
    }
  }

  const handleChangeSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeName = event.target.value
    changeSeatMatrixBySize(sizeName)
  }

  const chooseRow = (rowName: string, isSeat: boolean) => {
    const newSeatMatrix = seatMatrix.map((row) => {
      if (row.rowName === rowName) {
        const newRowSeats = row.rowSeats.map((seat) => ({ ...seat, isSeat, name: isSeat ? seat.name : '' }))
        return {
          ...row,
          rowSeats: newRowSeats
        }
      } else {
        return row
      }
    })
    setSeatMatrix(adjustSeatNameToMatrix(newSeatMatrix))
  }

  const chooseCol = (colId: number, isSeat: boolean) => {
    const newSeatMatrix = seatMatrix.map((row) => {
      return {
        ...row,
        rowSeats: row.rowSeats.map((seat) =>
          seat.colId === colId ? { ...seat, isSeat, name: isSeat ? seat.name : '' } : seat
        )
      }
    })
    setSeatMatrix(adjustSeatNameToMatrix(newSeatMatrix))
  }

  const toggleSeatStatus = (seatMatrix: SeatRow[], rowName: string, colId: number) => {
    setSeatMatrix(changeStatusOfSeat(seatMatrix, rowName, colId))
  }

  const addNewScreen = async (screen: ScreenBodyType) => {
    const response = await createScreen(screen)
    if (response.status === 200) {
      toast.success('Create new screen successfully')
      navigate(path.detailCinema.replace(':id', params.id as string))
    } else {
      toast.error('Error occurred while creating a new screen. Try again!')
    }
  }

  const handleSaveChanges = async () => {
    // TODO
    const screen: ScreenBodyType = {
      cinemaId: Number(params.id),
      name: getValues('name'),
      size: getValues('size'),
      seatMatrix: JSON.stringify({
        data: seatMatrix
      })
    }
    addNewScreen(screen)
  }

  const onSubmit = handleSubmit(() => {
    if (!Object.keys(errors).length) {
      handleSaveChanges()
    }
  })

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.offsetWidth + 'px')
    }
  }, [seatMatrix])

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='flex items-center justify-between'>
          <Breadcrumb pageName='Create New Screen' />
          {isDisabled && (
            <button
              className='hover:bg-primary-dark mt-4 rounded-lg bg-primary px-4 py-2 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary'
              type='submit'
            >
              Create Screen
            </button>
          )}
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Input
            name='name'
            register={register}
            type='text'
            classNameLabel='mt-1 text-sm font-semibold'
            classNameInput='text-md mt-1 w-full rounded-md border-[1px] border-stone-300 bg-transparent px-3 py-2 h-[40px] text-black focus:border-black focus-visible:shadow-none bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-white'
            labelName='Screen Name'
            placeholder='Enter screen name'
            errorMessage={errors.name?.message}
            classNameError='mt-1 min-h-[1rem] text-xs font-medium text-red-400'
          />
          <div>
            <div className='mt-1 text-sm font-semibold'>Size</div>
            <select
              className='mt-1 h-[40px] w-full rounded-md border-[1px] border-stone-300 bg-transparent bg-white px-3 py-2 text-black focus:border-black focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-white'
              defaultValue='NONE'
              {...register('size', { onChange: handleChangeSize })}
            >
              <option value='NONE' disabled>
                Choose size
              </option>
              {SCREEN_SIZE.map((size) => (
                <option value={size.name} key={size.name}>
                  {size.name}: {size.rows} x {size.cols}
                </option>
              ))}
            </select>
            <div className='mt-1 min-h-[1rem] text-xs font-medium text-red-400'>
              {typeof errors.size?.message === 'string' ? errors.size.message : ''}
            </div>
          </div>
        </div>
        {getValues().size && getValues().size !== 'NONE' && (
          <div className='mt-2 overflow-auto rounded-lg bg-dark-blue-900 px-10 pb-4 pt-1'>
            <div className='relative mx-auto mt-10 flex justify-center' style={{ width: tableWidth }}>
              <img src={ImgScreen} alt='screen' />
              <h4 className='absolute left-1/2 top-[6px] -translate-x-1/2 text-xl font-bold tracking-wider'>Screen</h4>
            </div>

            <table ref={tableRef} className='mx-auto mt-3'>
              <tbody>
                {seatMatrix.length > 0 &&
                  seatMatrix.map((seatRow, rowIndex) => (
                    <tr key={seatRow.rowName}>
                      <td key={seatRow.rowName} className='px-1 py-[3px]'>
                        <div className='flex min-h-[30px] w-full min-w-[40px] items-center justify-center text-lg font-bold'>
                          {seatRow.rowName}
                        </div>
                      </td>
                      {seatRow.rowSeats.map((seat) => {
                        return (
                          <td key={`${seat.colId}-${seat.seatId}`} className='px-1 py-[3px]' colSpan={1}>
                            <Seat
                              seat={seat}
                              toggleSeatStatus={() => toggleSeatStatus(seatMatrix, seatRow.rowName, seat.colId)}
                            />
                          </td>
                        )
                      })}
                      <td key={`${seatRow.rowName}-${rowIndex}-edit-btn`} className='px-1 py-[3px]'>
                        <div
                          className='flex h-[30px] w-[40px] items-center justify-center rounded-md bg-stone-700 hover:cursor-pointer hover:bg-stone-800'
                          onClick={() => chooseRow(seatRow.rowName, true)}
                        >
                          <IconEditAll />
                        </div>
                      </td>
                      <td key={`${seatRow.rowName}-${rowIndex}-hide-btn`} className='px-1 py-[3px]'>
                        <div
                          className='flex h-[30px] w-[40px] items-center justify-center rounded-md bg-red-800 hover:cursor-pointer hover:bg-red-900'
                          onClick={() => chooseRow(seatRow.rowName, false)}
                        >
                          <IconHideAll />
                        </div>
                      </td>
                    </tr>
                  ))}
                {seatMatrix.length > 0 && (
                  <tr key='select-all'>
                    <td className='px-1 py-[3px]'>
                      <div className='flex min-h-[30px] w-full min-w-[40px] items-center justify-center text-lg font-bold'></div>
                    </td>
                    {Array.from({ length: seatMatrix[0].rowSeats.length }, (_, index) => index).map((colId: number) => (
                      <td key={`${colId}-btn`} className='px-1 py-[3px]'>
                        <div
                          className='flex h-[30px] w-[40px] items-center justify-center rounded-md bg-stone-700 hover:cursor-pointer hover:bg-stone-800'
                          onClick={() => chooseCol(colId, true)}
                        >
                          <IconEditAll />
                        </div>
                      </td>
                    ))}
                  </tr>
                )}
                {seatMatrix.length > 0 && (
                  <tr key='delete-all'>
                    <td className='px-1 py-[3px]'>
                      <div className='flex min-h-[30px] w-full min-w-[40px] items-center justify-center text-lg font-bold'></div>
                    </td>
                    {Array.from({ length: seatMatrix[0].rowSeats.length }, (_, index) => index).map((colId: number) => (
                      <td key={`${colId}-btn`} className='px-1 py-[3px]'>
                        <div
                          className='flex h-[30px] w-[40px] items-center justify-center rounded-md bg-red-800 hover:cursor-pointer hover:bg-red-900'
                          onClick={() => chooseCol(colId, false)}
                        >
                          <IconHideAll />
                        </div>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>

            <div className='mt-10 flex w-full items-center justify-center gap-8'>
              <SeatLegendItem className='h-[30px] w-[40px]' label='Regular Seat' />
              <SeatLegendItem className='h-[30px] w-[40px] opacity-[0.05]' label='No Seat' />
            </div>
          </div>
        )}
      </form>
    </>
  )
}

export default CreateScreen
