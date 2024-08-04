from datetime import timedelta

class Config:
    JWT_SECRET_KEY = 'secret_key'
    JWT_TOKEN_LOCATION = ['headers']
    JWT_COOKIE_SECURE = False  # Change to True in production
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///canvas.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False