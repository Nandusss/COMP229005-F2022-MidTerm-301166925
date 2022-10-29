/* *
 * todo.js
 * Nandagopan Dilip
 * 301166925
 * 29/10/2022
 */

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
                todo: todoList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}

// Gets a todo by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    TodoModel.findById(id, (err, todoList) => {
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
                todo: todoList,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

// Display the  add_edit page. Only provide access if signed in
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    TodoModel.findById(
        id, (err, todoList) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else 
            {
                console.log(req.user);
                //show the edit view
                res.render(
                    'todo/add_edit', {
                        title: 'Edit Item', 
                        todo: todoList,
                        userName: req.user ? req.user.username : ''
                    }
                )
            }
        }
    );
}

// Processes the data submitted from the Edit form to update a todo
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedTodo = TodoModel({
        _id: req.body.id,
        task: req.body.task,
        description: req.body.description,
        complete: req.body.complete ? true : false
    });

    TodoModel.updateOne(
        {_id: id}, updatedTodo, (err) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                // refresh the contacts list
                res.redirect('/todo/list');
            }
        }
    );
}

// Display add_edit page. Only access if signed in
module.exports.displayAddPage = (req, res, next) => {
    let todoList = TodoModel();
        console.log(req.user);
        //show the edit view
        res.render(
            'todo/add_edit', {
                title: 'Add Item',
                todo: todoList,
                userName: req.user ? req.user.username : ''
            }
        )
    // }         
}

//perform a create function over database
module.exports.processAddPage = (req, res, next) => {
    let todoList = TodoModel({
        _id: req.body.id,
        task: req.body.task,
        description: req.body.description,
        complete: req.body.complete ? true : false
    });

    TodoModel.create(
        todoList, (err, item) =>{
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                // refresh the contact list
                console.log(item);
                res.redirect('/todo/list');
            }
        }
    );

}

//perform a delete fuction over database if user is signed in
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
        TodoModel.remove(
            {_id: id}, (err) => {
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    // refresh the contact list
                    res.redirect('/todo/list');
                }
            }
        );
    // }
}