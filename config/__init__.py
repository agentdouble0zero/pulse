# config/__init__.py
import os
from pathlib import Path
from dotenv import load_dotenv
from .settings import Settings, ModelType

# Load environment variables from .env file
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(env_path)

# Create a global settings instance
settings = Settings()

# Export settings and ModelType for easy access
__all__ = ['settings', 'ModelType']