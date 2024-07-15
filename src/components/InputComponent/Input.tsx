import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  label: string
  type?: string
  register: UseFormRegisterReturn
  error?: string
  isTextArea?: boolean
}

const Input: React.FC<InputProps> = ({ label, type = 'text', register, error, isTextArea = false }) => {
  return (
    <div>
      <label className='mb-3 block font-extrabold text-black dark:text-white'>
        {label} <span className='text-red-500'>*</span>
      </label>
      {isTextArea ? (
        <textarea
          {...register}
          className='h-[7.5rem] w-full resize-none rounded-lg border-[1.5px] border-graydark bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
        />
      ) : (
        <input
          type={type}
          {...register}
          className='w-full rounded-lg border-[1.5px] border-graydark bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
        />
      )}
      {error && <span className='text-red-500'>{error}</span>}
    </div>
  )
}

export default Input
