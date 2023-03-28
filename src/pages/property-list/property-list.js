import { getPropertyList, getSaleTypeList, getProvinceList } from "./property-list.api";
import { mapPropertyListFromApiToVm, mapFilterToQueryParams } from "./property-list.mappers";
import { addPropertyRows, setOptions, clearPropertyRows } from "./property-list.helpers";
import { roomOptions, bathroomOptions, minPriceOptions, maxPriceOptions } from "./property-list.constants";
import { onUpdateField, onSubmitForm } from "../../common/helpers";


Promise.all([
    getPropertyList(),
    getProvinceList(),
    getSaleTypeList(),
]).then(([propertyList, provinceList, saleTypeList]) => { //usamos el destructuring del array y simplif 'then'
    loadPropertyList(propertyList)
    setOptions(saleTypeList, 'select-sale-type', '¿Qué venta?')
    setOptions(provinceList, 'select-province', '¿dónde?')
    setOptions(roomOptions, 'select-room', '¿Habiataciones?')
    setOptions(bathroomOptions, 'select-bathroom', '¿Cuartos de baño?')
    setOptions(minPriceOptions, 'select-min-price', 'Min (EUR)')
    setOptions(maxPriceOptions, 'select-max-price', 'Max (EUR)')
});

// ------
// ]).then(resultList => {
// const [propertyList, provinceList, saleTypeList] = resultList;
// ------------
// ]).then(resultList => {
// const propertyList = resultList[0];
// const provinceList = resultList[1];
// const saleTypeList = resultList[2];

const loadPropertyList = propertyList => {
    const viewModelPropertyList = mapPropertyListFromApiToVm(propertyList);
    addPropertyRows(viewModelPropertyList);
};

let filter = {
    saleTypeId: '',
    provinceId: '',
    minRooms: '',
    minBathRooms: '',
    minPrice: '',
    maxPrice: '',
};

onUpdateField('select-sale-type', (event => {
    const value = event.target.value;
    filter = {
        ...filter,
        saleTypeId: value,
    };
}));
onUpdateField('select-province', (event => {
    const value = event.target.value;
    filter = {
        ...filter,
        provinceId: value,
    };
}));
onUpdateField('select-room', (event => {
    const value = event.target.value;
    filter = {
        ...filter,
        minRooms: value,
    };
}));
onUpdateField('select-bathroom', (event => {
    const value = event.target.value;
    filter = {
        ...filter,
        minBathRooms: value,
    };
}));
onUpdateField('select-min-price', (event => {
    const value = event.target.value;
    filter = {
        ...filter,
        minPrice: value,
    };
}));
onUpdateField('select-max-price', (event => {
    const value = event.target.value;
    filter = {
        ...filter,
        maxPrice: value,
    };
}));

onSubmitForm('search-button', () => {
    const queryParams = mapFilterToQueryParams(filter);
    
    clearPropertyRows();
    
    getPropertyList(queryParams).then(propertyList => {
        loadPropertyList(propertyList);
    })
});