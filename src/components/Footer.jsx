import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/questions'

export function Footer () {
  const [correct, incorrect, unanswered] = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`correct: ${correct} - incorrect: ${incorrect} - ?? ${unanswered}`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
    </footer>
  )
}
