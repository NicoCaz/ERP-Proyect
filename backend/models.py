from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime
db= SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__="users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email=db.Column(db.String(345), unique=True)
    password=db.Column(db.Text,nullable=False)


class Product(db.Model):
    __tablename__="products"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name=db.Column(db.String(345), unique=True)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.String(32), db.ForeignKey('categories.id'), nullable=False)

class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(345), unique=True)
    products = db.relationship('Product', backref='category', lazy=True)



class Client(db.Model):
    __tablename__ = "clients"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))



class Bill(db.Model):
    __tablename__ = "bills"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    client_id = db.Column(db.String(32), db.ForeignKey('clients.id'), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    total_amount = db.Column(db.Float, nullable=False)

    items = db.relationship('BillItem', backref='bill', cascade='all, delete-orphan')

class BillItem(db.Model):
    __tablename__ = "bill_items"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    bill_id = db.Column(db.String(32), db.ForeignKey('bills.id'), nullable=False)
    product_id = db.Column(db.String(32), db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Float, nullable=False)
