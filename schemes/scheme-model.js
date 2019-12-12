const schemeDb = require('../data/dbConfig.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
};

function find() {
    return schemeDb('schemes')
}

function findById(id) {
    return schemeDb('schemes')
        .select('*')
        .where({ id })
        .first()
}

function findSteps(id) {
    return schemeDb('steps')
        .select('*')
        .join("schemes", "steps.scheme_id", "schemes.id")
        .where("scheme_id", id)
}

function add(scheme) {
    return schemeDb('schemes')
        .insert(scheme, 'id')
        .then(ids => {
            console.log(ids)
            const [id] = ids

            return findById(id)
        })
}

function addStep(step, id) {
    return schemeDb('steps')
        .insert({ scheme_id: id,  ...step })
        .then(ids => {
            const [id] = ids
            
            return schemeDb('steps')
                    .select('*')
                    .where({ id })
        })
}

function update(changes, id){
    return schemeDb('schemes')
        .where({ id })
        .update(changes)
}

function remove(id){
    return schemeDb('schemes')
        .where({ id })
        .del()
}