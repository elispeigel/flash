# Migration `20201227182306-linclude-userid-in-trainnig-session`

This migration has been generated at 12/27/2020, 12:23:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201210040944-v2..20201227182306-linclude-userid-in-trainnig-session
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
@@ -44,8 +44,10 @@
 }
 model TrainingSession {
   id              Int              @default(autoincrement()) @id
+  user            User?            @relation(fields:  [userId], references: [id])
+  userId          Int?
   title           String
   createdAt       DateTime         @default(now())
   updatedAt       DateTime         @updatedAt
   strengthSession StrengthSession
```


