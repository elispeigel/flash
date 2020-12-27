# Migration `20201209031258-v1`

This migration has been generated at 12/8/2020, 9:12:58 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN')

CREATE TYPE "public"."ExerciseType" AS ENUM ('DEADLIFT', 'CAMPUS', 'DIP', 'PULLUP', 'FINGERS', 'ROW', 'DBSP', 'FINGER_CURL', 'REVERSE_CURL', 'BOX_STEP', 'VERTICAL_PP', 'FORWARD_PP', 'LEG_RAISES', 'ROLLOUT', 'SEATED_CORE')

CREATE TYPE "public"."Difficulty" AS ENUM ('EASY', 'AVERAGE', 'HARD')

CREATE TABLE "User" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT E'user',

    PRIMARY KEY ("id")
)

CREATE TABLE "Session" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "userId" INTEGER,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,

    PRIMARY KEY ("id")
)

CREATE TABLE "TrainingSession" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "strengthSessionId" INTEGER NOT NULL,
    "climbingSessionId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Set" (
"id" SERIAL,
    "reps" INTEGER,
    "weight" INTEGER,
    "duration" INTEGER,
    "exerciseId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE TABLE "Exercise" (
"id" SERIAL,
    "type" "ExerciseType" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "rest" INTEGER NOT NULL,
    "strengthSessionId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE TABLE "StrengthSession" (
"id" SERIAL,

    PRIMARY KEY ("id")
)

CREATE TABLE "ClimbingSession" (
"id" SERIAL,
    "duration" INTEGER NOT NULL,
    "restLength" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "CircuitSession" (
"id" SERIAL,
    "duration" INTEGER NOT NULL,
    "restLength" INTEGER NOT NULL,
    "notes" TEXT,
    "highGrade" INTEGER NOT NULL,
    "lowGrade" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Project" (
"id" SERIAL,
    "grade" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL,
    "notes" TEXT,
    "projectSessionId" INTEGER,

    PRIMARY KEY ("id")
)

CREATE TABLE "ProjectSession" (
"id" SERIAL,
    "duration" INTEGER NOT NULL,
    "restLength" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle")

ALTER TABLE "Session" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "TrainingSession" ADD FOREIGN KEY("strengthSessionId")REFERENCES "StrengthSession"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "TrainingSession" ADD FOREIGN KEY("climbingSessionId")REFERENCES "ClimbingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Set" ADD FOREIGN KEY("exerciseId")REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Exercise" ADD FOREIGN KEY("strengthSessionId")REFERENCES "StrengthSession"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Project" ADD FOREIGN KEY("projectSessionId")REFERENCES "ProjectSession"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201203031629-initial-migration..20201209031258-v1
--- datamodel.dml
+++ datamodel.dml
@@ -1,18 +1,23 @@
 // This is your Prisma schema file,
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
-  provider = "sqlite"
-  url = "***"
+  provider = "postgres"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 // --------------------------------------
+enum Role {
+  USER
+  ADMIN
+}
+
 model User {
   id             Int       @default(autoincrement()) @id
   createdAt      DateTime  @default(now())
   updatedAt      DateTime  @updatedAt
@@ -35,4 +40,90 @@
   antiCSRFToken      String?
   publicData         String?
   privateData        String?
 }
+
+model TrainingSession {
+  id              Int              @default(autoincrement()) @id
+  title           String
+  createdAt       DateTime         @default(now())
+  updatedAt       DateTime         @updatedAt
+  strengthSession StrengthSession
+  climbingSession ClimbingSession
+}
+
+enum ExerciseType {
+  DEADLIFT //HARD weights
+  CAMPUS //HARD climbing strength
+  DIP //HARD weights
+  PULLUP //HARD weights
+  FINGERS //HARD weights
+  ROW //MEDIUM BW
+  DBSP //MEDIUM weights
+  FINGER_CURL //MEDIUM weights
+  REVERSE_CURL //MEDIUM weights
+  BOX_STEP //MEDIUM weights
+  VERTICAL_PP //LIGHT cable
+  FORWARD_PP //LIGHT cable
+  LEG_RAISES //LIGHT bodyweight
+  ROLLOUT //LIGHT bodyweight
+  SEATED_CORE //LIGHT bodyweight
+}
+
+model Set {
+  id       Int  @default(autoincrement()) @id
+  reps     Int?
+  weight   Int? //lbs
+  duration Int?
+}
+
+enum Difficulty {
+  EASY
+  AVERAGE
+  HARD
+}
+
+model Exercise {
+  id         Int           @default(autoincrement()) @id
+  type       ExerciseType
+  sets       Set[]
+  difficulty Difficulty
+  rest       Int
+}
+
+model StrengthSession {
+  id        Int         @default(autoincrement()) @id
+  exercsies Exercise[]
+}
+
+model ClimbingSession {
+  id         Int     @default(autoincrement()) @id
+  duration   Int
+  restLength Int
+  notes      String
+}
+
+model CircuitSession {
+  id         Int     @default(autoincrement()) @id
+  duration   Int
+  restLength Int
+  notes      String?
+  highGrade  Int
+  lowGrade   Int
+  // volume patter? string following pattern 7-3-1 or 6-4-3-1
+}
+
+model Project {
+  id       Int      @default(autoincrement()) @id
+  grade    Int
+  duration Int
+  attempts Int
+  notes    String?
+}
+
+model ProjectSession {
+  id         Int        @default(autoincrement()) @id
+  duration   Int
+  restLength Int
+  notes      String
+  projects   Project[]
+}
```


