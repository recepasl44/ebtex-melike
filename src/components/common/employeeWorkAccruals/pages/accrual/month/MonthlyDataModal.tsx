import { useMemo, useState } from 'react'
import ReusableTable, { ColumnDefinition } from '../../../../ReusableTable'
import ReusableModalForm, { FieldDefinition } from '../../../../ReusableModalForm'

interface Item {
    key: string
    label: string
    qty: number
    unit: number
}

export interface MonthlyDataRow {
    full_name?: string
    period?: string
    items?: Record<string, { qty: number; unit: number }>
}

export default function MonthlyDataModal({
    show,
    row,
    onClose
}: {
    show: boolean
    row: MonthlyDataRow | null
    onClose: () => void
}) {
    const [period, setPeriod] = useState(row?.period || '')
    const [items, setItems] = useState<Item[]>(() => {
        const base: any = row?.items || {}
        const keys = [
            'sabit_maas',
            'ders_ucreti',
            'soru_cozum_ucreti',
            'gun_bazli_ucret',
            'kocluk_ucreti',
            'ozel_ders_ucreti',
            'prim',
            'other'
        ]
        const fieldMap: Record<string, string> = {
            sabit_maas: 'salary',
            ders_ucreti: 'lesson_rate',
            soru_cozum_ucreti: 'question_rate',
            gun_bazli_ucret: 'daily_rate',
            kocluk_ucreti: 'coaching_rate',
            ozel_ders_ucreti: 'private_lesson_rate',
            prim: 'bonus',
            other: 'other'
        }
        const labels: Record<string, string> = {
            sabit_maas: 'Sabit Maaş',
            ders_ucreti: 'Ders Ücreti',
            soru_cozum_ucreti: 'Soru Çözüm Ücreti',
            gun_bazli_ucret: 'Gün Bazlı Ücret',
            kocluk_ucreti: 'Koçluk Ücreti',
            ozel_ders_ucreti: 'Özel Ders Ücreti',
            prim: 'Prim',
            other: 'Farklı Ücret (Ek Ücret/İndirim vb.)'
        }
        return keys.map(k => ({
            key: k,
            label: labels[k],
            qty: Number(base[k]?.qty || 0),
            unit: Number(base[k]?.unit || (row as any)?.[fieldMap[k]] || 0)
        }))
    })

    const total = useMemo(() => items.reduce((s, i) => s + i.qty * i.unit, 0), [items])

    const columns: ColumnDefinition<Item>[] = useMemo(
        () => [
            { key: 'label', label: 'Gelir Türü', render: r => r.label },
            {
                key: 'qty',
                label: 'Sayı',
                render: (_r, _o, idx) => (
                    <input
                        type='number'
                        className='form-control w-24'
                        value={items[idx!].qty}
                        onChange={e => {
                            const v = Number(e.target.value)
                            setItems(arr => arr.map((it, i) => (i === idx ? { ...it, qty: v } : it)))
                        }}
                    />
                )
            },
            {
                key: 'unit',
                label: 'Birim Ücret (₺)',
                render: r => r.unit.toLocaleString()
            },
            {
                key: 'total',
                label: 'Tutar (₺)',
                render: r => (r.qty * r.unit).toLocaleString()
            }
        ],
        [items]
    )

    const tableFooter = (
        <div className='text-end font-bold p-2'>Genel Toplam ₺ {total.toLocaleString()}</div>
    )

    const fields: FieldDefinition[] = [
        {
            name: 'table',
            renderForm: () => (
                <ReusableTable<Item>
                    tableMode='single'
                    columns={columns}
                    data={items}
                    showExportButtons={false}
                    customFooter={tableFooter}
                />
            )
        }
    ]

    return (
        <ReusableModalForm
            show={show}
            title={
                <div className='flex items-center gap-2'>
                    <span>{row?.full_name || ''}</span>
                    <select
                        value={period}
                        onChange={e => setPeriod(e.target.value)}
                        className='form-select form-select-sm w-auto'
                    >
                        {Array.from({ length: 12 }, (_, i) => {
                            const m = String(i + 1).padStart(2, '0')
                            return (
                                <option key={m} value={`${row?.period?.slice(0, 4) || ''}-${m}`}>{m}</option>
                            )
                        })}
                    </select>
                </div>
            }
            fields={fields}
            initialValues={{}}
            onSubmit={() => onClose()}
            confirmButtonLabel='Kaydet'
            cancelButtonLabel='Vazgeç'
            onClose={onClose}
            mode='single'
        />
    )
}
