from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
load_dotenv() # loading all the environment variables

import numpy as np
from flask_cors import CORS
import os
import google.generativeai as genai
from PIL import Image
import pdf2image
import markdown
import io
import base64
import pickle
import traceback


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-pro-latest")
app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


# Resume analyser
def get_gemini_resume(pdf_content, job_desc, prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")

    if not pdf_content:
        return "Error: Could not process the PDF content."

    formatted_prompt = (
        "Format the response using proper HTML headings like <h1>, <h2>, and <p> instead of Markdown. "
        "Do not use Markdown, triple backticks, or code blocks."
    )

    try:
        response = model.generate_content([formatted_prompt, job_desc, pdf_content[0], prompt])
        
        if hasattr(response, "text") and response.text:
            return response.text
        else:
            return "Error: Gemini response is empty or invalid."

    except Exception as e:
        print("Gemini API Exception:", str(e))
        return f"Error generating response from Gemini: {str(e)}"



def input_pdf_setup(uploaded_file):
    if(uploaded_file is not None):
        # Converting pdf to image
        file_bytes = uploaded_file.read()
        images = pdf2image.convert_from_bytes(file_bytes)
        first_page = images[0]

        # Convert to Bytes
        img_bytes_arr = io.BytesIO()
        first_page.save(img_bytes_arr, format="JPEG")
        img_bytes_arr = img_bytes_arr.getvalue()

        pdf_parts = [
            {
            "mime_type" : "image/jpeg",
            "data" : base64.b64encode(img_bytes_arr).decode() # encoding to base 64
            }
        ]
        return pdf_parts
    else:
        raise FileNotFoundError("No file uploaded")

input_prompt1 = """
 You are an experienced Technical Human Resource Manager with deep expertise in evaluating resumes across various industries, including software engineering, data science, finance, marketing, healthcare, and more.  

Your task is to review the provided resume against the given job description and provide a professional evaluation.  
- Assess the candidate's **strengths and weaknesses** in relation to the job requirements.  
- Identify **key skills, experience, and qualifications** that match the role.  
- Highlight **any gaps or areas of improvement** that could enhance their suitability for the position.  
- Offer an overall **hiring recommendation** based on the evaluation.  

"""

input_prompt2 = """
You are an advanced Applicant Tracking System (ATS) scanner with expertise in resume evaluation across multiple domains, including technology, finance, healthcare, engineering, business, marketing, and more.  

Your task is to analyze the given resume against the provided job description.  

1. **Percentage Match:** Calculate a match percentage based on skills, experience, and qualifications.  
2. **Missing Keywords:** Identify critical keywords or competencies missing from the resume.  
3. **Final Thoughts:** Provide insights on how well the resume aligns with the job, along with suggestions for improvement.  

Ensure the analysis is **thorough and unbiased**, considering industry-specific terminologies and best practices.  
"""

input_prompt3 = """
You are an expert career advisor with deep knowledge of industry trends, in-demand skills, and career growth strategies across various fields, including technology, finance, healthcare, engineering, business, marketing, and more.  

Your task is to analyze the given skills and career goal to identify potential skill gaps and provide a structured roadmap for improvement.  

1. **Skill Gap Identification:** Compare the user's current skills with the industry-standard requirements for their target role.  
2. **Recommended Skills:** List the key technical and soft skills they need to develop for career progression.  
3. **Learning Resources:** Suggest relevant courses, certifications, or learning paths to bridge the identified skill gaps.  
4. **Career Insights:** Provide insights on industry trends, emerging technologies, or best practices that can enhance career growth.  

Ensure the analysis is **comprehensive, data-driven, and tailored to the user's career aspirations**, considering market demand and role-specific competencies.  
 
"""


@app.route('/resume', methods=['POST'])
def resume():
    job_desc = request.form.get("job_desc")
    prompt = request.form.get("prompt")

    if 'file' not in request.files:
        return jsonify({"response": "No file uploaded"}), 400  

    uploaded_file = request.files['file']  

    if uploaded_file.filename == '':
        return jsonify({"response": "Empty filename"}), 400  

    try:
        pdf_content = input_pdf_setup(uploaded_file)  # Convert PDF to image format for processing

        if not pdf_content:
            return jsonify({"response": "Error: Could not extract PDF content"}), 500

        if prompt == "prompt1":
            bot_response = get_gemini_resume(pdf_content, job_desc, input_prompt1)
        elif prompt == "prompt2":
            bot_response = get_gemini_resume(pdf_content, job_desc, input_prompt2)
        elif prompt == "prompt3":
            bot_response = get_gemini_resume(pdf_content, job_desc, input_prompt3)
        else:
            return jsonify({"response": "Invalid prompt"}), 400

        return jsonify({"response": bot_response})


    except Exception as e:
        error_details = traceback.format_exc()
        print("Full traceback:\n", error_details)
        return jsonify({"response": f"Error processing resume: {str(e)}"}), 500

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