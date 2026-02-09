package com.resume.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ChatClient chatClient;

    public ResumeServiceImpl(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) {
        Map<String, Object> jsonObject = new HashMap<>();

        try {
            String promptTemplate = this.loadPromptFromFile("resume_prompt.txt");
            String promptContent = this.putValuesToTemplates(promptTemplate, Map.of("userDescription", userResumeDescription));
            System.out.println("Modified prompt content:\n" + promptContent);

            Prompt prompt = new Prompt(promptContent);
            String response = chatClient.prompt(prompt).call().content();
            System.out.println("Raw AI Response:\n" + response);

            // Ensure <data> wrapping for uniform parsing
            response = wrapWithDataTagIfMissing(response);
            System.out.println("Wrapped AI Response:\n" + response);

            jsonObject = parseMultipleResponse(response);

            // Fallback for missing sections
            if (jsonObject.get("data") == null) {
                jsonObject.put("data", getDefaultResumeData());
            }

            if (jsonObject.get("think") == null) {
                jsonObject.put("think", "No reasoning provided.");
            }

        } catch (IOException e) {
            e.printStackTrace();
            jsonObject.put("think", "Error generating resume.");
            jsonObject.put("data", getDefaultResumeData());
        }

        return jsonObject;
    }

    public String loadPromptFromFile(String fileName) throws IOException {
        Path path = new ClassPathResource(fileName).getFile().toPath();
        return Files.readString(path);
    }

    public String putValuesToTemplates(String template, Map<String, String> values) {
        for (Map.Entry<String, String> entry : values.entrySet()) {
            template = template.replace("{{{" + entry.getKey() + "}}}", entry.getValue());
        }
        return template;
    }

    /**
     * Ensures that the AI response is wrapped in <data>...</data> for consistent parsing.
     */
    public String wrapWithDataTagIfMissing(String response) {
        if (response == null || response.trim().isEmpty()) {
            return "<data>{}</data>";
        }

        String trimmed = response.trim();

        // If already wrapped
        if (trimmed.contains("<data>") && trimmed.contains("</data>")) {
            return trimmed;
        }

        // Try extracting JSON from ```json or ```jsonc
        int jsonStart = trimmed.indexOf("```json");
        if (jsonStart == -1) jsonStart = trimmed.indexOf("```jsonc");
        int jsonEnd = trimmed.indexOf("```", jsonStart + 6);

        if (jsonStart != -1 && jsonEnd != -1) {
            String json = trimmed.substring(jsonStart + 7, jsonEnd).trim();
            return "<data>\n" + json + "\n</data>";
        }

        // Try checking if it's plain JSON
        if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
            return "<data>\n" + trimmed + "\n</data>";
        }

        // As fallback, just wrap entire response
        return "<data>\n" + trimmed + "\n</data>";
    }

    /**
     * Parses a response containing optional <think> and <data> tags.
     */
    public static Map<String, Object> parseMultipleResponse(String response) {
        Map<String, Object> parsedResponse = new HashMap<>();

        // Parse <think>
        int thinkStart = response.indexOf("<think>");
        int thinkEnd = response.indexOf("</think>");
        if (thinkStart != -1 && thinkEnd != -1) {
            String thinkContent = response.substring(thinkStart + 7, thinkEnd).trim();
            parsedResponse.put("think", thinkContent);
        } else {
            parsedResponse.put("think", null);
        }

        // Parse <data>
        int dataStart = response.indexOf("<data>");
        int dataEnd = response.indexOf("</data>");
        String jsonContent = null;

        if (dataStart != -1 && dataEnd != -1) {
            jsonContent = response.substring(dataStart + 6, dataEnd).trim();
        }

        // Parse the extracted JSON content
        if (jsonContent != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> dataContent = objectMapper.readValue(jsonContent, Map.class);
                parsedResponse.put("data", dataContent);
            } catch (Exception e) {
                System.out.println("Failed to parse JSON:\n" + jsonContent);
                e.printStackTrace();
                parsedResponse.put("data", null);
            }
        } else {
            parsedResponse.put("data", null);
        }

        return parsedResponse;
    }

    /**
     * Provides a safe fallback resume JSON structure.
     */
    private Map<String, Object> getDefaultResumeData() {
        Map<String, Object> defaultData = new HashMap<>();
        defaultData.put("personalInformation", Map.of(
                "fullName", "",
                "email", "",
                "phoneNumber", "",
                "location", "",
                "linkedIn", "",
                "gitHub", "",
                "portfolio", "",
                "summary", ""
        ));
        defaultData.put("skills", Map.of(
                "programmingLanguages", new String[]{},
                "frameworks", new String[]{},
                "database", new String[]{},
                "cloud", new String[]{},
                "devOpsTools", new String[]{},
                "otherSkills", new String[]{}
        ));
        defaultData.put("experience", new Object[]{});
        defaultData.put("education", new Object[]{});
        defaultData.put("certifications", new Object[]{});
        defaultData.put("projects", new Object[]{});
        defaultData.put("achievements", new Object[]{});
        defaultData.put("languages", new Object[]{});
        defaultData.put("interests", new Object[]{});
        return defaultData;
    }
}