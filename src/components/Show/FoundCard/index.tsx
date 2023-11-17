import { useEffect } from "react";
import { Card, CardContent, Typography, Chip, Grid } from "@mui/material";
import { searchImagesAsync } from "../../../store/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styles from "./found_card.module.scss";

const FoundCard = () => {
    const dispatch = useAppDispatch();
    const { searchResult, images, findIndex } = useAppSelector((state) => state.search);
    const neededImage = images.find((item) => item.includes("medium"));
    const neededItem = searchResult[findIndex]?.data[0];

    useEffect(() => {
        searchResult.length && dispatch(searchImagesAsync({ href: searchResult[findIndex].href }));
    }, []);
    return (
        <Card>
            <Grid container spacing={2}>
                {neededImage && (
                    <Grid item xs={12}>
                        <img src={neededImage} alt="Preview" className={styles.preview_image} />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <CardContent>
                        {neededItem.title && (
                            <Typography variant="h5" component="div" gutterBottom>
                                {neededItem.title}
                            </Typography>
                        )}
                        {neededItem.description && (
                            <Typography variant="body1" color="textSecondary" paragraph>
                                {neededItem.description}
                            </Typography>
                        )}
                        {neededItem.photographer && (
                            <Typography variant="subtitle2" color="textSecondary" className={styles.info_wrapper}>
                                <span className={styles.title}>Photographer:</span>
                                {neededItem.photographer}
                            </Typography>
                        )}
                        {neededItem.location && (
                            <Typography variant="subtitle2" color="textSecondary" className={styles.info_wrapper}>
                                <span className={styles.title}>Location:</span>
                                {neededItem.location}
                            </Typography>
                        )}
                        {neededItem.keywords && neededItem.keywords.length > 0 && (
                            <Typography variant="subtitle2" color="textSecondary" className={styles.info_wrapper}>
                                <span className={styles.title}>Keywords:</span>
                                <div className={styles.keywords_wrapper}>
                                    {neededItem.keywords.map((keyword) => (
                                        <Chip key={keyword} label={keyword} color="primary" size="small" className={styles.keyword} />
                                    ))}
                                </div>
                            </Typography>
                        )}
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default FoundCard;
