from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from jwt.exceptions import InvalidTokenError
from werkzeug.security import generate_password_hash, check_password_hash
from ..models import User
from ..extensions import db, jwt

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    """
    Register a new user.
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            email:
              type: string
            password:
              type: string
    responses:
      201:
        description: User registered successfully.
      400:
        description: User already exists.
    """
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')
    
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 400
    
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User registered successfully"}), 201

@auth.route('/login', methods=['POST'])
def login():
    """
    Log in a user.
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            email:
              type: string
            password:
              type: string
    responses:
      200:
        description: Login successful.
      401:
        description: Invalid credentials.
    """
    email = request.json.get('email')
    password = request.json.get('password')
    
    user = User.query.filter_by(email=email).first()
    
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity={"email": email, "username": user.username})
    response = jsonify({"msg": "Login successful", "username": user.username, "token": f'Bearer {access_token}'})
    return response, 200

@auth.route('/validate-token', methods=['POST'])
def validate_token():
    """
    Validate JWT token and return username.
    ---
    responses:
      200:
        description: Token is valid with username.
      401:
        description: Token is invalid or expired.
    """
    try:
        verify_jwt_in_request()
        identity = get_jwt_identity()
        username = identity['username'] if isinstance(identity, dict) else identity
        return jsonify(valid=True, username=username), 200
    except InvalidTokenError as e:
        return jsonify(valid=False, error=str(e)), 401