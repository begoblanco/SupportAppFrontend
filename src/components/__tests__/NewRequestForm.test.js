import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import NewRequestForm from '../NewRequestForm.vue';
import { useRequestStore } from '/src/stores/requestStore';
import { useRouter } from 'vue-router';

vi.mock('/src/stores/requestStore', () => ({
  useRequestStore: vi.fn()
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('NewRequestForm', () => {
  let wrapper;
  let mockStore;
  let mockRouter;

  beforeEach(() => {
    mockStore = {
      addRequest: vi.fn(),
    };
    mockRouter = {
      push: vi.fn()
    };

    useRequestStore.mockReturnValue(mockStore);
    useRouter.mockReturnValue(mockRouter);

    wrapper = mount(NewRequestForm, {
      props: { id: '1' },
      global: {
        stubs: {
          'router-link': {
            template: '<a><slot></slot></a>' 
          },
          'router-view': true  
        }
      }
    });
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
    await dateInput.setValue('2023-01-01T00:00');

    expect(wrapper.vm.newRequest.requesterName).toBe('Test Requester');
    expect(wrapper.vm.newRequest.topic).toBe('Test Topic');
    expect(wrapper.vm.newRequest.description).toBe('Test Description');
    expect(wrapper.vm.newRequest.requestDate).toBe('2023-01-01T00:00');
  });

  it('submits the form correctly', async () => {
    const requesterNameInput = wrapper.find('input#requesterName');
    const topicInput = wrapper.find('input#topic');
    const descriptionTextarea = wrapper.find('textarea#description');
    const dateInput = wrapper.find('input#date');

    await requesterNameInput.setValue('Test Requester');
    await topicInput.setValue('Test Topic');
    await descriptionTextarea.setValue('Test Description');
    await dateInput.setValue('2023-01-01T00:00');

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockStore.addRequest).toHaveBeenCalled();
    expect(mockStore.addRequest).toHaveBeenCalledWith({
      requesterName: 'Test Requester',
      topic: 'Test Topic',
      description: 'Test Description',
      requestDate: '2023-01-01T00:00',
    });
  });

  it('resets the form correctly when reset button is clicked', async () => {
    const requesterNameInput = wrapper.find('input#requesterName');
    const topicInput = wrapper.find('input#topic');
    const descriptionTextarea = wrapper.find('textarea#description');
    const dateInput = wrapper.find('input#date');

    await requesterNameInput.setValue('Test Requester');
    await topicInput.setValue('Test Topic');
    await descriptionTextarea.setValue('Test Description');
    await dateInput.setValue('2023-01-01');

    await wrapper.find('button[type="reset"]').trigger('click');

    expect(wrapper.vm.newRequest.requesterName).toBe('');
    expect(wrapper.vm.newRequest.topic).toBe('');
    expect(wrapper.vm.newRequest.description).toBe('');
    expect(wrapper.vm.newRequest.requestDate).toBe('');
  });

  it('renders cancel link', () => {
    const cancelLink = wrapper.find('#cancel-btn');
    expect(cancelLink.exists()).toBe(true);
    expect(cancelLink.text()).toBe('Cancel');
  });
});