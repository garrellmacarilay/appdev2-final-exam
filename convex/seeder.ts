import { mutation } from "./_generated/server";
import bcrypt from "bcryptjs";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const initialTasks = [
      "Buy groceries",
      "Finish React Native tutorial",
      "Clean the kitchen",
      "Call mom",
      "Schedule dentist appointment",
      "Fix bug in todo app",
      "Read 10 pages of a book",
      "Go for a 20-minute run",
      "Organize desk",
      "Meditate for 5 minutes",
    ];

    // Ensure a valid user exists so seeded todos are relational.
    const existingSeedUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), "seed@example.com"))
      .unique();

    let userId = existingSeedUser?._id;

    if (!userId) {
      const hashedPassword = bcrypt.hashSync("seed1234", 10);
      userId = await ctx.db.insert("users", {
        username: "seed@example.com",
        password: hashedPassword,
      });
    }

    for (const taskText of initialTasks) {
      await ctx.db.insert("todos", {
        text: taskText,
        isCompleted: Math.random() > 0.7,
        userId,
      });
    }

    return "Successfully seeded 10 relational tasks!";
  },
});