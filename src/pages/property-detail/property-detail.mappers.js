export const mapPropertyDetailFromApiToVm = (property, equipmentList) => {
    const equipmentNames = () => { 
        return property.equipmentIds.map(equipId => 
            equipmentList.find(el => el.id === equipId).name
        );
    };

    return {
        ...property,
        rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
        bathrooms: `${property.bathrooms} ${getBathroomWord(property.bathrooms)}`,
        squareMeter: `${property.squareMeter} m2`,
        price: `${property.price.toLocaleString()}€`,
        mainImage: Array.isArray(property.images) ? property.images[0] : [],
        equipments: equipmentNames(), //getEquipmentsName(property.equipmentIds),
    };
};


/*
const getEquipmentsName = property => {
    return property.map(equipmentId => (
        getEquipmentsList().then(response =>
            response.find(el => el.id === equipmentId).name
        )
    ));
};
*/

const getRoomWord = rooms => {
    return rooms > 1 ? 'habitaciones' : 'habitación';
};

const getBathroomWord = bathrooms => {
    return bathrooms > 1 ? 'baños' : 'baño';
};