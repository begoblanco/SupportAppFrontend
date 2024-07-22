import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import EditRequestsList from '../EditRequestList.vue';
import { useRequestStore } from '/src/stores/requestStore';

vi.mock('/src/stores/requestStore', () => ({
  useRequestStore: vi.fn()
}));

describe('EditRequestsList', () => {
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
          requestDate: '2023-01-01T00:00:00.000Z'
        },
        {
          id: '2',
          requesterName: 'Marin',
          topic: 'Topic 2',
          description: 'Description 2',
          requestDate: '2023-02-01T00:00:00.000Z'
        }
      ],
      fetchAllRequests: vi.fn()
    };

    useRequestStore.mockReturnValue(mockStore);

    wrapper = mount(EditRequestsList);
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);

    const h2 = wrapper.find('h2');
    expect(h2.exists()).toBe(true);
    expect(h2.text()).toBe('Edit Requests');

    const cards = wrapper.findAll('.card');
    expect(cards.length).toBe(2);

    const firstCardTitle = cards[0].find('.card-title');
    expect(firstCardTitle.exists()).toBe(true);
    expect(firstCardTitle.text()).toBe('Bego');

    const secondCardTitle = cards[1].find('.card-title');
    expect(secondCardTitle.exists()).toBe(true);
    expect(secondCardTitle.text()).toBe('Marin');
  });

  it('formats the date correctly', () => {
    const cards = wrapper.findAll('.card');

    const firstCardDate = cards[0].findAll('.card-text')[2];
    expect(firstCardDate.exists()).toBe(true);
    expect(firstCardDate.text()).toContain('01/01/2023');

    const secondCardDate = cards[1].findAll('.card-text')[2];
    expect(secondCardDate.exists()).toBe(true);
    expect(secondCardDate.text()).toContain('01/02/2023');
  });

  it('calls fetchAllRequests on mount', () => {
    expect(mockStore.fetchAllRequests).toHaveBeenCalled();
  });

  it('emits edit event when edit button is clicked', async () => {
    const editButtons = wrapper.findAll('button.btn-primary');
    await editButtons[0].trigger('click');

    expect(wrapper.emitted().edit).toBeTruthy();
    expect(wrapper.emitted().edit[0]).toEqual(['1']);
  });
});
