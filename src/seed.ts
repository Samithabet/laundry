import seedService from "./services/seedService";
async function main() {
  await seedService.SeedRoleAndUsperAdmin();
}
main()
  .then(() => {
    console.log("seeded successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log("seeded failed", error);
    process.exit(1);
  });
