
import { BranchOfficeData } from '../interfaces';
import { OfficeType, Role, } from "@prisma/client";
import bcryptjs from 'bcryptjs'



// export const branchesData: BranchOffice[] = [
//     {
//         name: "Barbería Estilo",
//         rating: 4,
//         address: "Colonia 'Loma Linda', Frente a la pulpería Lisa.",
//         officeType: "barbershop",
//         imageUrl: "/branch/branch1.webp"
//     },
//     {
//         name: "Salón de Belleza Glamour",
//         rating: 5,
//         address: "Boulevard Morazán, Edificio Plaza Rosa, Segundo piso.",
//         officeType: "salon",
//         imageUrl: "/branch/salon1.jpg"
//     },
//     {
//         name: "Corte & Estilo",
//         rating: 3,
//         address: "Avenida Central, Frente a Centro Comercial Los Proceres.",
//         officeType: "barbershop",
//         imageUrl: "/branch/branch2.jpg"
//     },
//     {
//         name: "Spa & Belleza Divine",
//         rating: 5,
//         address: "Colonia Kennedy, Contiguo a la farmacia 'El Ahorro'.",
//         officeType: "salon",
//         imageUrl: "/branch/salon2.jpg"
//     },
//     {
//         name: "Barbería El Caballero",
//         rating: 4,
//         address: "Centro Comercial Plaza Tegucigalpa, Local 23.",
//         officeType: "barbershop",
//         imageUrl: "/branch/branch1.webp"
//     },
//     {
//         name: "Estilo & Belleza Royal",
//         rating: 3,
//         address: "Colonia San Miguel, A una cuadra del parque central.",
//         officeType: "salon",
//         imageUrl: "/branch/salon1.jpg"
//     },
//     {
//         name: "Barbería Moderna",
//         rating: 4,
//         address: "Colonia Miraflores, Frente a la plaza comercial.",
//         officeType: "barbershop",
//         imageUrl: "/branch/branch2.jpg"
//     },
//     {
//         name: "Barbería El Corte Fino",
//         rating: 4.5,
//         address: "Avenida Los Andes, Frente a supermercado 'La Colonia'.",
//         officeType: "barbershop",
//         imageUrl: "/branch/branch1.webp"
//     },
//     {
//         name: "Salón Elegancia",
//         rating: 4.8,
//         address: "Calle 5, Plaza Central, Local 12.",
//         officeType: "salon",
//         imageUrl: "/branch/salon2.jpg"
//     },
//     {
//         name: "Barbería Caballeros Reales",
//         rating: 4.7,
//         address: "Colonia San Francisco, Contiguo a la tienda de deportes 'Elite'.",
//         officeType: "barbershop",
//         imageUrl: "/branch/branch1.webp"
//     },
//     {
//         name: "Salón y Spa Belleza Total",
//         rating: 5,
//         address: "Colonia El Pedregal, Frente a la clínica 'San Pedro'.",
//         officeType: "salon",
//         imageUrl: "/branch/salon1.jpg"
//     },
//     {
//         name: "Barbería Clásicos Modernos",
//         rating: 4.3,
//         address: "Boulevard Fuerzas Armadas, Edificio Metropolitan, Segundo nivel.",
//         officeType: "barbershop",
//         imageUrl: "/branch/branch1.webp"
//     },
//     {
//         name: "Salón Lujo y Estilo",
//         rating: 4.9,
//         address: "Residencial Palmira, Plaza Maya, Local 5.",
//         officeType: "salon",
//         imageUrl: "/branch/salon2.jpg"
//     },
//     {
//         name: "Barbería El Señor Estilo",
//         rating: 4.6,
//         address: "Colonia El Prado, Frente a la tienda 'Moda Express'.",
//         officeType: "barbershop",
//         imageUrl: "/branch/branch2.jpg"
//     }
// ];


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