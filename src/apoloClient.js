import { gql, ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "authorization": "user2"
    }
  })
  return forward(operation)

})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false })
});


export const getProducts = () =>{
  return client.query({
    fetchPolicy: 'network-only',
    query: gql`
    {
       products{id, name}
    }
    `
  })
}

const MUTATION_QUERY = gql `
mutation($product: ProductInput) {
  createProduct(product: $product){
    name,
    id
  }
}
`
export const createProduct =  (product) => {
  return client
    .mutate({
      mutation: MUTATION_QUERY,
      variables: { product: { ...product, price: parseFloat(product.price)} }
    })
}
const GET_PRODUCT = gql `
  query ($id: String) {
  product(id: $id){
    name,
    category,
    brand,
    price
  }
}
`

export const getProduct =  (id) => {
  return client
    .query({
      query: GET_PRODUCT,
      variables: { id }
    })
}