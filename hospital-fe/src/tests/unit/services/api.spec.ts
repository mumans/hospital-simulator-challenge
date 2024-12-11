import { api } from '@/services/api'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('api service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getPatients', () => {
    it('should fetch patient states', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: 'F,H,D' })

      const result = await api.getPatients()

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:7200/patients')
      expect(result).toEqual(['F', 'H', 'D'])
    })

    it('should handle patient fetch errors', async () => {
      const error = new Error('Failed to fetch patients')
      mockedAxios.get.mockRejectedValueOnce(error)

      await expect(api.getPatients()).rejects.toThrow('Failed to fetch patients')
    })
  })

  describe('getDrugs', () => {
    it('should fetch available drugs', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: 'As,P,I' })

      const result = await api.getDrugs()

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:7200/drugs')
      expect(result).toEqual(['As', 'P', 'I'])
    })

    it('should handle drug fetch errors', async () => {
      const error = new Error('Failed to fetch drugs')
      mockedAxios.get.mockRejectedValueOnce(error)

      await expect(api.getDrugs()).rejects.toThrow('Failed to fetch drugs')
    })
  })
}) 