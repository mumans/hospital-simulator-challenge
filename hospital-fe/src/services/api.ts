import axios from 'axios';
import { Drug, PatientState } from 'hospital-lib';

const API_URL = 'http://localhost:7200';

/**
 * API service for interacting with the backend
 */
export const api = {
  /**
   * Fetches random patient states from the server
   * @returns {Promise<string[]>} Array of patient states
   */
  async getPatients(): Promise<PatientState[]> {
    const { data } = await axios.get(`${API_URL}/patients`);
    return data.split(',').filter(Boolean);
  },
  
  /**
   * Fetches random drugs from the server
   * @returns {Promise<string[]>} Array of drugs
   */
  async getDrugs(): Promise<Drug[]> {
    const { data } = await axios.get(`${API_URL}/drugs`);
    return data.split(',').filter(Boolean);
  }
};