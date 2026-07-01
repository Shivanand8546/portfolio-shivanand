import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const URL = import.meta.env.VITE_BACKEND_URL
const s = createSlice({
  name: 'message',
  initialState: { loading: false, messages: [] },
  reducers: {
    req(s) { s.loading = true },
    allOk(s, a) { s.loading = false; s.messages = a.payload },
    fail(s) { s.loading = false },
  }
})
const { req, allOk, fail } = s.actions
export const getAllMessages = () => async (d) => {
  d(req())
  try { const { data } = await axios.get(`${URL}message/all`, { withCredentials: true }); d(allOk(data.messages)) }
  catch (e) { d(fail()) }
}
export const deleteMessage = (id) => async (d) => {
  try { await axios.delete(`${URL}message/${id}`, { withCredentials: true }); toast.success('Message deleted!'); d(getAllMessages()) }
  catch (e) { toast.error('Delete failed') }
}
export default s.reducer
