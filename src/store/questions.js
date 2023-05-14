import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import confetti from 'canvas-confetti'
import { getAllQuestions } from '../services/questions'

export const useQuestionsStore = create(devtools(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit) => {
      const questions = await getAllQuestions()
      set({ questions: questions.sort(() => Math.random() - 0.5).slice(0, limit) })
    },
    selectAnswer: (questionId, answerIndex) => {
      const { questions, goNextQuestion } = get()
      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex(question => question.id === questionId)
      const questionInfo = newQuestions[questionIndex]
      const isCorrectAnswer = questionInfo.correctAnswer === answerIndex
      if (isCorrectAnswer) {
        confetti() // un side effect medio polémico... pero se puede...
        setTimeout(() => goNextQuestion(), 2000)
      }
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectAnswer,
        userSelectedAnswer: answerIndex
      }
      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { questions, currentQuestion } = get()
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1
      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion })
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    }
  }
}, {
  name: 'questions',
  getStorage: () => window.localStorage // por defecto es localStorage
})))
