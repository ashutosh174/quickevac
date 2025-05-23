from sqlalchemy import Column, Integer, String,Float
from config.database import Base
import bcrypt

class Users(Base):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)  # Store the hashed password
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone_no = Column(String, nullable=False)
    location = Column(String(255))  # optional - city/state
    latitude = Column(Float)
    longitude = Column(Float)          # 🌍 Add this
    is_admin = Column(Integer, default=0)  # 1 if the user is an admin, 0 otherwise
    is_manager = Column(Integer, default=0)  # 1 if the user is a manager, 0 otherwise

    def set_password(self, password):
        # Hash the password using bcrypt
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        # Verify the password against the hashed password
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))