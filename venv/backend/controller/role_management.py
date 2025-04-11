from flask import Blueprint, request, jsonify
from config.database import get_db
from sqlalchemy.sql import text

role_bp = Blueprint("roles", __name__)

# Get users with roles
@role_bp.route("/users_with_roles", methods=["GET"])
def get_users_with_roles():
    try:
        db = next(get_db())
        query = text("""
            SELECT users.id, users.first_name, users.last_name,users.phone_no,users.latitude,users.longitude, users.username, roles.role_name, users.role_id
            FROM users 
            LEFT JOIN roles ON users.role_id = roles.role_id
        """)
        users = db.execute(query).fetchall()
        return jsonify({"users": [dict(user._mapping) for user in users]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update user role
@role_bp.route("/users_with_roles/<int:user_id>", methods=["PUT"])
def update_user_role(user_id):
    try:
        db = next(get_db())
        data = request.json
        new_role_id = data.get("role_id")

        if not new_role_id:
            return jsonify({"error": "Role ID is required"}), 400
        # if condition to check if the role_id is admin or manager 1 for admin and 2 for manager and update the field in the database accordingly
        if new_role_id == 1:
            is_admin = 1
        else:
            is_manager = 2
        
        update_query = text("UPDATE users SET is_admin = :is_admin, is_manager = :is_manager, role_id = :role_id WHERE id = :user_id")
        db.execute(update_query, {"is_admin": is_admin, "is_manager": is_manager, "user_id": user_id, "role_id": new_role_id})
        db.commit()

        # update_query = text("UPDATE users SET role_id = :role_id,  WHERE id = :user_id")
        # db.execute(update_query, {"role_id": new_role_id, "user_id": user_id})
        # db.commit()
        
        return jsonify({"message": "User role updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete user
@role_bp.route("/users_with_roles/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        db = next(get_db())
        delete_query = text("DELETE FROM users WHERE id = :user_id")
        db.execute(delete_query, {"user_id": user_id})
        db.commit()

        return jsonify({"message": "User deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#get roles
@role_bp.route("/", methods=["GET"])
def get_roles():
    try:
        db = next(get_db())
        query = text("SELECT * FROM roles")
        roles = db.execute(query).fetchall()
        return jsonify({"roles": [dict(role._mapping) for role in roles]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#add user with role
@role_bp.route("/users_with_roles", methods=["POST"])
def add_user_with_role():
    try:
        db = next(get_db())
        data = request.get_json()

        first_name = data.get("first_name")
        last_name = data.get("last_name")
        username = data.get("username")
        role_id = data.get("role_id")

        if not all([first_name, last_name, username, role_id]):
            return jsonify({"error": "Missing required fields"}), 400

        # Initialize is_admin and is_manager
        is_admin = 1 if int(role_id) == 1 else 0
        is_manager = 1 if int(role_id) == 2 else 0

        insert_query = text("""
            INSERT INTO users (first_name, last_name, username, role_id, is_admin, is_manager,email,password)
            VALUES (:first_name, :last_name, :username, :role_id, :is_admin, :is_manager,"1","Test@123")
        """)
        db.execute(insert_query, {
            "first_name": first_name,
            "last_name": last_name,
            "username": username,
            "role_id": role_id,
            "is_admin": is_admin,
            "is_manager": is_manager
        })
        db.commit()

        return jsonify({"message": "User added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
