const mongoose = require('mongoose');
let ObjectId = require('mongodb').ObjectID;

const AffectationformetudetopatientSchema = new mongoose.Schema({
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
    date: { type: Date, required: true },
    dateRemplissage: { type: Date },
    etat: { type: Boolean, required: true },
})
let Affectationformetudetopatient = mongoose.model('affectationformetudetopatient', AffectationformetudetopatientSchema);

module.exports = { Affectationformetudetopatient };