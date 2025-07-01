import axiosInstance from '../../../../../../services/axiosClient'
import axios from 'axios'
import { EMPLOYEE_EARNINGS_PERIOD } from '../../../../../../helpers/url_helper'
import { EmployeeEarningsPeriodListResponse } from '../../../../../../types/employeeEarningsPeriod/list'

export async function getPeriod(params: { employee_id: number; period: string }) {
    const query = new URLSearchParams()
    query.append('employee_id', String(params.employee_id))
    query.append('period', params.period)
    const res = await axiosInstance.get(`${EMPLOYEE_EARNINGS_PERIOD}?${query.toString()}`)
    return res.data as EmployeeEarningsPeriodListResponse
}

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
})

export async function savePeriod(body: { employee_id: number; period: string; items: any[] }) {
    const res = await client.post('/personel-hakedis/kaydet', body)
    return res.data
}