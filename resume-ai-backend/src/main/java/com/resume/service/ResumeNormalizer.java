package com.resume.service;

import java.util.*;

public class ResumeNormalizer {

    public static Map<String, Object> normalizeResume(Map<String, Object> rawInput) {
        Map<String, Object> normalized = new LinkedHashMap<>();

        normalized.put("personalInformation", normalizeSection(rawInput, "personalInformation", Map.of(
            "fullName", "",
            "email", "",
            "phoneNumber", "",
            "location", "",
            "linkedIn", "",
            "gitHub", "",
            "portfolio", "",
            "summary", ""
        )));

        normalized.put("skills", normalizeSection(rawInput, "skills", Map.of(
            "programmingLanguages", new ArrayList<>(),
            "frameworks", new ArrayList<>(),
            "databases", new ArrayList<>(),
            "cloud", new ArrayList<>(),
            "devOpsTools", new ArrayList<>(),
            "otherSkills", new ArrayList<>()
        )));

        normalized.put("experience", normalizeListSection(rawInput, "experience", List.of(
            Map.of(
                "jobTitle", "",
                "company", "",
                "location", "",
                "duration", "",
                "responsibilities", new ArrayList<>()
            )
        )));

        normalized.put("education", normalizeListSection(rawInput, "education", List.of(
            Map.of(
                "degree", "",
                "university", "",
                "location", "",
                "year", "" // Normalize any "graduationYear" field to "year"
            )
        )));

        normalized.put("certifications", normalizeListSection(rawInput, "certifications", List.of(
            Map.of(
                "title", "",
                "issuingOrganization", "",
                "year", ""
            )
        )));

        normalized.put("projects", normalizeListSection(rawInput, "projects", List.of(
            Map.of(
                "title", "",
                "description", "",
                "githubLink", "",
                "technologiesUsed", new ArrayList<>()
            )
        )));

        normalized.put("achievements", normalizeListSection(rawInput, "achievements", List.of(
            Map.of(
                "title", "",
                "description", "",
                "proficiency", ""
            )
        )));

        normalized.put("languages", normalizeListSection(rawInput, "languages", List.of(
            Map.of(
                "name", "",
                "proficiency", ""
            )
        )));

        normalized.put("interests", normalizeListSection(rawInput, "interests", List.of(
            Map.of(
                "name", "",
                "description", ""
            )
        )));

        return normalized;
    }

    private static Map<String, Object> normalizeSection(Map<String, Object> raw, String key, Map<String, Object> template) {
        Map<String, Object> section = new LinkedHashMap<>();
        Map<String, Object> data = getMapIgnoreCase(raw, key);

        for (String expectedKey : template.keySet()) {
            Object value = getValueIgnoreCase(data, expectedKey);
            section.put(expectedKey, value != null ? value : template.get(expectedKey));
        }

        return section;
    }

    private static List<Map<String, Object>> normalizeListSection(Map<String, Object> raw, String key, List<Map<String, Object>> templateList) {
        List<Map<String, Object>> dataList = new ArrayList<>();
        List<Map<String, Object>> rawList = getListIgnoreCase(raw, key);
        Map<String, Object> template = templateList.get(0);

        for (Map<String, Object> rawItem : rawList) {
            Map<String, Object> normalizedItem = new LinkedHashMap<>();
            for (String field : template.keySet()) {
                Object value = getValueIgnoreCase(rawItem, field);
                if (value == null && field.equals("year")) {
                    // Handle common mislabels like "graduationYear"
                    value = getValueIgnoreCase(rawItem, "graduationYear");
                }
                normalizedItem.put(field, value != null ? value : template.get(field));
            }
            dataList.add(normalizedItem);
        }

        return dataList;
    }

    // Utility: Get map ignoring case
    private static Map<String, Object> getMapIgnoreCase(Map<String, Object> map, String targetKey) {
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (entry.getKey().equalsIgnoreCase(targetKey) && entry.getValue() instanceof Map) {
                return (Map<String, Object>) entry.getValue();
            }
        }
        return Map.of(); // Empty fallback
    }

    // Utility: Get list of maps ignoring case
    private static List<Map<String, Object>> getListIgnoreCase(Map<String, Object> map, String targetKey) {
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (entry.getKey().equalsIgnoreCase(targetKey) && entry.getValue() instanceof List) {
                List<?> rawList = (List<?>) entry.getValue();
                List<Map<String, Object>> safeList = new ArrayList<>();
                for (Object item : rawList) {
                    if (item instanceof Map) {
                        safeList.add((Map<String, Object>) item);
                    }
                }
                return safeList;
            }
        }
        return List.of(); // Empty fallback
    }

    // Utility: Get value ignoring case
    private static Object getValueIgnoreCase(Map<String, Object> map, String key) {
        if (map == null) return null;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (entry.getKey().equalsIgnoreCase(key)) {
                return entry.getValue();
            }
        }
        return null;
    }
}
