import {
    onUpdateField,
    onSetError,
    onSubmitForm,
    onSetFormErrors,
    onAddFile,
} from "../../common/helpers";
import { formValidation } from "./upload-property.validation";
import {
    setCheckboxList,
    setOptionList,
    onAddFeature,
    formatDeleteFeatureButtonId,
    onRemoveFeature,
    onAddImage,
} from "./upload-property.helpers";
import {
    getSaleTypes,
    getProvincesList,
    getEquipmentsList,
    postNewProperty
} from "./upload-property.api";
import { propertyDataUploadVmtoApi } from "./upload-property.mappers";
import {history, routes} from "./../../core/router"

Promise.all([
    getSaleTypes(),
    getProvincesList(),
    getEquipmentsList(),
]).then(([saleTypes, provincesList, equipmentsList]) => {
    setCheckboxList(saleTypes, 'saleTypes')
    setOptionList(provincesList, 'province')
    setCheckboxList(equipmentsList, 'equipments')
});

let propertyDataUpload = {
    title: '',
    notes: '',
    email: '',
    phone: '',
    price: '',
    saleTypes: [],
    address: '',
    city: '',
    province: '',
    squareMeter: '',
    rooms: '',
    bathrooms: '',
    locationUrl: '',
    mainFeatures: [],
    equipmentIds: [],
    images: [],
};

// ********* DATOS GENERALES *********
onUpdateField('title', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        title: value
    }
    formValidation.validateField('title', propertyDataUpload.title).then(result => {
        onSetError('title', result);
    })
});
onUpdateField('notes', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        notes: value
    }
    formValidation.validateField('notes', propertyDataUpload.notes).then(result => {
        onSetError('notes', result);
    })
});
onUpdateField('email', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        email: value
    }
    formValidation.validateField('email', propertyDataUpload.email).then(result => {
        onSetError('email', result);
    })
});
onUpdateField('phone', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        phone: value
    }
    formValidation.validateField('phone', propertyDataUpload.phone).then(result => {
        onSetError('phone', result);
    })
});
onUpdateField('price', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        price: value
    }
    formValidation.validateField('price', propertyDataUpload.price).then(result => {
        onSetError('price', result);
    })
});

function getSaleTypesCheckedBox() {
    const checkboxes = document.querySelectorAll('#saleTypes input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            propertyDataUpload.saleTypes.push(checkbox.value);
        }
    });
};

// ********* DATOS DE LA VIVIENDA *********
onUpdateField('address', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        address: value
    }
    formValidation.validateField('address', propertyDataUpload.address).then(result => {
        onSetError('address', result);
    })
});
onUpdateField('city', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        city: value
    }
    formValidation.validateField('city', propertyDataUpload.city).then(result => {
        onSetError('city', result);
    })
});
onUpdateField('province', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        province: value
    }
    formValidation.validateField('province', propertyDataUpload.province).then(result => {
        onSetError('province', result);
    })
});
onUpdateField('squareMeter', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        squareMeter: value
    }
    formValidation.validateField('squareMeter', propertyDataUpload.squareMeter).then(result => {
        onSetError('squareMeter', result);
    })
});
onUpdateField('rooms', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        rooms: value
    }
    formValidation.validateField('rooms', propertyDataUpload.rooms).then(result => {
        onSetError('rooms', result);
    })
});
onUpdateField('bathrooms', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        bathrooms: value
    }
    formValidation.validateField('bathrooms', propertyDataUpload.bathrooms).then(result => {
        onSetError('bathrooms', result);
    })
});
onUpdateField('locationUrl', event => {
    const value = event.target.value;
    propertyDataUpload = {
        ...propertyDataUpload,
        locationUrl: value
    }
    formValidation.validateField('locationUrl', propertyDataUpload.locationUrl).then(result => {
        onSetError('locationUrl', result);
    })
});

onSubmitForm('insert-feature-button', () => {
    const newFeature = document.getElementById('newFeature').value;
    const deleteButtonId = formatDeleteFeatureButtonId(newFeature);

    onAddFeature(newFeature);

    const deleteButton = document.getElementById(deleteButtonId);
    deleteButton.addEventListener('click', () => {
        onRemoveFeature(newFeature);
    });

});

function getEquipmentsCheckedBox() {
    const checkboxes = document.querySelectorAll('#equipments input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            propertyDataUpload.equipmentIds.push(checkbox.value);
        }
    });
    //console.log(propertyDataUpload.equipmentIds);
};

function getMainFeatures() {
    const featuresSpan = document.querySelectorAll('#mainFeatures span');

    featuresSpan.forEach(span =>
        propertyDataUpload.mainFeatures.push(span.textContent));
    //console.log(propertyDataUpload.mainFeatures);
};

// ********* SUBIR FOTOS *********
onAddFile('add-image', event => {
    onAddImage(event)
    propertyDataUpload.images.push(event)
    console.log(propertyDataUpload.images)
});

onSubmitForm('save-button', () => {
    getSaleTypesCheckedBox();
    getMainFeatures();
    getEquipmentsCheckedBox();

    formValidation.validateForm(propertyDataUpload).then(result => {
        onSetFormErrors(result);
        if (result.succeeded) {
            const propertyApiData = propertyDataUploadVmtoApi(propertyDataUpload);
            postNewProperty(propertyApiData);
            alert('Propiedad enviada. Muchas gracias');
            // history.push(routes.propertyList);   // este me da problemas y a veces no guarda en el data.json la propiedad, no entiendo xq
            // history.back(); // con esto tengo q refresh la web para q aparezca la nueva casa
        } else {
            propertyDataUpload.mainFeatures = [];
            propertyDataUpload.equipmentIds = [];
            propertyDataUpload.saleTypes = [];
            propertyDataUpload.images = [];
            alert('Revise que los campos esten rellenados correctamente')
        }
    })
});