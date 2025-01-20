export interface Plant {  
    common_name : string
    scientific_name : string
    family : string
    edible : boolean
    vegetable : boolean
    image_url : string
    toxicity : string
    description : string
    atmosph_humidity : number
    min_temperature : number
    max_temperature : number
    light : number
    bloom_months : Array<string>
}