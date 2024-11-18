'use server';

import prisma from "@/lib/prisma";
import { getBranchesByAdmin } from "../admin/get-branches-by-id";
import { EmployeeGridData } from "@/interfaces";
import { getEmployeeById } from "./get-employee-by-id";

export const getEmployeesByAdmin = async (search: string): Promise<EmployeeGridData[]> => {
    const branches = await getBranchesByAdmin();
    try {
        const newSearch = search.trim().toLowerCase().replace(/\s+/g, ' ');

        // Obtener usuarios
        const users = await prisma.user.findMany({
            where: {
                branchOfficeId: {
                    in: branches.map(branch => branch.id),
                },
                OR: [
                    {
                        firstName: {
                            contains: newSearch,
                            mode: 'insensitive',
                        },
                    },
                    {
                        lastName: {
                            contains: newSearch,
                            mode: 'insensitive',
                        },
                    },
                    {
                        email: {
                            contains: newSearch,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: newSearch,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                branchOfficeId: true,
                profileImage: true,
                branchOffice: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        // Obtener los detalles de cada usuario usando getEmployeeById
        const transformedUsers: EmployeeGridData[] = await Promise.all(
            users.map(async (user) => {
                const employeeData = await getEmployeeById(user.id); // Llamada al server action

                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    branchOfficeId: user.branchOfficeId || '',
                    branchOfficeName: user.branchOffice?.name || '',
                    profileImage: user.profileImage || '',
                    rating: employeeData.data?.user?.averageRating || 0, // Usamos el rating calculado
                };
            })
        );

        return transformedUsers;
    } catch (error) {
        console.error(error);
        return [];
    }
};
