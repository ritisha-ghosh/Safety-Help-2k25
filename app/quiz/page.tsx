"use client"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { Award, Clock, CheckCircle, XCircle, RefreshCcw, Home, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  category: string
}

interface QuizStats {
  totalAttempts: number
  averageScore: number
  bestScore: number
}

const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the most important aspect of consent?",
    options: [
      "It must be given verbally.",
      "It can be implied by silence.",
      "It must be enthusiastic, ongoing, and freely given.",
      "It is only needed for physical intimacy.",
    ],
    correctAnswer: "It must be enthusiastic, ongoing, and freely given.",
    explanation:
      "Consent is an enthusiastic, ongoing, and freely given agreement to engage in an activity. It can be withdrawn at any time, and silence or lack of resistance does not imply consent.",
    category: "Consent & Boundaries",
  },
  {
    id: 2,
    question: "If someone makes you feel uncomfortable with unwanted touching, what is the best immediate action?",
    options: [
      "Ignore it and hope it stops.",
      "Politely ask them to stop.",
      "Clearly and firmly state 'No' or 'Stop' and create distance.",
      "Tell a friend later.",
    ],
    correctAnswer: "Clearly and firmly state 'No' or 'Stop' and create distance.",
    explanation:
      "Clearly and firmly stating 'No' or 'Stop' and creating physical distance immediately sends a strong message that the behavior is unwanted. Your safety and comfort are paramount.",
    category: "Responding to Harassment",
  },
  {
    id: 3,
    question: "What does 'bad touch' refer to in the context of child safety and education?",
    options: [
      "Any physical contact that causes pain.",
      "Touching that makes a child feel uncomfortable, scared, or confused, especially in private areas.",
      "Accidental bumps or pushes.",
      "Touching that is not affectionate.",
    ],
    correctAnswer: "Touching that makes a child feel uncomfortable, scared, or confused, especially in private areas.",
    explanation:
      "Bad touch refers to any touch that makes a child feel uncomfortable, scared, or confused, particularly when it involves private body parts. It's crucial to teach children the difference between good and bad touch and to report bad touch to a trusted adult.",
    category: "Child Safety & Education",
  },
  {
    id: 4,
    question: "What is the primary goal of the #MeToo movement?",
    options: [
      "To punish all men.",
      "To encourage women to leave their jobs.",
      "To expose and address widespread sexual harassment and assault, and support survivors.",
      "To ban all physical contact in workplaces.",
    ],
    correctAnswer: "To expose and address widespread sexual harassment and assault, and support survivors.",
    explanation:
      "The #MeToo movement aims to raise awareness about the prevalence of sexual harassment and assault, empower survivors to speak out, and hold perpetrators accountable, fostering a culture of respect and safety.",
    category: "Social Awareness & Support",
  },
  {
    id: 5,
    question: "If you witness someone being harassed in public, what is a safe and effective way to intervene?",
    options: [
      "Directly confront the harasser aggressively.",
      "Ignore it to avoid escalating the situation.",
      "Distract the harasser, delegate for help, or document the incident.",
      "Immediately call 911 without assessing the situation.",
    ],
    correctAnswer: "Distract the harasser, delegate for help, or document the incident.",
    explanation:
      "The '5 D's of Bystander Intervention' (Direct, Distract, Delegate, Document, Delay) offer safe ways to help. Distracting the harasser, delegating to someone in authority, or documenting the event are often safer than direct confrontation.",
    category: "Bystander Intervention",
  },
  {
    id: 6,
    question: "What is a 'safe word' or 'code word' used for in personal safety planning?",
    options: [
      "A password for your phone.",
      "A secret phrase to signal distress to trusted contacts without alerting an aggressor.",
      "A word to calm yourself down in a stressful situation.",
      "A phrase to use when you want to leave a social gathering.",
    ],
    correctAnswer: "A secret phrase to signal distress to trusted contacts without alerting an aggressor.",
    explanation:
      "A safe word or code word is a pre-arranged word or phrase used to discreetly signal to a trusted person that you are in danger or need help, allowing them to intervene or call for assistance without alerting the person causing distress.",
    category: "Personal Safety Planning",
  },
]

const QUIZ_STATS_KEY = "safetyHelpQuizStats"

export default function SafetyQuizPage() {
  const { user } = useAuth()
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizStats, setQuizStats] = useState<QuizStats>({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
  })
  const [timeRemaining, setTimeRemaining] = useState(15) // 15 seconds per question
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    const storedStats = localStorage.getItem(QUIZ_STATS_KEY)
    if (storedStats) {
      setQuizStats(JSON.parse(storedStats))
    }
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timerActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timerActive && timeRemaining === 0) {
      clearInterval(timer)
      handleNextQuestion() // Auto-advance if time runs out
    }
    return () => clearInterval(timer)
  }, [timerActive, timeRemaining])

  const startQuiz = useCallback(() => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeRemaining(15)
    setTimerActive(true)
  }, [])

  const handleAnswerSelect = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer)
      setTimerActive(false) // Pause timer when answer is selected
    }
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === mockQuizQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1)
    }

    if (currentQuestionIndex < mockQuizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setTimeRemaining(15)
      setTimerActive(true)
    } else {
      setShowResult(true)
      setTimerActive(false)
      updateQuizStats(score + (selectedAnswer === mockQuizQuestions[currentQuestionIndex].correctAnswer ? 1 : 0))
    }
  }

  const updateQuizStats = (finalScore: number) => {
    setQuizStats((prevStats) => {
      const newTotalAttempts = prevStats.totalAttempts + 1
      const newTotalScore = prevStats.averageScore * prevStats.totalAttempts + finalScore
      const newAverageScore = newTotalScore / newTotalAttempts
      const newBestScore = Math.max(prevStats.bestScore, finalScore)

      const updatedStats = {
        totalAttempts: newTotalAttempts,
        averageScore: newAverageScore,
        bestScore: newBestScore,
      }
      localStorage.setItem(QUIZ_STATS_KEY, JSON.stringify(updatedStats))
      return updatedStats
    })
  }

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold gradient-text mb-8">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Please{" "}
          <Link href="/login" className="text-electric-blue hover:underline">
            login
          </Link>{" "}
          to take the Safety Knowledge Quiz.
        </p>
      </div>
    )
  }

  const currentQuestion = mockQuizQuestions[currentQuestionIndex]
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer
  const hasAnswered = selectedAnswer !== null || timeRemaining === 0

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex-1">
      <h1 className="text-4xl font-bold text-electric-blue mb-8">Safety Knowledge Quiz</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {!quizStarted ? (
            <Card className="bg-dark-card border-dark-border shadow-glow-md shadow-electric-blue/30 p-8 text-center">
              <CardTitle className="text-3xl font-bold text-electric-blue mb-4">Test Your Safety Knowledge!</CardTitle>
              <p className="text-lg text-muted-foreground mb-6">
                Challenge yourself with questions on consent, harassment, and personal safety for women.
              </p>
              <Button
                onClick={startQuiz}
                className="bg-electric-blue text-primary-foreground hover:bg-electric-blue/80 shadow-glow-sm shadow-electric-blue/50 py-3 px-8 text-lg"
              >
                Start Quiz
              </Button>
            </Card>
          ) : showResult ? (
            <Card className="bg-dark-card border-dark-border shadow-glow-md shadow-vibrant-green/30 p-8 text-center">
              <CardTitle className="text-3xl font-bold text-electric-blue mb-4">Quiz Complete!</CardTitle>
              <p className="text-2xl text-foreground mb-4">
                Your Score: {score} / {mockQuizQuestions.length}
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={startQuiz}
                  className="bg-vibrant-green text-primary-foreground hover:bg-vibrant-green/80 shadow-glow-sm shadow-vibrant-green/50"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" /> Retake Quiz
                </Button>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-electric-blue text-electric-blue hover:bg-electric-blue/10 bg-transparent"
                  >
                    <Home className="mr-2 h-4 w-4" /> Back to Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="bg-dark-card border-dark-border shadow-glow-md shadow-electric-blue/30">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Question {currentQuestionIndex + 1} of {mockQuizQuestions.length}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span className={cn("font-bold", timeRemaining <= 5 && "text-destructive pulsate-dot")}>
                      {timeRemaining}s
                    </span>
                  </div>
                </div>
                <Progress
                  value={((currentQuestionIndex + 1) / mockQuizQuestions.length) * 100}
                  className="w-full h-2 bg-muted/20 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-electric-blue"
                />
              </CardHeader>
              <CardContent className="grid gap-6">
                <p className="text-lg font-medium text-foreground">{currentQuestion.question}</p>
                <div className="grid gap-3">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left py-3 h-auto bg-background border-dark-border hover:bg-electric-blue/10",
                        selectedAnswer === option && "ring-2 ring-offset-2 ring-offset-dark-card",
                        hasAnswered &&
                          selectedAnswer === option &&
                          (isCorrect
                            ? "ring-vibrant-green border-vibrant-green"
                            : "ring-destructive border-destructive"),
                        hasAnswered &&
                          option === currentQuestion.correctAnswer &&
                          selectedAnswer !== option &&
                          "border-vibrant-green bg-vibrant-green/10", // Highlight correct answer if user was wrong
                      )}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={hasAnswered}
                    >
                      {option}
                      {hasAnswered && option === currentQuestion.correctAnswer && (
                        <CheckCircle className="ml-auto h-5 w-5 text-vibrant-green" />
                      )}
                      {hasAnswered && selectedAnswer === option && !isCorrect && (
                        <XCircle className="ml-auto h-5 w-5 text-destructive" />
                      )}
                    </Button>
                  ))}
                </div>
                {hasAnswered && (
                  <div className="mt-4 p-4 rounded-md bg-muted/20 border border-dark-border">
                    <p className="font-semibold text-foreground mb-2">Explanation:</p>
                    <p className="text-muted-foreground text-sm">{currentQuestion.explanation}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleNextQuestion}
                  disabled={!hasAnswered}
                  className="w-full bg-vibrant-green text-primary-foreground hover:bg-vibrant-green/80 shadow-glow-sm shadow-vibrant-green/50"
                >
                  {currentQuestionIndex < mockQuizQuestions.length - 1 ? "Next Question" : "View Results"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="grid gap-8">
          <Card className="bg-dark-card border-dark-border shadow-glow-sm shadow-vibrant-green/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Award className="h-6 w-6 text-vibrant-green" /> Quiz Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Total Attempts:</p>
                <span className="font-bold text-foreground">{quizStats.totalAttempts}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Average Score:</p>
                <span className="font-bold text-foreground">
                  {quizStats.averageScore.toFixed(1)} / {mockQuizQuestions.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Best Score:</p>
                <span className="font-bold text-foreground">
                  {quizStats.bestScore} / {mockQuizQuestions.length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border shadow-glow-sm shadow-accent-purple/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent-purple" /> Quiz Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                <li>Consent & Boundaries</li>
                <li>Responding to Harassment</li>
                <li>Child Safety & Education</li>
                <li>Social Awareness & Support</li>
                <li>Bystander Intervention</li>
                <li>Personal Safety Planning</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
