import Axios from "axios";


const url = `${process.env.BASE_API_URL}/properties`;

export const getPropertyDetail = propertyId =>
    Axios.get(`${url}/${propertyId}`).then(response => {
        return response.data;
    });


const equipmentUrl = `${process.env.BASE_API_URL}/equipments`;

export const getEquipmentsList = () =>
    Axios.get(equipmentUrl).then(response => {
        return response.data;
    });


const contactUrl = `${process.env.BASE_API_URL}/contact`;

export const putContactInfo = contactInfo => {
    Axios.post(contactUrl, contactInfo);
};