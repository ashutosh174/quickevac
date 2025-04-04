from flask import Flask
from flask_cors import CORS
from config.database import engine, Base  # Import engine and Base
from controller.users import users_bp  # Import the users Blueprint
from controller.user_list import user_list_bp  # Import the users Blueprint
from config.settings import SECRET_KEY  # Import the secret key from settings

app = Flask(__name__)

# Set the secret key for session management
app.secret_key = SECRET_KEY

# ✅ Allow all methods including DELETE
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True, methods=["GET", "POST", "PUT", "DELETE"])

# Initialize the database (create tables if they don't exist)
Base.metadata.create_all(bind=engine)

# Register Blueprints
app.register_blueprint(users_bp, url_prefix='/api')
app.register_blueprint(user_list_bp, url_prefix='/api/user_list')

if __name__ == '__main__':
    app.run(debug=True)