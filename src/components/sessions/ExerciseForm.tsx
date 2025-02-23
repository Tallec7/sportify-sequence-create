import { useState } from "react"
import { Exercise } from "@/types/sequence"
import { ExerciseAlternatives } from "@/components/sessions/ExerciseAlternatives"

interface ExerciseFormProps {
  onSave: (exercise: Exercise) => void
  sessionData: SessionFormData
  onCancel: () => void
  initialData?: Exercise
}

export const ExerciseForm = ({ 
  onSave,
  sessionData,
  onCancel,
  initialData
}: ExerciseFormProps) => {
  const [currentExercise, setCurrentExercise] = useState<Exercise>(initialData || {
    id: "",
    title: "",
    description: "",
    duration: 0,
    intensity_level: "medium",
    exercise_order: 1,
    activity_type: "exercise",
    objective: ""
  })
  const [showAlternatives, setShowAlternatives] = useState(false)

  const handleSave = () => {
    onSave(currentExercise)
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            id="title"
            value={currentExercise.title}
            onChange={(e) => setCurrentExercise({ ...currentExercise, title: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={currentExercise.description}
            onChange={(e) => setCurrentExercise({ ...currentExercise, description: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Durée (minutes)</label>
          <input
            id="duration"
            type="number"
            value={currentExercise.duration}
            onChange={(e) => setCurrentExercise({ ...currentExercise, duration: Number(e.target.value) })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="intensity_level" className="block text-sm font-medium text-gray-700">Niveau d'intensité</label>
          <select
            id="intensity_level"
            value={currentExercise.intensity_level}
            onChange={(e) => setCurrentExercise({ ...currentExercise, intensity_level: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          >
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Élevée</option>
          </select>
        </div>
      </div>
      
      {showAlternatives && (
        <ExerciseAlternatives
          exercise={currentExercise}
          sessionData={sessionData}
          onSelectAlternative={(alternative) => {
            setCurrentExercise({
              ...alternative,
              id: currentExercise.id,
              exercise_order: currentExercise.exercise_order
            })
            setShowAlternatives(false)
          }}
        />
      )}
      
      <div className="flex justify-end space-x-4">
        <button onClick={onCancel} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Annuler</button>
        <button onClick={handleSave} className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sauvegarder</button>
      </div>
    </div>
  )
}
