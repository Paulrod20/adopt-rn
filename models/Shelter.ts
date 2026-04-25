
export interface Shelter { 
    id: string;
    name: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    address: string;
    phone: string;
}

// Mock data before hitting the real API
export const mockShelters: Shelter[] = [
    {
        id: "1",
        name: "Charlotte Animal Care",
        city: "Charlotte",
        state: "NC",
        latitude: 35.2271,
        longitude: -80.8431,
        address: "8315 Byrum Dr, Charlotte, NC",
        phone: "704-336-3786",
    },
    {
        id: "2",
        name: "Humane Society of Charlotte",
        city: "Charlotte",
        state: "NC",
        latitude: 35.2085,
        longitude: -80.8303,
        address: "2700 Toomey Ave, Charlotte, NC",
        phone: "704-333-4130",
    },
    {
        id: "3",
        name: "Cabarrus Animal Shelter",
        city: "Concord",
        state: "NC",
        latitude: 35.3885,
        longitude: -80.5493,
        address: "247 Pitts School Rd NW, Concord, NC",
        phone: "704-920-3124",
    }
];