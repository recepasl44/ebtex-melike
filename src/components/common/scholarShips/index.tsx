// src/components/pages/Scholarships/CombinedScholarshipsPage.tsx
import { SetStateAction, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

import QuizListPage from "./day/dayTable";
import QuizSessionsListPage from "./session/sessionTable";
import ClassLevelListPage from "./classLevel/classLevelTable";
import ClassroomListPage from "./classroom/classroomTable";
import { IQuizSession } from "../../../types/quizSessions/list";
import { IQuizTime } from "../../../types/quizTimes/list";
import { QuizLevel } from "../../../types/quizLevels/list";

export default function ScholarParametersPage() {

    const [selectedSession, setSelectedSession] = useState<IQuizSession | null>(null);

    const [selectedTime, setSelectedTime] = useState<IQuizTime | null>(null);

    const [selectedLevel, setSelectedLevel] = useState<QuizLevel | null>(null);

    return (
        <Row className="g-3">
            {/* 1. Kart: Gün */}
            <Col md={3}>
                <Card className="h-100">
                    <Card.Header className="py-2"><h5 className="mb-0">Gün</h5></Card.Header>
                    <Card.Body className="p-2">
                        <QuizListPage
                            onSelectSession={(day) => {
                                setSelectedSession(day);

                                setSelectedTime(null);
                                setSelectedLevel(null);
                            }}
                        />
                    </Card.Body>
                </Card>
            </Col>

            {/* 2. Kart: Seans */}
            <Col md={3}>
                <Card className="h-100">
                    <Card.Header className="py-2"><h5 className="mb-0">Seans</h5></Card.Header>
                    <Card.Body className="p-2">
                        <QuizSessionsListPage
                            enabled={!!selectedSession}
                            onSelectTime={(time: SetStateAction<IQuizTime | null>) => {
                                setSelectedTime(time);
                                setSelectedLevel(null);
                            }}
                        />
                    </Card.Body>
                </Card>
            </Col>

            {/* 3. Kart: Sınıf Seviyesi */}
            <Col md={3}>
                <Card className="h-100">
                    <Card.Header className="py-2"><h5 className="mb-0">Sınıf Seviyesi</h5></Card.Header>
                    <Card.Body className="p-2">
                        <ClassLevelListPage
                            enabled={!!selectedTime}
                            time={selectedTime}
                            onSelectLevel={(lvl: SetStateAction<QuizLevel | null>) => setSelectedLevel(lvl)}
                        />
                    </Card.Body>
                </Card>
            </Col>

            {/* 4. Kart: Derslik */}
            <Col md={3}>
                <Card className="h-100">
                    <Card.Header className="py-2"><h5 className="mb-0">Derslik</h5></Card.Header>
                    <Card.Body className="p-2">
                        <ClassroomListPage
                            enabled={!!selectedLevel}
                            session={selectedSession}
                            time={selectedTime}
                            level={selectedLevel}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}