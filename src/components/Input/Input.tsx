import { InputHTMLAttributes } from 'react'
import type { FieldValues, RegisterOptions, UseFormRegister, Path } from 'react-hook-form'

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameLabel?: string
  classNameInput?: string
  classNameError?: string
  classNameIcon?: string
  labelName?: string
  errorMessage?: string
  icon?: React.ElementType
  register?: UseFormRegister<T>
  rules?: RegisterOptions<T>
  name: Path<T>
}

export default function Input<T extends FieldValues>({
  className = 'mb-4',
  classNameLabel = 'text-md mt-2 mb-1 font-semibold',
  classNameInput = 'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary',
  classNameError = 'mt-2 min-h-[1.25rem] text-sm font-medium text-red-400',
  classNameIcon = 'absolute right-4 top-4',
  name,
  register,
  rules,
  labelName,
  errorMessage,
  icon: IconComponent,
  ...rest
}: InputProps<T>) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <div className={classNameLabel}>{labelName}</div>
      <div className='relative'>
        <input className={classNameInput} {...registerResult} {...rest} />
        {IconComponent && (
          <span className={classNameIcon}>
            <IconComponent />
          </span>
        )}
      </div>
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
