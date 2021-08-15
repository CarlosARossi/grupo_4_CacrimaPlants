//Require
const path = require('path');
const product = require('../models/productModel');
const users = require('../models/userModel');
const db = require('../database/models');

//Functions
const productController = {
    productCar:(req,res) => res.render('products/productCar'),

    productDetail:(req,res) => res.render('products/productDetail',{product:product.search(req.params.id), user:req.session.userLogged}),

    productEdit:(req,res) => res.render('products/productEdit',{product:product.search(req.params.id)}),//edit a product by id

    saveEdition: (req,res) =>{
        let result = product.edit(req.body,req.file,req.params.id)
        return result == true ? res.redirect("/products") : res.send("Error al cargar la informacion") 
    },//save the edition of a product

    list:(req,res) => res.render("products/products",{list: req.params.category ? product.category(req.params.category) : product.all(), category: req.params.category ? req.params.category : null}),//list of all products
    create: (req,res) => res.render("products/productCreate"),//form for product creation

    save: (req,res) => {
        let result = product.save(req.body,req.file)
        return result == true ? res.redirect("/products") : res.send("Error al cargar la informacion") 
    },//save new product on products.json

    delete: (req,res) => {
        let result = product.delete(req.params.id);
        return result == true ? res.redirect("/products") : res.send("Error al cargar la informacion") 
    },//delete a product on products.json
    
    searchProduct:(req,res) => res.render("products/products",{list: product.searchProduct(req.body), keyword: req.body ? req.body.search : null, category: req.params.category ? req.params.category : null}),//search for a product by name

    /*

    //Databases
    create: (req, res) => {
        db.Products.findAll()
        .then(function(productos) {
            return res.render('productCreate', {productos:productos});
        });
    },
    save: function (req, res) {
        db.Products.creation({
            id: req.body.id,
            created_at: //GETDATE,
            updated_at: //GETDATE,
            name: req.body.name,
            description: req.body.description,
            image: ,
            price: req.body.precio,
            id_category: db.findByPk(??)
                .then(??)
        });
    },
    list: function (req, res) {
        db.Products.findAll()
            .then(function(productos) {
                res.render('products', {productos:productos})
            })
    },
    productDetail: function (req, res) {
        db.Products.findByPk(req,params.id)
            .then(function(producto) {
                res.render('productDetail', {producto:producto});
            })
    }


    */

}

module.exports = productController;