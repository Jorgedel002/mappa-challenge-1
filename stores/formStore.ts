import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { Form, FormQuestion, FormResponse } from '~/types/form';

export const useFormStore = defineStore('form', () => {
  const forms = ref<Form[]>([]);
  const responses = ref<FormResponse[]>([]);
  
  function createForm(title: string, questions: Omit<FormQuestion, 'id'>[]): Form {
    const newForm: Form = {
      id: uuidv4(),
      title,
      questions: questions.map(question => ({
        ...question,
        id: uuidv4()
      })),
      createdAt: new Date()
    };
    
    forms.value.push(newForm);
    return newForm;
  }
  
  function getForm(id: string): Form | undefined {
    return forms.value.find(form => form.id === id);
  }
  
  function submitFormResponse(formId: string, answers: { questionId: string; answer: string | number }[]): FormResponse {
    const response: FormResponse = {
      id: uuidv4(),
      formId,
      answers,
      submittedAt: new Date()
    };
    
    responses.value.push(response);
    return response;
  }
  
  function getFormResponses(formId: string): FormResponse[] {
    return responses.value.filter(response => response.formId === formId);
  }
  
  function getAllForms(): Form[] {
    return forms.value;
  }
  
  return {
    forms,
    responses,
    createForm,
    getForm,
    submitFormResponse,
    getFormResponses,
    getAllForms
  };
});
