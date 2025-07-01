import axiosInstance from '../../../../../../services/axiosClient'
import { EMPLOYEE_EARNINGS_MONTH } from '../../../../../../helpers/url_helper'
import { EmployeeEarningsMonthListResponse } from '../../../../../../types/employeeEarningsMonth/list'

export async function getMonth(params: { employee_id: number; period: string }) {
    const query = new URLSearchParams()
    query.append('employee_id', String(params.employee_id))
    query.append('period', params.period)
    const res = await axiosInstance.get(`${EMPLOYEE_EARNINGS_MONTH}?${query.toString()}`)
    return res.data as EmployeeEarningsMonthListResponse
}

export async function saveMonth(payload: any) {
    const res = await axiosInstance.post(EMPLOYEE_EARNINGS_MONTH, payload)
    return res.data
}
