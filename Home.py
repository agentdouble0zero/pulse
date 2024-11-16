import streamlit as st
from config.settings import DEFAULT_SITEMAPS

st.set_page_config(
    page_title="IAB Pulse",
    page_icon="📈",
    layout="wide"
)

# Initialize session state
if "sitemaps" not in st.session_state:
    st.session_state.sitemaps = DEFAULT_SITEMAPS

if "lookback_days" not in st.session_state:
    st.session_state.lookback_days = 30

# Cache the main data processing
@st.cache_data(ttl=86400)  # Cache for 1 hour
def process_sitemaps(sitemaps, lookback_days):
    # Process all sitemaps and return dataframe
    pass