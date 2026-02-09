import React, { useRef, useState } from 'react';
import { FaBook, FaDownload, FaCheck, FaMagic, FaEraser, FaTrash, FaPlus } from 'react-icons/fa';
import { generateResume } from '../api/ResumeService';
import toast from 'react-hot-toast';
import ResumeTemplate from "../components/ResumeTemplate.jsx";

function GenerateResume() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    personalInformation: {
      fullName: '',
      email: '',
      phoneNumber: '',
      location: '',
      linkedIn: '',
      gitHub: '',
      portfolio: '',
      summary: '',
    },
    skills: {
      programmingLanguages: [],
      frameworks: [],
      database: [],
      cloud: [],
      devOpsTools: [],
      otherSkills: [],
    },
    education: [],
    certifications: [],
    projects: [],
    achievements: [],
    languages: [],
    interests: [],
    experience: [],
  });

  const resumeRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) {
      toast.error("Resume not ready for download");
      return;
    }

    const html2pdf = (await import("html2pdf.js")).default;
    const element = resumeRef.current;
    console.log(element," ",resumeRef);
    setTimeout(() => {
      const opt = {
        margin: 0.2,
        filename: `${data.personalInformation.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      personalInformation: {
        ...prevData.personalInformation,
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    toast.success('Resume submitted successfully!');
    document.getElementById("resume_modal")?.showModal();
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const rawResponse = await generateResume(description);

      let parsedData = {};
      if (typeof rawResponse === 'string') {
        const dataStart = rawResponse.indexOf('<data>');
        const dataEnd = rawResponse.indexOf('</data>');
        if (dataStart !== -1 && dataEnd !== -1) {
          const jsonString = rawResponse.substring(dataStart + 6, dataEnd).trim();
          parsedData = JSON.parse(jsonString);
        } else {
          toast.error('Invalid AI response format.');
          return;
        }
      }
	   else if (typeof rawResponse === 'object' && rawResponse.data) {
        parsedData = rawResponse.data;
      } 
	  else {
        toast.error('Unexpected AI response format.');
        return;
      }

      const normalized = {
        personalInformation: {
          ...data.personalInformation,
          ...parsedData.personalInformation,
        },
        skills: {
          programmingLanguages: parsedData.skills?.programmingLanguages || [],
          frameworks: parsedData.skills?.frameworks || [],
          database: parsedData.skills?.database || parsedData.skills?.databases || [],
          cloud: parsedData.skills?.cloud || parsedData.skills?.cloudPlatforms || [],
          devOpsTools: parsedData.skills?.devOpsTools || parsedData.skills?.devOpTools || [],
          otherSkills: parsedData.skills?.otherSkills || [],
        },
        education: parsedData.education || [],
        certifications: parsedData.certifications || [],
        projects: parsedData.projects || [],
        achievements: parsedData.achievements || [],
        languages: parsedData.languages || [],
        interests: parsedData.interests || [],
        experience: parsedData.experience || [],
      };

      setData(normalized);
      toast.success('Resume Generated Successfully!', {
        duration: 5000,
        position: 'top-center',
      });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
      setDescription('');
    }
  };

  const handleAddField = (section) => {
    setData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), {}],
    }));
  };

  const handleRemoveField = (section, index) => {
    setData((prev) => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, i) => i !== index),
    }));
  };

  const handleFieldChange = (section, index, key, value) => {
    const updatedSection = [...data[section]];
    updatedSection[index] = { ...updatedSection[index], [key]: value };
    setData((prev) => ({
      ...prev,
      [section]: updatedSection,
    }));
  };

  const renderObjectSection = (section, structure = []) => (
    <div className="card bg-white shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold capitalize">{section}</h2>
        <button className="btn btn-sm btn-outline" onClick={() => handleAddField(section)}>
          <FaPlus /> Add
        </button>
      </div>
      {(data[section] || []).map((entry, index) => (
        <div key={index} className="space-y-2 border p-4 rounded-xl mb-4">
          {structure.map((field) => {
            const value = entry[field];
            const isArray = Array.isArray(value);
            return (
              <div key={field}>
                <label htmlFor={`${section}_${index}_${field}`} className="label capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  id={`${section}_${index}_${field}`}
                  autoComplete="off"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder={field}
                  value={isArray ? value.join(', ') : value || ''}
                  onChange={(e) =>
                    handleFieldChange(
                      section,
                      index,
                      field,
                      isArray ? e.target.value.split(',').map((s) => s.trim()) : e.target.value
                    )
                  }
                />
              </div>
            );
          })}
          <button className="btn btn-sm btn-error mt-2" onClick={() => handleRemoveField(section, index)}>
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-base-100 px-6 py-10">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-2 mb-6">
        <FaBook className="text-accent" /> AI Resume Generator
      </h1>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Description Input */}
        <div className="card bg-white shadow-md p-6">
          <label htmlFor="description" className="label text-lg font-semibold mb-2">
            Enter your description (skills, experience, role...)
          </label>
          <textarea
            id="description"
            autoComplete="off"
            disabled={loading}
            className="textarea textarea-bordered w-full h-32 mb-4"
            placeholder="E.g., I am a Java developer with 2 years of experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="flex gap-4">
            <button className="btn btn-primary flex gap-2" onClick={handleGenerate} disabled={!description.trim() || loading}>
              {loading && <span className="loading loading-spinner"></span>}
              <FaMagic /> Generate
            </button>
            <button className="btn btn-outline flex gap-2" onClick={() => setDescription('')}>
              <FaEraser /> Clear
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <div className="card bg-white shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data.personalInformation).map(([key, value]) => (
              <div key={key}>
                <label htmlFor={key} className="label capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  id={key}
                  name={key}
                  autoComplete={key === "email" ? "email" : "off"}
                  type="text"
                  value={value || ''}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="card bg-white shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data.skills).map(([category, items]) => (
              <div key={category}>
                <label htmlFor={category} className="label capitalize">
                  {category.replace(/([A-Z])/g, ' $1')}
                </label>
                <textarea
                  id={category}
                  autoComplete="off"
                  className="textarea textarea-bordered w-full"
                  placeholder={`Enter ${category} (comma separated)`}
                  value={Array.isArray(items) ? items.join(', ') : ''}
                  onChange={(e) => {
                    const updated = {
                      ...data.skills,
                      [category]: e.target.value.split(',').map((s) => s.trim()),
                    };
                    setData((prev) => ({ ...prev, skills: updated }));
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {renderObjectSection('education', ['degree', 'university', 'location', 'graduationYear'])}
        {renderObjectSection('experience', ['jobTitle', 'company', 'location', 'duration', 'responsibilities'])}
        {renderObjectSection('certifications', ['title', 'issuingOrganization', 'year'])}
        {renderObjectSection('projects', ['title', 'description', 'technologiesUsed', 'githubLink'])}
        {renderObjectSection('achievements', ['title', 'description', 'date'])}
        {renderObjectSection('languages', ['name', 'proficiency'])}
        {renderObjectSection('interests', ['name', 'description'])}

        {/* Submit */}
        <div className="flex justify-center mt-10">
          <button className="btn btn-success text-white px-6 py-3 text-lg flex gap-2" onClick={handleSubmit} disabled={loading}>
            <FaCheck /> Submit Resume
          </button>
        </div>

        {/* Resume Modal */}
        <dialog id="resume_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-5xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">Your Resume</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost">✕</button>
              </form>
            </div>
            <div className="mb-4 flex justify-end">
              <button onClick={handleDownloadPDF} className="btn btn-primary flex items-center gap-2">
                <FaDownload /> Download PDF
              </button>
            </div>
            <div ref={resumeRef}>
              <ResumeTemplate data={data} />
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default GenerateResume;
