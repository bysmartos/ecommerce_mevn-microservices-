import { Task } from "@/interfaces/task.interface";
import { AxiosResponse } from "axios";
import axios from "./axios.service";


const port=8001

export const login = async (form: any): Promise<AxiosResponse<object>> =>
  await axios(port).post("/login", form);

  export const register = async (form: any): Promise<AxiosResponse<object>> =>
  await axios(port).post("/register", form);

// export const getTask = async (id: string): Promise<AxiosResponse<Task>> =>
//   await axios.get(`/tasks/${id}`);

// export const createTask = async (task: Task): Promise<AxiosResponse> =>
//   await axios.post("/tasks", task);

// export const updateTask = async (
//   id: string,
//   newTask: Task
// ): Promise<AxiosResponse<Task>> => await axios.put(`/tasks/${id}`, newTask);

// export const deleteTask = async (id: string): Promise<AxiosResponse> =>
//   await axios.delete(`/tasks/${id}`);