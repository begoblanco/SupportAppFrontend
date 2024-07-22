import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import EditRequestForm from '../EditRequestForm.vue'; 
import { useRequestStore } from '/src/stores/requestStore';
import { useRouter } from 'vue-router'; 

vi.mock('/src/stores/requestStore', () => ({
  useRequestStore: vi.fn()
}));
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('EditRequestForm', () => {
  let wrapper;
  let mockStore;
  let mockRouter;

  beforeEach(() => {
    // Configurar el mock del store
    mockStore = {
      getRequestById: vi.fn().mockReturnValue({
        id: '1',
        requesterName: 'Test Requester',
        topic: 'Test Topic',
        description: 'Test Description',
        date: '2023-01-01'
      }),
      updateRequest: vi.fn()
    };


    mockRouter = {
      push: vi.fn()
    };

    useRequestStore.mockReturnValue(mockStore);
    useRouter.mockReturnValue(mockRouter);

 
    wrapper = mount(EditRequestForm, {
      props: { id: '1' },
      global: {
        stubs: {
          'router-link': true 
        }
      }
    });
  });

  it('renders correctly and displays request data', () => {
    expect(wrapper.exists()).toBe(true);

    const h2 = wrapper.find('h2');
    expect(h2.exists()).toBe(true);
    expect(h2.text()).toBe('Edit Request Form');

    const requesterNameInput = wrapper.find('#requesterName');
    expect(requesterNameInput.exists()).toBe(true);
    expect(requesterNameInput.element.value).toBe('Test Requester');

    const topicInput = wrapper.find('#topic');
    expect(topicInput.exists()).toBe(true);
    expect(topicInput.element.value).toBe('Test Topic');

    const descriptionTextarea = wrapper.find('#description');
    expect(descriptionTextarea.exists()).toBe(true);
    expect(descriptionTextarea.element.value).toBe('Test Description');

    const dateInput = wrapper.find('#date');
    expect(dateInput.exists()).toBe(true);
    expect(dateInput.element.value).toBe('2023-01-01');
  });

  it('updates request and calls updateRequest when form is submitted', async () => {
    await wrapper.find('#requesterName').setValue('Updated Requester');
    await wrapper.find('#topic').setValue('Updated Topic');
    await wrapper.find('#description').setValue('Updated Description');
    await wrapper.find('#date').setValue('2024-01-01');

    
    await wrapper.find('form').trigger('submit.prevent');


    expect(mockStore.updateRequest).toHaveBeenCalledWith('1', {
      id: '1',
      requesterName: 'Updated Requester',
      topic: 'Updated Topic',
      description: 'Updated Description',
      date: '2024-01-01'
    });
  });

  it('emits cancel event when cancel button is clicked', async () => {
   
    await wrapper.find('button.btn-secondary').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('cancel');
  });
});
