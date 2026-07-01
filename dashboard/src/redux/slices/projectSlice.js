import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const URL = import.meta.env.VITE_BACKEND_URL
const s = createSlice({
  name: 'project',
  initialState: { loading: false, projects: [], single: null },
  reducers: {
    req(s) { s.loading = true },
    allOk(s, a) { s.loading = false; s.projects = a.payload },
    singleOk(s, a) { s.loading = false; s.single = a.payload },
    fail(s) { s.loading = false },
  }
})
const { req, allOk, singleOk, fail } = s.actions
export const getAllProjects = () => async (d) => {
  d(req())
  try { const { data } = await axios.get(`${URL}project`, { withCredentials: true }); d(allOk(data.projects)) }
  catch (e) { d(fail()) }
}
export const createProject = (fd) => async (d) => {
  d(req())
  try { await axios.post(`${URL}project/create`, fd, { withCredentials: true }); d(fail()); toast.success('Project created!'); d(getAllProjects()) }
  catch (e) { d(fail()); toast.error(e.response?.data?.message || 'Failed') }
}
export const updateProject = (id, fd) => async (d) => {
  d(req())
  try { await axios.put(`${URL}project/update/${id}`, fd, { withCredentials: true }); d(fail()); toast.success('Project updated!'); d(getAllProjects()) }
  catch (e) { d(fail()); toast.error(e.response?.data?.message || 'Failed') }
}
export const deleteProject = (id) => async (d) => {
  try { await axios.delete(`${URL}project/delete/${id}`, { withCredentials: true }); toast.success('Deleted!'); d(getAllProjects()) }
  catch (e) { toast.error('Delete failed') }
}
export default s.reducer
