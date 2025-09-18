-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Service" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Questionnaire" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "visibility" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "public"."Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "public"."Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_slug_key" ON "public"."Questionnaire"("slug");

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
