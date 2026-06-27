import { resetDB, getDB } from "../lib/db";

/**
 * Seeds the local JSON data store (data/db.json) with demo content.
 * With a real PostgreSQL DATABASE_URL, run `npx prisma migrate deploy`
 * and seed against Prisma instead.
 */
async function main() {
  const db = await resetDB();
  await getDB();
  console.log("Seeded Goon demo store:");
  console.log(`  users:         ${db.users.length}`);
  console.log(`  members:       ${db.users.filter((u) => u.role === "member").length}`);
  console.log(`  applications:  ${db.applications.length}`);
  console.log(`  tiers:         ${db.tiers.length}`);
  console.log(`  events:        ${db.events.length}`);
  console.log(`  parlors:       ${db.parlors.length}`);
  console.log(`  bookings:      ${db.bookings.length}`);
  console.log(`  payments:      ${db.payments.length}`);
  console.log("\nDemo accounts:");
  console.log("  member: demo@demo.app / demo123  →  /dashboard");
  console.log("  admin:  admin@demo.app / admin123 →  /admin");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
