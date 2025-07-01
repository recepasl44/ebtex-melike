import axiosInstance from '../../../../../../services/axiosClient'
import axios from 'axios'
import { EMPLOYEE_EARNINGS_MONTH } from '../../../../../../helpers/url_helper'
import { EmployeeEarningsMonthListResponse } from '../../../../../../types/employeeEarningsMonth/list'

export async function getMonth(params: { employee_id: number; period: string }) {
    const query = new URLSearchParams()
    query.append('employee_id', String(params.employee_id))
    query.append('period', params.period)
    const res = await axiosInstance.get(`${EMPLOYEE_EARNINGS_MONTH}?${query.toString()}`)
    return res.data as EmployeeEarningsMonthListResponse
}

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
})

export async function saveMonth(body: { employee_id: number; period: string; items: any[] }) {
    const res = await client.post('/personel-hakedis/kaydet', body)
    return res.data
}
