import Axios from "axios";

const url = `${process.env.BASE_API_URL}/saleTypes`;

export const getSaleTypes = () =>
    Axios.get(url).then(response => {
        return response.data;
    });


const urlProvinces = `${process.env.BASE_API_URL}/provinces`;

export const getProvincesList = () =>
    Axios.get(urlProvinces).then(response => {
        return response.data;
    });


const urlEquipments = `${process.env.BASE_API_URL}/equipments`;

export const getEquipmentsList = () =>
    Axios.get(urlEquipments).then(response => {
        return response.data;
    });

    
const urlProperties = `${process.env.BASE_API_URL}/properties`;

export const postNewProperty = propertyDataUpload =>
    Axios.post(urlProperties, propertyDataUpload);