import { fetchPatients, fetchDrugs } from '@/services/api'

describe('API Service', () => {
  it('fetches patients correctly', async () => {
    const patients = await fetchPatients()
    expect(Array.isArray(patients)).toBe(true)
  })

  it('fetches drugs correctly', async () => {
    const drugs = await fetchDrugs()
    expect(Array.isArray(drugs)).toBe(true)
  })
}) 