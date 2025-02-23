import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi, describe, it, expect } from 'vitest'
import { ObjectiveType, SessionObjective } from "@/types/settings"
import { SequenceObjective } from "@/types/sequence"

describe("Objectives Validation", () => {
  const mockSessionObjectives: SessionObjective[] = [{
    id: "1",
    description: "Test objective",
    type: "technical",
    is_priority: true,
    order_index: 0,
    objective_type: ObjectiveType.LEARNING,
    session_id: "session1"
  }]

  const mockSequenceObjectives: SequenceObjective[] = [{
    id: "1",
    description: "Test sequence objective",
    type: "technical",
    is_priority: true,
    order_index: 0,
    objective_type: ObjectiveType.LEARNING.toString(),
    sequence_id: "sequence1"
  }]

  // it("renders session objectives correctly", () => {
  //   render(<SessionObjectivesForm objectives={mockSessionObjectives} sessionId="session1" />)
  //   expect(screen.getByText("Test objective")).toBeInTheDocument()
  // })

  // it("adds a new session objective", async () => {
  //   const mockOnSave = vi.fn()
  //   render(<SessionObjectivesForm objectives={mockSessionObjectives} sessionId="session1" onSave={mockOnSave} />)

  //   fireEvent.click(screen.getByText("Ajouter un objectif"))
  //   fireEvent.change(screen.getByLabelText("Description"), { target: { value: "New objective" } })
  //   fireEvent.click(screen.getByText("Enregistrer"))

  //   await waitFor(() => {
  //     expect(mockOnSave).toHaveBeenCalled()
  //   })
  // })

  // it("renders sequence objectives correctly", () => {
  //   render(<SequenceObjectivesForm sequenceObjectives={mockSequenceObjectives} sequenceId="sequence1" />)
  //   expect(screen.getByText("Test sequence objective")).toBeInTheDocument()
  // })

  // it("adds a new sequence objective", async () => {
  //   const mockOnSave = vi.fn()
  //   render(<SequenceObjectivesForm sequenceObjectives={mockSequenceObjectives} sequenceId="sequence1" onSave={mockOnSave} />)

  //   fireEvent.click(screen.getByText("Ajouter un objectif"))
  //   fireEvent.change(screen.getByLabelText("Description"), { target: { value: "New sequence objective" } })
  //   fireEvent.click(screen.getByText("Enregistrer"))

  //   await waitFor(() => {
  //     expect(mockOnSave).toHaveBeenCalled()
  //   })
  // })
})
