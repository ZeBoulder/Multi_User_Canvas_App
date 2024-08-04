from flask import Flask
from flasgger import Swagger
from flask_cors import CORS
from .extensions import db, jwt
from .config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    jwt.init_app(app)
    Swagger(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

    from .routes.auth import auth
    app.register_blueprint(auth)
    
    with app.app_context():
        db.create_all()

    return app