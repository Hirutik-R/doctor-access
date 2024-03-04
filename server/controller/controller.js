const Userdb = require('../model/model');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create new user
    const user = new Userdb({
        name: req.body.name,
        age: req.body.age,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        consultation: req.body.consultation,
        imagei: req.files['imagei'][0].path, // Access uploaded file paths using multer
        imageo: req.files['imageo'][0].path
        
    });

    // Save user in the database
    user.save(user)
        .then(data => {
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user."
            });
        });
};

exports.find = (req, res) => {
    // Fetch all users or a single user by id
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "User not found with id " + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id });
            });
    } else {
        Userdb.find()
            .then(users => {
                res.send(users);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred while retrieving users." });
            });
    }
};

exports.update = (req, res) => {
    // Update user by id
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with id ${id}. Maybe user not found!` });
            } else {
                //res.redirect('/add-user');
                console.log(`hi`);
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating user with id " + id });
        });
};

exports.delete = (req, res) => {
    // Delete user by id
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user with id ${id}. Maybe user not found!` });
            } else {
                res.send({ message: "User deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete user with id " + id });
        });
};
