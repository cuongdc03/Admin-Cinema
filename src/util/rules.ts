import * as yup from 'yup'

export const getRules = () => ({
  userName: {
    required: {
      value: true,
      message: 'Username is required'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    }
  }
})

export const schema = yup.object({
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})
