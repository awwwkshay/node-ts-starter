import axios from "axios";
import { ITodo, ITodoCreate, ITodoUpdate } from "@awwwkshay/node-ts-core";
import { IApiResponse } from "@/types";

export const createTodo = async (todoCreate: ITodoCreate): Promise<ITodo> => {
 	const response = await axios.post<IApiResponse<ITodo>>("/todos", todoCreate);
 	return response.data.data;
};

export const readTodos = async (): Promise<ITodo[]> => {
    const response = await axios.get<IApiResponse<ITodo[]>>("/todos");
    return response.data.data;
};

export const readTodoById = async (id: string): Promise<ITodo | undefined> => {
    const response = await axios.get<IApiResponse<ITodo | undefined>>(`/todos/${id}`);
    return response.data.data;
};


export const updateTodo = async (id: string, updates: ITodoUpdate): Promise<ITodo | undefined> => {
    const response = await axios.patch<IApiResponse<ITodo | undefined>>(`/todos/${id}`, updates);
    return response.data.data;
};

export const deleteTodo = async (id: string): Promise<ITodo | undefined> => {
    const response = await axios.delete<IApiResponse<ITodo | undefined>>(`/todos/${id}`);
    return response.data.data;
};