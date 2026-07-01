import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const URL = import.meta.env.VITE_BACKEND_URL
const authSlice = createSlice({
  name: 'auth',
  initialState: { loading: false, user: null, isAuthenticated: false },
  reducers: {
    req(s) { s.loading = true },
    loginOk(s, a) { s.loading = false; s.user = a.payload; s.isAuthenticated = true },
    logoutOk(s) { s.loading = false; s.user = null; s.isAuthenticated = false },
    profileOk(s, a) { s.loading = false; s.user = a.payload; s.isAuthenticated = true },
    fail(s) { s.loading = false },
  }
})
const { req, loginOk, logoutOk, profileOk, fail } = authSlice.actions
export const login = (email, password) => async (d) => {
  d(req())
  try {
    const { data } = await axios.post(`${URL}user/login`, { email, password }, { withCredentials: true })
    d(loginOk(data.user)); toast.success('Login successful!')
  } catch (e) { d(fail()); toast.error(e.response?.data?.message || 'Login failed') }
}
export const logout = () => async (d) => {
  try { await axios.get(`${URL}user/logout`, { withCredentials: true }); d(logoutOk()); toast.success('Logged out!') }
  catch (e) { toast.error('Logout failed') }
}
export const getProfile = () => async (d) => {
  d(req())
  try { const { data } = await axios.get(`${URL}user/profile`, { withCredentials: true }); d(profileOk(data.user)) }
  catch (e) { d(fail()) }
}
export const updateProfile = (fd) => async (d) => {
  d(req())
  try { const { data } = await axios.put(`${URL}user/update`, fd, { withCredentials: true }); d(profileOk(data.user)); toast.success('Profile updated!') }
  catch (e) { d(fail()); toast.error(e.response?.data?.message || 'Update failed') }
}
export const updatePassword = (pw) => async (d) => {
  d(req())
  try { await axios.put(`${URL}user/updatePassword`, pw, { withCredentials: true }); d(fail()); toast.success('Password updated!') }
  catch (e) { d(fail()); toast.error(e.response?.data?.message || 'Failed') }
}
export default authSlice.reducer
