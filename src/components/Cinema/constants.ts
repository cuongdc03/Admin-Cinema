export const SCREEN_SIZE = [
  {
    name: 'S',
    rows: 6,
    cols: 6
  },
  {
    name: 'M',
    rows: 10,
    cols: 10
  },
  {
    name: 'L',
    rows: 14,
    cols: 14
  },
  {
    name: 'XL',
    rows: 18,
    cols: 18
  }
] as const

export const CREATE_SCREEN = 'Create Screen'
export const CREATE_SCREEN_SUCCESS = 'Create new screen successfully'
export const CREATE_SCREEN_FAILED = 'Error occurred while creating a new screen. Try again!'

export const UPDATE_SCREEN = 'Update Screen'
export const UPDATE_SCREEN_SUCCESS = 'Update screen successfully'
export const UPDATE_SCREEN_FAILED = 'Error occurred while updating screen. Try again!'

export const SUCCESS_STATUS = 200
