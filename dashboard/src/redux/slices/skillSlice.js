import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const URL = import.meta.env.VITE_BACKEND_URL
const s = createSlice({
  name: 'skill',
  initialState: { loading: false, skills: [] },
  reducers: {
    req(s) { s.loading = true },
    allOk(s, a) { s.loading = false; s.skills = a.payload },
    fail(s) { s.loading = false },
  }
})
const { req, allOk, fail } = s.actions
export const getAllSkills = () => async (d) => {
  d(req())
  try { const { data } = await axios.get(`${URL}skill`, { withCredentials: true }); d(allOk(data.skills)) }
  catch (e) { d(fail()) }
}
export const createSkill = (fd) => async (d) => {
  d(req())
  try { await axios.post(`${URL}skill/create`, fd, { withCredentials: true }); d(fail()); toast.success('Skill added!'); d(getAllSkills()) }
  catch (e) { d(fail()); toast.error(e.response?.data?.message || 'Failed') }
}
export const deleteSkill = (id) => async (d) => {
  try { await axios.delete(`${URL}skill/delete/${id}`, { withCredentials: true }); toast.success('Deleted!'); d(getAllSkills()) }
  catch (e) { toast.error('Delete failed') }
}
export default s.reducer
