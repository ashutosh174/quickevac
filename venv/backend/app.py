from flask import Flask
from flask_cors import CORS
from config.database import engine, Base
from controller.users import users_bp
from controller.user_list import user_list_bp
from controller.role_management import role_bp
from controller.user_alert import alert_bp  # ✅ New import
from config.settings import SECRET_KEY

app = Flask(__name__)
app.secret_key = SECRET_KEY

# Allow CORS for all routes and methods
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True, methods=["GET", "POST", "PUT", "DELETE"])

# Initialize the database
Base.metadata.create_all(bind=engine)

# Register Blueprints
app.register_blueprint(users_bp, url_prefix='/api')
app.register_blueprint(user_list_bp, url_prefix='/api/user_list')
app.register_blueprint(role_bp, url_prefix='/api/roles')
app.register_blueprint(alert_bp, url_prefix='/api')  # ✅ Registers alert endpoint (e.g., /api/send-alert)

if __name__ == '__main__':
    app.run(debug=True)
