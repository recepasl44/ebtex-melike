import { Link } from "react-router-dom"
import face2 from "../../../../assets/images/faces/2.jpg"
import face8 from "../../../../assets/images/faces/8.jpg"
import face4 from "../../../../assets/images/faces/4.jpg"
import face3 from "../../../../assets/images/faces/3.jpg"
import face6 from "../../../../assets/images/faces/6.jpg"
import face1 from "../../../../assets/images/faces/1.jpg"
import face11 from "../../../../assets/images/faces/11.jpg"
import face15 from "../../../../assets/images/faces/15.jpg"
import face16 from "../../../../assets/images/faces/16.jpg"
import face10 from "../../../../assets/images/faces/10.jpg"
import face13 from "../../../../assets/images/faces/13.jpg"
import face12 from "../../../../assets/images/faces/12.jpg"
import face14 from "../../../../assets/images/faces/14.jpg"
import face5 from "../../../../assets/images/faces/5.jpg"

interface table1 {
    id: number
    src: string
    name: string
    mail: string
    color: string
    class: string
    class1: string
    text: string
}
export const Table1data: table1[] = [
    { id: 1, src: face13, name: "Sukuro Kim", mail: "kimosukuro@gmail.com", color: "success-transparent ", class: "", text: "Active", class1: "online" },
    { id: 2, src: face6, name: "Hasimna", mail: "hasimna2132@gmail.com", color: "light", class: "text-default", text: "Inactive", class1: "offline" },
    { id: 3, src: face15, name: "Azimo Khan", mail: "azimokhan421@gmail.com", color: "success-transparent ", class: "", text: "Active", class1: "online" },
    { id: 4, src: face5, name: "Samantha Julia", mail: "	julianasams143@gmail.com", color: "success-transparent ", class: "", text: "Active", class1: "online" }
];

interface table2 {
    id: number
    order: string
    name: string
    date: string
}
export const Table2data: table2[] = [
    { id: 1, order: "2024R-01", date: "27-010-2024", name: "Moracco" },
    { id: 2, order: "2024R-02", date: "28-10-2024", name: "Thornton" },
    { id: 3, order: "2024R-03", date: "22-10-2024", name: "Larry Bird" },
    { id: 4, order: "2024R-04", date: "29-09-2024", name: "Erica Sean" }
];

interface table3 {
    id: number
    text1: string
    text2: string
    text3: string
}
export const Table3data: table3[] = [
    { id: 1, text1: "Mark", text2: "Otto", text3: "@mdo" },
    { id: 2, text1: "Jacob", text2: "Thornton", text3: "@fat" },
    { id: 3, text1: "Larry the Bird", text2: "Thornton", text3: "@twitter" }
];
interface table4 {
    id: number
    src: string
    order: string
    date: string
    name: string
}
export const Table4data: table4[] = [
    { id: 1, src: face3, order: "#0007", date: "26-04-2024", name: "Mayor Kelly", },
    { id: 2, src: face6, order: "#0008", date: "15-02-2024", name: "Wicky Kross", },
    { id: 3, src: face1, order: "#0009", date: "23-05-2024", name: "Julia Cam", }
];

export const Table5data: table4[] = [
    { id: 1, src: face10, order: "#0011", date: "07-01-2024", name: "Helsenky", },
    { id: 2, src: face14, order: "#0012", date: "18-05-2024", name: "Brodus", },
    { id: 3, src: face12, order: "#0013", date: "19-03-2024", name: "Chikka Alen", }
];

export const Table6data: table4[] = [
    { id: 1, src: face13, order: "#0014", date: "21-02-2024", name: "Sukuro Kim", },
    { id: 2, src: face11, order: "#0018", date: "26-03-2024", name: "Alex Carey", },
    { id: 3, src: face2, order: "#0020", date: "14-03-2024", name: "Pamila Anderson", }
];
interface table5 {
    id: number
    text: string
    date: string
    name: string
}
export const Table7data: table5[] = [
    { id: 1, name: "Harshrath", date: "24 May 2024", text: "	#5182-3467" },
    { id: 2, name: "Zozo Hadid", date: "02 July 2024", text: "#5182-3412" },
    { id: 3, name: "Martiana", date: "15 April 2024", text: "#5182-3423" },
    { id: 4, name: "Alex Carey", date: "17 March 2024", text: "#5182-3456" }
];
interface table6 {
    id: number
    text: string
    date: string
    name: string
    btn: string
    color: string
}
export const Table8data: table6[] = [
    { id: 1, name: "Harshrath", date: "24 May 2024", text: "	#5182-3467", btn: "Pending", color: "primary-light" },
    { id: 2, name: "Zozo Hadid", date: "02 July 2024", text: "#5182-3412", btn: "Pending", color: "primary-light" },
    { id: 3, name: "Martiana", date: "15 April 2024", text: "#5182-3423", btn: "Rejected", color: "danger-light" },
    { id: 4, name: "Alex Carey", date: "17 March 2024", text: "#5182-3456", btn: "Processed", color: "success-light" }
];
interface table7 {
    id: string
    text: string
    date: string
    name: string
    class: string
    checked: string
}
export const Table9data: table7[] = [
    { id: "1", name: "Zelensky", date: "25-Apr-2021", text: "Paid", class: "success-transparent", checked: 'defaultChecked', },
    { id: "2", name: "Kim Jong", date: "29-April-2024", text: "Pending", class: "danger-transparent", checked: '', },
    { id: "3", name: "Obana", date: "30-Nov-2024", text: "Paid", class: "success-transparent", checked: '', },
    { id: "4", name: "Sean Paul", date: "01-Jan-2024", text: "Paid", class: "success-transparent", checked: '', },
    { id: "5", name: "Karizma", date: "14-Feb-2024", text: "Pending", class: "danger-transparent", checked: '', }
];

interface table8 {
    id: number
    text1: string
    text2: string
    text3: string
    text4: string
}
export const Table10data: table8[] = [
    { id: 1, text1: "01", text2: "Manchester", text3: "232%", text4: "42%" },
    { id: 2, text1: "02", text2: "Barcelona", text3: "175%", text4: "58%" },
    { id: 3, text1: "03", text2: "Portugal", text3: "126%", text4: "32%" }
];

interface table9 {
    id: number
    text: string
    color: string
    quantity: string
    price: string
    class1: string
    class2: string
    name: string
    bgcolor: string
}
export const Table11data: table9[] = [
    { id: 1, text: "Default", color: "primary-transparent", quantity: "22", price: "$2,012", class1: "", class2: "", name: "Rita Book", bgcolor: "" },
    { id: 2, text: "Primary", color: "primary", quantity: "22", price: "$4,254", class1: "table-primary", class2: "", name: "Rhoda Report", bgcolor: "table-primary" },
    { id: 3, text: "Secondary", color: "secondary", quantity: "26", price: "$1,234", class1: "table-secondary", class2: "", name: "Rita Book", bgcolor: "table-secondary" },
    { id: 4, text: "Success", color: "success", quantity: "42", price: "$2,623", class1: "table-success", class2: "", name: "Anne Teak", bgcolor: "table-success" },
    { id: 5, text: "Danger", color: "danger", quantity: "52", price: "$32,132", class1: "table-danger", class2: "", name: "Dee End", bgcolor: "table-danger" },
    { id: 6, text: "Warning", color: "warning", quantity: "10", price: "$1,434", class1: "table-warning", class2: "", name: "Lee Nonmi", bgcolor: "table-warning" },
    { id: 7, text: "Info", color: "info", quantity: "63", price: "$1,854", class1: "table-info", class2: "", name: "Lynne Gwistic", bgcolor: "table-info" },
    { id: 8, text: "Light", color: "light", quantity: "05", price: "$823", class1: "table-light", class2: "text-default", name: "Fran Tick", bgcolor: "table-light" },
    { id: 9, text: "Dark", color: "dark", quantity: "35", price: "$1,832", class1: "table-dark", class2: "text-light", name: "Polly Pipe", bgcolor: "table-dark" }
];
interface table10 {
    id: number
    text1: string
    text2: string
    text3: string
    text4: string
    class1: string
    class2: string
    code1: string
    code2: string
}

export const Table12data: table10[] = [
    { id: 1, text1: "This cell inherits", text2: " from the table", text3: "This cell inherits ", text4: "from the table", class1: "", class2: "", code1: "vertical-align: middle;", code2: "vertical-align: middle;" },
    { id: 2, text1: "This cell inherits", text2: "from the table row", text3: "This cell inherits ", text4: "from the table row", class1: "align-bottom", class2: "", code1: "vertical-align: bottom;", code2: "vertical-align: bottom;" },
    { id: 3, text1: "This cell inherits", text2: " from the table", text3: "This cell is aligned to the top.", text4: "", class1: "", class2: "align-top", code1: "vertical-align: middle;", code2: "" },

];
interface table11 {
    id: number
    src: string
    name: string
    mail: string
    date: string
    text1: string
    text2: string
    color: string
    class: string
    icon: string
}
export const Table13data: table11[] = [
    { id: 1, src: face15, name: "Mark Cruise", mail: "markcruise24@gmail.com", date: "Jul 26,2024", text1: "IN-2032", text2: "Paid", color: "success-transparent", class: "", icon: "check-fill" },
    { id: 2, src: face12, name: "Charanjeep", mail: "charanjeep@gmail.in", date: "Mar 14,2024", text1: "IN-2024", text2: "Paid", color: "success-transparent", class: "", icon: "check-fill" },
    { id: 3, src: face5, name: "Samantha Julie", mail: "julie453@gmail.com", date: "Feb 1,2024", text1: "IN-2014", text2: "Cancelled", color: "danger-transparent", class: "", icon: "close-fill" },
    { id: 4, src: face11, name: "Simon Cohen", mail: "simon@gmail.com", date: "Apr 24,2024", text1: "IN-2036", text2: "	Refunded", color: "light", class: "text-default", icon: "reply-line" }
];

interface Basic {
    id: number;
    name: string;
    date: string;
    number: string;
    status: string;
    color: string;
}
export const Basictable: Basic[] = [
    { id: 1, name: "Mark", date: "21,Dec 2023", number: "+1234-12340", status: "Completed", color: "primary" },
    { id: 2, name: "Monika", date: "29,April 2023", number: "+1523-12459", status: "Failed", color: "secondary" },
    { id: 3, name: "Madina", date: "30,Nov 2023", number: "+1982-16234", status: "Successful", color: "success" },
    { id: 4, name: "Bhamako", date: "18,Mar 2023", number: "+1526-10729", status: "Pending", color: "warning" },
]

interface Border {
    id: number;
    name: string;
    transactionid: string;
    date: string;
    status: string;
    color: string;
}
export const Borderdata: Border[] = [
    { id: 1, name: "Harshrath", transactionid: "#5182-3467", date: "24 May 2024", status: "Fixed", color: "primary" },
    { id: 2, name: "Zozo Hadid", transactionid: "#5182-3412", date: "02 July 2024", status: "In Progress", color: "warning" },
    { id: 3, name: "Martiana", transactionid: "#5182-3423", date: "15 April 2024", status: "Completed", color: "success" },
    { id: 4, name: "Alex Carey", transactionid: "#5182-3456", date: "17 March 2024", status: "Pending", color: "danger" },
]

interface Group {
    id: number;
    product: string;
    seller: string;
    percent: string;
    sold: string;
    icon: string;
    color: string;
}
export const Groupdata: Group[] = [
    { id: 1, product: "Smart Watch", seller: "Slowtrack.inc", percent: "	24.23%", sold: "250/1786", icon: "up", color: "success" },
    { id: 2, product: "White Sneakers", seller: "American & Co.inc", percent: "12.45%", sold: "123/985", icon: "down", color: "danger" },
    { id: 3, product: "Baseball Bat", seller: "Sports Company", percent: "06.64%", sold: "124/232", icon: "up", color: "success" },
    { id: 4, product: "Black Hoodie", seller: "Renonds Fabrics", percent: "14.42%", sold: "192/2456", icon: "up", color: "success" },
]

const avatar1 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face2} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face8} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face2} alt="img" />
    </span>
    <Link className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded" to="#!">+5</Link>
</div>

const avatar2 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face4} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face6} alt="img" />
    </span>
    <Link className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded" to="#!">+6</Link>
</div>

const avatar3 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face1} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face11} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face15} alt="img" />
    </span>
    <Link className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded" to="#!">+2</Link>
</div>

const avatar4 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face4} alt="img" />
    </span>
    <span className="avatar avatar-sm avatar-rounded">
        <img src={face6} alt="img" />
    </span>
    <Link className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded" to="#!">+5</Link>
</div>
export const Hoverabledata = [
    { id: 1, product: "Joanna Smith", src: face10, mail: "joannasmith14@gmail.com", category: "Fashion", color: "primary", team: avatar1, status: 52 },
    { id: 2, product: "Kara Kova", src: face2, mail: "milesakara@gmail.com", category: "Clothing", color: "warning", team: avatar2, status: 40 },
    { id: 3, product: "Donald Trimb", src: face16, mail: "donaldo21@gmail.com", category: "Electronics", color: "dark", team: avatar3, status: 17 },
    { id: 4, product: "Justin Gaethje", src: face13, mail: "justingae@gmail.com", category: "Sports", color: "danger", team: avatar4, status: 72 },
]

interface Caption {
    id: number;
    country: string;
    won: string;
    athletes: string;
}
export const Captiondata: Caption[] = [
    { id: 1, country: "United States", won: "2012", athletes: "1823" },
    { id: 2, country: "United Kingdom", won: "1012", athletes: "992" },
    { id: 3, country: "Germany", won: "914", athletes: "875" },
]

interface Topcaption {
    id: number;
    name: string;
    revenue: string;
    country: string;
}
export const Topcaptuiondata: Topcaption[] = [
    { id: 1, name: "Microsoft", revenue: "$170 billion", country: "United States" },
    { id: 2, name: "HP", revenue: "$72 billion", country: "United States" },
    { id: 3, name: "IBM", revenue: "$60 billion", country: "United States" },
]

interface Active {
    id: number;
    name: string;
    create: string;
    number: string;
    status: string;
    color: string;
    class: string;
    tdclass: string;
}
export const Activedata: Active[] = [
    { id: 1, name: 'Mark', create: "21,Dec 2021", number: "+1234-12340", status: "Completed", color: "primary", class: "table-active", tdclass: '' },
    { id: 2, name: 'Monika', create: "29,April 2024", number: "+1523-12459", status: "Failed", color: "warning", class: "", tdclass: '' },
    { id: 3, name: 'Madina', create: "30,Nov 2024", number: "+1982-16234", status: "Successful", color: "success", class: "", tdclass: 'table-active' },
    { id: 4, name: 'Bhamako', create: "18,Mar 2024", number: "+1526-10729", status: "Pending", color: "secondary", class: "", tdclass: '' },
]

const Avatar = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded"><img src={face2} alt="img" /></span>
    <span className="avatar avatar-sm avatar-rounded"><img src={face8} alt="img" /></span>
    <span className="avatar avatar-sm avatar-rounded"><img src={face2} alt="img" /></span>
    <Link className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded" to="#!">+4</Link>
</div>

const Avatar1 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded"><img src={face1} alt="img" /></span>
    <span className="avatar avatar-sm avatar-rounded"><img src={face5} alt="img" /></span>
    <span className="avatar avatar-sm avatar-rounded"><img src={face11} alt="img" /></span>
    <span className="avatar avatar-sm avatar-rounded"><img src={face15} alt="img" /></span>
    <Link className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded" to="#!">+4</Link></div>

const Avatar2 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded"><img src={face6} alt="img" /></span>
    <span className="avatar avatar-sm avatar-rounded"><img src={face16} alt="img" /></span>
    <Link className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded" to="#!">+10</Link>
</div>

const Avatar3 = <div className="avatar-list-stacked">
    <span className="avatar avatar-sm avatar-rounded"><img src={face3} alt="img" /></span>
    <span className="avatar avatar-sm avatar-rounded"><img src={face10} alt="img" /></span>
    <span className="avatar avatar-sm avatar-rounded"><img src={face14} alt="img" /></span>
    <Link className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded" to="#!">+6</Link>
</div>

export const Responsivedata = [
    { id: 1, src: face3, name: "Mayor Kelly", category: "Manufacturer", role: "Team Lead", color: "primary", team: Avatar, progress: 52, revenue: "$10,984.29", mail: "mayorkrlly@gmail.com" },
    { id: 2, src: face12, name: "Andrew Garfield", category: "Managing Director", role: "Director", color: "warning", team: Avatar1, progress: 91, revenue: "$1.4billion", mail: "andrewgarfield@gmail.com" },
    { id: 3, src: face14, name: "Simon Cowel", category: "Service Manager", role: "Manager", color: "success", team: Avatar2, progress: 45, revenue: "$7,123.21", mail: "simoncowel234@gmail.com" },
    { id: 4, src: face5, name: "Mirinda Hers", category: "Recruiter", role: "Employee", color: "danger", team: Avatar3, progress: 21, revenue: "$2,325.45", mail: "mirindahers@gmail.com" },
]