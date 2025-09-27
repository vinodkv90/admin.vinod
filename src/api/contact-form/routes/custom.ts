export default {
    routes: [
        {
            method: "POST",
            path: "/contact/submit",
            handler: "contact-form.contactFormController",
            config: {
                auth: false,
            },
        },
    ]
};