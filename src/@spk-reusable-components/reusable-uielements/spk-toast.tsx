import React from 'react';
import { Toast } from 'react-bootstrap';

interface SpkToastProps {
    show: boolean;
    onClose?: () => void;
    title?: string;
    message: string;
    timestamp?: string;
    imgSrc?: string;
    toastClass?: string;
    headerClass?: string;
    imgClass?: string;
    bodyClass?: string;
    autohide?: boolean;
    delay?: number;
    ToastHeader?: boolean;
    ToastBtn?: boolean;
    ChildContent?: React.ReactNode;
    btnClass?: string;
    onclick?: () => void;
    bg?: string;
}

const SpkToast: React.FC<SpkToastProps> = ({ show, onClose, title, message, timestamp, imgSrc, toastClass, headerClass, imgClass, bodyClass, autohide = false, delay = 5000, ToastHeader = false, ToastBtn = false, ChildContent, btnClass = 'btn-close', onclick, bg }) => {
    return (
        <Toast bg={bg}
            show={show}
            onClose={onClose}
            className={`toast ${toastClass}`}
            delay={delay}
            autohide={autohide}
        >
            {ToastHeader === true && (
                <Toast.Header className={`toast-header ${headerClass}`}>
                    {imgSrc && (
                        <img
                            className={`bd-placeholder-img rounded me-2 ${imgClass}`}
                            src={imgSrc}
                            alt="Toast Image"
                            style={{ width: '20px', height: '20px' }}
                        />
                    )}
                    <strong className="me-auto">{title}</strong>
                    <small>{timestamp}</small>
                </Toast.Header>
            )}

            {ToastHeader && (ChildContent || message) && (
                <Toast.Body className={`w-100 ${bodyClass}`}>
                    {ChildContent || message}
                </Toast.Body>
            )}

            {!ToastHeader && ToastBtn && (
                <div className="d-flex">
                    <Toast.Body className="w-100">{ChildContent || message}</Toast.Body>
                    <button
                        type="button"
                        className={btnClass}
                        aria-label="Close"
                        onClick={onclick || onClose}
                    />
                </div>
            )}
        </Toast>
    );
};

export default SpkToast;
