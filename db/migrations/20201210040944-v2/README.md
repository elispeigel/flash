# Migration `20201210040944-v2`

This migration has been generated at 12/9/2020, 10:09:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "TrainingSession" ADD COLUMN     "userId" INTEGER

ALTER TABLE "TrainingSession" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201209031258-v1..20201210040944-v2
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -17,16 +17,17 @@
   ADMIN
 }
 model User {
-  id             Int       @default(autoincrement()) @id
-  createdAt      DateTime  @default(now())
-  updatedAt      DateTime  @updatedAt
-  name           String?
-  email          String    @unique
-  hashedPassword String?
-  role           String    @default("user")
-  sessions       Session[]
+  id               Int       @default(autoincrement()) @id
+  createdAt        DateTime  @default(now())
+  updatedAt        DateTime  @updatedAt
+  name             String?
+  email            String    @unique
+  hashedPassword   String?
+  role             String    @default("user")
+  sessions         Session[]
+  trainingSessions TrainingSession[]
 }
 model Session {
   id                 Int       @default(autoincrement()) @id
```


