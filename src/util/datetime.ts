import moment, { Moment } from 'moment'

export const isCurrentTimeWithOtherTimezoneGreaterThan = (givenTime: string | Date | Moment): boolean => {
  const currentTime = moment()
  const givenMoment = moment(givenTime)
  return currentTime.isAfter(givenMoment)
}
