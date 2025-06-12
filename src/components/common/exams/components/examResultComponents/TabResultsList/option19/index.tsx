import { AnalysisListType } from "../../../../../../../types/exam/analysisListType.ts";
// import { DYNHeader } from "../../../../../../../utils/DYNHeader.tsx";
import { TableRow } from "../multiRowTable/type.ts";

type TextAlign = "left" | "right" | "center" | "justify";
function Option19(props: AnalysisListType): TableRow[] {
  return [
    {
      isHeader: false,
      cells: [
        {
          content: "KURUM KODU / İL / İLÇE / KURUM KODU",
          colSpan: 4,
          rowSpan: 1,
          style: { width: "414px", height: "26px" },
        },
        {
          content: "SINAV ADI",
          rowSpan: 1,
          colSpan: 3,
          style: { width: "315px", height: "26px" },
        },
        {
          content: "KATILIM SAYILARI",
          colSpan: 1,
          rowSpan: 2,
          style: { width: "90", height: "51px" },
        },
        {
          content: "SINIF",
          rowSpan: 1,
          colSpan: 1,
          style: { width: "90px", height: 26 },
        },
        {
          content: "KURUM",
          rowSpan: 1,
          colSpan: 1,
          style: { width: "90px", height: 26 },
        },
        {
          content: "İLÇE",
          rowSpan: 1,
          colSpan: 1,
          style: { width: "90px", height: 26 },
        },
        {
          content: "İL",
          rowSpan: 1,
          colSpan: 1,
          style: { width: "90px", height: 26 },
        },
        {
          content: "GENEL",
          rowSpan: 1,
          colSpan: 1,
          style: { width: "90px", height: 26 },
        },
      ],
    },
    {
      isHeader: false,
      cells: [
        {
          content: `${props.platform.post_code} / ${props.platform.city} / ${props.platform.county} / ${props.platform.name}`,
          colSpan: 4,
          rowSpan: 1,
          style: { width: "315", height: "26px" },
        },
        {
          content: props.quiz,
          rowSpan: 1,
          colSpan: 3,
          style: { height: "26px" },
        },
        {
          content: props.joined_number.class.toString(),
          colSpan: 1,
          rowSpan: 1,
        },
        {
          content: props.joined_number.branch.toString(),
          rowSpan: 1,
          colSpan: 1,
        },
        {
          content: props.joined_number.county.toString(),
          rowSpan: 1,
          colSpan: 1,
        },
        {
          content: props.joined_number.city.toString(),
          rowSpan: 1,
          colSpan: 1,
        },
        {
          content: props.joined_number.general.toString(),
          rowSpan: 1,
          colSpan: 1,
        },
      ],
    },
    {
      isHeader: true,
      cells: [
        { content: "", rowSpan: 1, style: { width: "91px", height: "24px" } },
        { content: "", rowSpan: 1, style: { width: "146px", height: "24px" } },
        { content: "", rowSpan: 1, style: { width: "90px", height: "24px" } },
        { content: "", rowSpan: 1, style: { width: "90px", height: "24px" } },
        {
          content: props.results.students[0].test_booklet[0]?.name,
          colSpan: 3,
          rowSpan: 1,
        },
        { content: "YDT", rowSpan: 2, style: { width: "90px" } },
        {
          content: "YDT Sıralamaları ",
          rowSpan: 2,
          colSpan: 5,
          style: { width: "446px" },
        },
      ],
    },
    {
      isHeader: true,
      cells: [
        {
          content: "",
          colSpan: 1,
          rowSpan: 1,
          style: { width: "91px", height: "24px" },
        },
        { content: "", colSpan: 1, rowSpan: 1, style: { width: "146px" } },
        { content: "", colSpan: 1, rowSpan: 1, style: { width: "90px" } },
        { content: "", colSpan: 1, rowSpan: 1, style: { width: "90px" } },
        ...props.results.students[0].test_booklet?.flatMap((booklet) =>
          booklet.lessons.map((lesson) => ({
            content: lesson.name,
            colSpan: 3,
            rowSpan: 1,
            style: {
              textAlign: "center" as TextAlign,
              fontSize: "12px",
              fontWeight: "700",
            },
          }))
        ),
      ],
    },
    {
      isHeader: true,
      cells: [
        {
          content: "Sıra No",
          colSpan: 1,
          rowSpan: 1,
          style: { width: "91px", height: "24px" },
        },
        { content: "Adı Soyadı", colSpan: 1, rowSpan: 1 },
        { content: "Sınıf", colSpan: 1, rowSpan: 1, style: { width: "90px" } },
        { content: "TYT", colSpan: 1, rowSpan: 1, style: { width: "90px" } },
        { content: "D", colSpan: 1, rowSpan: 1, style: { width: "90px" } },
        { content: "Y", colSpan: 1, rowSpan: 1, style: { width: "90px" } },
        { content: "N", colSpan: 1, rowSpan: 1, style: { width: "90px" } },
        {
          content: "Puan",
          colSpan: 1,
          rowSpan: 1,
          style: {
            width: "90px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "700",
          },
        },
        {
          content: "Sınıf",
          colSpan: 1,
          rowSpan: 1,
          style: {
            width: "90px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "700",
          },
        },
        {
          content: "Kurum",
          colSpan: 1,
          rowSpan: 1,
          style: {
            width: "90px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "700",
          },
        },
        {
          content: "İlçe",
          colSpan: 1,
          rowSpan: 1,
          style: {
            width: "90px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "700",
          },
        },
        {
          content: "İl",
          colSpan: 1,
          rowSpan: 1,
          style: {
            width: "90px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "700",
          },
        },
        {
          content: "Genel",
          colSpan: 1,
          rowSpan: 1,
          style: {
            width: "90px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "700",
          },
        },
      ],
    },
    {
      isHeader: false,
      cells: [
        {
          content: <span className="text-right px-3">Genel Ortalama</span>,
          colSpan: 3,
          style: {
            backgroundColor: "#9e5cf71a",
            color: "#9e5cf7",
            fontWeight: "bold",
            height: "24px",
            textAlign: "right",
          },
        },
        { content: props.results.general_avarage[0].TYT, colSpan: 1 },
        ...props.results.general_avarage[0].test_booklet?.flatMap((booklet) =>
          booklet.lessons.flatMap((lesson) => [
            {
              content: `${lesson.answer.Doğru}`,
              colSpan: 1,
              style: {
                textAlign: "center" as TextAlign,
                fontSize: "12px",
                fontWeight: "700",
              },
            },
            {
              content: `${lesson.answer.Yanlış}`,
              colSpan: 1,
              style: {
                textAlign: "center" as TextAlign,
                fontSize: "12px",
                fontWeight: "700",
              },
            },
            {
              content: `${lesson.answer.Net}`,
              colSpan: 1,
              style: {
                textAlign: "center" as TextAlign,
                fontSize: "12px",
                fontWeight: "700",
              },
            },
          ])
        ),
        {
          content: ` ${props.results.general_avarage[0].quiz_result.puan}`,
          colSpan: 1,
        },
        {
          content: `${props.results.general_avarage[0].quiz_result.ordered.class}`,
          colSpan: 1,
        },
        {
          content: `${props.results.general_avarage[0].quiz_result.ordered.branch}`,
          colSpan: 1,
        },
        {
          content: `${props.results.general_avarage[0].quiz_result.ordered.county}`,
          colSpan: 1,
        },
        {
          content: `${props.results.general_avarage[0].quiz_result.ordered.city}`,
          colSpan: 1,
        },
        {
          content: `${props.results.general_avarage[0].quiz_result.ordered.general}`,
          colSpan: 1,
        },
      ],
    },
    {
      cells: [
        {
          content: <span className="text-right px-3">Kurum Ortalaması</span>,
          colSpan: 3,
          style: {
            backgroundColor: "#9e5cf71a",
            color: "#9e5cf7",
            fontWeight: "bold",
            height: "24px",
            textAlign: "right",
          },
        },

        { content: props.results.branch_avarage[0].TYT, colSpan: 1 },
        ...props.results.general_avarage[0].test_booklet?.flatMap((booklet) =>
          booklet.lessons.flatMap((lesson) => [
            {
              content: `${lesson.answer.Doğru}`,
              colSpan: 1,
              style: {
                textAlign: "center" as TextAlign,
                fontSize: "12px",
                fontWeight: "700",
              },
            },
            {
              content: `${lesson.answer.Yanlış}`,
              colSpan: 1,
              style: {
                textAlign: "center" as TextAlign,
                fontSize: "12px",
                fontWeight: "700",
              },
            },
            {
              content: `${lesson.answer.Net}`,
              colSpan: 1,
              style: {
                textAlign: "center" as TextAlign,
                fontSize: "12px",
                fontWeight: "700",
              },
            },
          ])
        ),
        {
          content: ` ${props.results.branch_avarage[0].quiz_result.puan}`,
          colSpan: 1,
        },
        {
          content: `${props.results.branch_avarage[0].quiz_result.ordered.class}`,
          colSpan: 1,
        },
        {
          content: `${props.results.branch_avarage[0].quiz_result.ordered.branch}`,
          colSpan: 1,
        },
        {
          content: `${props.results.branch_avarage[0].quiz_result.ordered.county}`,
          colSpan: 1,
        },
        {
          content: `${props.results.branch_avarage[0].quiz_result.ordered.city}`,
          colSpan: 1,
        },
        {
          content: `${props.results.branch_avarage[0].quiz_result.ordered.general}`,
          colSpan: 1,
        },
      ],
    },
    {
      cells: [
        { content: props.results.students[0].ordered, colSpan: 1 },
        {
          content: (
            <div style={{ display: "flex" }}>
              <span>{`${props.results.students[0].first_name} ${props.results.students[0].last_name}`}</span>
            </div>
          ),
          colSpan: 1,
        },
        { content: props.results.students[0].class_name, colSpan: 1 },

        { content: props.results.students[0].TYT, colSpan: 1 },
        ...props.results.general_avarage[0].test_booklet?.flatMap((booklet) =>
          booklet.lessons.flatMap((lesson) => [
            {
              content: `${lesson.answer.Doğru}`,
              colSpan: 1,
              style: {
                textAlign: "center" as TextAlign,
                fontSize: "12px",
                fontWeight: "700",
              },
            },
            {
              content: `${lesson.answer.Yanlış}`,
              colSpan: 1,
              style: {
                textAlign: "center" as TextAlign,
                fontSize: "12px",
                fontWeight: "700",
              },
            },
            {
              content: `${lesson.answer.Net}`,
              colSpan: 1,
              style: {
                textAlign: "center" as TextAlign,
                fontSize: "12px",
                fontWeight: "700",
              },
            },
          ])
        ),
        {
          content: ` ${props.results.students[0].quiz_result.puan}`,
          colSpan: 1,
        },
        {
          content: `${props.results.students[0].quiz_result.ordered.class}`,
          colSpan: 1,
        },
        {
          content: `${props.results.students[0].quiz_result.ordered.branch}`,
          colSpan: 1,
        },
        {
          content: `${props.results.students[0].quiz_result.ordered.county}`,
          colSpan: 1,
        },
        {
          content: `${props.results.students[0].quiz_result.ordered.city}`,
          colSpan: 1,
        },
        {
          content: `${props.results.students[0].quiz_result.ordered.general}`,
          colSpan: 1,
        },
      ],
    },
  ];
}
export default Option19;
