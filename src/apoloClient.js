import { gql, ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const client = new ApolloClient({
  link: httpLink,
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
  createProduct(input: $product){
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