import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import EditRequestForm from '../EditRequestForm.vue';
import { useRequestStore } from '/src/stores/requestStore';

// Mock del store
vi.mock('/src/stores/requestStore', () => ({
  useRequestStore: vi.fn()
}));

describe('EditRequestForm', () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      requests: [
        {
          id: '1',
          requesterName: 'Bego',
          topic: 'Topic 1',
          description: 'Description 1',
          requestDate: '2024-01-01T00:00',
        }
      ],
      fetchAllRequests: vi.fn(),
      getRequestById: vi.fn().mockReturnValue({
        id: '1',
        requesterName: 'Bego',
        topic: 'Topic 1',
        description: 'Description 1',
        requestDate: '2024-01-01T00:00',
      }),
      updateRequest: vi.fn()
    };

    useRequestStore.mockReturnValue(mockStore);

    wrapper = mount(EditRequestForm, {
      props: {
        id: '1'
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);

    const h2 = wrapper.find('h2');
    expect(h2.exists()).toBe(true);
    expect(h2.text()).toBe('Edit Request Form');

    const cardTitle = wrapper.find('.card-title');
    expect(cardTitle.exists()).toBe(true);
    expect(cardTitle.text()).toBe('Edit Request Form');
  });

  it('sets the initial values correctly', () => {
    const requesterNameInput = wrapper.find('#requesterName');
    const topicInput = wrapper.find('#topic');
    const descriptionInput = wrapper.find('#description');
    const dateInput = wrapper.find('#date');

    expect(requesterNameInput.element.value).toBe('Bego');
    expect(topicInput.element.value).toBe('Topic 1');
    expect(descriptionInput.element.value).toBe('Description 1');
    expect(dateInput.element.value).toBe('2024-01-01T00:00');
  });

  it('emits the cancel event when cancel button is clicked', async () => {
    await wrapper.find('button.btn-secondary').trigger('click');
    expect(wrapper.emitted().cancel).toBeTruthy();
  });

  it('calls updateRequest when the form is submitted', async () => {
    await wrapper.find('input#requesterName').setValue('New Name');
    await wrapper.find('input#topic').setValue('New Topic');
    await wrapper.find('textarea#description').setValue('New Description');
    await wrapper.find('input#date').setValue('2024-01-01T00:00');

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockStore.updateRequest).toHaveBeenCalledWith('1', {
      id: '1',
      requesterName: 'New Name',
      topic: 'New Topic',
      description: 'New Description',
      requestDate: '2024-01-01T00:00',
    });
  });
});