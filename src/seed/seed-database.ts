import prisma from "../lib/prisma";
import { branchesData } from './branch-office';


async function main() {
    await prisma.image.deleteMany()
    await prisma.branchOffice.deleteMany()
    await prisma.user.deleteMany()


    await prisma.$transaction(async (tx) => {
        for (const branch of branchesData) {
            const { userOwner, employees, images, ...branchInfo } = branch;

            await tx.branchOffice.create({
                data: {
                    ...branchInfo,
                    userOwner: {
                        create: {
                            ...userOwner
                        }
                    },
                    employees: {
                        create: employees
                    },
                    images: {
                        createMany: {
                            data: images
                        }
                    }

                }
            })

        }
    })
    console.log('Seed executed successfully!')
}


(() => {
    if (process.env.NODE_ENV === 'production') return;
    main()
})()