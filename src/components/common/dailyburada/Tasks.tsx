import { Todolist, Todolist1 } from '../data/dashboard/crmdata';

const Tasks = () => (
  <div className="container mt-3">
    <h5 className="mb-3">Notlar ve Yapılması Gerekenler</h5>
    <ul className="list-unstyled">
      {Todolist.map((t) => (
        <li key={t.id} className="mb-2">
          <span className="fw-semibold">{t.title}</span> - {t.description}
        </li>
      ))}
      {Todolist1.map((t) => (
        <li key={t.id} className="mb-2">
          <span className="fw-semibold">{t.title}</span> - {t.description}
        </li>
      ))}
    </ul>
  </div>
);

export default Tasks;
