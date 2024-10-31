import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchEntities } from '../../services/api';
import styles from './style.module.css';

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export const EntityDetailPage: React.FC = () => {
  const { entityType, id } = useParams<{ entityType: string, id: string }>();
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [entityData, setEntityData] = useState<any>(null);

  useEffect(() => {
    const loadEntity = async () => {
      try {
        if (entityType && id) {
          const data = await fetchEntities(entityType, 1);
          const entity = data.results.find((item: any) => item.url.includes(id));
          setEntityData(entity);
          reset(entity);
        }
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    };

    loadEntity();
  }, [entityType, id, reset]);

  const onSubmit = (data: any) => {
    setEntityData(data);
    console.log("Saved data:", data);
  };

  if (!entityData) return <p>Loading...</p>;

  return (
    <div className={styles.entityDetailsContainer}>
      <h2 className={styles.title}>{entityData.name} Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.entityForm}>
        {Object.keys(entityData).map((key) => (
          <div key={key} className={styles.formGroup}>
            <label className={styles.formLabel}>{key}</label>
            <Controller
              name={key}
              control={control}
              defaultValue={entityData[key]}
              render={({ field, fieldState }) => (
                <>
                  <input {...field} className={styles.formInput} />
                  {fieldState.error && (
                    <p className={styles.errorText}>{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
        ))}
        <div className={styles.formButtons}>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};