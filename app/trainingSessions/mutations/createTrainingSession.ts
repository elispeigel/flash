import { Ctx } from "blitz"
import db, { TrainingSessionCreateArgs } from "db"

type CreateTrainingSessionInput = {
  data: TrainingSessionCreateArgs["data"]
}
export default async function createTrainingSession(
  { data }: CreateTrainingSessionInput,
  { session }: Ctx
) {
  if (!session.userId) return null

  const trainingSession = await db.trainingSession.create({
    data: {
      ...data,
      user: {
        connect: { id: session.userId },
      },
    },
  })

  return trainingSession
}
