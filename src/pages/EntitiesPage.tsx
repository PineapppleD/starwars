import { useEffect, useState } from "react";
import { fetchEntities } from "../services/api";
import {Table} from '../components/Table/Table';
import Pagination from '../components/Pagination';
import { useParams } from "react-router-dom";

export const EntitiesPage = () => {
  const { entityType } = useParams<{ entityType: string }>();
  const [entities, setEntities] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadEntities = async () => {
      try {
        if (entityType) {
          const data = await fetchEntities(entityType, page);
          setEntities(data.results);
          setTotalPages(Math.ceil(data.count / 10));
        }
      } catch (error) {
        console.log("Error fetching entities:", error);
      }
    };

    loadEntities();
  }, [entityType, page]);

  return (
    <div>
      <h1>{entityType ? entityType.toUpperCase() : 'Entities'}</h1>
      <Table data={entities} entityType={entityType}/>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
