export interface ConstantsTypes {
    endpoints: {
        search: "/search";
    };
    paths: {
        search: "/";
        show: "/show";
    };
}

export interface RouteTypes {
    id: string;
    path: string;
    element: JSX.Element;
}

export interface SearchMediaAsyncTypes {
    search: string;
    yearStart?: string;
    yearEnd?: string;
}

export type SearchInitialStateTypes = Required<SearchMediaAsyncTypes>;

export interface SearchImagesAsyncTypes {
    href: string;
}

export interface SearchInitialStateReduxTypes {
    searchLoading: boolean;
    searchResult: {
        data: {
            location: string;
            photographer: string;
            title: string;
            description: string;
            keywords: string[];
            date_created: string;
        }[];
        href: string;
        links: {
            href: string;
        }[];
    }[];
    images: string[];
    findIndex: number;
    error: string;
}

export interface DataGridRowTypes {
    id: number;
    thumbnail: string;
    title: string;
    location: string;
    photographer: string;
}
