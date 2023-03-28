export const propertyDataUploadVmtoApi = propertyDataUpload => {
    return {
        title: propertyDataUpload.title,
        notes: propertyDataUpload.notes,
        email: propertyDataUpload.email,
        phone: propertyDataUpload.phone,

        price: Number(propertyDataUpload.price),
        saleTypeIds: propertyDataUpload.saleTypes,
        
        address: propertyDataUpload.address,
        city: propertyDataUpload.city,
        
        provinceId: propertyDataUpload.province,
        squareMeter: Number(propertyDataUpload.squareMeter),
        rooms: Number(propertyDataUpload.rooms),
        bathrooms: Number(propertyDataUpload.bathrooms),
        
        locationUrl: propertyDataUpload.locationUrl,
        mainFeatures: propertyDataUpload.mainFeatures,
        equipmentIds: propertyDataUpload.equipmentIds,
        images: propertyDataUpload.images,
    };
};