const express = require('express');
const jwt = require('jsonwebtoken');

const { Affectationformetudetopatient } = require('../models/affectationformetudetopatient');
const { ResponseFormEtude } = require('../models/responseformetude');
const { FormsEtude } = require('../models/formEtude');
const { Patient } = require('../models/patient');
const { Doctor } = require('../models/doctor');
const { verifyToken } = require('../middlewares/verifyToken');
const { list } = require('stripe/lib/StripeMethod.basic');


const router = express.Router();

router.post('/addresponse', async (req, res) => {
    // body{"user" : id,"doctor": id,"form": id,"score": Array,"responses": Array of Objects}
    try {
        let obj = req.body;
        let patient = await Patient.findOne({ _id: obj.user, archived: false })
        let doctor = await Doctor.findOne({ _id: obj.doctor, archived: false })
        let formFromDb = await FormsEtude.findOne({ _id: obj.form, archived: false })
        if (!patient || !doctor || !formFromDb) {
            return res.status(404).send({ message: "Not found" })
        }
        let responsesFromDb = await ResponseFormEtude.findOne({ doctor: obj.doctor, form: obj.form, user: obj.user })
        if (responsesFromDb) {
            return res.status(400).send({ message: "Patient already respond" })
        }
      
        let responses = new ResponseFormEtude(obj);
        responses.form_title = formFromDb.title;
        responses.form_description = formFromDb.description;
        responses.form_created_date = formFromDb.created_date;
        responses.form_sections = formFromDb.sections;
        responses.form_messages = formFromDb.messages;
        responses.form_formule = formFromDb.formule;
        responses.form_archived = formFromDb.archived;
        responses.form_status = formFromDb.status;
        responses.form_genre = formFromDb.genre;
        responses.form_password = formFromDb.password;
        responses.created_date = new Date();
        responses.archived = false;
        responses.message = 'response form etude';
        responses.state = 'completed';
        let savedresponses = await responses.save()
        await Affectationformetudetopatient.findOneAndUpdate({ user: savedresponses.user, form: savedresponses.form, doctor: savedresponses.doctor },
            { $set: { dateRemplissage: new Date(), etat: true, state: "Completed" } }
        )
        
        res.status(200).send(savedresponses);
    } catch (error) {
        console.log("Erreur",error);
        res.status(400).send({ message: "Erreur", error });
    }
});

router.post('/addresponseweb', async (req, res) => {
    try {
        let obj = req.body;
        let patient = await Patient.findOne({ _id: obj.user, archived: false })
        let doctor = await Doctor.findOne({ _id: obj.doctor, archived: false })
        let formFromDb = await FormsEtude.findOne({ _id: obj.form, archived: false })
        if (!patient || !doctor || !formFromDb) {
            return res.status(404).send({ message: "Not found" })
        }
        let responsesFromDb = await ResponseFormEtude.findOne({ doctor: obj.doctor, form: obj.form, user: obj.user })
        if (responsesFromDb) {
            console.log( "jsssssssssssssssj",)
            return res.status(400).send({ message: "Patient already respond" })
        }
        let responses = new ResponseFormEtude(obj);
        responses.form_title = formFromDb.title;
        responses.form_description = formFromDb.description;
        responses.form_created_date = formFromDb.created_date;
        responses.form_sections = formFromDb.sections;
        responses.form_messages = formFromDb.messages;
        responses.form_formule = formFromDb.formule;
        responses.form_archived = formFromDb.archived;
        responses.form_status = formFromDb.status;
        responses.form_genre = formFromDb.genre;
        responses.form_password = formFromDb.password;
        responses.created_date = new Date();
        responses.archived = false;

        let scoresCaluculated = [];
        for(let i=0; i< req.body.score.length;i++){
            scoresCaluculated.push(eval(req.body.score[i]));
        }
        responses.score =scoresCaluculated;

        let form = await FormsEtude.findOne({ _id: responses.form })
        let formule = form.formule;
         formuleMuti = form.formMuti;
        responses.message = 'message formulaire étude from web';
        responses.state = 'completed';
        let savedresponses = await responses.save()
        await Affectationformetudetopatient.findOneAndUpdate({ user: savedresponses.user, form: savedresponses.form,doctor: savedresponses.doctor},
            { $set: { dateRemplissage: new Date(), etat: true, state: "Completed" } }
        )
        
        res.status(200).send(savedresponses);
    } catch (error) {
        console.log("Erreur",error);
        res.status(400).send({ message: "Erreur", error });
    }
});

router.get('/getresponses', verifyToken, async (req, res) => {

    try {
        let responses = await ResponseFormEtude.find({ archived: false })

        res.status(200).send(responses);
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});

router.put('/confirme', verifyToken, async (req, res) => {
    let data = req.body;
    try {
        await ResponseFormEtude.findOneAndUpdate({ _id: data.id },
            { $set: { confirmationDate: new Date(), state: "confirmed" } }
        )
        res.status(200).send({ message: "success" });
    } catch (error) {
        res.status(400).send({ message: "erreur occured" });
    }
})

router.delete('/deleteresponses/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;

        let deletedresponses = await ResponseFormEtude.findByIdAndDelete({ _id: id })

        if (!deletedresponses) {
            res.status(404).send('not found')
        } else {
            res.status(200).send(deletedresponses);
        }
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});

router.put('/updateresponses/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body

        let updatedresponses = await ResponseFormEtude
            .findByIdAndUpdate({ _id: id }, {
                $set: {
                    user: data.user,
                    doctor: data.doctor,
                    created_date: data.created_date,
                    responses: data.responses,
                    archived: data.archived,
                    form: data.form
                }
            })

        if (!updatedresponses) {
            res.status(404).send('not found')
        } else {
            res.status(200).send(updatedresponses);
        }
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});

router.get('/archived/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;
        let updatedresponses = await ResponseFormEtude.findByIdAndUpdate({ _id: id }, { $set: { archived: true } })
        if (!updatedresponses) {
            res.status(404).send('not found')
        } else {
            res.status(200).send(updatedresponses);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Erreur", error });
    }
});


router.get('/getresponsesbyid/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;

        let responses = await ResponseFormEtude.findOne({ _id: id })

        if (!responses) {
            res.status(404).send('not found')
        } else {
            res.status(200).send(responses);
        }

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});

router.get('/getpopulatedresponsesbyid/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;

        let responses = await ResponseFormEtude.findOne({ _id: id }).populate("form")

        if (responses.form.archived || !responses) {
            res.status(404).send('not found')
        } else {
            res.status(200).send(responses);
        }

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});






router.get('/check/:user/:form', verifyToken, async (req, res) => {
    try {
        let user = req.params.user;
        let form = req.params.form;

        let patient = await Patient.findOne({ _id: user, archived: false })
        let formFromDb = await FormsEtude.findOne({ _id: form, archived: false })

        if (!patient || !formFromDb) {
            return res.status(404).send({ message: "Not found" })
        }

        let responses = await ResponseFormEtude.findOne({ user: user, form: form })

        if (!responses) {
            res.status(404).send('not found')
        } else {
            res.status(200).send(responses);
        }
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});







router.get('/getformresponse/:user/:form', verifyToken, async (req, res) => {
    try {
        let user = req.params.user;
        let form = req.params.form;

        let doctor = await Doctor.findOne({ _id: user, archived: false })
        let formFromDb = await FormsEtude.findOne({ _id: form, archived: false })

        if (!doctor || !formFromDb) {
            return res.status(404).send({ message: "Not found" })
        }

        let responses = await ResponseFormEtude.find({ doctor: user, form: form })

        res.status(200).send(responses);
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});

router.get('/getuserformresponse/:user/:doctor/:form', verifyToken, async (req, res) => {
    try {
        let user = req.params.user;
        let form = req.params.form;
        let doctor = req.params.doctor;

        let responses = await ResponseFormEtude.findOne({ doctor: doctor, form: form, user: user })

        res.status(200).send(responses);
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});
router.get('/getusersresponses', verifyToken, async (req, res) => {
    let distinctUser = await ResponseFormEtude.aggregate([{
        $group: {
            _id: "$user",
        },
    }])

    let users = []
    for (const u of distinctUser) {
        let response = await ResponseFormEtude.find({ user: u._id })
        users.push({ user: u._id, response })
    }
    res.status(200).send({ users })
})

router.get('/getusersresponses/:id', verifyToken, async (req, res) => {
    try {
        let responses = await ResponseFormEtude.find({ user: req.params.id })
        res.status(200).send({ responses })
    } catch (error) {
        res.status(400).send({ message: "error" })
    }

})
module.exports = router;

//test