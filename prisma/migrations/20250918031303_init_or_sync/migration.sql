-- CreateEnum
CREATE TYPE "public"."RuleTargetType" AS ENUM ('PLAN', 'CATEGORY', 'SERVICE');

-- CreateTable
CREATE TABLE "public"."Catalog" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "price" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Response" (
    "id" TEXT NOT NULL,
    "questionnaireId" INTEGER NOT NULL,
    "userEmail" TEXT,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."QuestionnaireRule" (
    "id" TEXT NOT NULL,
    "target" "public"."RuleTargetType" NOT NULL,
    "slug" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "fields" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionnaireRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DashboardChecklistItem" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DashboardMetric" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MemberPreference" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "corePlan" BOOLEAN NOT NULL DEFAULT true,
    "totalCents" INTEGER NOT NULL DEFAULT 1900,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MemberSelection" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL DEFAULT 500,

    CONSTRAINT "MemberSelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MemberChecklistItem" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."QuestionnaireResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "plan" TEXT NOT NULL,
    "metricMode" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionnaireResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Catalog_slug_key" ON "public"."Catalog"("slug");

-- CreateIndex
CREATE INDEX "Response_questionnaireId_idx" ON "public"."Response"("questionnaireId");

-- CreateIndex
CREATE INDEX "QuestionnaireRule_target_slug_idx" ON "public"."QuestionnaireRule"("target", "slug");

-- CreateIndex
CREATE INDEX "DashboardChecklistItem_userEmail_ord_idx" ON "public"."DashboardChecklistItem"("userEmail", "ord");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardMetric_userEmail_key_key" ON "public"."DashboardMetric"("userEmail", "key");

-- CreateIndex
CREATE UNIQUE INDEX "MemberPreference_email_key" ON "public"."MemberPreference"("email");

-- CreateIndex
CREATE INDEX "MemberSelection_memberId_idx" ON "public"."MemberSelection"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberSelection_memberId_slug_key" ON "public"."MemberSelection"("memberId", "slug");

-- CreateIndex
CREATE INDEX "MemberChecklistItem_memberId_idx" ON "public"."MemberChecklistItem"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberChecklistItem_memberId_key_key" ON "public"."MemberChecklistItem"("memberId", "key");

-- AddForeignKey
ALTER TABLE "public"."Response" ADD CONSTRAINT "Response_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "public"."Questionnaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MemberSelection" ADD CONSTRAINT "MemberSelection_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."MemberPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MemberChecklistItem" ADD CONSTRAINT "MemberChecklistItem_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."MemberPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
