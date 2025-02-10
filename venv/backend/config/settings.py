import os

# Load the secret key from an environment variable or use a default value
SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'your_default_secret_key_here')