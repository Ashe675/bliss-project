'use server';

import prisma from "@/lib/prisma";
import { EmployeeData } from "@/interfaces";

interface Review {
    id: string;
    raiting: number;
    comment: string | null;
    date: Date;
    reviewerId: string;
    reviewer: {
        firstName: string;
        lastName: string;
        profileImage: string | null;
    };
}

interface Post {
    id: string;
    title: string;
    createdAt: Date;
    images: Array<{
        id: string;
        url: string;
        publicId: string;
        imageType: string;
    }>;
}

interface BranchOffice {
    userOwnerId: string;
    name: string;
    address: string;
    officeType: string;
    images: Array<{
        id: string;
        url: string;
        publicId: string;
        imageType: string;
    }>;
}

interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: EmployeeData & {
            branchOffice?: BranchOffice;
            averageRating: number; 
            totalRatings: number;  
        };
        reviews?: Review[];
        posts?: Post[];
    };
    message?: string;
}

export const getEmployeeById = async (userId: string): Promise<Response> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                password: true,
                verified: true,
                profileImage: true,
                isActive: true,
                description: true,
                phoneNumber: true,
                branchOfficeId: true,
                role: true,
                user: true,
                reviewsReceived: {
                    where: { revieweeId: userId },
                    select: {
                        id: true,
                        raiting: true,
                        comment: true,
                        date: true,
                        reviewerId: true,
                        reviewer: {
                            select: {
                                firstName: true,
                                lastName: true,
                                profileImage: true
                            }
                        }
                    }
                },
                posts: {
                    select: {
                        id: true,
                        title: true,
                        createdAt: true,
                        images: {
                            select: {
                                id: true,
                                url: true,
                                publicId: true,
                                imageType: true
                            }
                        }
                    }
                },
                branchOffice: {
                    select: {
                        userOwnerId: true,
                        name: true,
                        officeType: true,
                        address: true,
                        images: {
                            select: {
                                id: true,
                                url: true,
                                publicId: true,
                                imageType: true
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            return {
                ok: false,
                status: 404,
                message: 'User not found.'
            };
        }

        const totalRatings = user.reviewsReceived.length;
        const averageRating = totalRatings > 0
            ? user.reviewsReceived.reduce((sum, review) => sum + review.raiting, 0) / totalRatings
            : 0; 

        const employeeData: EmployeeData = {
            ...user,
            email: user.email ?? "",             
            profileImage: user.profileImage ?? "",
            isActive: user.isActive ?? false,
            description: user.description ?? "",  
            phoneNumber: user.phoneNumber ?? "",  
            branchOfficeId: user.branchOfficeId ?? ""
        };

        return {
            ok: true,
            status: 200,
            data: {
                user: {
                    ...employeeData,
                    branchOffice: user.branchOffice || undefined,
                    averageRating,  
                    totalRatings    
                },
                reviews: user.reviewsReceived,
                posts: user.posts
            }
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            status: 500,
            message: 'Server internal error.'
        };
    }
};
