import { Container, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import JavascriptLogo from './assets/js_logo'
import { Start } from './components/Start'
import { Game } from './components/Game'
import { useQuestionsStore } from './store/questions'

function App () {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack justifyContent='center' alignItems='center' direction='row' gap={2}>
          <JavascriptLogo />
          <Typography component='h1' variant='h2'>
            JavasScript Quizz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
