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
  },
  name: {
    required: {
      value: true,
      message: 'Name is required'
    }
  },
  size: {
    required: {
      value: true,
      message: 'Size is required'
    },
    notIn: {
      value: ['NONE'],
      message: 'Size is required'
    }
  }
})

export const schema = yup.object({
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  name: yup.string().required('Name is required'),
  size: yup.string().required('Size is required').not(['NONE'], 'Size is required')
})
