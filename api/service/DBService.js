const dbServices = (model)=>{


    const getAll = async ()=>{
        return await model.find()
    }

    const getByID = async (id)=>{
        return await model.findById(id);
    }

    const getByParam = async (params)=>{
        return await model.findOne({ [params.key]: params.val });
    }

    const getManyByParam = async (params)=>{
        return await model.find({ [params.key]: params.val });
    }

    const create = async(object)=>{
        const newObject = new model(object)
        return await newObject.save();
    }

    const createMany = async (objectsArray) => {
        return await model.collection.insertMany(objectsArray)
    }

    const update = async (id,object) =>{
        return await model.findByIdAndUpdate( 
                id,
                {
                    $set: object,
                },
                {new:true}
            )
    }

    const updateByParam = async(params , object) => {
        return await model.findOneAndUpdate(
            { [params.key]: params.val }, 
            {
                $set: object,
            },
            {new:true}
        )
    }

    const remove = async (id) => {
        return await model.findByIdAndDelete({_id: id});
    };

    const removeByParam = async (params) => {
        return await model.findOneAndDelete({ [params.key]: params.val });
    };

    const removeAll = async () =>{
        return await model.deleteMany()    
    }

    return {
        getAll,
        getByID,
        getByParam,
        getManyByParam,
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