const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { verifyToken } = require('../middlewares/verifyToken');
const { AffectationDossier } = require('../models/affectationDossier');
const { Doctor } = require('../models/doctor');
const { DossierFormEtude } = require('../models/dossierFormEtude');

const router = express.Router();

router.post('/addaffectation', verifyToken, async (req, res) => {
    try {
        obj = req.body;
        let doctor = await Doctor.findOne({ _id: obj.user, archived: false })
        let dossierFormEtude = await DossierFormEtude.findOne({ _id: obj.dossierFormEtude, archived: false })

        if (!doctor || !dossierFormEtude) {
            return res.status(404).send({ message: "Not found" })
        }

        let affectation = new AffectationDossier(obj);
        affectation.date = new Date();

        let aff = await AffectationDossier.findOne({ user: obj.user, dossierFormEtude: obj.dossierFormEtude })

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
        let affectations = await AffectationDossier.find({ user: req.params.user })
        res.status(200).send(affectations);
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }
});



// the next, all forlder not are Forms be attention Karim !!!

router.get('/getaffectationall', verifyToken, async (req, res) => {
    try {
       
        let affectations = await AffectationDossier.find()
  /*     console.log(affectations.length) */
      const taile =affectations.length
        res.status(200).send({taile:taile,allFolders:affectations});
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
        let affectations = await AffectationDossier.find({ user: req.params.user })
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
        let affectations = await AffectationDossier.find({ user: req.params.user }).populate('DossierFormEtude')
        let filtredAffectation = []
        for (const aff of affectations) {
            if (aff.dossierFormEtude) {
                filtredAffectation.push(aff)
            }
        }
        console.log("kcbdkjcbhkdc",filtredAffectation)

        res.status(200).send(filtredAffectation);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Erreur", error });
    }

});

router.get('/getfolderaffectation/:folder', verifyToken, async (req, res) => {

    try {
        let folder = await DossierFormEtude.findOne({ _id: req.params.folder })
        if (!folder) {
            return res.status(404).send({ message: "Not found" })
        }
        let affectations = await AffectationDossier.find({ dossierFormEtude: req.params.folder })
        res.status(200).send(affectations);
    } catch (error) {
        res.status(400).send({ message: "Erreur", error });
    }

});


router.get('/getmyfolders/:id', verifyToken, async (req, res) => {
    try {
        let id = req.params.id;
        let doctor = await Doctor.findOne({ _id: id, archived: false })
        if (!doctor) {
            return res.status(404).send({ message: "Not found" })
        }
        const ObjectId = mongoose.Types.ObjectId;

        let affectations = await AffectationDossier
            .aggregate(
                [
                    {
                        $match: {
                            user: ObjectId(id)
                        }
                    },
                    {
                        $lookup: {
                            from: "dossierformetudes",
                            localField: "dossierFormEtude",
                            foreignField: "_id",
                            as: 'dossierformetudes'
                        }
                    },
                    { "$sort": { "title": 1 } }
                ]
            )

        let folders = [];
        console.log("hhhhyyccycycyc", affectations)
        for (let i = 0; i < affectations.length; i++) {
            if (affectations[i].dossierformetudes[0]) {
                folders.push(affectations[i].dossierformetudes[0]);
            }
        }
        res.status(200).send(folders)

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Erreur", error });
    }

});


router.delete('/deleteaffectation/:user/:folder', verifyToken, async (req, res) => {
    try {
        let doctor = await Doctor.findOne({ _id: req.params.user, archived: false })
        let folder = await DossierFormEtude.findOne({ _id: req.params.folder, archived: false })
        if (!doctor || !folder) {
            return res.status(404).send({ message: "Not found" })
        }
        let deletedAffectation = await AffectationDossier.findOneAndDelete({ user: req.params.user, dossierFormEtude: req.params.folder })
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