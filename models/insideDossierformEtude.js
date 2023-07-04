const mongoose = require('mongoose');
const InsideDossierFormEtudeSchema = new mongoose.Schema({
    dossier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dossierFormEtude",
        required: true,
    },
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "formEtude",
        required: true,
    },
    date: { type: Date, required: true },
})
let InsideDossierFormEtude = mongoose.model('InsideDossierFormEtude', InsideDossierFormEtudeSchema);

module.exports = { InsideDossierFormEtude };