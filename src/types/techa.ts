export interface Techa {
    name:        string;
    image:       string;
    description: string;
    attributes:  Attribute[];
}

export interface Attribute {
    trait_type: string;
    value:      string;
}


