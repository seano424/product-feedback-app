import data from '../public/data.json'

export function getAllProductIds() {
  return data.productRequests.map((p) => ({ params: { id: p.id.toString() } }))
}

export function getProductData(id) {
  return data.productRequests.find((p) => p.id === +id)
}
