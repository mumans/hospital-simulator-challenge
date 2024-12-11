import { mount } from '@vue/test-utils'
import PatientList from '@/components/PatientList.vue'

describe('PatientList.vue', () => {
  it('renders patients list correctly', () => {
    const patients = [
      { state: 'F', count: 2 },
      { state: 'D', count: 1 }
    ]
    
    const wrapper = mount(PatientList, {
      props: {
        patients
      }
    })
    
    expect(wrapper.text()).toContain('Fever: 2')
    expect(wrapper.text()).toContain('Diabetes: 1')
  })
}) 