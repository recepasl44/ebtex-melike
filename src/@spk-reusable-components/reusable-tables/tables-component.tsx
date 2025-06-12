
import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';

interface HeaderItem {
    title: string | React.ReactNode;
    headerClassname?: string;
}

interface SpkTablesComponentProps {
    children?: React.ReactNode;
    tableClass?: string;
    header?: HeaderItem[];
    showCheckbox?: boolean;
    onChange?: any;
    headerClass?: string;
    footchildren?: React.ReactNode;
    footerClass?: string;
    Customcheckclass?: string;
    tBodyClass?: string;
    headerContent?: any;
    checked?: any;
    inputClass?: string
    Bodytag?: boolean
}

const SpkTablescomponent: React.FC<SpkTablesComponentProps> = ({ children, tableClass, Bodytag=true, headerClass, header, footerClass, footchildren, headerContent, tBodyClass, checked, showCheckbox = false, Customcheckclass, onChange }) => {
    return (
        <Fragment>
            <Table className={tableClass}>
                {headerContent}
                <thead className={headerClass}>
                    <tr>
                        {showCheckbox && (
                            <th className={Customcheckclass}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkboxNoLabel02"
                                    defaultValue=""
                                    checked={checked}
                                    aria-label="..."
                                    onChange={onChange}
                                />
                            </th>
                        )}
                        {header && header.map((headerItem, index) => (
                            <th key={index} className={headerItem.headerClassname}>
                                {headerItem.title}
                            </th>
                        ))}
                    </tr>
                </thead>
               {Bodytag?  
               <tbody className={tBodyClass}>
                    {children}
                </tbody>
                : children
                }
                <tfoot className={footerClass}>
                    {footchildren}
                </tfoot>
            </Table>
        </Fragment>
    );
}

export default SpkTablescomponent;
