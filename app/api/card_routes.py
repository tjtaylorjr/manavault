from flask import Blueprint, jsonify, redirect, request
from app.models import db, Card, Illustration
from sqlalchemy import text

card_routes = Blueprint('cards', __name__)
