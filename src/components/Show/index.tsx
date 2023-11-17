import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { constants } from "../../assets/constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetImagesRedux, searchImagesAsync } from "../../store/slices/searchSlice";
import FoundCard from "./FoundCard";
import styles from "./show.module.scss";

const Show = () => {
    const dispatch = useAppDispatch();
    const { searchResult, findIndex } = useAppSelector((state) => state.search);
    const navigate = useNavigate();
    const { paths } = constants;

    const backToSearchPage = () => {
        navigate(paths.search);
        dispatch(resetImagesRedux());
    };
    useEffect(() => {
        searchResult.length && dispatch(searchImagesAsync({ href: searchResult[findIndex].href }));
    }, []);
    return (
        <div className={styles.show_wrapper}>
            <Button variant="contained" onClick={backToSearchPage} className={styles.back_btn}>
                Back
            </Button>
            {searchResult.length ? (
                <FoundCard />
            ) : (
                <Typography className={styles.nothing_found}>Sorry. Nothing found! Please go back to search page and search what you need</Typography>
            )}
        </div>
    );
};

export default Show;
