
import { BranchOfficeData } from '../interfaces';
import { OfficeType, Role, } from "@prisma/client";
import bcryptjs from 'bcryptjs'

export const branchesData: BranchOfficeData[] = [
    {
        name: "Barbería Estilo",
        description: "Barbería tradicional con estilistas expertos",
        address: "Colonia 'Loma Linda', Frente a la pulpería Lisa.",
        rating: 4,
        longevityYear: 2015,
        registerDate: new Date(),
        images: [
            {
                imageType: 'post',
                publicId: 'branch1',
                url: '/branch/branch1.webp'
            }
        ],
        userOwner: {
            firstName: "Carlos",
            lastName: "Pérez",
            user: "cperez_admin",
            email: "cperez@unah.hn",
            password: bcryptjs.hashSync('123456', 10),
            verified: true,
            role: Role.admin,
        },
        slug: "barberia-estilo",
        officeType: OfficeType.barbershop,
        employees: [
            {
                firstName: "Juan",
                lastName: "Martínez",
                user: "jmartinez_employee",
                email: "jmartinez@unah.hn",
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: Role.employee,
            },
            {
                firstName: "Miguel",
                lastName: "Gómez",
                user: "mgomez_employee",
                email: "mgomez@unah.hn",
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: Role.employee,
            },
        ],
    },
    {
        name: "Salón de Belleza Glamour",
        description: "Ofrecemos tratamientos de belleza y spa",
        address: "Boulevard Morazán, Edificio Plaza Rosa, Segundo piso.",
        rating: 5,
        longevityYear: 2010,
        registerDate: new Date(),
        slug: "salon-belleza-glamour",
        officeType: OfficeType.salon,
        images: [
            {
                imageType: 'post',
                publicId: 'salon1',
                url: '/branch/salon1.jpg'
            }
        ],
        userOwner: {
            firstName: "Ana",
            lastName: "López",
            user: "alopez_admin",
            email: "alopez@unah.hn",
            password: bcryptjs.hashSync('123456', 10),
            verified: true,
            role: Role.admin,
        },
        employees: [
            {
                firstName: "Lucía",
                lastName: "Vásquez",
                user: "lvasquez_employee",
                email: "lvasquez@unah.hn",
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: Role.employee,
            },
            {
                firstName: "David",
                lastName: "Hernández",
                user: "dhernandez_employee",
                email: "dhernandez@unah.hn",
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: Role.employee,
            },
        ],
    },
    {
        name: "Corte & Estilo",
        description: "Servicios de barbería y cuidado masculino",
        address: "Avenida Central, Frente a Centro Comercial Los Proceres.",
        rating: 3,
        longevityYear: 2018,
        registerDate: new Date(),
        slug: "corte-estilo",
        officeType: OfficeType.barbershop,
        images: [
            {
                imageType: 'post',
                publicId: 'salon1',
                url: '/branch/branch2.jpg'
            }
        ],
        userOwner: {
            firstName: "José",
            lastName: "Ruiz",
            user: "jruiz_admin",
            email: "jruiz@unah.hn",
            password: bcryptjs.hashSync('123456', 10),
            verified: true,
            role: Role.admin,
        },
        employees: [
            {
                firstName: "Raúl",
                lastName: "Sánchez",
                user: "rsanchez_employee",
                email: "rsanchez@unah.hn",
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: Role.employee,
            },
            {
                firstName: "Pedro",
                lastName: "Castro",
                user: "pcastro_employee",
                email: "pcastro@unah.hn",
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: Role.employee,
            },
        ],
    },
    {
        name: "Spa & Belleza Divine",
        description: "Servicios de spa y tratamientos de belleza",
        address: "Colonia Kennedy, Contiguo a la farmacia 'El Ahorro'.",
        rating: 5,
        longevityYear: 2013,
        registerDate: new Date(),
        slug: "spa-belleza-divine",
        officeType: OfficeType.salon,
        images: [
            {
                imageType: 'post',
                publicId: 'salon2',
                url: '/branch/salon2.jpg'
            }
        ],
        userOwner: {
            firstName: "María",
            lastName: "Díaz",
            user: "mdiaz_admin",
            email: "mdiaz@unah.hn",
            password: bcryptjs.hashSync('123456', 10),
            verified: true,
            role: Role.admin,
        },
        employees: [
            {
                firstName: "Carmen",
                lastName: "Ortega",
                user: "cortega_employee",
                email: "cortega@unah.hn",
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: Role.employee,
            },
            {
                firstName: "Rosa",
                lastName: "Ramírez",
                user: "rramirez_employee",
                email: "rramirez@unah.hn",
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: Role.employee,
            },
        ],
    },
];