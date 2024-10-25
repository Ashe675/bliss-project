import prisma from "@/lib/prisma";

async function main() {
    await prisma.branchOffice.deleteMany()


}


(() => {
    if (process.env.NODE_ENV === 'production') return;
    main()
})()