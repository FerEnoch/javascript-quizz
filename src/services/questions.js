export const getAllQuestions = async () => {
  const res = await fetch('https://javascriptquizz.vercel.app/data.json')
  const json = await res.json()

  return json
}
