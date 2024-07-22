import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import RequestForm from '../NewRequestForm.vue';
import { useRequestStore } from '/src/stores/requestStore';

vi.mock('/src/stores/requestStore', () => ({
  useRequestStore: vi.fn()
}));

describe('RequestForm', () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      addRequest: vi.fn(),
    };

    useRequestStore.mockReturnValue(mockStore);

    wrapper = mount(RequestForm);
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);

    const h2 = wrapper.find('h2');
    expect(h2.exists()).toBe(true);
    expect(h2.text()).toBe('Request Form');

    const form = wrapper.find('form');
    expect(form.exists()).toBe(true);
  });

  it('binds input fields correctly with v-model', async () => {
    const requesterNameInput = wrapper.find('input#requesterName');
    const topicInput = wrapper.find('input#topic');
    const descriptionTextarea = wrapper.find('textarea#description');
    const dateInput = wrapper.find('input#date');

    await requesterNameInput.setValue('Test Requester');
    await topicInput.setValue('Test Topic');
    await descriptionTextarea.setValue('Test Description');
    await dateInput.setValue('2023-01-01');

    expect(wrapper.vm.newRequest.requesterName).toBe('Test Requester');
    expect(wrapper.vm.newRequest.topic).toBe('Test Topic');
    expect(wrapper.vm.newRequest.description).toBe('Test Description');
    expect(wrapper.vm.newRequest.date).toBe('2023-01-01');
  });
});
