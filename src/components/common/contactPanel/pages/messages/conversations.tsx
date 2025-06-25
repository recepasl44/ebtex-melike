import React, { useEffect, useState } from 'react';
import { Tab, Nav, Form, InputGroup, Spinner } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import axiosInstance from '../../../../../services/axiosClient';
import dayjs from 'dayjs';
import { ChatUser } from './types';

interface ConversationItem extends ChatUser {
    lastMessage: string;
    lastTimestamp: string;
}

interface Props {
    onSelect: (user: ChatUser, conversationId: string) => void;
}

const formatTime = (iso: string) => dayjs(iso).format('HH:mm');

const Conversations: React.FC<Props> = ({ onSelect }) => {
    const [data, setData] = useState<ConversationItem[]>([]);
    const [activeTab, setActiveTab] = useState<'personal' | 'groups'>('personal');
    const [selectedId, setSelectedId] = useState<string>('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axiosInstance.get('/conversations');
                setData(resp.data || []);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Fetch failed');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filtered = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) &&
        c.isGroup === (activeTab === 'groups')
    );

    return (
        <div className="chat-info me-2 mb-2">
            <InputGroup className="mb-3">
                <Form.Control
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Kişiler Ara…"
                />
                <InputGroup.Text className="btn-icon">
                    <i className="ti ti-search" />
                </InputGroup.Text>
            </InputGroup>
            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k as any)}>
                <Nav variant="pills" className="nav-justified tab-style-6 mb-3">
                    <Nav.Item>
                        <Nav.Link eventKey="personal">Kişisel</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="groups">Gruplar</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="chat-content">
                    <Tab.Pane eventKey="personal">
                        {loading && <Spinner animation="border" size="sm" />}
                        {error && <div className="text-danger">{error}</div>}
                        <SimpleBar style={{ maxHeight: 400 }}>
                            <ul className="list-unstyled mb-0">
                                {filtered.map((c) => (
                                    <li
                                        key={c.id}
                                        className={c.id === selectedId ? 'active d-flex align-items-start p-2' : 'd-flex align-items-start p-2'}
                                        onClick={() => {
                                            setSelectedId(c.id);
                                            onSelect(c, c.id);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img src={c.imageUrl} className="avatar avatar-md me-2" />
                                        <div className="flex-grow-1">
                                            <p className="mb-0 fw-medium">
                                                {c.name}
                                                <span className="float-end fs-11 text-muted">{formatTime(c.lastTimestamp)}</span>
                                            </p>
                                            <p className="fs-12 text-truncate mb-0">{c.lastMessage}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </SimpleBar>
                    </Tab.Pane>
                    <Tab.Pane eventKey="groups">
                        {loading && <Spinner animation="border" size="sm" />}
                        {error && <div className="text-danger">{error}</div>}
                        <SimpleBar style={{ maxHeight: 400 }}>
                            <ul className="list-unstyled mb-0">
                                {filtered.map((c) => (
                                    <li
                                        key={c.id}
                                        className={c.id === selectedId ? 'active d-flex align-items-start p-2' : 'd-flex align-items-start p-2'}
                                        onClick={() => {
                                            setSelectedId(c.id);
                                            onSelect(c, c.id);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img src={c.imageUrl} className="avatar avatar-md me-2" />
                                        <div className="flex-grow-1">
                                            <p className="mb-0 fw-medium">
                                                {c.name}
                                                <span className="float-end fs-11 text-muted">{formatTime(c.lastTimestamp)}</span>
                                            </p>
                                            <p className="fs-12 text-truncate mb-0">{c.lastMessage}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </SimpleBar>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default Conversations;
