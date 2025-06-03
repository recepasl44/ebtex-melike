import React from "react";
import {useSelector} from "react-redux";
import HeaderBlock from "../../headerSection/headerBlock/HeaderBlock.tsx";
import {RootState} from "../../../../../../../store/rootReducer";

type Props = {
    quizName: string;
    studentName: string;
    className: string;
};

const HeaderBanner: React.FC<Props> = ({
                                           quizName,
                                           studentName,
                                           className,
                                       }) => {
    // Get theme mode from Redux
    const localVariable = useSelector((state: RootState) => state.ui);
    const isDark = localVariable.dataThemeMode === "dark";

    // Theme-specific colors
    const colors = {
        quiz: {
            fill: isDark ? "#1E4D79" : "#0082FF",
            stroke: isDark ? "#4B5563" : "#E6EFF3",
            text: isDark ? "#E2E8F0" : undefined
        },
        student: {
            fill: isDark ? "#592D5A" : "#E354D4",
            stroke: isDark ? "#4B5563" : "#E6EFF3",
            text: isDark ? "#E2E8F0" : undefined
        },
        className: {
            fill: isDark ? "#7D4539" : "#FF8E6F",
            stroke: isDark ? "#4B5563" : "#E6EFF3",
            text: isDark ? "#E2E8F0" : undefined
        }
    };

    return (
        <div
            className="d-flex justify-content-center"
            style={{width: "100%"}}
        >
            <HeaderBlock
                text={quizName}
                fill={colors.quiz.fill}
                stroke={colors.quiz.stroke}
                cutRight
                width="32.6%"
                height="25px"
            />
            <HeaderBlock
                text={studentName}
                fill={colors.student.fill}
                stroke={colors.student.stroke}
                cutLeft
                cutRight
                width="40%"
                height="25px"
            />
            <HeaderBlock
                text={className}
                fill={colors.className.fill}
                stroke={colors.className.stroke}
                cutLeft
                width="30%"
                height="25px"
            />
        </div>
    );
};

export default HeaderBanner;
