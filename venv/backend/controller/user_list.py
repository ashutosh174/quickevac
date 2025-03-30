from flask import Blueprint, request, jsonify, session
from config.database import get_db
from models.user_model import Users
from flask_cors import cross_origin

# Create a Blueprint for user management
user_list_bp = Blueprint('user_list', __name__)

@user_list_bp.route('/users', methods=['GET'])
def get_users():

    db = next(get_db())
    try:
        users = db.query(Users).all()
        
        users_list = [
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "phone_no": user.phone_no
                
            }
            for user in users
        ]
        
        return jsonify({"users": users_list}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

#elete user code
@user_list_bp.route('/users/<int:user_id>', methods=['DELETE'])
@cross_origin(origins="*", supports_credentials=True)  # Ensure CORS applies correctly
def delete_user(user_id):
    db = next(get_db())
    try:
        user = db.query(Users).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        db.delete(user)
        db.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

#Edit user code
@user_list_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    db = next(get_db())
    try:
        user = db.query(Users).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.get_json()
        user.first_name = data.get("first_name", user.first_name)
        user.last_name = data.get("last_name", user.last_name)
        user.username = data.get("username", user.username)
        user.email = data.get("email", user.email)
        user.phone_no = data.get("phone_no", user.phone_no)

        db.commit()
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()
