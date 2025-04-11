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
    fname = data.get('fname')
    lname = data.get('lname')
    email = data.get('email')
    phone = data.get('phone')
    username = data.get('username')
    password = data.get('password')
    location = data.get('location')
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    if not all([fname, lname, email, phone, username, password]):
        return jsonify({"error": "All fields are required"}), 400

    db = next(get_db())
    try:
        existing_user = db.query(Users).filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "Email already exists"}), 400

        new_user = Users(
            first_name=fname,
            last_name=lname,
            email=email,
            phone_no=phone,
            username=username,
            location=location,
            latitude=latitude,
            longitude=longitude
        )
        new_user.set_password(password)

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
            session.permanent = True # Make the session permanent

            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "latitude": user.latitude,
                    "longitude": user.longitude,
                    "location": user.location,
                    "phone_no": user.phone_no,
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

#logout
@users_bp.route('/logout', methods=['POST'])
@cross_origin()
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200
