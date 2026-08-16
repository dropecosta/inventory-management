import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const modelMap: Record<string, string> = {
  "products.json": "Products",
  "expenseSummary.json": "ExpenseSummary",
  "sales.json": "Sales",
  "salesSummary.json": "SalesSummary",
  "purchases.json": "Purchases",
  "purchaseSummary.json": "PurchaseSummary",
  "users.json": "Users",
  "expenses.json": "Expenses",
  "expenseByCategory.json": "ExpenseByCategory",
};

type PrismaModel = {
  deleteMany: (args: Record<string, never>) => Promise<unknown>;
  create: (args: { data: unknown }) => Promise<unknown>;
};

async function deleteAllData(orderedFileNames: string[]) {
  for (const fileName of orderedFileNames) {
    const modelName = modelMap[fileName];

    if (!modelName) {
      console.error(`No model mapping found for: ${fileName}`);
      continue;
    }

    const model = prisma[modelName as keyof typeof prisma] as unknown as
      | PrismaModel
      | undefined;

    if (!model) {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
      continue;
    }

    await model.deleteMany({});
    console.log(`Cleared data from ${modelName}`);
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = modelMap[fileName];

    if (!modelName) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    const model = prisma[modelName as keyof typeof prisma] as unknown as
      | PrismaModel
      | undefined;

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData as Record<string, unknown>[]) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });