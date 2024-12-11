import axios from 'axios';

const API_BASE_URL = 'https://www.happyscribe.com/api/v1';
const API_KEY = 'LPcjmTNlNJX5MUxeZrjZPwtt';
const ORG_ID = '1336948';

// Create axios instance with default config
const happyScribeApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Organization-ID': ORG_ID,
  },
});

// Error handler with detailed messages
const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const response = error.response;
    const errorMessage = response?.data?.error || 
                        response?.data?.message || 
                        'An error occurred with the transcription service';
    
    console.error('API Error:', {
      status: response?.status,
      message: errorMessage,
      path: response?.config?.url
    });
    
    throw new Error(errorMessage);
  }
  throw error;
};

// Transcription Services
export const transcriptionService = {
  // Upload file for transcription
  uploadFile: async (file: File) => {
    try {
      // Create FormData for direct upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', 'en');
      formData.append('transcription_type', 'machine');
      formData.append('organization_id', ORG_ID);

      // Direct upload to transcriptions endpoint
      const response = await happyScribeApi.post('/transcriptions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Upload progress:', progress);
          }
        },
      });

      return {
        id: response.data.id,
        status: 'processing',
        progress: 0,
      };
    } catch (error) {
      console.error('Upload error:', {
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      handleApiError(error);
    }
  },

  // Get transcription status
  getTranscription: async (id: string) => {
    try {
      const response = await happyScribeApi.get(`/transcriptions/${id}`);
      return {
        id: response.data.id,
        progress: response.data.progress || 0,
        status: response.data.status || 'processing',
        text: response.data.text,
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get transcription progress
  getProgress: async (id: string) => {
    try {
      const response = await happyScribeApi.get(`/transcriptions/${id}/progress`);
      return {
        progress: response.data.progress || 0,
        status: response.data.status || 'processing',
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  // Export transcription
  exportTranscription: async (id: string, format: string) => {
    try {
      const response = await happyScribeApi.post(`/transcriptions/${id}/exports`, {
        format: format,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};