import React from "react";

const ResumeTemplate = ({ data }) => {
  const {
    personalInformation,
    skills,
    experience,
    education,
    certifications,
    projects,
    achievements,
    languages,
    interests,
  } = data;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-base-100 rounded-box shadow-lg space-y-6 text-base-content">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">{personalInformation.fullName}</h1>
        <p>{personalInformation.summary}</p>
        <div className="mt-2 text-sm text-gray-500">
          <p>{personalInformation.location} | {personalInformation.email} | {personalInformation.phoneNumber}</p>
          <p>
            <a href={`https://${personalInformation.linkedIn}`} target="_blank" rel="noreferrer">LinkedIn</a> |{" "}
            {personalInformation.gitHub && (
              <a href={`https://${personalInformation.gitHub}`} target="_blank" rel="noreferrer">GitHub</a>
            )}{" "}
            |{" "}
            {personalInformation.portfolio && (
              <a href={personalInformation.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
            )}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-semibold border-b pb-1">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {Object.entries(skills).map(([key, values]) => (
            <div key={key}>
              <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {values.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-2xl font-semibold border-b pb-1">Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="mt-3">
            <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
            <p className="text-sm text-gray-600">
              {exp.company} — {exp.location} | {exp.duration}
            </p>
            <ul className="list-disc list-inside text-sm mt-1">
              {exp.responsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <h2 className="text-2xl font-semibold border-b pb-1">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx} className="mt-2">
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <p className="text-sm text-gray-600">
              {edu.university} — {edu.location} | {edu.graduationYear}
            </p>
          </div>
        ))}
      </div>

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold border-b pb-1">Certifications</h2>
          <ul className="mt-2 list-disc list-inside text-sm">
            {certifications.map((cert, i) => (
              <li key={i}>
                <strong>{cert.title}</strong> — {cert.issuingOrganization}, {cert.year}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold border-b pb-1">Projects</h2>
          {projects.map((project, idx) => (
            <div key={idx} className="mt-3">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm text-gray-700">{project.description}</p>
              <p className="text-sm text-gray-500">Technologies: {project.technologiesUsed.join(", ")}</p>
              {project.githubLink && (
                <a
                  className="text-blue-500 text-sm"
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Repo
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold border-b pb-1">Achievements</h2>
          <ul className="mt-2 list-disc list-inside text-sm">
            {achievements.map((ach, i) => (
              <li key={i}>
                <strong>{ach.title}</strong>: {ach.description}{" "}
                {ach.date && <span className="text-gray-500">({ach.date})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold border-b pb-1">Languages</h2>
          <ul className="mt-2 text-sm">
            {languages.map((lang, i) => (
              <li key={i}>
                {lang.name} — {lang.proficiency}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold border-b pb-1">Interests</h2>
          <ul className="mt-2 text-sm">
            {interests.map((int, i) => (
              <li key={i}>
                <strong>{int.name}</strong>: {int.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeTemplate;
