const mongoose = require('mongoose');

const AffectationFormEtudeToProSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctors",
        required: true,
    },
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "formEtude",
        required: true,
    },
    date: { type: Date, required: true },
})
let AffectationFormEtudeToPro = mongoose.model('affectationFormEtudeToPro', AffectationFormEtudeToProSchema);

module.exports = { AffectationFormEtudeToPro };