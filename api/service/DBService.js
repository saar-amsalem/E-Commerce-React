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
        return await model.findOne({ [params.key]: params.val });
    }

    const create = async(object)=>{
        const newObject = new model(object)
        return await newObject.save();
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