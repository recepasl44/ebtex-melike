import { AnalysisListType } from "../../../../../../../types/exam/analysisListType.ts";
import { DYNHeader } from "../../../../../../../utils/DYNHeader.tsx";
import { TableRow } from "../multiRowTable/type.ts";

function Option13(props: AnalysisListType): TableRow[] {
    return [
         {
         isHeader: false,
         cells: [
           {  content: "KURUM KODU / İL / İLÇE / KURUM KODU"
             ,colSpan:4, rowSpan:1 ,style: { width: "414px",height: "26px"  } },
           { content: "SINAV ADI", rowSpan: 1, colSpan:4 },
           { content: "", rowSpan: 1, colSpan:1 , style: { width: "90px" } },
           { content: "KATILIM SAYILARI", colSpan: 1,rowSpan:2 ,style: { width: "90",textWrap:"wrap"  } },    { content: "SINIF", rowSpan: 1,colSpan:1 , style: { width: "90px" ,height:26} },
           { content: "KURUM", rowSpan: 1,colSpan:1 , style: { width: "90px" ,height:26} },
           { content: "İLÇE", rowSpan: 1,colSpan:1 , style: { width: "90px" ,height:26} },
           { content: "İL", rowSpan: 1,colSpan:1 , style: { width: "90px" ,height:26} },
           { content: "GENEL", rowSpan: 1,colSpan:1 , style: { width: "90px" ,height:26} },
         ],
       },
       {
         isHeader: false,
         cells: [
           {  content: `${props.platform.post_code} / ${props.platform.city} / ${props.platform.county} / ${props.platform.name}`,
             colSpan: 4,  rowSpan: 1,   style: { width: "414px", height: "26px" },
           },
           {   content: props.quiz,   rowSpan: 1,   colSpan: 4,   style: { height: "26px" }, },
           { content: "", rowSpan: 1, colSpan:1 , style: { width: "90px" } },
           {   content: props.joined_number.class.toString(),  colSpan: 1,   rowSpan: 1,},
           {   content: props.joined_number.branch.toString(),   rowSpan: 1,  colSpan: 1, },
           {   content: props.joined_number.county.toString(), rowSpan: 1,     colSpan: 1  },
           {   content: props.joined_number.city.toString(),   rowSpan: 1,    colSpan: 1,  },
           {   content: props.joined_number.general.toString(),   rowSpan: 1,   colSpan: 1,  },
         ],
       },
         {
         isHeader: true,
         cells: [
           { content: "", rowSpan: 1, style: { width: "91px", height: "24px" } },
           { content: "", rowSpan: 1, style: { width: "146px", height: "24px" } },
           { content: "", rowSpan: 1, style: { width: "90px", height: "24px" } },
           {
             content: props.results.students[0].test_booklet[0]?.name,
             colSpan: props.results.students[0].test_booklet[0]?.lessons.length,
             rowSpan: 1,
             style: { width: `${props.results.students[0].test_booklet[0]?.lessons.length * 90}px`, height: "24px" },
           },
           {
             content: props.results.students[0].test_booklet[1]?.name,
             colSpan: props.results.students[0].test_booklet[1]?.lessons.length,
             rowSpan: 1,
             style: { width: `${props.results.students[0].test_booklet[1]?.lessons.length * 90}px`, height: "24px" },
           },
           { content: props.results.students[0].test_booklet[2]?.name,
             colSpan: props.results.students[0].test_booklet[2]?.lessons.length,
             rowSpan: 1,
             style: { width: `${props.results.students[0].test_booklet[2]?.lessons.length * 90}px`, height: "24px" },
           },
           { content: props.results.students[0].test_booklet[3]?.name,
             colSpan: props.results.students[0].test_booklet[3]?.lessons.length,
             rowSpan: 1,
             style: { width: `${props.results.students[0].test_booklet[3]?.lessons.length * 90}px`, height: "24px" },
           },
           { content: "Toplam", rowSpan: 2, style: { width: "90px" } },
           { content: "TYT", colSpan: 2, rowSpan: 2, style: { width: "90px" } },
         ],
       },
        {
         isHeader: true,
         cells: [
           { content: "", colSpan: 1, rowSpan: 1, style: { width: "91px", height: "24px" } },
           { content: "", colSpan: 1, rowSpan: 1, style: { width: "146px" } },
           { content: "", colSpan: 1, rowSpan: 1, style: { width: "90px" } },
           ...props.results.students[0].test_booklet?.flatMap((booklet) =>
             booklet.lessons.map((lesson) => ({
               content: lesson.name,
               colSpan: 1,
               rowSpan: 1,
               style: {
                 width: "90px",
                 textAlign: "center"  as any,
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
           { content: "Sıra No",colSpan:1 ,  rowSpan: 1,  style: { width: "91px", height: "24px" } },
           { content: "Adı Soyadı", colSpan:1 ,rowSpan: 1 },
           { content: "Sınıf",colSpan:1 , rowSpan: 1, style: { width: "90px" } },
           { content: <DYNHeader /> },
           { content: <DYNHeader /> },
           { content: <DYNHeader /> },
           { content: <DYNHeader /> },
           { content: <DYNHeader /> },
           { content: <DYNHeader /> },
           { content: <DYNHeader /> },
           { content: <DYNHeader /> },
           { content: <DYNHeader /> },
           { content: <DYNHeader /> },
           { content: "Puan" , colSpan: 1, rowSpan: 1 },
           { content: "Genel" , colSpan: 1, rowSpan: 1 },
           ],
           },
           {
         isHeader: false,
         cells: [
           {
             content: (
               <span className="text-right px-3">
                 Genel Ortalama
               </span>
             ),
             colSpan: 3,
             style: {
                 backgroundColor: "#9e5cf71a",
                 color: "#9e5cf7",
               fontWeight: "bold",
               height: "24px",
               textAlign: "right",
             },
           },

           ...props.results.general_avarage[0].test_booklet?.flatMap((booklet) =>
             booklet.lessons.map((lesson) => ({
               content: (
                 <div
                   style={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     fontSize: "12px",
                     fontWeight: "700",
                     padding: "0 5px",
                   }}
                 >
                   <span>{`${lesson.answer.Doğru}`}</span>
                   <span>{`${lesson.answer.Yanlış}`}</span>
                   <span>{`${lesson.answer.Net}`}</span>
                 </div>
               ),
               colSpan: 1,
             }))
           ),
           {
             content: (
               <div
                 style={{
                   display: "flex",
                   justifyContent: "space-between",
                   alignItems: "center",
                   fontSize: "12px",
                   fontWeight: "700",
                   padding: "0 5px",
                 }}
               >
                 <span>{`${props.results.general_avarage[0].quiz_result.total.D}`}</span>
                 <span>{`${props.results.general_avarage[0].quiz_result.total.Y}`}</span>
                 <span>{`${props.results.general_avarage[0].quiz_result.total.N}`}</span>
               </div>
             ),
             colSpan: 1,
           },
           { content: ` ${props.results.general_avarage[0].quiz_result.puan}`, colSpan: 1 },
           { content: `${props.results.general_avarage[0].quiz_result.ordered.general}`, colSpan: 1 },
         ],
       },
             {
             cells: [
               {
                 content: (
                   <span className="text-right px-3">
                     Kurum Ortalaması
                   </span>
                 ),
                 colSpan: 3,
                 style: {
                     backgroundColor: "#9e5cf71a",
                     color: "#9e5cf7",
                   fontWeight: "bold",
                   height: "24px",
                   textAlign: "right",
                 },
               },
               ...props.results.branch_avarage[0].test_booklet?.flatMap((booklet) =>
                 booklet.lessons.map((lesson) => ({
                   content: (
                     <div
                       style={{
                         display: "flex",
                         justifyContent: "space-between",
                         alignItems: "center",
                         fontSize: "12px",
                         fontWeight: "700",
                         padding: "0 5px",
                       }}
                     >
                       <span>{`${lesson.answer.Doğru}`}</span>
                       <span>{`${lesson.answer.Yanlış}`}</span>
                       <span>{`${lesson.answer.Net}`}</span>
                     </div>
                   ),
                   colSpan: 1,
                 }))
               ),
               {
                 content: (
                   <div
                     style={{
                       display: "flex",
                       justifyContent: "space-between",
                       alignItems: "center",
                       fontSize: "12px",
                       fontWeight: "700",
                       padding: "0 5px",
                     }}
                   >
                     <span>{`${props.results.branch_avarage[0].quiz_result.total.D}`}</span>
                     <span>{`${props.results.branch_avarage[0].quiz_result.total.Y}`}</span>
                     <span>{`${props.results.branch_avarage[0].quiz_result.total.N}`}</span>
                   </div>
                 ),
                 colSpan: 1,
               },
               { content: ` ${props.results.branch_avarage[0].quiz_result.puan}`, colSpan: 1 },
               { content: `${props.results.branch_avarage[0].quiz_result.general}`, colSpan: 1 },
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
           ...props.results.branch_avarage[0].test_booklet?.flatMap((booklet) =>
             booklet.lessons.map((lesson) => ({
               content: (
                 <div
                   style={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     fontSize: "12px",
                     fontWeight: "700",
                     padding: "0 5px",
                   }}
                 >
                   <span>{`${lesson.answer.Doğru}`}</span>
                   <span>{`${lesson.answer.Yanlış}`}</span>
                   <span>{`${lesson.answer.Net}`}</span>
                 </div>
               ),
               colSpan: 1,
             }))
           ),
           {
             content: (
               <div
                 style={{
                   display: "flex",
                   justifyContent: "space-between",
                   alignItems: "center",
                   fontSize: "12px",
                   fontWeight: "700",
                   padding: "0 5px",
                 }}
               >
                 <span>{`${props.results.students[0].quiz_result.total.D}`}</span>
                 <span>{`${props.results.students[0].quiz_result.total.Y}`}</span>
                 <span>{`${props.results.students[0].quiz_result.total.N}`}</span>
               </div>
             ),  colSpan: 1, },
           {  content: `${props.results.students[0].quiz_result.puan}`, colSpan: 1,},
           {  content: `${props.results.students[0].quiz_result.general}`, colSpan: 1},
         ],
       },
       ];
    }
    export default Option13;
