import { formatDistanceToNow } from 'date-fns'

export default function formatTimeLeft(timer) {
  if (timer === 0) {
    return 'time is over'
  }
  if (timer <= 3600000) {
    const minutes = Math.floor(timer / 60000)
    const seconds = Math.floor((timer % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} left`
  }

  return `${formatDistanceToNow(new Date(new Date().getTime() + timer), {
    includeSeconds: true,
  })} left`
}
