from flask import Blueprint, jsonify, redirect, request
from app.models import db, Card, Illustration


illustration_routes = Blueprint('illustrations', __name__)

@illustration_routes.route('/<id>')
def get_card_images(id):
    result = Illustration.query.filter(Illustration.card_uuid.ilike(f"%{id}%")).all()
    if result is None:
        return {"error": "Not found"}
    return {"image_data": [illustration.to_dict() for illustration in result]}
