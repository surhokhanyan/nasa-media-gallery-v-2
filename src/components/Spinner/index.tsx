import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../../store/hooks";
import styles from "./spinner.module.scss";

const Spinner = () => {
    const { searchLoading } = useAppSelector((state) => state.search);
    if (!searchLoading) return <></>;
    return (
        <div className={styles.spinner}>
            <CircularProgress size={80} />
        </div>
    );
};

export default Spinner;
