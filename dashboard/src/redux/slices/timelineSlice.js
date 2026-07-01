import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const URL = import.meta.env.VITE_BACKEND_URL
const s = createSlice({
  name: 'timeline',
  initialState: { loading: false, timelines: [] },
  reducers: {
    req(s) { s.loading = true },
    allOk(s, a) { s.loading = false; s.timelines = a.payload },
    fail(s) { s.loading = false },
  }
})
const { req, allOk, fail } = s.actions
export const getAllTimelines = () => async (d) => {
  d(req())
  try { const { data } = await axios.get(`${URL}timeline`, { withCredentials: true }); d(allOk(data.timelines)) }
  catch (e) { d(fail()) }
}
export const createTimeline = (td) => async (d) => {
  d(req())
  try { await axios.post(`${URL}timeline/create`, td, { withCredentials: true }); d(fail()); toast.success('Timeline added!'); d(getAllTimelines()) }
  catch (e) { d(fail()); toast.error(e.response?.data?.message || 'Failed') }
}
export const deleteTimeline = (id) => async (d) => {
  try { await axios.delete(`${URL}timeline/delete/${id}`, { withCredentials: true }); toast.success('Deleted!'); d(getAllTimelines()) }
  catch (e) { toast.error('Delete failed') }
}
export default s.reducer
