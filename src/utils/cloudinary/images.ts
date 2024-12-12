'use server';

import { v2 as cloudinary, TransformationOptions } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import os from 'os';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

interface UploadImagesProps {
    images: File[];
    folder: string;
    transformationOptions?: TransformationOptions;
}

export const uploadImages = async ({ images, folder, transformationOptions }: UploadImagesProps) => {
    try {
        const uploadPromises = images.map(async (image) => {
            const tempFileName = `${randomUUID()}-${image.name}`;
            const tempFilePath = path.join(os.tmpdir(), tempFileName);

            try {
                const buffer = await image.arrayBuffer();
                await fs.writeFile(tempFilePath, Buffer.from(buffer));

                const result = await cloudinary.uploader.upload(tempFilePath, {
                    folder: `bliss/${folder}`,
                    transformation: transformationOptions,
                });

                await fs.unlink(tempFilePath);

                return {
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                };
            } catch (error) {
                console.error('Error subiendo la imagen:', error);

                // Intentar eliminar el archivo temporal si hubo un error
                await fs.unlink(tempFilePath).catch(() => { });

                throw new Error('Hubo un error al subir las imágenes en la nube.');
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const deleteImageFromCloud = async (publicIdOrUrl: string) => {
    const publicId = getPublicIdFromUrl(publicIdOrUrl)
    try {
        const res = await cloudinary.uploader.destroy(publicId)
     
        return res.result === "ok"
    } catch (error) {
        console.error("Error eliminando la imagen en Cloudinary:", error);
        return false
    }
}

function getPublicIdFromUrl(publicIdOrUrl : string) {
    
    if (publicIdOrUrl.includes('cloudinary.com')) {
        // Extrae la parte después de 'upload/' y elimina la extensión
        const parts = publicIdOrUrl.split('/upload/')[1];
        const publicIdWithExtension = parts.split('.')[0];
        return publicIdWithExtension.split('/').slice(1).join('/');
    }
    
    // Si no es una URL, se asume que ya es un public_id
    return publicIdOrUrl;
}