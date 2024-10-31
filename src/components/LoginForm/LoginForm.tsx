import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/authReducer";
import styles from './style.module.css';

interface FormData {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (data.username === "admin" && data.password === "password") {
      dispatch(loginAction());
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles.formContainer}>
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <div className={styles.formGroup}>
        <input {...register('username')} placeholder="Username" className={styles.formInput} />
        {errors.username && <p className={styles.errorText}>{errors.username.message}</p>}
      </div>
      <div className={styles.formGroup}>
        <input type="password" {...register('password')} placeholder="Password" className={styles.formInput} />
        {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
      </div>
      <button type="submit" className={styles.submitButton}>Login</button>
    </form>
    </div>
  );
};

export default LoginForm;