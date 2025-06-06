import { SearchResponse } from '../types/researcher';

const API_BASE_URL = '/api';

export const searchResearchers = async (keyword: string): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error('検索に失敗しました。しばらく時間をおいて再度お試しください。');
  }
};