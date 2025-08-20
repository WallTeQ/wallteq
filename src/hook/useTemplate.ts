import { useState, useEffect } from "react"
import { API } from "../services/API"
import { CreateTemplateData, Template, TemplateMedia, UpdateTemplateData } from "../types/template-type"


export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = new API();

  // Get all templates
  const fetchTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Fetching templates...");
      const response = await api.get("/api/templates");
      console.log("✅ Templates fetched:", response);

      // Handle different response formats
      const templatesData = response.data || response.templates || response;
      setTemplates(Array.isArray(templatesData) ? templatesData : []);
    } catch (err: any) {
      console.error("❌ Failed to fetch templates:", err);
      setError(err.message || "Failed to fetch templates");
    } finally {
      setLoading(false);
    }
  };

  // Get published templates only
  const fetchPublishedTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/templates/published");
      const templatesData = response.data || response.templates || response;
      setTemplates(Array.isArray(templatesData) ? templatesData : []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch published templates");
    } finally {
      setLoading(false);
    }
  };

  // Get single template
  const fetchTemplate = async (id: string): Promise<Template | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/templates/${id}`);
      return response.data || response.template || response;
    } catch (err: any) {
      setError(err.message || "Failed to fetch template");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create new template
  const createTemplate = async (
    data: CreateTemplateData
  ): Promise<Template | null> => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Creating template with data:", data);

      const response = await api.post("/api/templates", data);
      console.log("✅ Template creation response:", response);

      const newTemplate = response.template || response.data || response;

      if (newTemplate && newTemplate.id) {
        setTemplates((prev) => [newTemplate, ...prev]);
        console.log("✅ Template created successfully:", newTemplate);
        return newTemplate;
      } else {
        throw new Error("No template data returned from server");
      }
    } catch (err: any) {
      console.error("❌ Failed to create template:", err);

      // Handle specific authentication errors
      if (err.error === "User not found" || err.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else if (err.error === "Validation failed" && err.details) {
        setError(
          `Validation error: ${err.details
            .map((d: any) => d.message)
            .join(", ")}`
        );
      } else {
        setError(err.message || err.error || "Failed to create template");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update template
  const updateTemplate = async (
    id: string,
    data: UpdateTemplateData
  ): Promise<Template | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/api/templates/${id}`, data);
      const updatedTemplate = response.template || response.data || response;
      setTemplates((prev) =>
        prev.map((template) =>
          template.id === id ? updatedTemplate : template
        )
      );
      return updatedTemplate;
    } catch (err: any) {
      setError(err.message || "Failed to update template");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete template
  const deleteTemplate = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/templates/${id}`);
      setTemplates((prev) => prev.filter((template) => template.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to delete template");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Publish template
  const publishTemplate = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Publishing template:", id);
      const response = await api.post(`/api/templates/${id}/publish`, {});
      console.log("✅ Publish response:", response);

      const updatedTemplate = response.template || response.data || response;
      if (updatedTemplate) {
        setTemplates((prev) =>
          prev.map((template) =>
            template.id === id ? updatedTemplate : template
          )
        );
      }
      return true;
    } catch (err: any) {
      console.error("❌ Failed to publish template:", err);
      setError(err.message || "Failed to publish template");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Unpublish template
  const unpublishTemplate = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/api/templates/${id}/unpublish`, {});
      const updatedTemplate = response.template || response.data || response;
      setTemplates((prev) =>
        prev.map((template) =>
          template.id === id ? updatedTemplate : template
        )
      );
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to unpublish template");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Upload template media - Fixed to match backend expectations
  const uploadTemplateMedia = async (
    templateId: string,
    file: File,
    type: "image" | "video"
  ): Promise<TemplateMedia | null> => {
    setLoading(true);
    setError(null);
    try {
      console.log(
        `🔄 Uploading ${type} for template ${templateId}:`,
        file.name
      );

      // Create FormData exactly as backend expects
      const formData = new FormData();
      formData.append("media", file);
      formData.append("type", type);

      console.log("📤 FormData contents:");
      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      const response = await api.post(
        `/api/templates/${templateId}/media`,
        formData
      );
      console.log("✅ Media upload response:", response);

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || "Upload failed");
      }
    } catch (err: any) {
      console.error("❌ Failed to upload media:", err);
      setError(err.message || "Failed to upload media");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get template media
  const fetchTemplateMedia = async (
    templateId: string
  ): Promise<TemplateMedia[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/templates/${templateId}/media`);
      if (response.success && response.data) {
        return response.data;
      }
      return [];
    } catch (err: any) {
      setError(err.message || "Failed to fetch template media");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Delete template media
  const deleteTemplateMedia = async (
    templateId: string,
    mediaId: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(
        `/api/templates/${templateId}/media/${mediaId}`
      );
      return response.success || true;
    } catch (err: any) {
      setError(err.message || "Failed to delete media");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  return {
    // State
    templates,
    loading,
    error,

    // Template operations
    fetchTemplates,
    fetchPublishedTemplates,
    fetchTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    publishTemplate,
    unpublishTemplate,

    // Media operations
    uploadTemplateMedia,
    fetchTemplateMedia,
    deleteTemplateMedia,

    // Utility
    clearError: () => setError(null),
  };
};

