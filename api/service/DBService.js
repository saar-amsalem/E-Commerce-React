const dbServices = (model)=>{


    const getAll = async ()=>{
        try {
            const response = await model.find()
            return {
                body: response,
                err: false
            }
        } catch (error) {
            return {
                body: error,
                err: true
            }
        }
        
    }

    const getByID = async (id)=>{
        try {
            const response = await model.findById(id);
            return {
                body: response,
                err: false
            }
        } catch (error) {
            return {
                body: error,
                err: true
            }
        }
    }

    const getByParam = async (params)=>{
        try {
            const response = await model.findOne({ [params.key]: params.val });
            return {
                body: response,
                err: false
            }
        } catch (error) {
            return {
                body: error,
                err: true
            }
        }
    }

    const create = async(object)=>{
        try {
            const newObject = new model(object)
            const response = await newObject.save();
            console.log(response);
            return {
                body: response,
                err: false
            }
        } catch (error) {
            console.log(error);
            if(error.code === 11000) {
                return {
                    body: `${JSON.stringify(error.keyValue)} already exists !`,
                    err: true
                }
            }
            return {
                body: error,
                err: true
            }
        }
    }

    const createMany = async (objectsArray) => {
        try {
            const response = await model.collection.insertMany(objectsArray)
            return {
                body: response,
                err: false
            }
        } catch (error) {
            return {
                body: error,
                err: true
            }
        }
    }

    const update = async (id,object) =>{
        try {
            const response = await model.findByIdAndUpdate( 
                id,
                {
                    $set: object,
                },
                {new:true}
            )
            return {
                body: response,
                err: false
            }
        } catch (error) {
            return {
                body: error,
                err: true
            }
        }
    }

    const updateByParam = async(params , object) => {
        try {
            const response = await model.findOneAndUpdate(
                { [params.key]: params.val }, 
                {
                    $set: object,
                },
                {new:true}
            )
            return {
                body: response,
                err: false
            }
        } catch (error) {
            return {
                body: error,
                err: true
            }
        }
    }

    const remove = async (id) => {
        try {
            const response = await model.findByIdAndDelete({_id: id});
            return {
                body: response,
                err: false
            }
        } catch (error) {
            return {
                body: error,
                err: true
            }
        }
    };

    const removeByParam = async (params) => {
        try {
            const response = await model.findOneAndDelete({ [params.key]: params.val });
            return {
                body: response,
                err: false
            }
        } catch (error) {
            return {
                body: error,
                err: true
            }
        }
    };

    const removeAll = async () =>{
        try {
            const response = await model.deleteMany()
            return {
                body: response,
                err: false
            }
        } catch (error) {
            return {
                body: error,
                err: true
            }
        }
    }

    return {
        getAll,
        getByID,
        getByParam,
        create,
        createMany,
        update,
        updateByParam,
        remove,
        removeByParam,
        removeAll
    }
}

module.exports = dbServices