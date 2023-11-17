import { useMemo, useState } from "react";
import { DataGridRowTypes, SearchInitialStateTypes } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchMediaAsync, setIndexRedux } from "../../store/slices/searchSlice";
import { useNavigate } from "react-router-dom";
import { constants } from "../../assets/constants";
import { Autocomplete, Button, Box, Container, TextField, Typography } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import no_preview from "../../assets/images/no-preview.png";
import styles from "./search.module.scss";

const searchInitialState: SearchInitialStateTypes = {
    search: "",
    yearStart: "",
    yearEnd: "",
};

const dataGridColumns = [
    {
        field: "thumbnail",
        headerName: "Thumbnail",
        width: 180,
        renderCell: (params: { row: { thumbnail: string } }) => (
            <img src={params.row.thumbnail || no_preview} alt="Image" style={{ width: "90%", objectFit: "cover" }} />
        ),
    },
    {
        field: "title",
        headerName: "Title",
        width: 180,
    },
    {
        field: "location",
        headerName: "Location",
        width: 180,
    },
    {
        field: "photographer",
        headerName: "Photographer",
        width: 180,
    },
];

const Search = () => {
    const dispatch = useAppDispatch();
    const { searchResult, error } = useAppSelector((state) => state.search);

    const navigate = useNavigate();
    const { paths } = constants;
    const [searchState, setSearchState] = useState(searchInitialState);

    const years: string[] = useMemo(() => Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, index) => (1970 + index).toString()), []);
    const dataGridRows = useMemo(() => {
        const newRows: DataGridRowTypes[] = [];
        searchResult.forEach((item, index) => {
            const src = item.links?.find((item) => item.href.endsWith(".jpg"));
            newRows.push({
                id: index,
                thumbnail: src?.href || "",
                title: item.data[0].title,
                location: item.data[0].location,
                photographer: item.data[0].photographer,
            });
        });
        return newRows;
    }, [searchResult]);

    const changeSearchState = (type: string, value: string) => {
        setSearchState({ ...searchState, [type]: value });
    };
    const changeYearFromInput = (type: string, value: string) => {
        if (years.includes(value)) {
            setSearchState({ ...searchState, [type]: value });
        }
    };
    const getSearchResult = () => {
        if (searchState.search.length) {
            dispatch(searchMediaAsync({ search: searchState.search, yearStart: searchState.yearStart, yearEnd: searchState.yearEnd }));
        }
        setSearchState(searchInitialState);
    };
    const goToShowPage = (params: GridRowParams) => {
        navigate(paths.show);
        dispatch(setIndexRedux({ index: params.id }));
    };

    return (
        <Container className={styles.search_wrapper}>
            <Typography className={styles.page_title}>NASA MEDIA GALLERY</Typography>
            <div className={styles.search_filter}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={["", ...years]}
                    className={styles.year_filter}
                    value={searchState.yearStart}
                    onChange={(e, value) => changeSearchState("yearStart", value || "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Year start ..."
                            size="small"
                            onChange={(e) => changeYearFromInput("yearStart", e.target.value)}
                        />
                    )}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={["", ...years]}
                    value={searchState.yearEnd}
                    className={styles.year_filter}
                    onChange={(e, value) => {
                        changeSearchState("yearEnd", value || "");
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Year end ..."
                            size="small"
                            onChange={(e) => changeYearFromInput("yearEnd", e.target.value)}
                        />
                    )}
                />
            </div>
            <div className={styles.search_input_btn_wrapper}>
                <TextField
                    variant="outlined"
                    value={searchState.search}
                    onChange={(e) => changeSearchState("search", e.target.value)}
                    className={styles.search_input}
                    size="small"
                    autoComplete="off"
                    InputProps={{
                        style: {
                            borderRadius: "50px",
                        },
                    }}
                    label="Search Here..."
                    onKeyDown={(e) => e.key === "Enter" && getSearchResult()}
                />
                <Button variant="contained" onClick={getSearchResult}>
                    Search
                </Button>
            </div>
            {searchResult.length ? (
                <Box sx={{ width: "100%" }}>
                    <DataGrid
                        rows={dataGridRows}
                        columns={dataGridColumns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        getRowHeight={() => 100}
                        onRowClick={goToShowPage}
                    />
                </Box>
            ) : (
                <></>
            )}
            {error && <div className={styles.nothing_found}>{error}</div>}
        </Container>
    );
};

export default Search;
