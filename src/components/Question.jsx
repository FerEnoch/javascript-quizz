import {
  Card,
  Typography,
  List,
  ListItemButton,
  ListItem,
  ListItemText
} from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from '../store/questions'

// Función que se crea una vez, y evita el useCallback
const getBackgroundColor = (index, info) => {
  // console.log('getBackgroundColor created')
  const { userSelectedAnswer, correctAnswer } = info
  if (userSelectedAnswer == null) return 'transparent'
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  if (index === correctAnswer) return 'green'
  if (index === userSelectedAnswer) return 'red'
  return 'transparent'
}

export function Question ({ info }) {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex) => {
    return () => {
      selectAnswer(info.id, answerIndex)
    }
  }

  return (
    <Card
      variant='outlined'
      sx={{
        bgcolor: '#222',
        p: 2,
        textAlign: 'left',
        marginTop: 4
      }}
    >
      <Typography variant='h5' sx={{ textAlign: 'center' }}>
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => {
          return (
            <ListItem
              key={index}
              disablePadding
              divider
              onClick={createHandleClick(index)}
            >
              <ListItemButton
                sx={{ backgroundColor: getBackgroundColor(index, info) }}
                disabled={info.userSelectedAnswer !== null}
              >
                <ListItemText
                  sx={{ textAlign: 'center' }}
                  primary={answer}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Card>
  )
}
