import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { schema } from '@/util/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Input from '@/components/Input/Input'
import { useEffect, useState } from 'react'
import { adjustSeatNameToMatrix, createSeatMatrix } from '@/util/createMatrix'
import {
  CREATE_SCREEN,
  CREATE_SCREEN_FAILED,
  CREATE_SCREEN_SUCCESS,
  SCREEN_SIZE,
  SUCCESS_STATUS,
  UPDATE_SCREEN,
  UPDATE_SCREEN_FAILED,
  UPDATE_SCREEN_SUCCESS
} from '@/components/Cinema/constants'
import { SeatRow } from '@/types/seat'
import { useNavigate, useParams } from 'react-router-dom'
import { ScreenBodyType, ScreenType } from '@/types/screen'
import { createScreen, getScreenById, updateScreen } from '@/apis/screen'
import { toast } from 'react-toastify'
import { path } from '@/router/path'
import SeatMatrixTable from './SeatMatrixTable'

const createScreenSchema = schema.pick(['name', 'size'])

interface CreateScreenProps {
  isEdit: boolean
}

const CreateScreen: React.FC<CreateScreenProps> = ({ isEdit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createScreenSchema)
  })

  const [seatMatrix, setSeatMatrix] = useState<SeatRow[]>([])
  const [editScreen, setEditScreen] = useState<ScreenType>({} as ScreenType)

  const { id } = useParams()
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

  const handleAddNewScreen = async (screen: ScreenBodyType) => {
    const response = await createScreen(screen)
    if (response.status === SUCCESS_STATUS) {
      toast.success(CREATE_SCREEN_SUCCESS)
      navigate(path.detailCinema.replace(':id', id as string))
    } else {
      toast.error(CREATE_SCREEN_FAILED)
    }
  }

  const handleUpdateScreen = async (screen: ScreenType) => {
    const response = await updateScreen(screen)
    if (response.status === SUCCESS_STATUS) {
      toast.success(UPDATE_SCREEN_SUCCESS)
      navigate(path.detailCinema.replace(':id', screen.cinemaId.toString()))
    } else {
      toast.error(UPDATE_SCREEN_FAILED)
    }
  }

  const handleSaveChanges = async () => {
    if (isEdit) {
      const screen: ScreenType = {
        ...editScreen,
        name: getValues('name'),
        size: getValues('size'),
        seatMatrix: JSON.stringify({
          data: seatMatrix
        })
      }
      handleUpdateScreen(screen)
    } else {
      const screen: ScreenBodyType = {
        cinemaId: Number(id),
        name: getValues('name'),
        size: getValues('size'),
        seatMatrix: JSON.stringify({
          data: seatMatrix
        }),
        status: true
      }
      handleAddNewScreen(screen)
    }
  }

  const onSubmit = handleSubmit(() => {
    if (!Object.keys(errors).length) {
      handleSaveChanges()
    }
  })

  const fetchScreen = async (id: number) => {
    const response = await getScreenById(id)
    if (response) {
      setValue('name', response.name)
      setValue('size', response.size)
      setSeatMatrix(JSON.parse(response.seatMatrix).data)
      setEditScreen(response)
    }
  }

  useEffect(() => {
    if (isEdit) {
      fetchScreen(Number(id))
    }
  }, [])

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='flex items-center justify-between'>
          <Breadcrumb pageName={isEdit ? UPDATE_SCREEN : CREATE_SCREEN} />
          <button
            className='hover:bg-primary-dark mt-4 rounded-lg bg-primary px-4 py-2 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary'
            type='submit'
          >
            {isEdit ? UPDATE_SCREEN : CREATE_SCREEN}
          </button>
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
          <SeatMatrixTable seatMatrix={seatMatrix} setSeatMatrix={setSeatMatrix} />
        )}
      </form>
    </>
  )
}

export default CreateScreen
