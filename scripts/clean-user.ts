import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanUser() {
    const email = "yudhahafiz@gmail.com"; // Ganti dengan email Anda jika berbeda

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            console.log(`User found: ${user.email}. Deleting...`);
            // Delete related records first if necessary (cascade usually handles this)
            await prisma.user.delete({
                where: { email },
            });
            console.log("User deleted successfully.");
        } else {
            console.log("User not found.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    } finally {
        await prisma.$disconnect();
    }
}

cleanUser();
