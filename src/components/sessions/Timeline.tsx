
import { Sequence } from "@/types/sequence"

interface TimelineProps {
  sequences: Sequence[]
  totalDuration: number
}

export const Timeline = ({ sequences, totalDuration }: TimelineProps) => {
  return (
    <div className="w-full h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      {sequences.map((sequence) => {
        const width = (sequence.duration / totalDuration) * 100
        return (
          <div
            key={sequence.id}
            className={`h-full inline-block relative
              ${sequence.sequence_type === 'warmup' ? 'bg-blue-500' : 
                sequence.sequence_type === 'main' ? 'bg-green-500' : 'bg-orange-500'}
              dark:opacity-80
              transition-all duration-300`}
            style={{ width: `${width}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
              {sequence.duration}min
            </div>
          </div>
        )
      })}
    </div>
  )
}
