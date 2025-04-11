from flask import Blueprint, request, jsonify
from twilio.rest import Client
from config.database import get_db
from models.user_model import Users
from flask_cors import CORS

alert_bp = Blueprint('alert_bp', __name__)
CORS(alert_bp)

@alert_bp.route('/send-alert', methods=['POST'])
def send_alert():
    db = next(get_db())
    try:
        users = db.query(Users).all()
        phone_numbers = [user.phone_no for user in users if user.phone_no]

        # Static alert message with a fixed evacuation map link
        message_body = (
            "⚠ EMERGENCY ALERT: High danger zone. Evacuate now!\n\n"
            "📍 Location:\n"
            "https://www.google.com/maps?q=dorchester"  
        )

        # Twilio credentials
        account_sid = 'AC2098f48104e453cb73d96107b26ff783'
        auth_token = 'd9b3c5d3961332ccf4fdb8408af95875'
        from_number = '+12368350753'
        client = Client(account_sid, auth_token)

        for number in phone_numbers:
            client.messages.create(
                body=message_body,
                from_=from_number,
                to=number
            )

        return jsonify({"message": f"Alert sent to {len(phone_numbers)} users."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
