from flask import Blueprint, request, jsonify,session
from config.database import get_db
from models.user_model import Users
import bcrypt
from flask_cors import cross_origin

# Create a Blueprint for users
users_bp = Blueprint('users', __name__)

@users_bp.route('/signup', methods=['POST'])
@cross_origin()
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    db = next(get_db())  # Get a database session
    try:
        # Check if the email already exists
        existing_user = db.query(Users).filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "Email already exists"}), 400

        # Create a new user and hash the password
        new_user = Users(username=username, email=email)
        new_user.set_password(password)  # Hash the password
        db.add(new_user)
        db.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

@users_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    db = next(get_db())  # Get a database session
    try:
        # Find the user by email
        user = db.query(Users).filter_by(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Verify the password
        if user.check_password(password):
            # Create a session with the user's ID (or admin ID)
            session['user_id'] = user.id  # Store user ID in the session
            session['is_admin'] = user.is_admin  # Store admin status (if applicable)
            session['is_manager'] = user.is_manager # Store manager status (if applicable)

            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "is_admin": user.is_admin,  # Include admin status in the response
                    "is_manager": user.is_manager # Include manager status in the response
                }
            }), 200
        else:
            return jsonify({"error": "Invalid password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


