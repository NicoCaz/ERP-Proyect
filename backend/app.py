from flask import Flask,request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from models import db, User,Client,Category,Product,Bill,BillItem
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from utilitys import *



app=Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

server_session = Session(app)

db.init_app(app)


with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 




@app.route('/register', methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


@app.route("/createproduct", methods=["POST"])
def create_product():
    name = request.json["name"]
    price = request.json["price"]
    category = request.json["category"]

    product_name = Product.query.filter_by(name=name).first()
    product_category=Category.query.filter_by(name=category).first()
    
    if product_name is not(None):
        return jsonify({"error": "Product already created"}), 401
    if product_category is None:
        new_category = Category(name=category)
        db.session.add(new_category)
        db.session.commit()
        product_category=Category.query.filter_by(name=category).first()

    if not(es_numero_valido(price)):
        return jsonify({"error": "Price must be a number"}), 401
    
    new_product=Product(name=name,price=price,category=product_category)    
    db.session.add(new_product)
    db.session.commit() 

    product = Product.query.filter_by(name=name).first()

    return jsonify({
        "id": product.id,
        "email": product.name,
        "price": product.price,
        "category":product_category.name
    })

@app.route("/editproduct", methods=["POST"])
def edit_product():
    old_name=request.json["old_name"]
    name = request.json["name"]
    price = request.json["price"]
    category = request.json["category"]

    product = Product.query.filter_by(name=old_name).first()
    product_category=Category.query.filter_by(name=category).first()
    
    if product is None:
        return jsonify({"error": "Product not created"}), 401
    if product_category is None:
        new_category = Category(name=category)
        db.session.add(new_category)
        db.session.commit()
        product_category=Category.query.filter_by(name=category).first()

    if not(es_numero_valido(price)):
        return jsonify({"error": "Price must be a number"}), 401
    
    new_product= Product.query.filter_by(name=old_name).first() 
    new_product.name=name
    new_product.category=product_category
    new_product.price=price

    db.session.add(new_product)
    db.session.commit() 

    product = Product.query.filter_by(name=name).first()

    return jsonify({
        "id": product.id,
        "email": product.name,
        "price": product.price,
        "category":product_category.name
    })



@app.route("/createcategory", methods=["POST"])
def create_category():
    name = request.json["name"]

    product_category=Category.query.filter_by(name=name).first()
    
    if product_category is not(None):
        return jsonify({"error": "Category already exist"}), 401
    if product_category is None:
        new_category = Category(name=name)
        db.session.add(new_category)
        db.session.commit()

        product_category=Category.query.filter_by(name=name).first()   
      
        return jsonify({
            "name":product_category.name
        })


@app.route("/modifycategory", methods=["POST"])
def modify_category():
    old_name=request.json["old_name"]
    name = request.json["name"]

    product_category=Category.query.filter_by(name=old_name).first()
    
    if product_category is None:
        return jsonify({"error": "Category Not exist"}), 401

    new_category = Category(name=old_name)
    new_category.name=name
    db.session.add(new_category)
    db.session.commit()

    product_category=Category.query.filter_by(name=name).first()   
        
    return jsonify({
            "name":product_category.name
        })


@app.route("/createclient", methods=["POST"])
def create_client():
    name = request.json["name"]
    phone = request.json["phone"]
    address = request.json["address"]

    client_name = Client.query.filter_by(name=name).first()
    
    if client_name  is not(None):
        return jsonify({"error": "Client already created"}), 401
 
    new_client  = Client(name=name,phone=phone,address=address)
    db.session.add(new_client)
    db.session.commit()
    
    return jsonify({
        "id": new_client .id,
        "phone": new_client.phone,
        "address":new_client.address
    })

@app.route("/modifyclient", methods=["POST"])
def modify_client():
    old_name=request.json["old_name"]
    name = request.json["name"]
    phone = request.json["phone"]
    address = request.json["address"]

    client= Client.query.filter_by(name=old_name).first()
    
    if client  is None:
        return jsonify({"error": "Client Not created"}), 401
 
    client.name=name
    client.phone=phone
    client.address=address
    db.session.add(client)
    db.session.commit()
    
    return jsonify({
        "id": client.id,
        "phone": client.phone,
        "address":client.address
    })


@app.route("/createbill", methods=["POST"])
def create_bill():
    client_name = request.json["client_name"]
    products = request.json["products"]

    client = Client.query.filter_by(name=client_name).first()
    
    if  client is None:
        return jsonify({"error": "Client not exist"}), 401
    total_amount=0
    items=[]
    new_bill = Bill(
        client_id=client.id,
        total_amount=total_amount,
        timestamp=datetime.utcnow())
    
    for product in products:
        product_name = product['name']
        cant = product['cant']   
        product = Product.query.filter_by(name=product_name).first()
        if product is None:
            return jsonify({"error": f"Product {product_name} not exist"}), 401
        item=BillItem(
            product_id=product.id,
            quantity=cant,
            unit_price=product.price
        )
        items.append(item)
        total_amount+=total_amount+product.price

    new_bill.items=items
    new_bill.total_amount=total_amount

    db.session.add(new_bill)
    db.session.commit() 

    return jsonify({
       "message": "Factura creada con exito"
    })


if __name__ == "__main__":
    app.run(debug=True)