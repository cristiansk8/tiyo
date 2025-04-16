/*
  Warnings:

  - You are about to drop the `UserCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCategory" DROP CONSTRAINT "UserCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserCategory" DROP CONSTRAINT "UserCategory_userId_fkey";

-- DropTable
DROP TABLE "UserCategory";

-- CreateTable
CREATE TABLE "user_categories" (
    "userId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_categories_pkey" PRIMARY KEY ("userId","categoryId")
);

-- AddForeignKey
ALTER TABLE "user_categories" ADD CONSTRAINT "user_categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_categories" ADD CONSTRAINT "user_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
