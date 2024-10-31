import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface TableProps {
  data: Array<any>;
  entityType: string;
}

export const Table: React.FC<TableProps> = ({ data, entityType }) => {
  const navigate = useNavigate();

  if (data.length === 0) return <p>No data available</p>;

  const displayColumns = Object.keys(data[0]).slice(0, 3);

  const handleRowClick = (id: string) => {
    navigate(`/entities/${entityType}/${id}`);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {displayColumns.map((col) => (
            <th key={col} className={styles.tableHeader}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={styles.tableRow}
            onClick={() => handleRowClick(item.url.split("/").slice(-2, -1)[0])}
          >
            {displayColumns.map((col) => (
              <td key={col} className={styles.tableData}>
                {item[col]}
              </td>
            ))}
            {/* <td className={styles.tableData}>
              <button
                className={styles.detailsButton}
                onClick={() =>
                  handleRowClick(item.url.split("/").slice(-2, -1)[0])
                }
              >
                Details
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
