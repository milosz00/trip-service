export interface Trip{
    key?: string;
    name: string;
    country: string;
    startDate: string;
    endDate: string;
    price: number;
    maxPlaces: number;
    description: string;
    photo: string;
    mark: number;
    countVotes: number;
    fullRate: number;
    freePlaces: number;
    bookPlaces: number;
    disableButtonCancel: boolean;
    disableButtonBook: boolean;
    smallAmount: boolean;
    info: string;
    hoverStarState: number;
    canRead: string;
}
