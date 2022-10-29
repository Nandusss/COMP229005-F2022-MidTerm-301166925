// create a reference to the model
let TodoModel = require('../models/todo');

// Gets all todo from the Database and renders the page to list them all.
module.exports.todoList = function(req, res, next) {  

    TodoModel.find((err, todoList) => {
        //console.log(todoList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('todo/list', {
                title: 'To-Do List', 
                TodoList: todoList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}


// Gets a todo by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    TodoModel.findById(id, (err, todoToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('todo/details', {
                title: 'To-Do Details', 
                todo: todoToShow
            })
        }
    });
}

// Gets a todo by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE

}

// Processes the data submitted from the Edit form to update a todo
module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id
    
    console.log(req.body);

    let updatedTodo = TodoModel({
        _id: req.body.id,
        task: req.body.task,
        description: req.body.description,
        complete: req.body.complete ? true : false
    });

    // ADD YOUR CODE HERE

}

// Deletes a todo based on its id.
module.exports.performDelete = (req, res, next) => {

    // ADD YOUR CODE HERE

}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {

    // ADD YOUR CODE HERE          

}

// Processes the data submitted from the Add form to create a new todo
module.exports.processAddPage = (req, res, next) => {

    console.log(req.body);

    let newTodo = TodoModel({
        _id: req.body.id,
        task: req.body.task,
        description: req.body.description,
        complete: req.body.complete ? true : false
    });

    // ADD YOUR CODE HERE
    
}