from flask import Flask
from config.database import engine, Base  # Import engine and Base
from controller.users import users_bp  # Import the users Blueprint
from config.settings import SECRET_KEY  # Import the secret key from settings
from flask_cors import CORS

app = Flask(__name__)

# Set the secret key for session management
app.secret_key = SECRET_KEY

CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
# Initialize the database (create tables if they don't exist)
Base.metadata.create_all(bind=engine)

# Register the users Blueprint
app.register_blueprint(users_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)