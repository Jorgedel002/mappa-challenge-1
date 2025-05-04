import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Poll, PollOption, PollResponse } from '~/types/poll';

export const usePollStore = defineStore('poll', () => {
  const polls = ref<Poll[]>([]);
  
  // Crear una nueva encuesta
  function createPoll(question: string, options: string[]): Poll {
    const newPoll: Poll = {
      id: uuidv4(),
      question,
      options: options.map(option => ({
        id: uuidv4(),
        text: option,
        count: 0
      })),
      createdAt: new Date()
    };
    
    polls.value.push(newPoll);
    return newPoll;
  }
  
  // Obtener una encuesta por ID
  function getPoll(id: string): Poll | undefined {
    return polls.value.find(poll => poll.id === id);
  }
  
  // Responder a una encuesta
  function respondToPoll(response: PollResponse): void {
    const poll = polls.value.find(p => p.id === response.pollId);
    if (!poll) return;
    
    const option = poll.options.find(opt => opt.id === response.selectedOptionId);
    if (option) {
      option.count++;
    }
  }
  
  // Obtener todas las encuestas
  function getAllPolls(): Poll[] {
    return polls.value;
  }
  
  return {
    polls,
    createPoll,
    getPoll,
    respondToPoll,
    getAllPolls
  };
});
