const mongoose = require('mongoose');

const ResponseFormEtudeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctors",
        required: true,
    },
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "formEtude",
        required: true,
    },
    

    form_title: { type: String, required: true },
    form_description: { type: String },
    form_created_date: { type: Date, required: true },
    form_sections: { type: Array, required: true },
    form_messages: { type: Array, required: true },
    form_formule: { type: String, required: true },
    form_archived: { type: Boolean, required: true },
    form_status: { type: Boolean, required: true },
    form_genre: { type: String, required: true },
    form_password: { type: String },

    created_date: { type: Date, required: true },
    responses: { type: mongoose.Schema.Types.Array, required: true },
    score: { type: Array, required: true },
    message: { type: String, required: true },
    state: { type: String, required: true, default: "Completed" },
    confirmationDate: { type: Date },
    archived: { type: Boolean, required: true },
})
let ResponseFormEtude = mongoose.model('responseformetude', ResponseFormEtudeSchema);

module.exports = { ResponseFormEtude };