from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
load_dotenv() # loading all the environment variables

import streamlit as st
import numpy as np
import os
import google.generativeai as genai
from PIL import Image
import pdf2image
import markdown
import io
import base64
import pickle


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to generate Try-Before-Use job simulation
def generate_job_simulation(career, role):
    # Constructing the job simulation content
    input_prompt = f'''
    You are an advanced AI career simulator that provides an in-depth analysis of any given career and role.
    Generate an engaging, interactive job simulation covering key aspects.

    <h1>Career Simulation</h1>
    <h2>Career: {career}</h2>
    <h2>Role: {role}</h2>

    <h2>1. Real-World Job Simulation</h2>
    <p><strong>Try Task:</strong> Simulate a hands-on activity related to this role.</p>
    <p><strong>AI as a Manager:</strong> Provide real-time instructions and feedback.</p>
    <p><strong>Virtual Meeting:</strong> Simulate stakeholder discussions and feedback.</p>

    <h2>2. Career Growth & Market Trends</h2>
    <p><strong>Salary Expectations:</strong> Provide expected salary ranges.</p>
    <p><strong>Work-Life Balance:</strong> Typical work hours and flexibility.</p>
    <p><strong>Industry Trends:</strong> Growth prospects for this role.</p>

    <h2>3. Stress & Performance Test</h2>
    <p><strong>Decision-Making Test:</strong> Present a scenario where users must make a key decision.</p>
    '''
    
    try:
        # Correct method for generating response in Gemini AI SDK
        formatted_prompt = (
        "Format the response using proper HTML headings like <h1>, <h2>, and <p> instead of Markdown. "
        "Do not use Markdown, triple backticks, or code blocks."
        )
        response = model.generate_content([formatted_prompt, input_prompt])

        # Check if the response has a .text attribute or method
        if hasattr(response, 'text'):
            return response.text.strip()
        elif hasattr(response, 'get_text'):
            return response.get_text().strip()
        else:
            raise ValueError("Response object does not have expected content attribute.")
    
    except Exception as e:
        return f"<p class='text-danger'>Error generating simulation: {str(e)}</p>"
    
# Initialize our flask app
app = Flask(__name__)

@app.route('/try', methods=['POST'])
def handle_try_before_use():
    try:
        data = request.get_json()
        career = data.get('career')
        role = data.get('role')

        if not career or not role:
            return jsonify({"error": "Both career and role are required"}), 400

        # Generate job simulation content
        simulation_content = generate_job_simulation(career, role)

        return jsonify({"simulation": simulation_content})
    
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500
    
if __name__ == "__main__":
    app.run(debug=True)