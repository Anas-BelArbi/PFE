import pathlib
import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown

import sys
import io

# Set the default encoding to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')
# Set up API key for Google's Generative AI
api_key = 'AIzaSyDw-EQVdVzoCvy8NQhWUpYrBTdcQG0lM8Q'
genai.configure(api_key=api_key)

# Define the model
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_content(text):
    response = model.generate_content(f"""You are an expert assistant specialized in blockchain technology and sustainable development RECs and their prices and electricity prices in some countries. You will only answer questions related to these topics. Provide clear, detailed, and accurate responses to the user's inquiries. If a question is outside these domains, politely inform the user that you are only able to assist with blockchain and sustainable development-related questions.

    For example:
    - If asked about blockchain technology, provide insights on its principles, applications, and recent developments.
    - If asked about sustainable development, explain concepts, initiatives, and how blockchain can contribute to sustainability.
    
    User question: {text}""")

    return response.text

if __name__ == "__main__":
    user_query = sys.argv[1]
    print(generate_content(user_query))
