import { history } from "../../core/router/history";
import { getPropertyDetail, getEquipmentsList, putContactInfo } from "./property-detail.api";
import { mapPropertyDetailFromApiToVm } from "./property-detail.mappers";
import { setPropertyValues } from "./property-detail.helpers";
import { onUpdateField, onSubmitForm, onSetError, onSetFormErrors } from '../../common/helpers';
import { formValidation } from "./property-detail.contact-validations";



const params = history.getParams(); // params.id es lo q queremos para saber la casa a la q apunta la url.

Promise.all([
    getPropertyDetail(params.id),
    getEquipmentsList(),
]).then(([propertyDetail, equipmentList]) => {
    const propertyDetailVm = mapPropertyDetailFromApiToVm(propertyDetail, equipmentList);
    setPropertyValues(propertyDetailVm);
});


let contact = {
    email: '',
    message: '',
};

onUpdateField('email', event => {
    const value = event.target.value;
    contact = {
        ...contact,
        email: value
    }
    formValidation.validateField('email', contact.email).then(result => {
        onSetError('email', result);
    })
});

onUpdateField('message', event => {
    const value = event.target.value;
    contact = {
        ...contact,
        message: value
    }
    formValidation.validateField('message', contact.message).then(result => {
        onSetError('message', result);
    })
});

onSubmitForm('contact-button', () => {
    formValidation.validateForm(contact).then(result => {
        onSetFormErrors(result);
        if (result.succeeded) {
            putContactInfo(contact);
            console.log(contact);
            alert('Gracias por escribirnos.\nNos pondremos en contacto con usted a la mayor brevedad posible.');
            history.back;
        } else {
            alert('Revise que los campos esten rellenados correctamente')
        }
    })
});