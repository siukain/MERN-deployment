const PetsModel = require("../model/pets.model");
const mongoose = require("mongoose");

module.exports.petsController =  {
    getAll: async () => {
        return PetsModel.find();
    },
    getById: async (id, res) => {
        if( !mongoose.Types.ObjectId.isValid(id) ) {
            res.status(400);
            return {
                status: 400,
                message: 'Id not valid'
            }
        }

        const response = await PetsModel.findById(id);
        if(response) return response;

        res.status(404);
        return {
            status: 404,
            message: 'Pet no found!'
        }
    },
    deleteById: async (id, res) => {
        if( !mongoose.Types.ObjectId.isValid(id) ) {
            res.status(400);
            return {
                status: 400,
                message: 'Id not valid'
            }
        }

        const response = await PetsModel.findByIdAndDelete(id);

        if(response) return response;

        res.status(404);
        return {
            status: 404,
            message: 'Pet no found!'
        }
    },
    create: async (body, res) => {
        try {
            const response = await PetsModel.create({
                name: body.name,
                type: body.type,
                description: body.description,
                skillOne: body.skillOne,
                skillTwo: body.skillTwo,
                skillThree: body.skillThree,
                likes: body.likes
            });

            res.status(201);
            return response;
        } catch (e) {
            let messages = [];
            res.status(400);
            if ( e && e.code === 11000 ) {
                messages = ['Ya existe un registro con ese nombre'];
            } else messages = Object.values(e.errors).map(el => el.message);

            return {
                status: 400,
                messages: messages.length > 0 ? messages : 'Generic error',
            }
        }
    },
    update: async (body, id, res) => {
        try {
            let fieldToUpdate = {
                name: body.name,
                type: body.type,
                description: body.description,
                skillOne: body.skillOne,
                skillTwo: body.skillTwo,
                skillThree: body.skillThree,
                likes: body.likes,
            };

            for (const [key, value] of Object.entries(fieldToUpdate)) {
                if (!value) {
                    delete fieldToUpdate[key];
                }
            }
            const response = await PetsModel.updateOne({_id: id}, fieldToUpdate);
            res.status(200);
            return response;
        } catch (e) {
            let messages = [];
            res.status(400);
            if ( e && e.code === 11000 ) {
                messages = ['Ya existe un registro con ese nombre'];
            } else messages = Object.values(e.errors).map(el => el.message);

            return {
                status: 400,
                messages: messages.length > 0 ? messages : 'Generic error',
            }
        }
    },
    updateLikes: async (id, res) => {
        try {
            const response = await PetsModel.findOneAndUpdate({_id: id}, { $inc: { likes: 1 } }, {new: true });
            res.status(200);
            return response;
        } catch (e) {
            let messages = [];
            res.status(400);
            if ( e && e.code === 11000 ) {
                messages = ['Ya existe un registro con ese nombre'];
            } else messages = Object.values(e.errors).map(el => el.message);

            return {
                status: 400,
                messages: messages.length > 0 ? messages : 'Generic error',
            }
        }
    },

}

