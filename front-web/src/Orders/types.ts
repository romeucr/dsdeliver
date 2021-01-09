export type Product = {
   id: number
   name: string
   price: number
   description: string
   imageUri: string
}

export type OrderLocationData = {
   latitude: number
   longitude: number
   address: string
}

type ProductId = {
   id: number
}

export type OrderPayload = {
   products: ProductId[]
} & OrderLocationData //faz o merge de OrderPayload e OrderLocationData. Agora um OrderPayload também tem os atributos de OrderLocationData