# config/settings.py
import os
from typing import Dict, List, Optional
from enum import Enum
from pydantic_settings import BaseSettings
from datetime import datetime, timedelta

class ModelType(Enum):
    """Enum for different model types"""
    LIGHTWEIGHT = "lightweight"
    INTELLECTUAL = "intellectual"

class Models:
    """Model configurations for different task types"""
    LIGHTWEIGHT = {
        "name": "gpt-3.5-turbo",
        "system_message": "You are a precise and efficient assistant focused on extracting and organizing information. Keep responses concise and structured.",
        "max_tokens": 1000,
        "temperature": 0.3,
        "use_cases": [
            "topic extraction",
            "content summarization",
            "metadata processing"
        ]
    }
    
    INTELLECTUAL = {
        "name": "gpt-4-turbo-preview",
        "system_message": "You are an expert analyst in digital advertising, marketing, and technology. Provide comprehensive analysis with industry-specific insights.",
        "max_tokens": 4000,
        "temperature": 0.7,
        "use_cases": [
            "article generation",
            "trend analysis",
            "insight generation"
        ]
    }

class AppConfig:
    """Application-specific configurations"""
    # Content Extraction Settings
    CONTENT_MIN_LENGTH: int = 100
    CONTENT_MAX_LENGTH: int = 15000
    
    # Topic Extraction Settings
    MIN_TOPICS_PER_ARTICLE: int = 3
    MAX_TOPICS_PER_ARTICLE: int = 10
    
    # Time Windows
    TIME_WINDOWS: Dict[str, int] = {
        "1 Day": 1,
        "7 Days": 7,
        "30 Days": 30
    }
    DEFAULT_TIME_WINDOW: int = 30
    
    # Cache Settings
    CACHE_TTL: int = 3600  # 1 hour in seconds
    
    # Visualization Settings
    NETWORK_GRAPH_HEIGHT: int = 600
    NETWORK_GRAPH_WIDTH: int = 800
    MIN_TOPIC_FREQUENCY: int = 2
    MAX_TOPICS_IN_NETWORK: int = 50

class PromptTemplates:
    """Collection of prompt templates"""
    TOPIC_EXTRACTION = """
    Extract the main topics from this article. Focus on industry-specific topics, trends, and key concepts.
    Return between {min_topics} and {max_topics} topics.
    Format: Return as a Python list of strings, with each topic being specific and meaningful.
    Example: ["Programmatic Advertising", "First-Party Data", "Privacy Regulations"]
    """
    
    ARTICLE_GENERATION = """
    Create a comprehensive article about {topic} based on the following sources:
    
    {sources}
    
    Focus on:
    1. Recent developments and their significance
    2. Industry impact and implications
    3. Key trends and future outlook
    4. Expert insights and analysis
    
    The article should be well-structured with clear sections and actionable insights.
    """

class Settings(BaseSettings):
    """Main settings class that brings together all configurations"""
    # OpenAI Configuration
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Default Sitemaps
    DEFAULT_SITEMAPS: List[str] = [
        "https://www.iab.com/sitemap.xml",
        "https://www.adexchanger.com/sitemap.xml",
        "https://digiday.com/sitemap.xml"
    ]
    
    # Rate Limiting
    MAX_REQUESTS_PER_MINUTE: int = 50
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.models = Models()
        self.config = AppConfig()
        self.prompts = PromptTemplates()
        
    def get_time_window_date(self, days: int) -> datetime:
        """Get the datetime for a specific lookback window"""
        return datetime.now() - timedelta(days=days)
    
    def get_model_config(self, model_type: ModelType) -> Dict:
        """Get configuration for specific model type"""
        return getattr(self.models, model_type.value.upper())
    
    def get_openai_messages(self, model_type: ModelType, user_content: str, custom_system_message: Optional[str] = None) -> List[Dict]:
        """Get formatted messages for OpenAI API"""
        model_config = self.get_model_config(model_type)
        system_message = custom_system_message or model_config["system_message"]
        
        return [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_content}
        ]

    def get_openai_params(self, model_type: ModelType, user_content: str, custom_params: Optional[Dict] = None) -> Dict:
        """Get complete parameters for OpenAI API call"""
        model_config = self.get_model_config(model_type)
        params = {
            "model": model_config["name"],
            "messages": self.get_openai_messages(model_type, user_content),
            "max_tokens": model_config["max_tokens"],
            "temperature": model_config["temperature"],
        }
        
        if custom_params:
            custom_params.pop("messages", None)
            params.update(custom_params)
            
        return params
    
    class Config:
        env_file = ".env"
        case_sensitive = True