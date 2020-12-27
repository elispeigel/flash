import db, { FindUniqueTrainingSessionArgs } from "db"

type GetTrainingSessionInput = {
  where: FindUniqueTrainingSessionArgs["where"]
}

export default async function getTrainingSession({ where }: GetTrainingSessionInput) {
  // Can do any processing, fetching from other APIs, etc

  const project = await db.trainingSession.findOne({ where })

  return project
}
