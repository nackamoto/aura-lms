const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Technology" },
        { name: "Science" },
        { name: "Arts" },
        { name: "Business" },
        { name: "Health" },
        { name: "Mathematics" },
        { name: "Language" },
        { name: "Music" },
        { name: "History" },
        { name: "Literature" },
        { name: "Philosophy" },
        { name: "Religion" },
        { name: "Psychology" },
        { name: "Sociology" },
        { name: "Economics" },
        { name: "Geography" },
        { name: "Political Science" },
        { name: "Anthropology" },
        { name: "Archaeology" },
        { name: "Cultural Studies" },
      ],
    });
    console.log("SUCCESS");
  } catch (error) {
    console.error(`Error seeding database: ${error}`);
  } finally {
    await database.$disconnect();
  }
}

main();
