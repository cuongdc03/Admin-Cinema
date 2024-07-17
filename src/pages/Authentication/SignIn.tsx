import LoginIcon from '@/assets/login.svg?react'
import { useForm } from 'react-hook-form'
import { schema } from '@/util/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '@/components/Input/Input'
import IconEmail from '@/assets/ic-email.svg?react'
import IconPassword from '@/assets/ic-password.svg?react'
import { login } from '@/apis/user'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '@/util/localStorage'
import { useNavigate } from 'react-router-dom'
import { path } from '@/router/path'

const loginSchema = schema.pick(['userName', 'password'])

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    const { userName, password } = data
    const response = await login({ userName, password })
    if (response) {
      toast.success('Logged in successfully')
      setTokenToLocalStorage(response)
      navigate(path.dashboard)
    }
  })

  return (
    <>
      <div className='h-[100vh] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='flex h-full flex-wrap items-center'>
          <div className='hidden w-full xl:block xl:w-1/2'>
            <div className='px-26 py-17.5 text-center'>
              <span className='mt-15 inline-block'>
                <LoginIcon />
              </span>
            </div>
          </div>

          <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
            <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
              <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                Sign In to CineStar Admin
              </h2>

              <form onSubmit={onSubmit}>
                <Input
                  name='userName'
                  register={register}
                  type='text'
                  labelName='Email'
                  placeholder='Enter your username'
                  errorMessage={errors.userName?.message}
                  icon={IconEmail}
                />
                <Input
                  name='password'
                  register={register}
                  type='password'
                  labelName='Password'
                  placeholder='Enter your password'
                  errorMessage={errors.password?.message}
                  icon={IconPassword}
                />

                <div className='mb-5'>
                  <input
                    type='submit'
                    value='Sign In'
                    className='w-full cursor-pointer rounded-lg border border-primary bg-primary px-4 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-opacity-90'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
