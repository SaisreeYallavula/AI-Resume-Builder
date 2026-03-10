import React from "react";
import { useState } from "react";
function HomePage(){
    const [formData, setFormData] = useState ({
companyName:"",
applyingAsA:"Experienced",
coverLetter:"formal",
jobDescription:"",
currentResume:""
    });

    const [geminiResponse, setGeminiResponse] = useState("");
   async function handleGenerateData(){
 console.log("formDATA:" ,formData);
 setGeminiResponse ("Generating content, please wait...");
 const prompt = `You are a professional career coach and resume optimization expert. 
Your task is to generate a personalized cover letter, improve the resume content, 
and provide an ATS (Applicant Tracking System) analysis.

Inputs:
Company Name: ${formData.companyName}
Experience Level: ${formData.applyingAsA}  (Fresher / Experienced)
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume} (If empty, assume no resume exists and create a draft)
Preferred Tone: ${formData.coverLetterTone}

Output (format clearly in sections):

1. Tailored Cover Letter  
Write a professional cover letter addressed to ${formData.companyName}.  
Use the specified tone: ${formData.coverLetterTone}.  
Highlight relevant skills and experiences based on the job description.  

2. Updated Resume Content  
Suggest optimized resume summary, bullet points, and skills tailored to ${formData.jobDescription}.  
Ensure the content is concise, achievement-focused, and ATS-friendly.  

3. Keyword Match Analysis  
Extract the most important keywords from the job description.  
Check if they exist in the provided resume (if given).  
List missing keywords that should be added.  

4. ATS Score Estimate (0–100)  
Provide a rough ATS match score for the current resume against the job description.  
Explain the reasoning briefly (e.g., missing keywords, formatting issues, irrelevant content).  

Ensure the response is structured, clear, and easy to display in a React app`

 const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-goog-api-key': 'AIzaSyB8yfz9jJ4cYamCVdsXcQRcs9R5OZBPPVE'
  },
  body: `{"contents":[{"parts":[{"text":"${prompt}"}]}]}`
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
    console.log('Generated Gemini data:',data.candidates[0].content.parts[0].text);
    setGeminiResponse(data.candidates[0].content.parts[0].text);
}
 catch (error) {
  console.error(error);
}
    }
return(
<>
  <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", paddingTop: "40px", paddingBottom: "40px" }}>
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px" }}>
      
      {/* Header Section */}
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "700", color: "#1a202c", margin: "0 0 10px 0" }}>
          Resume Builder
        </h1>
        <p style={{ fontSize: "16px", color: "#718096", margin: "0" }}>
          Generate tailored cover letters, optimize your resume, and improve your ATS score
        </p>
      </div>

      {/* Form Section */}
      <form style={{
        backgroundColor: "#ffffff",
        padding: "35px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        marginBottom: "40px"
      }}>
        <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#2d3748", marginBottom: "25px", borderBottom: "3px solid #4299e1", paddingBottom: "12px" }}>
          Application Details
        </h2>

        {/* First Row - Company Name */}
        <div className="mb-4">
          <label htmlFor="companyName" style={{ display: "block", fontWeight: "600", color: "#2d3748", marginBottom: "8px", fontSize: "15px" }}>
            Company Name
          </label>
          <input 
            type="text" 
            className="form-control" 
            id="companyName" 
            placeholder="e.g., Google, Microsoft, Amazon"
            style={{ borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px", fontSize: "14px" }}
            value={formData.companyName} 
            onChange={(e) => setFormData({...formData, companyName:e.target.value})}
          />
          <small style={{ color: "#718096", marginTop: "5px", display: "block" }}>Enter the name of the company you are applying to</small>
        </div>

        {/* Second Row - Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          {/* Experience Level */}
          <div>
            <label htmlFor="ApplyingAsA" style={{ display: "block", fontWeight: "600", color: "#2d3748", marginBottom: "8px", fontSize: "15px" }}>
              Experience Level
            </label>
            <select 
              className="form-select" 
              id="ApplyingAsA" 
              style={{ borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px", fontSize: "14px" }}
              value={formData.applyingAsA} 
              onChange={(e) => setFormData({...formData, applyingAsA:e.target.value})}
            >
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
            </select>
            <small style={{ color: "#718096", marginTop: "5px", display: "block" }}>Are you a fresher or experienced professional?</small>
          </div>

          {/* Cover Letter Tone */}
          <div>
            <label htmlFor="coverLetterTone" style={{ display: "block", fontWeight: "600", color: "#2d3748", marginBottom: "8px", fontSize: "15px" }}>
              Cover Letter Tone
            </label>
            <select 
              className="form-select" 
              id="coverLetterTone" 
              style={{ borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px", fontSize: "14px" }}
              value={formData.coverLetterTone} 
              onChange={(e) => setFormData({...formData, coverLetterTone:e.target.value})}
            >
              <option value="Formal">Formal</option>
              <option value="Informal">Informal</option>
              <option value="Casual">Casual</option>
            </select>
            <small style={{ color: "#718096", marginTop: "5px", display: "block" }}>Choose the tone for your cover letter</small>
          </div>
        </div>

        {/* Third Row - Two columns for textareas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "25px" }}>
          {/* Job Description */}
          <div>
            <label htmlFor="jobDescription" style={{ display: "block", fontWeight: "600", color: "#2d3748", marginBottom: "8px", fontSize: "15px" }}>
              Job Description
            </label>
            <textarea 
              id="jobDescription"
              placeholder="Paste the complete job description here..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e0",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "vertical",
                minHeight: "200px",
                boxSizing: "border-box"
              }}
              value={formData.jobDescription} 
              onChange={(e) => setFormData({...formData, jobDescription:e.target.value})}
            ></textarea>
            <small style={{ color: "#718096", marginTop: "5px", display: "block" }}>Include key responsibilities and requirements</small>
          </div>

          {/* Current Resume */}
          <div>
            <label htmlFor="currentResume" style={{ display: "block", fontWeight: "600", color: "#2d3748", marginBottom: "8px", fontSize: "15px" }}>
              Current Resume
            </label>
            <textarea 
              id="currentResume"
              placeholder="Paste your current resume content here... (Optional)"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e0",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "vertical",
                minHeight: "200px",
                boxSizing: "border-box"
              }}
              value={formData.currentResume} 
              onChange={(e) => setFormData({...formData, currentResume:e.target.value})}
            ></textarea>
            <small style={{ color: "#718096", marginTop: "5px", display: "block" }}>Leave blank to get a resume draft</small>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="button" 
          onClick={handleGenerateData}
          style={{
            width: "100%",
            padding: "14px 28px",
            backgroundColor: "#4299e1",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(66, 153, 225, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#3182ce";
            e.target.style.boxShadow = "0 4px 8px rgba(66, 153, 225, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#4299e1";
            e.target.style.boxShadow = "0 2px 4px rgba(66, 153, 225, 0.3)";
          }}
        >
          ✨ Generate Content
        </button>
      </form>

      {/* Response Section */}
      {geminiResponse && (
        <div style={{
          backgroundColor: "#ffffff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          animation: "fadeIn 0.4s ease-in"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1a202c",
            marginBottom: "10px",
            borderLeft: "5px solid #48bb78",
            paddingLeft: "15px"
          }}>
            📄 Generated Content
          </h2>
          <p style={{ color: "#718096", marginBottom: "30px", marginLeft: "15px" }}>
            Review and customize the content below as needed
          </p>

          {geminiResponse.split(/(?=\d+\.\s)/g).map((section, index) => {
            const lines = section.split('\n').filter(line => line.trim() !== '');
            if (lines.length === 0) return null;

            const sectionTitle = lines[0];
            const sectionContent = lines.slice(1).join('\n');
            
            const sectionIcons = ["📝", "📑", "🔑", "📊"];

            return (
              <div 
                key={index} 
                style={{
                  marginBottom: "28px",
                  paddingBottom: "28px",
                  borderBottom: index < 3 ? "2px solid #e2e8f0" : "none"
                }}
              >
                <h3 style={{
                  color: "#2d3748",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  {sectionIcons[index]} {sectionTitle}
                </h3>
                <div style={{
                  color: "#4a5568",
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  padding: "15px",
                  backgroundColor: "#f7fafc",
                  borderRadius: "8px",
                  borderLeft: "4px solid #4299e1",
                  fontSize: "14px",
                  fontFamily: "system-ui, -apple-system, sans-serif"
                }}>
                  {sectionContent}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  </div>
</>
);
}
export default HomePage;

//AIzaSyB8yfz9jJ4cYamCVdsXcQRcs9R5OZBPPVE