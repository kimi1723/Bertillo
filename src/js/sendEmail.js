const getResponse = () => await emailjs.sendForm('service_bisr83m', 'template_fo22mcn', form).then(res => res.status);


export default getResponse;
