
import { ImageType, OfficeType } from "@prisma/client";
import { EmployeeData, UserData } from "./user.interface";

export interface BranchOfficeData {
    name: string;
    description: string;
    address: string;
    rating: number | null;
    longevityYear: number;
    registerDate: Date;
    userOwner: UserData;
    employees: EmployeeData[];
    slug: string;
    officeType: OfficeType;
    images: {
        imageType: ImageType;
        publicId: string;
        url: string;
    }[]
}

export interface BranchOfficeGridData {
    name: string;
    description: string;
    address: string;
    rating: number | null;
    longevityYear: number;
    registerDate: Date;
    slug: string;
    officeType: OfficeType;
    images: {
        imageType: ImageType;
        publicId: string;
        url: string;
    }[]
}
