const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { verifyToken } = require('../middlewares/verifyToken');
const { AffectationFormEtudeToPro } = require('../models/affectationFormEtudeToPro');
const { Doctor } = require('../models/doctor');
const { FormsEtude } = require('../models/formEtude');

const router = express.Router();

router.post('/addaffectation', verifyToken, async (req, res) => {
    try {
        obj = req.body;
        let doctor = await Doctor.findOne({ _id: obj.user, archived: false })
        let form = await FormsEtude.findOne({ _id: obj.form, archived: false })

        if (!doctor || !form) {
            return res.status(404).send({ message: "Not found" })
        }

        let affectation = new AffectationFormEtudeToPro(obj);
        affectation.date = new Date();

        let aff = await AffectationFormEtudeToPro.findOne({ user: obj.user, form: obj.form })

        if (!aff) {
            await affectation.save()
            res.status(200).send({ affected: 1 })
        } else {
            res.status(200).send({ affected: 0 });
        }
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});


/*
router.post('/addaffectationallformssucces/:id', async (req, res,next) => {
      try {
          obj = req.body;
          var arr = [1,2,3,4,5];
          let forms = await FormsEtude.find({ archived: false }).sort({ 'title': 1 })
  
        await  forms.map(async (result) =>{
              let doctor = await Doctor.findOne({ _id: req.params.id, archived: false })
              let form = await FormsEtude.findOne({ _id: result._id, archived: false }) 
            if (!doctor || !form) {
                  return res.status(404).send({ message: "Not found" })
              } 
                  let affectation = new AffectationFormEtudeToPro(result);
                  affectation.date = new Date();
                  
               let aff = await AffectationFormEtudeToPro.findOne({ user: req.params.id, form: result._id }) 
               if (!aff) {
            
                  await affectation.save()
                    res.status(200).send({ affected: 1 })
                    return
                   
              } else {
                  res.status(200).send({ affected: 0 });
                  return
                
              }
          })
      } catch (error) {
      
          res.status(400).send({ message: "Erreur", error });
      }
  });
router.post('/addaffectationallforms', verifyToken, async (req, res,next) => {
    try {
        obj = req.body;
        var arr = [1,2,3,4,5];


      await  obj.map(async (result) =>{
            let doctor = await Doctor.findOne({ _id: result.user, archived: false })
            let form = await FormsEtude.findOne({ _id: result.form, archived: false }) 
          if (!doctor || !form) {
                return res.status(404).send({ message: "Not found" })
            } 
            
            
                let affectation = new AffectationFormEtudeToPro(result);
                affectation.date = "2022-05-10T13:26:46.296+00:00";
                
             let aff = await AffectationFormEtudeToPro.findOne({ user: result.user, form: result.form }) 
             if (!aff) {
          
                await affectation.save()
                  res.status(200).send({ affected: 1 })
                  return
                 
            } else {
                res.status(200).send({ affected: 0 });
                return
              
            }
        })
        for  (let i=0;i<obj.length;i++){
   
           
            
        
     
        }

    } catch (error) {
    
        res.status(400).send({ message: "Erreur", error });
    }
});
*/




router.get('/getaffectation/:user', verifyToken, async (req, res) => {
    try {
        let doctor = await Doctor.findOne({ _id: req.params.user, archived: false })
        if (!doctor) {
            return res.status(404).send({ message: "Not found" })
        }
        let affectations = await AffectationFormEtudeToPro.find({ user: req.params.user })
        res.status(200).send(affectations);
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});
router.get('/getaffectationall', verifyToken, async (req, res) => {
    try {
       
        let affectations = await AffectationFormEtudeToPro.find()
  /*     console.log(affectations.length) */
      const taile =affectations.length
        res.status(200).send({taile:taile,allForms:affectations});
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});
router.get('/getdoctoraffectation/:user', verifyToken, async (req, res) => {

    try {
        let doctor = await Doctor.findOne({ _id: req.params.user, archived: false })
        if (!doctor) {
            return res.status(404).send({ message: "Not found" })
        }
        let affectations = await AffectationFormEtudeToPro.find({ user: req.params.user })
        res.status(200).send(affectations);
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});
router.get('/getdoctoraffectationpopulate/:user', verifyToken, async (req, res) => {

    try {
        let doctor = await Doctor.findOne({ _id: req.params.user, archived: false })
        if (!doctor) {
            return res.status(404).send({ message: "Not found" })
        }
        let affectations = await AffectationFormEtudeToPro.find({ user: req.params.user }).populate('form')
        let filtredAffectation = []
        for (const aff of affectations) {
            if (aff.form && aff.form.archived === false) {
                filtredAffectation.push(aff)
            }
        }

        res.status(200).send(filtredAffectation);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Erreur", error });
    }

});
router.get('/getformaffectation/:form', verifyToken, async (req, res) => {

    try {
        let form = await FormsEtude.findOne({ _id: req.params.form, archived: false })
        if (!form) {
            return res.status(404).send({ message: "Not found" })
        }
        let affectations = await AffectationFormEtudeToPro.find({ form: req.params.form })
        res.status(200).send(affectations);
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});
router.get('/getmyform/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;
        let doctor = await Doctor.findOne({ _id: id, archived: false })
        if (!doctor) {
            return res.status(404).send({ message: "Not found" })
        }
        const ObjectId = mongoose.Types.ObjectId;

        let affectations = await AffectationFormEtudeToPro
            .aggregate(
                [
                    {
                        $match: {
                            user: ObjectId(id)
                        }
                    },
                    {
                        $lookup: {
                            from: "formetudes",
                            localField: "form",
                            foreignField: "_id",
                            as: 'formetudes'
                        }
                    },
                    { "$sort": { "title": 1 } }
                ]
            )

        let forms = [];

        for (let i = 0; i < affectations.length; i++) {
            if (affectations[i].formetudes[0] && !affectations[i].formetudes[0].archived) {
                forms.push(affectations[i].formetudes[0]);
            }
        }
        res.status(200).send(forms)

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Erreur", error });
    }

});
router.delete('/deleteaffectation/:user/:form', verifyToken, async (req, res) => {
    try {
        let doctor = await Doctor.findOne({ _id: req.params.user, archived: false })
        let form = await FormsEtude.findOne({ _id: req.params.form, archived: false })
        if (!doctor || !form) {
            return res.status(404).send({ message: "Not found" })
        }
        let deletedAffectation = await AffectationFormEtudeToPro.findOneAndDelete({ user: req.params.user, form: req.params.form })
        let updatedoctor = await Doctor.findByIdAndUpdate({ _id: req.params.user }, {
            $set: {
                account_state_dossier_affectation:false
            }
        })
        if (!deletedAffectation) {
            res.status(404).send('not found')
        } else {
            res.status(200).send(deletedAffectation);
        }

    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});


module.exports = router;