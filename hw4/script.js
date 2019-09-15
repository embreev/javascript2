const text = "Повседневная практика показывает, что 'реализация намеченных' плановых заданий в значительной степени 'обуславливает создание' модели развития.";
const re = new RegExp('\'', 'gim');
console.log(text.replace(re, "\""));

const name = "Ivan";
const reName = /^([A-Z]){1}([a-z])+$/;
console.log(reName.test(name));

const phone = "+7(123)456-7890";
const rePhone = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
console.log(rePhone.test(phone));

const email = "i.ivanov@mail.ru";
const reEmail = /^([a-z\.-]+)@([a-z]+)\.([a-z\.]{2})$/;
console.log(reEmail.test(email));