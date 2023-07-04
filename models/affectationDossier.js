const mongoose = require('mongoose');

const AffectationDossierSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctors",
        required: true,
    },
    dossierFormEtude: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dossierFormEtude",
        required: true,
    },
    date: { type: Date, required: true },
})
let AffectationDossier = mongoose.model('affectationDossiers', AffectationDossierSchema);

module.exports = { AffectationDossier };