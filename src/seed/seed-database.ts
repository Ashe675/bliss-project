import prisma from "../lib/prisma";
import { appointments } from './appointments';
import { branchesData } from './branch-office';


async function main() {
    console.log('Executing seed... [0%]')
    await prisma.image.deleteMany()
    await prisma.review.deleteMany()
    await prisma.branchOffice.deleteMany()
    await prisma.appointment.deleteMany()
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

    console.log('Executing seed... [25%]')

    try {
        for (const appoinment of appointments) {
            const { userScheduler: userSchedulerData, userScheduled, ...appoinmentData } = appoinment;

            // Buscar o crear el usuario que programa la cita
            const userFoundScheduler = await prisma.user.upsert({
                where: { user: userSchedulerData.user },
                update: {},
                create: {
                    ...userSchedulerData
                }
            });

            const employee = await prisma.user.findUnique({
                where: {
                    user: userScheduled,
                }
            })

            if (!employee) throw new Error(`Empleado inexistente: ${userScheduled}`);

            await prisma.appointment.create({
                data: {
                    appointmentDate: new Date(appoinmentData.appointmentDate),
                    finalDate: new Date(appoinmentData.finalDate),
                    description: appoinmentData.description,
                    status: appoinment.status,
                    userScheduledId: employee.id,
                    userSchedulerId: userFoundScheduler.id,
                }
            })
        }

        console.log('Seed executed successfully!')
    } catch (error) {
        console.log(error);

        await prisma.image.deleteMany()
        await prisma.branchOffice.deleteMany()
        await prisma.appointment.deleteMany()
        await prisma.user.deleteMany()
    }
}


(() => {
    if (process.env.NODE_ENV === 'production') return;
    main().catch((error) => {
        console.error("Error during seeding:", error);
        process.exit(1);
    });
})()